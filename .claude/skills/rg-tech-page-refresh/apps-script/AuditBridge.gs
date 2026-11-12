/**
 * RG Tech - page refresh approval bridge
 * --------------------------------------
 * Read/write endpoint for the rg-tech-page-refresh skill, so scheduled runs can
 * reach the sheet without an interactive Google sign-in.
 *
 * SETUP, once:
 *
 *   1. Open the approval spreadsheet, Extensions > Apps Script, paste this file.
 *   2. Change SECRET below to a long random string of your own.
 *   3. Run setupTabs() once from the editor and grant the permissions it asks
 *      for. This creates the five tabs with their headers and the Approval
 *      dropdown. It never deletes a tab that already exists.
 *   4. Deploy > New deployment > Web app.
 *        Execute as:        Me
 *        Who has access:    Anyone
 *      "Anyone" means anyone with the URL; the SECRET below is what actually
 *      guards it, which is why it must not be guessable.
 *   5. Copy the /exec URL into the repo's .env.local:
 *        REFRESH_SHEET_URL=https://script.google.com/macros/s/..../exec
 *        REFRESH_SHEET_SECRET=<the SECRET you set>
 *        REFRESH_SHEET_ID=<the spreadsheet id from its URL>
 *
 * After changing this file you must Deploy > Manage deployments > edit > New
 * version, or the /exec URL keeps serving the old code.
 */

var SECRET = 'CHANGE-ME-to-a-long-random-string';

var TABS = {
  'Page Register': ['Page ID', 'Kind', 'Title', 'URL', 'Source', 'Last Audited', 'Open Suggestions'],
  'Suggestions': ['Suggestion ID', 'Date', 'Page Title', 'Page URL', 'Page ID', 'Kind', 'Category',
                  'Section', 'Current Text', 'Suggested Text', 'Your Edited Text', 'Why It Helps',
                  'Pages Affected', 'Anchor Text', 'Link Target', 'Approval', 'Notes',
                  'Applied Status', 'Applied At'],
  'Patches': ['Suggestion ID', 'Page ID', 'Field', 'Patch JSON'],
  'Apply Log': ['Date', 'Page Title', 'Page URL', 'Page ID', 'Kind', 'Changes Applied',
                'Changes Skipped', 'Summary', 'Rollback Point', 'Live Check'],
  'Settings': ['Setting', 'Value']
};

/* The key column used by upsert/update, per tab. Tabs absent here are append only. */
var KEYS = {
  'Page Register': 'Page ID',
  'Suggestions': 'Suggestion ID',
  'Patches': 'Suggestion ID',
  'Settings': 'Setting'
};

var DEFAULT_SETTINGS = [
  ['Pages per day', '2'],
  ['Days before a page is audited again', '60'],
  ['Max internal links added per page', '3'],
  ['Max FAQs per page', '8'],
  ['FAQ similarity threshold', '0.60'],
  ['Kinds allowed', 'post, pillar'],
  ['Paused', 'No']
];

var APPROVAL_CHOICES = ['Pending', 'Approved', 'Rejected'];


/* ----------------------------------------------------------------- setup */

/** Run once by hand. Safe to re-run: it only adds what is missing. */
function setupTabs() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  Object.keys(TABS).forEach(function (name) {
    var sh = ss.getSheetByName(name) || ss.insertSheet(name);
    var headers = TABS[name];

    // Write headers only when row 1 is empty, so an existing sheet is untouched.
    if (sh.getLastRow() === 0) {
      sh.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    sh.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#1a1d21')
      .setFontColor('#ffffff');
    sh.setFrozenRows(1);
  });

  // Seed Settings only if it has nothing but the header.
  var settings = ss.getSheetByName('Settings');
  if (settings.getLastRow() < 2) {
    settings.getRange(2, 1, DEFAULT_SETTINGS.length, 2).setValues(DEFAULT_SETTINGS);
  }

  // Approval dropdown, so a stray value can never read as approved.
  var sug = ss.getSheetByName('Suggestions');
  var approvalCol = TABS['Suggestions'].indexOf('Approval') + 1;
  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(APPROVAL_CHOICES, true)
    .setAllowInvalid(false)
    .build();
  sug.getRange(2, approvalCol, sug.getMaxRows() - 1, 1).setDataValidation(rule);

  // Wrap the long prose columns so a reviewer can actually read them.
  ['Current Text', 'Suggested Text', 'Your Edited Text', 'Why It Helps'].forEach(function (c) {
    var i = TABS['Suggestions'].indexOf(c) + 1;
    sug.setColumnWidth(i, 340);
    sug.getRange(1, i, sug.getMaxRows(), 1).setWrap(true);
  });

  ss.getSheetByName('Patches').hideSheet();
}


