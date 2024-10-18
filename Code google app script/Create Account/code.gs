// กำหนด Spreadsheet ID และชื่อ Sheet
const SPREADSHEET_ID = 'YOUR_SHEETID';
const SHEET_NAME = 'DATA';

// ฟังก์ชันสำหรับแสดงหน้าเว็บ
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ฟังก์ชันสำหรับเพิ่มผู้ใช้ใหม่
function addUser(data) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  const lastRow = sheet.getLastRow();
  
  // ดึงข้อมูลที่มีอยู่ในคอลัมน์ C และ H เพื่อเช็คการซ้ำกัน
  const existingPhones = sheet.getRange("C2:C" + lastRow).getValues().flat();
  const existingEmails = sheet.getRange("H2:H" + lastRow).getValues().flat();

  // เช็คว่าเบอร์โทรหรืออีเมลนี้มีอยู่แล้วหรือไม่
  if (existingPhones.includes(data.phone) || existingEmails.includes(data.email)) {
    return { success: false, message: "เบอร์โทรหรืออีเมลนี้ถูกใช้แล้ว" };
  }

  // สร้าง User ID ใหม่โดยการนับแถว + 1 และเติมเลขศูนย์
  const newUserId = "'" + (lastRow).toString().padStart(8, '0'); // ใส่ ' ที่ User ID
  const phoneWithApostrophe = "'" + data.phone; // ใส่ ' ที่เบอร์โทร

  // เพิ่มข้อมูลผู้ใช้ใหม่ลงใน Sheet (จัดลำดับเป็น User ID, UserName, Phone, Email)
  sheet.appendRow([newUserId, data.prefix + data.name, phoneWithApostrophe, "", "", "", "", data.email]);

  return { success: true, message: "เพิ่มผู้ใช้สำเร็จ!" };
}
