/**
 * RG Tech - publishing tracker
 * ----------------------------
 * Two jobs:
 *
 *   1. setupTrackingSheet()  - run ONCE by hand. Splits a pasted CSV that
 *      landed as one long string per row in column A into real columns, and
 *      adds the header row. Until this runs there is no Status column to
 *      write into.
 *
 *   2. doPost()  - called by the GitHub cron after each release. Finds the row
 *      by slug (or by title for the Blogs tab) and stamps Status and
 *      Published URL.
 *
 * Works across every tab, so Service Pages, Sheet5, GODS Pages and Blogs are
 * all handled by the same deployment.
 *
 * Create this from the tracking sheet: Extensions > Apps Script.
 */

var STATUS_LABEL = 'Status';
var URL_LABEL    = 'Published URL';

/* Column order of the generated CSV. */
var CSV_HEADERS = ['City', 'Type', 'Page', 'URL Slug', 'Status', 'Published URL'];


/* ------------------------------------------------------------------ setup */

/**
 * STEP 1 - run this once, from the editor, with the pasted tab active.
 *
 * Pasting a CSV into Google Sheets puts the whole line in column A rather than
 * splitting on commas. This rewrites those rows as proper columns.
 *
 * Safe to re-run: rows that are already split are left alone.
 */
function setupTrackingSheet() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var values = sheet.getDataRange().getValues();

  if (!values.length) {
    Logger.log('Sheet is empty.');
    return;
  }

  var rows = [];
  var splitCount = 0;

  for (var r = 0; r < values.length; r++) {
    var first = String(values[r][0] || '');
    var restEmpty = values[r].slice(1).join('') === '';

    if (first.indexOf(',') !== -1 && restEmpty) {
      rows.push(parseCsvLine(first));
      splitCount++;
    } else {
      rows.push(values[r]);
    }
  }

  if (!splitCount) {
    Logger.log('Nothing to split - the sheet already has real columns.');
    return;
  }

  // Normalise every row to the same width before writing back.
  var width = 0;
  rows.forEach(function (row) { width = Math.max(width, row.length); });
  rows = rows.map(function (row) {
    var out = row.slice();
    while (out.length < width) out.push('');
    return out;
  });

  // Add the header row if the first row looks like data rather than headers.
  var firstCell = String(rows[0][0] || '').toLowerCase();
  if (firstCell !== 'city') {
    rows.unshift(CSV_HEADERS.concat(new Array(Math.max(0, width - CSV_HEADERS.length)).fill('')));
  }

  sheet.clearContents();
  sheet.getRange(1, 1, rows.length, width).setValues(rows);
  sheet.getRange(1, 1, 1, width).setFontWeight('bold');
  sheet.setFrozenRows(1);

  Logger.log('Split ' + splitCount + ' rows into ' + width + ' columns.');
  Logger.log('Status is column E, Published URL is column F.');
}


/**
 * Minimal CSV line parser - handles quoted fields containing commas, which the
 * Page column can produce.
 */
function parseCsvLine(line) {
  var out = [];
  var cur = '';
  var inQuotes = false;

  for (var i = 0; i < line.length; i++) {
    var ch = line.charAt(i);

    if (ch === '"') {
      if (inQuotes && line.charAt(i + 1) === '"') { cur += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (ch === ',' && !inQuotes) {
      out.push(cur); cur = '';
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out;
}


/* --------------------------------------------------------------- endpoint */

/** Open the /exec URL in a browser to confirm the deployment is reachable. */
function doGet() {
  return out({ status: 'ok', message: 'RG Tech publishing tracker is live.' });
}


function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);

    if (body.action !== 'markPublished') {
      return out({ status: 'error', message: 'Unknown action: ' + body.action });
    }

    var results = (body.rows || []).map(markRow);
    var updated = 0;
    results.forEach(function (r) { if (r.updated) updated++; });

    return out({
      status: 'success',
      updated: updated,
      missed: results.length - updated,
      details: results
    });
  } catch (err) {
    return out({ status: 'error', message: String(err) });
  }
}


/**
 * Find a row by slug (or title) anywhere in the workbook and stamp it.
 * Returns what happened, so a mismatch shows up in the Action log instead of
 * failing silently.
 */
function markRow(row) {
  var needle = String(row.slug || row.title || '').trim();
  if (!needle) return { needle: '', updated: false, reason: 'empty key' };

  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();

  for (var s = 0; s < sheets.length; s++) {
    var sheet = sheets[s];
    var values = sheet.getDataRange().getValues();

    for (var r = 0; r < values.length; r++) {
      for (var c = 0; c < values[r].length; c++) {
        var cell = String(values[r][c] || '').trim();
        if (!cell) continue;

        var hit = (cell === needle) || (cell.toLowerCase() === needle.toLowerCase());
        if (!hit) continue;

        var statusCol = c + 2; // 1-indexed: the column after the match
        var urlCol    = c + 3;

        ensureHeader(sheet, values, statusCol, STATUS_LABEL);
        ensureHeader(sheet, values, urlCol, URL_LABEL);

        sheet.getRange(r + 1, statusCol).setValue(row.status || 'Published');
        sheet.getRange(r + 1, urlCol).setValue(row.url || '');

        return { needle: needle, updated: true, sheet: sheet.getName(), row: r + 1 };
      }
    }
  }

  return {
    needle: needle,
    updated: false,
    reason: 'not found - if the CSV is still one column, run setupTrackingSheet first'
  };
}


/**
 * Write a header label if that column has none, so the GODS and Blogs tabs do
 * not need reformatting by hand.
 */
function ensureHeader(sheet, values, col, label) {
  var headerRow = findHeaderRow(values);
  if (headerRow < 0) return;

  var existing = String((values[headerRow] || [])[col - 1] || '').trim();
  if (!existing) {
    sheet.getRange(headerRow + 1, col).setValue(label).setFontWeight('bold');
  }
}


/** The header row is the first row naming a slug, page or cluster column. */
function findHeaderRow(values) {
  for (var r = 0; r < Math.min(values.length, 5); r++) {
    var joined = values[r].join(' ').toLowerCase();
    if (joined.indexOf('slug') !== -1 || joined.indexOf('cluster page') !== -1) {
      return r;
    }
  }
  return values.length ? 0 : -1;
}


function out(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}


/**
 * STEP 2 - run this after setupTrackingSheet to prove the wiring works before
 * trusting the cron. Look at the Madurai Laser Cutting Services row afterwards.
 */
function testMarkPublished() {
  var result = markRow({
    slug: '/madurai/laser-cutting-services',
    url: 'https://www.rgtechengineeringworks.com/madurai/laser-cutting-services',
    status: 'Published'
  });
  Logger.log(JSON.stringify(result, null, 2));
  Logger.log(result.updated
    ? 'Success - check the Status and Published URL columns on that row.'
    : 'Not found. Run setupTrackingSheet on the pasted tab first.');
}
