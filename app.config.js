import * as dotenv from "dotenv";

dotenv.config();

module.exports = {
  expo: {
    name: "Dream Journal",
    slug: "dream-journal",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#007AFF",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.marcosveloso.dreamjournalpoc",
      appleTeamId: "3X2GLAB7N5",
      infoPlist: {
        NSMicrophoneUsageDescription:
          "This app uses the microphone to record audio for speech recognition",
        NSSpeechRecognitionUsageDescription:
          "This app uses the speech recognition to transcribe audio",
        CFBundleURLTypes: [
          {
            CFBundleURLSchemes: [process.env.IOS_URL_SCHEME],
          },
        ],
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#007AFF",
      },
      package: "com.marcosveloso.dreamjournalpoc",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: [
      [
        "@react-native-voice/voice",
        {
          microphonePermission:
            "CUSTOM: Allow $(PRODUCT_NAME) to access the microphone",
          speechRecognitionPermission:
            "CUSTOM: Allow $(PRODUCT_NAME) to securely recognize user speech",
        },
      ],
      [
        "expo-splash-screen",
        {
          backgroundColor: "#007AFF",
          image: "./assets/splash-icon.png",
        },
      ],
      [
        "@react-native-google-signin/google-signin",
        {
          iosUrlScheme: process.env.IOS_URL_SCHEME,
        },
      ],
    ],
    extra: {
      eas: {
        projectId: "b7e224b6-f5f8-4411-b3bd-8434208430f0",
      },
    },
    owner: "marcosveloso",
    runtimeVersion: "1.0.0",
    updates: {
      url: "https://u.expo.dev/b7e224b6-f5f8-4411-b3bd-8434208430f0",
    },
  },
};
