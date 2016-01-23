# Queup

Ionic demo app

## Set up

Install Ionic and Cordova:
```bash
npm install -g cordova ionic
```

Fork the git repo from https://github.com/davidcai/queup.git. And clone the fork:
```bash
git clone https://github.com/<your_git>/queup.git
```

Set up node and bower dependencies:
```bash
cd queup
npm i
bower i
```

Add platform and plugins:
```bash
ionic platform add ios
ionic plugin add cordova-plugin-device cordova-plugin-whitelist cordova-plugin-console cordova-plugin-splashscreen cordova-plugin-statusbar ionic-plugin-keyboard cordova-plugin-geolocation cordova-plugin-camera
```

## Run

Run the app in browser:
```bash
ionic serve
```

Run emulator:
```bash
ionic emulate ios
```
