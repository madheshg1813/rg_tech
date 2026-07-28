/**
 * RG Tech - publishing tracker
 * ----------------------------
 * Marks rows in the content tracking sheet as Published when the GitHub cron
 * releases a page.
 *
 * Handles all three tabs from one endpoint:
 *   Service Pages - matched on the URL Slug column (two city blocks side by side)
 *   GODS Pages    - matched on the Suggested URL Slug column
 *   Blogs         - matched on the Cluster Page title, since that tab has no
 *                   slug column
 *
 * Status and Published URL are written immediately to the right of whichever
 * column matched, and the header labels are created if they are missing. That
 * way the Blogs and GODS tabs do not need to be reformatted by hand, and the
 * two-block layout on Service Pages works without hardcoding column letters.
 *
 * Create this from the tracking sheet: Extensions > Apps Script.
 */

var STATUS_LABEL = 'Status';
var URL_LABEL    = 'Published URL';


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
    var updated = results.filter(function (r) { return r.updated; }).length;

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
 * Returns what happened so a mismatch shows up in the Action log rather than
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

        // Slug match is exact; title match is case-insensitive so minor
        // capitalisation differences in the Blogs tab still line up.
        var hit = (cell === needle) ||
                  (cell.toLowerCase() === needle.toLowerCase());
        if (!hit) continue;

        var statusCol = c + 2; // 1-indexed: the column after the match
        var urlCol    = c + 3;

        ensureHeader(sheet, values, statusCol, STATUS_LABEL);
        ensureHeader(sheet, values, urlCol, URL_LABEL);

        sheet.getRange(r + 1, statusCol).setValue(row.status || 'Published');
        sheet.getRange(r + 1, urlCol).setValue(row.url || '');

        return {
          needle: needle,
          updated: true,
          sheet: sheet.getName(),
          row: r + 1
        };
      }
    }
  }

  return { needle: needle, updated: false, reason: 'not found in any tab' };
}


/**
 * Write a header label if that column has none. The GODS and Blogs tabs have no
 * Status / Published URL columns yet, and creating them here avoids asking
 * anyone to reformat the sheet by hand.
 */
function ensureHeader(sheet, values, col, label) {
  var headerRow = findHeaderRow(values);
  if (headerRow < 0) return;

  var existing = String((values[headerRow] || [])[col - 1] || '').trim();
  if (!existing) {
    sheet.getRange(headerRow + 1, col).setValue(label).setFontWeight('bold');
  }
}


/** The header row is the first row that names a slug or page column. */
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
 * Run this from the editor to check the wiring before trusting the cron.
 * Pick "testMarkPublished" in the toolbar dropdown and press Run, then look at
 * the Madurai Laser Cutting Services row.
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
    : 'Not found. Confirm the slug exists exactly as written in the sheet.');
}
