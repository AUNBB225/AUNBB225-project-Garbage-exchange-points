function doGet(e) {
  var phoneNumber = e.parameter.phoneNumber;
  var objectCount = Number(e.parameter.objectCount);

//ID ของ google sheet ที่สร้างขึ้น
  var sheet = SpreadsheetApp.openById("YOUR_SHEET ID").getSheetByName("DATA");

  var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 7).getValues();
    // ดึงค่า multiplier จากแผ่นตั้งค่าคะแนนการแลก
  var settingsSheet = SpreadsheetApp.openById("YOUR_SHEET ID").getSheetByName("ตั้งค่าคะแนนการแลก");
  var multiplier = settingsSheet.getRange("A2").getValue();

  var foundRow = -1;
  for (var i = 0; i < data.length; i++) {
    if (data[i][2] == phoneNumber) {
      foundRow = i + 2;
      break;
    }
  }

  var status, message;

  if (foundRow !== -1) {
    var currentBottleCount = sheet.getRange(foundRow, 5).getValue();
    var newBottleCount = currentBottleCount + objectCount;

    var currentPoints = sheet.getRange(foundRow, 6).getValue();
    var additionalPoints = objectCount * multiplier;
    var newPoints = currentPoints + additionalPoints;

    // อัปเดตข้อมูลใน Google Sheets
    sheet.getRange(foundRow, 5).setValue(newBottleCount);
    sheet.getRange(foundRow, 6).setValue(newPoints);

    status = "success";
    message = "successfully";

    var statusColumn = sheet.getRange(foundRow, 7).getValue();
    if (statusColumn === "รับข้อมูล") {
      var lineToken = sheet.getRange(foundRow, 4).getValue();

      // เรียกใช้ฟังก์ชัน sendTestData พร้อม newBottleCount
      sendTestData(phoneNumber, objectCount, lineToken, newPoints, newBottleCount);
    }
  } else {
    status = "Failed";
    message = "Not PhoneNumber";
  }

  var logSheet = SpreadsheetApp.openById("YOUR_SHEET ID").getSheetByName("ประวัติการบันทึก");
  logSheet.appendRow([
    new Date(),
    phoneNumber,
    objectCount
  ]);

  return ContentService.createTextOutput(JSON.stringify({status: status, message: message}))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendTestData(phoneNumber, objectCount, lineToken, points, bottleCount) {
//URLของ google app script แจ้งเตือนไลน์
  var url = "YOUR_URLแจ้งเตือนไลน์";

  // กำหนดค่าพารามิเตอร์ที่ต้องการส่ง
  var params = {
    phoneNumber: phoneNumber,
    objectCount: objectCount,
    lineToken: lineToken,
    points: points,
    bottleCount: bottleCount // เพิ่ม bottleCount ลงใน params
  };

  // สร้าง URL ที่มีพารามิเตอร์
  var queryString = Object.keys(params)
    .map(function(key) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    })
    .join("&");

  var finalUrl = url + "?" + queryString;

  // ส่งคำขอ GET
  var response = UrlFetchApp.fetch(finalUrl);
  Logger.log("Response from Apps Script: " + response.getContentText());
}
