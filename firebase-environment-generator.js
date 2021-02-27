"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
//DON'T MODIFY THOSE FILENAMES
var firebaseEnvAndroidFile = 'google-services';
var firebaseEnvIOSFile = 'GoogleService-Info';
//Helper function to get right fileName for iOS file
function getIOSEnvFile(env) {
    if (env === 'main') {
        return firebaseEnvIOSFile + ".plist";
    }
    else {
        return firebaseEnvIOSFile + "-" + env + ".plist";
    }
}
//Helper function to get right fileName for Android file
function getAndroidEnvFile(env) {
    if (env === 'main') {
        return firebaseEnvAndroidFile + ".json";
    }
    else {
        return firebaseEnvAndroidFile + "-" + env + ".json";
    }
}
function generateRightFirebaseEnvironmentFile(environment) {
    console.log("*********************************************");
    console.log("Generating firebase environment files. Environment: " + environment);
    //Defining paths.
    //Given `firebase-environment-generator.ts` is stored in `../projectName/tools/firebase-environment-generator`
    var androidPath = path.join(__dirname, '..', '..', 'android', 'app');
    var iosPath = path.join(__dirname, '..', '..', 'ios', 'Runner');
    var androidEnvFile = getAndroidEnvFile(environment);
    var androidMainFile = getAndroidEnvFile('main');
    fs.copyFile("" + androidEnvFile, androidPath + "/" + androidMainFile, function (e) {
        if (e === null) {
            console.log(androidEnvFile + " file copied successfully.");
        }
        else {
            console.log("Error while copying " + androidEnvFile + " file: " + e);
        }
    });
    var IOSEnvFile = getIOSEnvFile(environment);
    var IOSMainFile = getIOSEnvFile('main');
    fs.copyFile("" + IOSEnvFile, iosPath + "/" + IOSMainFile, function (e) {
        if (e === null) {
            console.log(IOSEnvFile + " file copied successfully.");
        }
        else {
            console.log("Error while copying " + IOSEnvFile + " file: " + e);
        }
    });
}
//Once file is running, it will execute [copyRightEnvironmentFile] function with given arguments
function generateEnvironmentFiles(environment) {
    //If environment match, execute copying script
    if (environment === 'prod' || environment === 'dev') {
        generateRightFirebaseEnvironmentFile(environment);
    }
}
//Example `node firebase-environment-generator.js prod`
process.argv.forEach(function (val, index, array) {
    generateEnvironmentFiles(val);
});