/* ------------------------------------------------------------- endpoints */

/** Lets you open the /exec URL in a browser to confirm it is reachable. */
function doGet() {
  return out({ ok: true, message: 'RG Tech page refresh bridge is live.' });
}

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);

    if (body.secret !== SECRET) {
      return out({ ok: false, error: 'bad secret' });
    }

    var tab = body.tab;
    if (!TABS[tab]) return out({ ok: false, error: 'unknown tab: ' + tab });

    switch (body.action) {
      case 'read':   return out({ ok: true, rows: readRows(tab) });
      case 'append': return out(appendRows(tab, body.rows || []));
      case 'upsert': return out(writeRows(tab, body.rows || [], true));
      case 'update': return out(writeRows(tab, body.rows || [], false));
      default:       return out({ ok: false, error: 'unknown action: ' + body.action });
    }
  } catch (err) {
    return out({ ok: false, error: String(err) });
  }
}


/* -------------------------------------------------------------- the work */

function sheetFor(tab) {
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(tab);
  if (!sh) throw new Error('tab not found: ' + tab + ' (run setupTabs)');
  return sh;
}

function headersFor(sh) {
  return sh.getRange(1, 1, 1, Math.max(1, sh.getLastColumn())).getValues()[0];
}

/** Every data row as an object keyed by header, plus _row for addressing. */
function readRows(tab) {
  var sh = sheetFor(tab);
  if (sh.getLastRow() < 2) return [];

  var headers = headersFor(sh);
  var values = sh.getRange(2, 1, sh.getLastRow() - 1, headers.length).getValues();

  return values.map(function (row, i) {
    var obj = { _row: i + 2 };
    headers.forEach(function (h, c) {
      if (h !== '') obj[h] = row[c] === null ? '' : String(row[c]);
    });
    return obj;
  });
}

function appendRows(tab, rows) {
  if (!rows.length) return { ok: true, appended: 0 };
  var sh = sheetFor(tab);
  var headers = headersFor(sh);

  var out = rows.map(function (r) {
    return headers.map(function (h) { return r[h] === undefined ? '' : r[h]; });
  });
  sh.getRange(sh.getLastRow() + 1, 1, out.length, headers.length).setValues(out);

  return { ok: true, appended: out.length };
}

/**
 * Writes rows matched on the tab's key column.
 *
 * Only the fields present on each incoming row are written, so a partial update
 * never blanks a column someone filled in by hand - which is the whole point
 * when a human is editing Your Edited Text while the skill writes Applied At.
 *
 * allowInsert=false (update) leaves unmatched rows alone and reports them.
 */
function writeRows(tab, rows, allowInsert) {
  var key = KEYS[tab];
  if (!key) return { ok: false, error: 'tab is append-only: ' + tab };
  if (!rows.length) return { ok: true, updated: 0, inserted: 0, missed: [] };

  var sh = sheetFor(tab);
  var headers = headersFor(sh);
  var keyCol = headers.indexOf(key);
  if (keyCol < 0) return { ok: false, error: 'key column missing: ' + key };

  var existing = readRows(tab);
  var index = {};
  existing.forEach(function (r) {
    if (r[key] !== '') index[r[key]] = r._row;
  });

  var updated = 0, inserted = 0, missed = [], toAppend = [];

  rows.forEach(function (r) {
    var id = r[key];
    if (id === undefined || id === '') { missed.push('(no key)'); return; }

    var rowNum = index[id];

    if (rowNum) {
      // Write each supplied field in place, one cell at a time.
      headers.forEach(function (h, c) {
        if (h !== '' && r[h] !== undefined) sh.getRange(rowNum, c + 1).setValue(r[h]);
      });
      updated++;
    } else if (allowInsert) {
      toAppend.push(headers.map(function (h) { return r[h] === undefined ? '' : r[h]; }));
      inserted++;
    } else {
      missed.push(id);
    }
  });

  if (toAppend.length) {
    sh.getRange(sh.getLastRow() + 1, 1, toAppend.length, headers.length).setValues(toAppend);
  }

  return { ok: true, updated: updated, inserted: inserted, missed: missed };
}

function out(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
