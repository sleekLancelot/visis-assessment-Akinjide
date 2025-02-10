# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the server

   ```bash
    npx expo start
   ```

3. Check the target android device

   ```bash
    adb devices
   ```

4. Target one of the devices gotten with the command above

   ```bash
    adb -s <deviceId> reverse tcp:8081 tcp:8081
   ```

5. Build and start the app on the targeted device

   ```bash
    npm run android
   ```

   or

   ```bash
    npx expo run:android
   ```

Download an APK [here](https://drive.google.com/drive/folders/1PL1DMpdbynY3TYm_Hpb7LCRQjBe86c75?usp=sharing)

Checkout a Walkthrough video [here](https://drive.google.com/file/d/1pYnoNyboMvyFJCEAtt4bX9ct8r7F7_34/view?usp=sharing)