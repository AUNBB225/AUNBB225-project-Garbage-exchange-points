function doGet(e) {
  let htmlOutput;
  if (!e.parameter.page) {
    htmlOutput = HtmlService.createTemplateFromFile('login').evaluate();
  } else {
    htmlOutput = HtmlService.createTemplateFromFile(e.parameter['page']).evaluate();
  }

  return htmlOutput
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}


function getUrl(){
  var url = ScriptApp.getService().getUrl()
  return url
}



function checkLogin(username, password) {
  const sheetId = 'YOUR_SHEETID'; // ID ของ Google Sheet
  const sheetName = 'Admin'; // ชื่อของ Sheet
  const sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
  
  // รับข้อมูลทั้งหมดใน sheet
  const data = sheet.getDataRange().getValues();
  
  // ตรวจสอบข้อมูล
  for (let i = 1; i < data.length; i++) { // เริ่มจาก 1 เพื่อข้าม header
    const storedUsername = data[i][0] ? data[i][0].toString().trim() : ""; // แปลงค่าเป็น string และตัดช่องว่าง
    const storedPassword = data[i][1] ? data[i][1].toString().trim() : ""; // แปลงค่าเป็น string และตัดช่องว่าง

    if (storedUsername === username && storedPassword === password) {
      return "success"; // พบผู้ใช้และเข้าสู่ระบบสำเร็จ
    }
  }
  return "failure"; // ไม่พบผู้ใช้
}


function getUserData() {
  const dataSheetId = 'YOUR_SHEETID'; // ID ของ Google Sheet
  const dataSheet = SpreadsheetApp.openById(dataSheetId).getSheetByName('DATA');
  const settingsSheet = SpreadsheetApp.openById(dataSheetId).getSheetByName('ตั้งค่าคะแนนการแลก');
  const exchangeSheet = SpreadsheetApp.openById(dataSheetId).getSheetByName('คำสั่งขอแลก');
  
  // นับจำนวนผู้ใช้ในแผ่นงาน DATA เริ่มจากแถวที่สอง
  const userCount = dataSheet.getLastRow() - 1; // ลบ 1 สำหรับ header

  // ดึงค่าจากเซลล์ A2 ในแผ่นงาน ตั้งค่าคะแนนการแลก
  const scoreSetting = settingsSheet.getRange('A2').getValue() || 0; // แสดง 0 ถ้าไม่มีข้อมูล

  // นับจำนวนคำสั่งในแผ่นงาน คำสั่งขอแลก
  const requestCount = exchangeSheet.getLastRow() - 1; // ลบ 1 สำหรับ header

  return {
    userCount: userCount,
    scoreSetting: scoreSetting,
    requestCount: requestCount
  };
}

function saveSettings(exchangeRate) {
  const sheet = SpreadsheetApp.openById('YOUR_SHEETID').getSheetByName('ตั้งค่าคะแนนการแลก');
  
  // ตั้งค่าคะแนนการแลกใน A2
  sheet.getRange('A2').setValue(exchangeRate);
  
  return {
    success: true,
    message: 'บันทึกอัตราการแลกเปลี่ยนสำเร็จ!'
  };
}

function getRequests() {
  const sheet = SpreadsheetApp.openById('YOUR_SHEETID').getSheetByName('คำสั่งขอแลก');
  const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 6).getValues();
  return data;
}

function deleteRequestRow(row) {
  const sheet = SpreadsheetApp.openById('YOUR_SHEETID').getSheetByName('คำสั่งขอแลก');
  sheet.deleteRow(row);
}

//จัดการสินค้า-------------------------------------------------------------------------
// กำหนด ID ของ Google Drive Folder ที่ใช้เก็บภาพ
const FOLDER_ID = 'YOUR_FolderID';

// กำหนด ID ของ Google Sheet
const SPREADSHEET_ID = 'YOUR_SHEETID';

// ฟังก์ชันดึงข้อมูลสินค้า
function getProducts() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('รายการของ');
  const data = sheet.getDataRange().getValues();
  return data.slice(1).map((row, index) => [...row, index + 2]);  // เพิ่ม index สำหรับแถวที่ลบ
}

// ฟังก์ชันเพิ่มสินค้าใหม่
function addProduct(price, name, details, base64Image) {
  const blob = Utilities.newBlob(Utilities.base64Decode(base64Image.split(',')[1]), MimeType.JPEG, name);
  const folder = DriveApp.getFolderById(FOLDER_ID);
  const file = folder.createFile(blob);
  const imageUrl = `https://lh5.googleusercontent.com/d/${file.getId()}`;

  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('รายการของ');
  sheet.appendRow([price, name, details, imageUrl]);
}

// ฟังก์ชันลบสินค้า
// ฟังก์ชันลบสินค้า
function deleteProduct(rowIndex) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('รายการของ');
  const imageUrl = sheet.getRange(rowIndex, 4).getValue(); // คอลัมน์ D เก็บ URL ของภาพสินค้า
  
  // ตรวจสอบและดึง image ID จาก URL
  const imageId = imageUrl.split('/d/')[1];
  
  if (imageId) {
    try {
      const folder = DriveApp.getFolderById(FOLDER_ID);
      const file = folder.getFilesByName(imageId);

      while (file.hasNext()) {
        const imageFile = file.next();
        imageFile.setTrashed(true);  // ลบไฟล์ภาพจาก Google Drive
      }
    } catch (error) {
      Logger.log("Error deleting file: " + error.message);
    }
  }

  // ลบแถวข้อมูลจาก Google Sheets
  sheet.deleteRow(Number(rowIndex));
}

