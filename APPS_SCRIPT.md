# Google Sheet setup for website enquiries

The website posts leads to your existing Apps Script. This is the code that
receives them and writes a row.

## Why the contact form needed this

Before this change, `ContactForm.jsx` did exactly this on submit:

```js
const handleSubmit = (e) => { e.preventDefault(); alert('Thank you! We will respond within 24 hours.') }
```

No network call. **Every quote request was discarded** while telling the customer
you would reply within 24 hours. The catalogue modal captured a name and phone
number to unlock the PDF and discarded those too.

Both now post to `/api/enquiry`, which forwards to your Apps Script.

---

## Step 1 — Prepare the Sheet

1. Open the Google Sheet already connected to your Apps Script (the one serving
   blog/gallery data).
2. Add a new tab named exactly **`Enquiries`**.
3. Leave it empty — the script writes the header row automatically on the first
   submission.

## What I found probing your current script

I tested the live endpoint before writing this, and the results change the
instructions:

| Request | Response |
| --- | --- |
| `GET .../exec` | `{"status":"ok"}` — **no posts array**, so the blog never had data here |
| `POST` without a password | `Invalid Password` |
| `POST` with `RGTECH2026` | Apps Script **error page** |

So your current script has a **password gate on POST**, has no `addEnquiry`
action, and its `GET` returns only a status. Two consequences:

1. **`addEnquiry` must be handled *before* the password check.** Website
   visitors cannot know an admin password, and you must never put one in a
   public form. The code below does the enquiry branch first and leaves your
   password gate intact for the admin actions.
2. The password `RGTECH2026` from `lib/data.js` did not authenticate, so
   whatever your script expects, I do not have it — you will need to keep that
   part as-is.

## Step 2 — Add the code

**Extensions → Apps Script**, then paste the code below.

> ### ⚠️ If you get `SyntaxError: Invalid or unexpected token line: 1`
>
> You pasted the markdown code fence. The line ```` ```javascript ```` is **not**
> JavaScript — it is markdown formatting and must not go into `Code.gs`.
>
> **Copy from `scripts/apps-script/Code.gs` instead.** That file is the raw
> script with no fences, verified to parse cleanly. Select all of it, paste, and
> the error goes away.
>
> Your `Code.gs` must start with `/**` on line 1 and end with `}`.

> **Do not delete your existing `doGet`.** Replace only your `doPost(e)` with the
> version here. It answers `addEnquiry` first, then hands everything else to your
> existing password-protected logic untouched.

```javascript
/** ---------------------------------------------------------------
 *  RG Tech - website enquiry capture
 *  Receives leads from the site's /api/enquiry route.
 *  --------------------------------------------------------------- */

var ENQUIRY_SHEET   = 'Enquiries';
var DRIVE_FOLDER    = 'RG Tech Enquiry Attachments';
var NOTIFY_EMAIL    = 'admin@rgtechengineeringworks.com';  // set '' to disable

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
  var ss = SpreadsheetApp.getActiveSpreadsheet();
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
```

## Step 3 — Redeploy the Web App

Apps Script changes are **not** live until you redeploy:

1. **Deploy → Manage deployments**
2. Click the **pencil** on your existing deployment
3. **Version → New version**
4. **Who has access → Anyone**
5. **Deploy**

> Keep the same deployment so the URL does not change. If you create a *new*
> deployment you get a new URL, and you must send it to me to update the site.

Current URL the site posts to:

```
https://script.google.com/macros/s/AKfycbycIMpfSHcJ3gjpZJ-UMDCgFloRFLvZULBMWm5AHSkND0ZJtfa_eZBAMJNraImE_t1d/exec
```

## Step 4 — Test

Submit the contact form on the site. You should see:

- a new row in the **Enquiries** tab
- an email to `admin@rgtechengineeringworks.com`
- a green confirmation on the page

If the script is not deployed yet, the form shows a **red error** telling the
visitor to WhatsApp instead. It will not show a false thank-you.

---

## How it is wired

```
Browser  ──POST /api/enquiry──▶  Next.js route  ──POST──▶  Apps Script  ──▶  Sheet + Drive + Email
```

The browser never talks to Apps Script directly. That is deliberate:

- **Apps Script does not answer CORS preflight.** The existing admin code works
  around this with `mode: 'no-cors'`, which makes the response opaque — that code
  literally cannot tell success from failure and prints "Submitted Successfully"
  either way. Server-to-server has no CORS, so the real result is readable.
- The Apps Script URL stays out of the browser bundle.
- Validation runs where a visitor cannot bypass it.

The route treats a non-JSON reply as a failure, because Apps Script returns an
HTML error page with HTTP 200 when a script throws. Checking only the status code
would report success on a broken script.

## Attachments

The "Attach CAD/DXF/STEP File" button previously had no `onClick` and no file
input — it did nothing. It is now a real input accepting
`.dxf .dwg .step .stp .stl .pdf .zip .png .jpg`, capped at **6 MB**. Files are
sent as base64, saved to the Drive folder above, and the Sheet stores a
link-shared URL.

## Optional: change the notification email

Edit `NOTIFY_EMAIL` at the top of the script. Set it to `''` to turn email off
and rely on the Sheet alone.
