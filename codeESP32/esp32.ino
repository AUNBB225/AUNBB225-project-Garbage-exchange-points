#include <Keypad_I2C.h>
#include <Keypad.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <WiFiManager.h> // นำเข้า WiFiManager
#include <HTTPClient.h>



// URL ของ Google App Script
const String url = "https://script.google.com/macros/s/AKfycbwiyqkPUL8s3nYZU0U-2iB3X3hsuauadrhWGF24ipgSHPK8SE-o1NBAWV_yQd78revO9g/exec";

LiquidCrystal_I2C lcd(0x27,16,2);
int buzzer = 23;
#define I2CADDR 0x21

const byte ROWS = 4;
const byte COLS = 4;

char keys[ROWS][COLS] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};

byte colPins[COLS] = {4, 5, 6, 7}; 
byte rowPins[ROWS] = {0, 1, 2, 3};

Keypad_I2C keypad( makeKeymap(keys), rowPins, colPins, ROWS, COLS, I2CADDR, PCF8574 );

#define SENSOR_PIN 34
unsigned int count = 0;
unsigned int lastState = 4095;
String number = "";


void setup(){
  Serial.begin(115200);

  pinMode(buzzer, OUTPUT);
  digitalWrite(buzzer, HIGH);
  playPowerOnSound();

  lcd.init();
  lcd.backlight();
  Wire.begin();
  keypad.begin( makeKeymap(keys) );

  lcd.setCursor(0,0);
  lcd.print("Connecting WiFi");
  delay(1000);
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("AP: ESP32_Config");
  
  WiFiManager wifiManager;
  if (!wifiManager.autoConnect("ESP32_Config")) {
    Serial.println("Failed to connect and hit timeout");
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("Failed to Connect");
    lcd.setCursor(0,1);
    lcd.print("Restarting...");
    delay(3000);
    ESP.restart(); // Restart ESP32 if connection fails
  }

  playConnectionSuccessSound();
  Serial.println("Connected to WiFi");
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("Connected to WiFi");
  lcd.setCursor(0,1);
  lcd.print("SSID: ");
  lcd.print(WiFi.SSID()); // Display WiFi name instead of IP
  
  delay(2000); // Keep display for a moment
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("Phone:");
  lcd.setCursor(0,1);
  lcd.print("Quantity:");

}

void loop(){
  char key = keypad.getKey();

  if (key){
    if (key == '*') {
      number = "";  
      lcd.setCursor(6,0);
      lcd.print("          ");  

      digitalWrite(buzzer, LOW);
      delayMicroseconds(200); // ปรับช่วงเวลาเพื่อควบคุมความถี่
      delay(100); // เว้นช่วง
      digitalWrite(buzzer, HIGH);
    } else if (key == 'D') {
      lcd.clear();
      lcd.setCursor(3,0);
      lcd.print("Sending...");
      playSendSound();
      digitalWrite(buzzer, HIGH);
      sendData(number, count); 
      number = "";  
      count =0;
      lcd.setCursor(6,0);
      lcd.print("          ");
      lcd.setCursor(11,1);
      lcd.print("           ");

    } else if (number.length() < 10) {
      number += key;
      lcd.setCursor(6,0);
      lcd.print(number);
        // เสียงบี๊บเมื่อกดตัวเลข
      digitalWrite(buzzer, HIGH);
      delay(100); // ความยาวเสียง
      digitalWrite(buzzer, LOW);
      delay(100); // เว้นช่วง
      digitalWrite(buzzer, HIGH);
    }


  }

  unsigned int currentState = analogRead(SENSOR_PIN);
  if (currentState == 0 && lastState == 4095) {
    count++;
    lcd.setCursor(11,1);
    lcd.print(count);
    digitalWrite(buzzer, LOW);
    delay(200);
    digitalWrite(buzzer, HIGH);
    delay(600);
  }
  lastState = currentState;
}



void playConnectionSuccessSound() {
  // เสียงโทนต่ำ
  for (int i = 0; i < 100; i++) {  
    digitalWrite(buzzer, HIGH);
    delayMicroseconds(1000); 
    digitalWrite(buzzer, LOW);
    delayMicroseconds(1000);
  }

  delay(100); // เว้นช่วงระหว่างโทนเสียง

  // เสียงโทนสูง
  for (int i = 0; i < 100; i++) {  
    digitalWrite(buzzer, HIGH);
    delayMicroseconds(500); 
    digitalWrite(buzzer, LOW);
    delayMicroseconds(500);
  }

  delay(100); // เว้นช่วงระหว่างโทนเสียง

  // เสียงโทนต่ำ
  for (int i = 0; i < 100; i++) {  
    digitalWrite(buzzer, HIGH);
    delayMicroseconds(1000); 
    digitalWrite(buzzer, LOW);
    delayMicroseconds(1000);
  }
  digitalWrite(buzzer, HIGH); // ปิดเสียง
}


void playSendSound() {
  for (int i = 0; i < 150; i++) {  // ทำให้เกิดเสียงด้วยการเปิด-ปิด
    digitalWrite(buzzer, HIGH);
    delayMicroseconds(500); // ปรับช่วงเวลาเพื่อควบคุมความถี่
    digitalWrite(buzzer, LOW);
    delayMicroseconds(500);
  }

  delay(100); // เว้นช่วงสั้นๆ ระหว่างการเปลี่ยนระดับเสียง

  for (int i = 0; i < 200; i++) {
    digitalWrite(buzzer, HIGH);
    delayMicroseconds(400); // เพิ่มความถี่เพื่อให้เสียงสูงขึ้น
    digitalWrite(buzzer, LOW);
    delayMicroseconds(400);
  }
}

