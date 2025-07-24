const version = require("./package.json").version;

module.exports = {
  expo: {
    name: "cat-tinder",
    slug: "cat-tinder",
    version: version,
    orientation: "portrait",
    icon: "./assets/cat.jpg",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/cat.jpg",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/cat.jpg",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      favicon: "./assets/cat.jpg",
    },

    android: {
      package: "com.anonymous.cattinder",
    },
  },
};
