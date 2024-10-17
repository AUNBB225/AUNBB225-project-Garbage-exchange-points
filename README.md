# ระบบขยะแลกแต้มสำหรับโรงเรียน (AUNBB225-project-Garbage-exchange-points)

![Project Logo](https://via.placeholder.com/150)

ระบบขยะแลกแต้มสำหรับโรงเรียน เป็นโครงการที่พัฒนาขึ้นเพื่อส่งเสริมการจัดการขยะในโรงเรียนอย่างมีประสิทธิภาพ โดยใช้เทคโนโลยีที่ทันสมัยและเข้าถึงได้ง่าย

## เทคโนโลยีที่ใช้

- Google Apps Script
- Google Sheets
- Arduino IDE
- ESP32 Board

## การติดตั้ง

### 1. ตั้งค่า ESP32 Board สำหรับ Arduino IDE

1. เพิ่ม URL บอร์ดเพิ่มเติมใน Arduino IDE:
   ```
   https://dl.espressif.com/dl/package_esp32_index.json
   ```

2. ติดตั้ง Driver ESP32:
   [ดาวน์โหลด Driver](https://www.silabs.com/documents/public/software/CP210x_VCP_Windows.zip)

### 2. ติดตั้ง Libraries ที่จำเป็น

- [Library I2C Matrix 4x4 Keypad](http://www.mediafire.com/file/z9qzwmprwdo2gqj/Keypad-master.zip/file)
- [Keypad I2C](http://www.mediafire.com/file/wcdmj9bo27glp35/Keypad_I2C.zip/file)
- [LiquidCrystal I2C](https://downloads.arduino.cc/libraries/github.com/johnrickman/LiquidCrystal_I2C-1.1.2.zip)
- [WiFiManager](https://downloads.arduino.cc/libraries/github.com/tzapu/WiFiManager-2.0.17.zip)
- [HttpClient](https://downloads.arduino.cc/libraries/github.com/amcewen/HttpClient-2.2.0.zip)

## การใช้งาน

![Usage Example](https://via.placeholder.com/300x200)

1. เปิดโปรแกรม Arduino IDE
2. เลือกบอร์ด ESP32
3. อัพโหลดโค้ดลงบนบอร์ด
4. เชื่อมต่อกับ Google Sheets และ Google Apps Script
5. เริ่มใช้งานระบบขยะแลกแต้ม

## การสนับสนุน

หากคุณพบปัญหาหรือต้องการความช่วยเหลือ กรุณาเปิด Issue ใน GitHub repository นี้

## ผู้พัฒนา

- [ชื่อผู้พัฒนา 1](https://github.com/developer1)
- [ชื่อผู้พัฒนา 2](https://github.com/developer2)

## ลิขสิทธิ์

โครงการนี้อยู่ภายใต้ลิขสิทธิ์ [MIT License](https://opensource.org/licenses/MIT)
