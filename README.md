# Dream Journal

React Native app using Expo and `react-native-voice` implementing speech-to-text functionality

## Features

- Custom Splash Screen
- A microphone button to start and stop recording
- A text area to display the transcribed text
- Haptics and animations on buttons
- Button to copy to clipboard the transcription
- A clear button to reset the screen and allow a new recording

## Run expo link – _only for iOS Simulators_

Download from this [link](https://expo.dev/accounts/marcosveloso/projects/dream-journal/builds/859fc82a-d081-449c-851d-618dea9db65a)

To run this build on your local simulator, download the build, unzip it, then drag it onto a simulator. [Video example](https://static.expo.dev/static/videos/simulator-build-artifact.mp4)

## Run Locally

Clone the project

```sh
  git clone git@github.com:MarcosVel/dream-journal-poc.git
```

Go to the project directory

```sh
  cd dream-journal-poc
```

Open on VSCode

```sh
  code .
```

Install dependencies

```sh
  yarn
```

First install on device

> _used `expo prebuild` to config `@react-native-voice/voice`_

```sh
  npx expo run:ios
```

Start the server once it's installed

```sh
  npx expo start
```

## EAS build

To build with `expo eas` installing on iOS Simulator

```sh
  eas build --platform ios --profile ios-simulator
```

## Tech Stack

- **Expo:** Simplifies development, testing, and deployment with built-in tools and libraries
- **Reanimated:** Smooth and performant animations
- **expo-haptics:** Improves interaction by adding tactile feedback – _only works on physical devices_
- **expo-splash-screen:** Ensures a professional app launch experience with controlled splash screens
- **@react-native-voice/voice:** Enables voice input and live transcription
- **expo-dev-client:** Facilitates native development and debugging without needing a full rebuild