void playPowerOnSound() {


    // เสียงความถี่ต่ำ
  for (int i = 0; i < 150; i++) {  // จำนวนรอบ
    digitalWrite(buzzer, HIGH);
    delayMicroseconds(1200); // ความยาวเสียง
    digitalWrite(buzzer, LOW);
    delayMicroseconds(1200);
  }


  delay(200); // เว้นช่วงสั้นๆ

  // เสียงความถี่สูง
  for (int i = 0; i < 100; i++) {  // จำนวนรอบ
    digitalWrite(buzzer, HIGH);
    delayMicroseconds(500); // ความยาวเสียง
    digitalWrite(buzzer, LOW);
    delayMicroseconds(500);
  }

  digitalWrite(buzzer, HIGH);
}


void playTransactionSuccessSound() {
  // เสียงบี๊บแรก
  for (int i = 0; i < 2; i++) {  // เล่นสองรอบ
    digitalWrite(buzzer, HIGH);
    delay(100); // ความยาวเสียง
    digitalWrite(buzzer, LOW);
    delay(100); // เว้นช่วง
  }

  delay(300); // เว้นช่วงยาวขึ้นก่อนเสียงถัดไป

  // เสียงบี๊บสอง
  for (int i = 0; i < 3; i++) {  // เล่นสามรอบ
    digitalWrite(buzzer, HIGH);
    delay(90); // ความยาวเสียง
    digitalWrite(buzzer, LOW);
    delay(90); // เว้นช่วง
  }
}


void sendData(String phoneNumber, int count) {
  int maxRetries = 2; 
  int attempt = 0;
  bool success = false;
  bool retryConnection = false;

  while (attempt < maxRetries && !success) {
    Serial.print("Attempt: ");
    Serial.println(attempt + 1);

    if (WiFi.status() != WL_CONNECTED || retryConnection) {
      Serial.println("WiFi disconnected, reconnecting...");
      WiFi.disconnect();
      delay(1000);
      WiFi.reconnect();
      delay(5000);
      retryConnection = false;
    }

    if (WiFi.status() == WL_CONNECTED) {
      Serial.println("WiFi connected.");
      HTTPClient http;
      http.setTimeout(10000);

      String fullUrl = String(url) + "?phoneNumber=" + phoneNumber + "&objectCount=" + String(count);

      http.setFollowRedirects(HTTPC_STRICT_FOLLOW_REDIRECTS);
      http.begin(fullUrl);
      int httpResponseCode = http.GET();

      if (httpResponseCode > 0) {
        Serial.print("HTTP Response Code: ");
        Serial.println(httpResponseCode);
        playTransactionSuccessSound();
        digitalWrite(buzzer, HIGH);

        String payload = http.getString();
        Serial.print("Response from server: ");
        Serial.println(payload);

        // แสดงผลบนจอ LCD ตามที่คุณต้องการ
        int statusIndex = payload.indexOf("\"status\":\"") + 10;
        int statusEnd = payload.indexOf("\"", statusIndex);
        String status = payload.substring(statusIndex, statusEnd);

        int messageIndex = payload.indexOf("\"message\":\"") + 11;
        int messageEnd = payload.indexOf("\"", messageIndex);
        String message = payload.substring(messageIndex, messageEnd);

        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print(status);
        lcd.setCursor(0, 1);
        lcd.print(message);
        delay(2000);

        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("Phone:");
        lcd.setCursor(0, 1);
        lcd.print("Quantity:");

        success = true; // ส่งข้อมูลสำเร็จ
      } else {
        // จัดการกับข้อผิดพลาดที่แตกต่างกัน
        Serial.print("Error sending data, HTTP Response Code: ");
        Serial.println(httpResponseCode);

        // ตรวจสอบประเภทของข้อผิดพลาด
        if (httpResponseCode == -11) {
          Serial.println("Error message: read Timeout");
          // รับข้อมูลที่ส่งกลับจากเซิร์ฟเวอร์ในครั้งถัดไป
          // (ไม่ต้องส่งข้อมูลซ้ำ)
        } else if (httpResponseCode == -1) {
          Serial.println("Error message: connection refused");
          // กำหนดให้ลองส่งข้อมูลใหม่ในรอบถัดไป
          attempt--; // ลด attempt เพื่อให้ส่งใหม่ในรอบถัดไป
        } else {
          Serial.print("Error message: ");
          Serial.println(http.errorToString(httpResponseCode).c_str());
        }

        http.end();
        if (httpResponseCode == -1) {
          retryConnection = true; // กำหนดให้ลองเชื่อมต่อใหม่ในรอบถัดไป
        } else {
          retryConnection = false; // ไม่ต้อง retry ถ้าเป็น Timeout
        }
      }
    } else {
      Serial.println("Unable to connect to WiFi.");
      retryConnection = true; // กำหนดให้พยายามเชื่อมต่อใหม่หาก WiFi ไม่เชื่อมต่อ
    }

    if (retryConnection) {
      Serial.println("Retrying connection...");
    }

    attempt++; // นับครั้งที่พยายามส่งข้อมูลใหม่
  }

  if (!success) {
    Serial.println("Failed to send data after multiple attempts.");
  }
}



