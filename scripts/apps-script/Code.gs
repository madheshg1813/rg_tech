/**
 * RG Tech - website lead capture
 * ------------------------------
 * Receives enquiries from the website contact form and catalogue download,
 * and writes one row per lead.
 *
 * Create this from your Sheet (Extensions > Apps Script) so it is bound to the
 * spreadsheet - then nothing else needs configuring.
 */

var SHEET_NAME   = 'Leads';
var NOTIFY_EMAIL = 'rgtech97@gmail.com';   // set to '' to turn email off
var DRIVE_FOLDER = 'RG Tech Enquiry Files';

// Only needed if this script is NOT bound to a Sheet.
// Sheet URL: docs.google.com/spreadsheets/d/<THIS_IS_THE_ID>/edit
var SHEET_ID = '';


/** Lets you open the /exec URL in a browser to confirm it is reachable. */
function doGet() {
  return out({ status: 'ok', message: 'RG Tech lead endpoint is live.' });
}


function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    saveLead(body);
    return out({ status: 'success' });
  } catch (err) {
    return out({ status: 'error', message: String(err) });
  }
}


function saveLead(body) {
  var sheet = getSheet();

  // Header row, written once.
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Received At', 'Name', 'Phone', 'Email', 'Service',
      'Material', 'Message', 'Attachment', 'Source', 'Page'
    ]);
    sheet.getRange(1, 1, 1, 10).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  sheet.appendRow([
    body.submittedAt ? new Date(body.submittedAt) : new Date(),
    body.name     || '',
    body.phone    || '',
    body.email    || '',
    body.service  || '',
    body.material || '',
    body.message  || '',
    saveAttachment(body),
    body.source   || '',
    body.page     || ''
  ]);

  notify(body);
}


function getSheet() {
  var ss = SHEET_ID
    ? SpreadsheetApp.openById(SHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();

  if (!ss) {
    throw new Error('No spreadsheet. Set SHEET_ID at the top of this file.');
  }
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}


/** Saves an attached drawing to Drive and returns a shareable link. */
function saveAttachment(body) {
  if (!body.fileData || !body.fileName) return '';
  try {
    var folders = DriveApp.getFoldersByName(DRIVE_FOLDER);
    var folder  = folders.hasNext() ? folders.next() : DriveApp.createFolder(DRIVE_FOLDER);
    var blob = Utilities.newBlob(
      Utilities.base64Decode(body.fileData),
      body.fileType || 'application/octet-stream',
      body.fileName
    );
    var file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return file.getUrl();
  } catch (err) {
    // A bad attachment must never cost you the lead.
    return 'Upload failed: ' + String(err);
  }
}


function notify(body) {
  if (!NOTIFY_EMAIL) return;
  try {
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: 'New website lead - ' + (body.name || 'Unknown'),
      body:
        'Name:     ' + (body.name     || '-') + '\n' +
        'Phone:    ' + (body.phone    || '-') + '\n' +
        'Email:    ' + (body.email    || '-') + '\n' +
        'Service:  ' + (body.service  || '-') + '\n' +
        'Material: ' + (body.material || '-') + '\n' +
        'Message:  ' + (body.message  || '-') + '\n' +
        'Source:   ' + (body.source   || '-')
    });
  } catch (err) {
    // Email quota exhausted must not fail the write.
  }
}


function out(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}


/**
 * STEP 5 - run this to check everything works.
 * Pick "testLead" in the toolbar dropdown, press Run, approve the permissions.
 * A row should appear in the Leads tab.
 *
 * Do not run doPost by hand - it has no event data and will just report an error.
 */
function testLead() {
  saveLead({
    name: 'Test Lead',
    phone: '9876543210',
    email: 'test@example.com',
    service: 'Laser Cutting Services',
    material: 'Mild Steel',
    message: 'Written by testLead() - safe to delete this row.',
    source: 'apps-script-test',
    page: '/',
    submittedAt: new Date().toISOString()
  });
  Logger.log('Done. Check the "Leads" tab for a new row.');
}
