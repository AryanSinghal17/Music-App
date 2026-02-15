# 🔐 React Native OTP Authentication with Persistent Session

A production-style OTP authentication flow built using **React Native CLI + TypeScript**.  
This project demonstrates clean architecture, OTP validation logic, expiry handling, attempt tracking, and session persistence using AsyncStorage.

---

# 📌 Features

## 🔑 Authentication
- 6-digit OTP generated locally
- OTP stored per email
- OTP expires after 60 seconds
- Maximum 3 incorrect attempts
- Displays remaining attempts
- Resend OTP generates a new OTP and invalidates the old one

## ⏱ Session Management
- Displays session start time
- Shows live session duration (mm:ss format)
- Session persists after app reload
- Logout clears persistent session

## ✅ Validation
- Regex-based `.com` email validation
- OTP input limited to 6 digits
- Proper error handling for:
  - Expired OTP
  - Invalid OTP
  - Exceeded attempts

---

# 🏗 Architecture

src/
├── screens/ 
│ ├── LoginScreen.tsx
│ ├── OtpScreen.tsx
│ └── SessionScreen.tsx
│
├── services/ 
│ └── otpManager.ts
│
├── hooks/ 
│ └── useSessionTimer.ts



### Responsibilities

- **Screens (UI Layer)**  
  Handles rendering and user interactions.

- **Services (Business Logic)**  
  OTP generation, validation, expiry logic, attempt tracking.

- **Hooks**  
  Timer lifecycle management with proper cleanup.

- **AsyncStorage (Side Effects)**  
  Persistent session handling.

---

# 🔎 OTP Logic Explanation

## OTP Generation
Data Structure Used
type OTPData = {
  otp: string;
  expiresAt: number;
  attemptsLeft: number;
};

## Why This Structure?
Supports multiple users independently.
Tracks expiry timestamp.
Tracks attempt count.
Keeps logic isolated inside service layer.


## Expiry Handling
expiresAt = Date.now() + 60000
During validation:
If current time > expiresAt → OTP expired
Resending OTP resets expiry.

## Attempt Handling
Each OTP starts with 3 attempts.
On wrong attempt:
attemptsLeft--
User sees remaining attempts.
After 3 failures:
Validation blocked until resend.

## before Installation
# 🛠 Complete React Native CLI Environment Setup Guide (Windows)

This document explains how to set up a full React Native CLI development environment on Windows from scratch.

It includes installation of:
- Chocolatey
- Node.js
- JDK 17
- Android Studio
- Android SDK
- Environment Variables
- Virtual Device
- Cloning & Running the Project

---

# 1️⃣ Install Chocolatey (Windows Package Manager)

Chocolatey allows easy installation of development tools.

## Step 1: Open PowerShell as Administrator

- Press Start
- Search "PowerShell"
- Right-click → Run as Administrator

## Step 2: Run Installation Command
powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; `
[System.Net.ServicePointManager]::SecurityProtocol = 
[System.Net.ServicePointManager]::SecurityProtocol -bor 3072; 
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

## Verify Installation
choco -v
 ## 2️⃣ Install Node.js (LTS)
 choco install nodejs-lts -y

Verify Installation:
node -v
npm -v

## 3️⃣ Install JDK 17
choco install openjdk17 -y

Verify Installation: 
java -version

## 4️⃣ Install Android Studio
Download from:
https://developer.android.com/studio

During installation, make sure to select:

✔ Android SDK
✔ Android SDK Platform
✔ Android Virtual Device (AVD)

## 5️⃣ Install Android SDK Components
Open Android Studio
Go to → SDK Manager

Install:

✔ Android SDK Platform (API 33 or latest stable)
✔ Android SDK Build-Tools
✔ Android Emulator
✔ Android SDK Platform-Tools

## 6️⃣ Set Environment Variables
Open:
Control Panel → System → Advanced System Settings → Environment Variables

Variable Name: ANDROID_HOME
Variable Value: C:\Users\YourUsername\AppData\Local\Android\Sdk

Update PATH Variable
Edit System "Path" variable and add:

%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\emulator

## 7️⃣ Verify Android Setup
Open terminal and run:

adb devices
If no error appears → configuration is correct.

## 8️⃣ Create Virtual Device
Open Android Studio
→ Device Manager
→ Create Device

Recommended:

Device: Pixel 6
API Level: 33 or 34
Use x86_64 image

Clone Project from GitHub
Install Project Dependencies : npm install

## Run the Application
Step 1: Start Metro Server
npx react-native start
Keep this terminal open.

Step 2: Run Android App (New Terminal)
npx react-native run-android
The application will build and launch in emulator.

🔄 After System Restart
Always follow this order:
1️⃣ Start Metro
npx react-native start

2️⃣ Start Emulator
3️⃣ Run App
npx react-native run-android
