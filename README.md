# 🏫 ระบบขยะแลกแต้มสำหรับโรงเรียน (AUNBB225-project-Garbage-exchange-points)

<div align="center">

![GitHub last commit](https://img.shields.io/github/last-commit/AUNBB225/AUNBB225-project-Garbage-exchange-points)
![GitHub issues](https://img.shields.io/github/issues/AUNBB225/AUNBB225-project-Garbage-exchange-points)
![GitHub stars](https://img.shields.io/github/stars/AUNBB225/AUNBB225-project-Garbage-exchange-points)
![GitHub forks](https://img.shields.io/github/forks/AUNBB225/AUNBB225-project-Garbage-exchange-points)
![GitHub license](https://img.shields.io/github/license/AUNBB225/AUNBB225-project-Garbage-exchange-points)

</div>

ระบบขยะแลกแต้มสำหรับโรงเรียน เป็นโครงการที่พัฒนาขึ้นเพื่อส่งเสริมการจัดการขยะในโรงเรียนอย่างมีประสิทธิภาพ โดยใช้เทคโนโลยีที่ทันสมัยและเข้าถึงได้ง่าย

## 🚀 เทคโนโลยีที่ใช้

<div align="center">

![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Google Sheets](https://img.shields.io/badge/Google%20Sheets-34A853?style=for-the-badge&logo=google-sheets&logoColor=white)
![Arduino](https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=arduino&logoColor=white)
![ESP32](https://img.shields.io/badge/ESP32-E7352C?style=for-the-badge&logo=espressif&logoColor=white)

</div>

## 📥 การติดตั้ง

### 1. ตั้งค่า ESP32 Board สำหรับ Arduino IDE

1. เพิ่ม URL บอร์ดเพิ่มเติมใน Arduino IDE:
   ```
   https://dl.espressif.com/dl/package_esp32_index.json
   ```

#### 🖼️ ภาพแสดงวิธีการลง Board

1. เปิดโปรแกรม Arduino IDE และไปที่ `File > Preferences`
   
   ![วิธีการตั้งค่า 1](https://lh5.googleusercontent.com/d/1yzYsNrGeeqqxlqlByFY679IWtmuY3OPp)
   
2. วางลิงก์ `https://dl.espressif.com/dl/package_esp32_index.json` ในช่องว่างตามภาพ และคลิก OK
   ![วิธีการตั้งค่า 2](https://lh5.googleusercontent.com/d/1CGWDG1-ip2kQIyHt5IVlQx1BWxCA80MY)

3. ไปที่ `Tools > Board > Board Manager`
   ![วิธีการตั้งค่า 3](https://lh5.googleusercontent.com/d/18KGNLtYM78A8GeD2Oo1xWtpoomk-TLfK)

4. ค้นหา ESP32 และติดตั้ง "ESP32 by Espressif Systems"
   
   ![วิธีการตั้งค่า 4](https://lh5.googleusercontent.com/d/1ex2jNtq3jqOUSi5o02vkh2Jvj0IO_Rji)

6. ติดตั้ง Driver ESP32:
   [📥 ดาวน์โหลด Driver](https://www.silabs.com/documents/public/software/CP210x_VCP_Windows.zip)

### 2. ติดตั้ง Libraries ที่จำเป็น

- [📚 Library I2C Matrix 4x4 Keypad](http://www.mediafire.com/file/z9qzwmprwdo2gqj/Keypad-master.zip/file)
- [📚 Keypad I2C](http://www.mediafire.com/file/wcdmj9bo27glp35/Keypad_I2C.zip/file)
- [📚 LiquidCrystal I2C](https://downloads.arduino.cc/libraries/github.com/johnrickman/LiquidCrystal_I2C-1.1.2.zip)
- [📚 WiFiManager](https://downloads.arduino.cc/libraries/github.com/tzapu/WiFiManager-2.0.17.zip)
- [📚 HttpClient](https://downloads.arduino.cc/libraries/github.com/amcewen/HttpClient-2.2.0.zip)

## 3. 📊 การสร้างแผ่นงานใน Google Sheets

### แผ่นงานที่ต้องสร้าง:

1. **DATA**
2. **คำสั่งขอแลก**
3. **รายการของ**
4. **ประวัติการบันทึก**
5. **ตั้งค่าคะแนนการแลก**
6. **Admin**

### 📷 ตัวอย่างการสร้างคอลัมน์ในแต่ละแผ่นงาน

#### DATA
![ตัวอย่าง DATA](https://lh5.googleusercontent.com/d/1thbbwXs48RtBqbgwyp9GnUraduiIg0yY)

#### คำสั่งขอแลก
![ตัวอย่าง คำสั่งขอแลก](https://lh5.googleusercontent.com/d/1Zy4Yq_45UbtXAaTRr--i3Jq6olTeOK_n)

#### รายการของ
![ตัวอย่าง รายการของ](https://lh5.googleusercontent.com/d/1kSigjSYHj9iqF0nwba10bHfhZ-nah1Wj)

#### ประวัติการบันทึก
![ตัวอย่าง ประวัติการบันทึก](https://lh5.googleusercontent.com/d/1xdAHZnvvKVYyMNH-S27HhAF80Pfxzvn3)

#### ตั้งค่าคะแนนการแลก
![ตัวอย่าง ตั้งค่าคะแนนการแลก](https://lh5.googleusercontent.com/d/1fCxevFBkT-A6LIUBSRHQk4w-GV-NnO2K)

#### Admin
![ตัวอย่าง Admin](https://lh5.googleusercontent.com/d/1M-k9Zs-nStb60a_Scthyz4ZiYYfOwGRc)

## ❓ การสนับสนุน

หากคุณพบปัญหาหรือต้องการความช่วยเหลือ กรุณา[เปิด Issue](https://github.com/AUNBB225/AUNBB225-project-Garbage-exchange-points/issues) ใน GitHub repository นี้

## 👨‍💻 ผู้พัฒนา

- [JIRAYUT](https://github.com/AUNBB225)

## 📄 ลิขสิทธิ์

โครงการนี้อยู่ภายใต้ลิขสิทธิ์ [MIT License](https://opensource.org/licenses/MIT)
