function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
      .setTitle('Login Page')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getData() {
  const sheetId = '1BRuELs-LdLADbX4_d-DU4QbCxFU0GLVTrqAr57bX5dc';
  const sheet = SpreadsheetApp.openById(sheetId).getSheetByName('DATA');
  const data = sheet.getDataRange().getValues();
  return data; // ส่งกลับข้อมูลทั้งหมดใน Sheet
}

function checkLogin(username, phone) {
  const data = getData();
  for (let i = 1; i < data.length; i++) { // เริ่มจากแถวที่ 2 เพราะแถวแรกเป็น header
    if (data[i][7] === username && data[i][2] === phone) { // เช็ค UserName ที่คอลัมน์ H (ดัชนี 7)
      return data[i]; // ส่งกลับข้อมูลของผู้ใช้ที่ล็อกอิน
    }
  }
  return null; // ล็อกอินล้มเหลว
}


function getProducts() {
  const sheetId = '1BRuELs-LdLADbX4_d-DU4QbCxFU0GLVTrqAr57bX5dc';
  const sheet = SpreadsheetApp.openById(sheetId).getSheetByName('รายการของ');
  const data = sheet.getDataRange().getValues();
  return data; // ส่งกลับข้อมูลสินค้า
}


function updateUserPoints(userId, newPoints) {
  const sheetId = '1BRuELs-LdLADbX4_d-DU4QbCxFU0GLVTrqAr57bX5dc';
  const sheet = SpreadsheetApp.openById(sheetId).getSheetByName('DATA');
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) { // เริ่มจากแถวที่ 2 เพราะแถวแรกเป็น header
    if (data[i][0] === userId) { // เปรียบเทียบ User ID
      sheet.getRange(i + 1, 6).setValue(newPoints); // อัปเดตคะแนนในคอลัมน์ F (คะแนน)
      return;
    }
  }
}


function recordOrder(userId, username, phone, price, productName, productDetails) {
  const sheetId = '1BRuELs-LdLADbX4_d-DU4QbCxFU0GLVTrqAr57bX5dc';
  const sheet = SpreadsheetApp.openById(sheetId).getSheetByName('คำสั่งขอแลก');
  
  // เพิ่ม "'" ไปด้านหน้าค่าที่จะบันทึก
  const record = [
    "'" + userId,
    "'" + username,
    "'" + phone,
    price,
    productName,
    productDetails
  ];
  
  // สร้างแถวใหม่สำหรับคำสั่งซื้อ
  sheet.appendRow(record);
}

function getUserOrders(userId) {
  const sheetId = '1BRuELs-LdLADbX4_d-DU4QbCxFU0GLVTrqAr57bX5dc';
  const sheet = SpreadsheetApp.openById(sheetId).getSheetByName('คำสั่งขอแลก');
  const data = sheet.getDataRange().getValues();
  const userOrders = [];
  
  for (let i = 1; i < data.length; i++) { // เริ่มจากแถวที่ 2 เพราะแถวแรกเป็น header
    if (data[i][0] === userId) { // เปรียบเทียบ User ID
      userOrders.push({ row: i + 1, order: data[i] }); // เก็บทั้งแถวที่ตำแหน่งและข้อมูลคำสั่งซื้อ
    }
  }
  return userOrders; // คืนค่าคำสั่งซื้อพร้อมตำแหน่งแถวใน Google Sheets
}


function cancelOrder(orderRow) {
  const sheetId = '1BRuELs-LdLADbX4_d-DU4QbCxFU0GLVTrqAr57bX5dc';
  const sheet = SpreadsheetApp.openById(sheetId).getSheetByName('คำสั่งขอแลก');
  
  const orderDetails = sheet.getRange(orderRow, 1, 1, 6).getValues()[0]; // ดึงข้อมูลคำสั่งซื้อ
  
  // คืนคะแนนให้กับผู้ใช้
  const userId = orderDetails[0];
  const price = orderDetails[3]; // ราคา

  // อัปเดตคะแนนใน Sheet DATA
  const dataSheet = SpreadsheetApp.openById(sheetId).getSheetByName('DATA');
  const data = dataSheet.getDataRange().getValues();
  let newPoints = 0;
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === userId) {
      const currentPoints = data[i][5]; // คะแนนปัจจุบัน
      newPoints = currentPoints + price; // คำนวณคะแนนใหม่หลังจากคืน
      dataSheet.getRange(i + 1, 6).setValue(newPoints); // เพิ่มคะแนน
      break;
    }
  }
  
  // ลบคำสั่งซื้อ
  sheet.deleteRow(orderRow);

  return newPoints; // คืนค่าคะแนนใหม่กลับไปที่ client
}

