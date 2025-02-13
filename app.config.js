import "dotenv/config";
export default {
  expo: {
    name: "Todo App",
    slug: "TodoApp",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.harisamjad05.TodoApp",
      icon: {
        dark: "./src/assets/icons/ios-dark.png",
        light: "./src/assets/icons/ios-light.png",
        tinted: "./src/assets/icons/ios-tinted.png",
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./src/assets/icons/adaptive-icon.png",
        monochromeImage: "./src/assets/icons/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.harisamjad05.TodoApp",
    },
    plugins: [
      "expo-font",
      [
        "expo-splash-screen",
        {
          backgroundColor: "#ffffff",
          image: "./src/assets/icons/splash-icon-dark.png",
          resizeMode: "contain",
          dark: {
            image: "./src/assets/icons/splash-icon-light.png",
            backgroundColor: "#000000",
          },
          imageWidth: 200,
        },
      ],
    ],
    extra: {
      eas: {
        projectId: process.env.EAS_PROJECT_ID,
      },
    },
    owner: process.env.EXPO_OWNER,
    runtimeVersion: {
      policy: "appVersion",
    },
    updates: {
      url: process.env.EXPO_UPDATES_URL,
    },
  },
};
