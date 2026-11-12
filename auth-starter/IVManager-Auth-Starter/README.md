# Smart IV Management — React Native CLI Authentication Starter

This is a **drop-in source module**, not a complete generated native Android project. It contains a teal-and-white login screen, an authentication context, a role-based navigator, and placeholder dashboards for NURSE, DOCTOR and PHARMACIST. **No Expo.**

## Requirements
- Existing React Native CLI project created using `npx @react-native-community/cli@latest init IVManagerMobileApp`
- Working Android Studio SDK, emulator, compatible JDK and Node.js
- A backend that supports `POST /api/auth/login`

## Installation into an existing React Native CLI app
1. On your `feature/auth` branch, copy this archive's `src/` folder and `App.tsx` into your project root.
2. Install navigation dependencies in **your existing project**:
   ```bash
   npm install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context
   ```
3. Update `API_BASE_URL` in `src/services/authService.ts` to match your backend.
4. Start Android Studio emulator, then in separate terminals run:
   ```bash
   npm start
   npm run android
   ```
5. Backend response should look like:
   ```json
   {"user":{"id":"123","name":"Sample Nurse","role":"NURSE"},"accessToken":"example-token"}
   ```
   Other valid roles: `DOCTOR`, `PHARMACIST`.

## Important
- The included `package.json` is **informational**, listing navigation packages and example scripts. Do not replace your existing React Native project's package.json with it.
- The ZIP does not include `android/`, native Gradle files, or `node_modules/`; these are provided by your existing React Native CLI project.
- No dummy credentials or insecure role-selection shortcut are included. Sign-in requires a working backend endpoint.
- `http://10.0.2.2:3000` is an Android emulator-to-host example. On a physical phone, use a reachable HTTPS API endpoint.
- Plain HTTP may be blocked by Android network security policy; use HTTPS for production and configure a narrowly scoped debug-only cleartext exception if needed.
- For production: store tokens securely, restore sessions, implement token expiry/refresh and server-side RBAC for all protected APIs. This starter does not persist tokens and is not production-ready.
- The module cards are visual placeholders, not wired-up feature screens.
