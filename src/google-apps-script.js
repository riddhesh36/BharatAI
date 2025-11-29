const SHEET_NAME = "Sheet1";

function doPost(e) {
    const lock = LockService.getScriptLock();
    lock.tryLock(10000);

    try {
        const doc = SpreadsheetApp.getActiveSpreadsheet();
        const sheet = doc.getSheetByName(SHEET_NAME);

        const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
        const nextRow = sheet.getLastRow() + 1;

        const newRow = headers.map(function (header) {
            return header === 'timestamp' ? new Date() : e.parameter[header];
        });

        sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

        return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
            .setMimeType(ContentService.MimeType.JSON);
    }

    catch (e) {
        return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
            .setMimeType(ContentService.MimeType.JSON);
    }

    finally {
        lock.releaseLock();
    }
}

function setup() {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = doc.getSheetByName(SHEET_NAME);

    const headers = ["timestamp", "formType", "firstName", "lastName", "email", "organization", "jobTitle", "companyName", "contactPerson", "phone", "boothSize", "nomineeName", "category", "description"];

    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
}
