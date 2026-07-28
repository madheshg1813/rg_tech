/** ---------------------------------------------------------------
 *  RG Tech - website enquiry capture
 *  Receives leads from the site's /api/enquiry route.
 *  --------------------------------------------------------------- */

var ENQUIRY_SHEET   = 'Enquiries';
var DRIVE_FOLDER    = 'RG Tech Enquiry Attachments';
var NOTIFY_EMAIL    = 'admin@rgtechengineeringworks.com';  // set '' to disable

// REQUIRED if this script is standalone (created from script.google.com rather
// than from a Sheet's Extensions menu). getActiveSpreadsheet() returns null in a
// standalone script, so paste your Sheet ID here.
//
// Find it in the Sheet URL:
//   docs.google.com/spreadsheets/d/<THIS_PART_IS_THE_ID>/edit
var SHEET_ID = '';   // e.g. '1AbCdEfGhIjKlMnOpQrStUvWxYz1234567890'

/** Works whether the script is bound to a Sheet or standalone. */
function getSpreadsheet_() {
  if (SHEET_ID) return SpreadsheetApp.openById(SHEET_ID);
  var active = SpreadsheetApp.getActiveSpreadsheet();
  if (!active) {
    throw new Error(
      'No spreadsheet found. This script is standalone, so set SHEET_ID at the ' +
      'top of Code.gs to your Google Sheet ID.'
    );
  }
  return active;
}

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);

    // Public website enquiries are handled BEFORE any password check.
    // A visitor cannot know an admin password, and embedding one in a public
    // form would expose it to anyone who opens DevTools.
    if (body.action === 'addEnquiry') {
      return jsonOut(handleEnquiry(body));
    }

    // ---- everything below is your existing admin-only logic ----
    // Keep whatever password check you already have here, e.g.:
    //
    //   if (body.password !== 'YOUR_ADMIN_PASSWORD') {
    //     return ContentService.createTextOutput('Invalid Password');
    //   }
    //   ... your existing addPost / addGallery handling ...

    return jsonOut({ status: 'error', message: 'Unknown action: ' + body.action });

  } catch (err) {
    return jsonOut({ status: 'error', message: String(err) });
  }
}

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function handleEnquiry(body) {
  var ss = getSpreadsheet_();
  var sheet = ss.getSheetByName(ENQUIRY_SHEET);

  if (!sheet) {
    sheet = ss.insertSheet(ENQUIRY_SHEET);
  }

  // Write headers once, then freeze the row.
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Received At', 'Name', 'Phone', 'Email', 'Service',
      'Material', 'Message', 'Attachment', 'Source', 'Page'
    ]);
    sheet.getRange(1, 1, 1, 10).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  // Save any attachment to Drive and store a link, not the raw bytes.
  var fileUrl = '';
  if (body.fileData && body.fileName) {
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
      fileUrl = file.getUrl();
    } catch (fileErr) {
      // A bad attachment must never lose the lead itself.
      fileUrl = 'Upload failed: ' + String(fileErr);
    }
  }

  sheet.appendRow([
    body.submittedAt ? new Date(body.submittedAt) : new Date(),
    body.name     || '',
    body.phone    || '',
    body.email    || '',
    body.service  || '',
    body.material || '',
    body.message  || '',
    fileUrl,
    body.source   || '',
    body.page     || ''
  ]);

  if (NOTIFY_EMAIL) {
    try {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: 'New website enquiry - ' + (body.name || 'Unknown'),
        body:
          'Name: '     + (body.name || '-')     + '\n' +
          'Phone: '    + (body.phone || '-')    + '\n' +
          'Email: '    + (body.email || '-')    + '\n' +
          'Service: '  + (body.service || '-')  + '\n' +
          'Material: ' + (body.material || '-') + '\n' +
          'Message: '  + (body.message || '-')  + '\n' +
          'Attachment: ' + (fileUrl || 'none')  + '\n' +
          'Source: '   + (body.source || '-')   + '\n' +
          'Page: '     + (body.page || '-')
      });
    } catch (mailErr) {
      // Mail quota exhausted must not fail the write either.
    }
  }

  return { status: 'success' };
}

/**
 * Run this from the editor to verify the setup end to end.
 * Select "testEnquiry" in the toolbar dropdown and press Run.
 *
 * Do NOT run doPost manually - it has no event object, so it just returns an
 * error through the catch block and still logs "Execution completed", which
 * proves nothing.
 */
function testEnquiry() {
  var result = handleEnquiry({
    action: 'addEnquiry',
    name: 'Apps Script Test',
    phone: '9876543210',
    email: 'test@example.com',
    service: 'Laser Cutting Services',
    material: 'Mild Steel',
    message: 'Row written by testEnquiry() - safe to delete.',
    source: 'apps-script-test',
    page: '/',
    submittedAt: new Date().toISOString()
  });
  Logger.log(result);
  Logger.log('If you see status=success, check the Enquiries tab for a new row.');
}
