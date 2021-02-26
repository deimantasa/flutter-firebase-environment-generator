import * as fs from "fs";
import * as path from "path";

//DON'T MODIFY THOSE FILENAMES
const firebaseEnvAndroidFile = 'google-services';
const firebaseEnvIOSFile = 'GoogleService-Info';

//Only handling two environments for now.
type Environment = 'prod' | 'dev';

//Helper function to get right fileName for iOS file
function getIOSEnvFile(env: Environment | 'main') {
    if (env === 'main') {
        return `${firebaseEnvIOSFile}.plist`;
    } else {
        return `${firebaseEnvIOSFile}-${env}.plist`;
    }
}

//Helper function to get right fileName for Android file
function getAndroidEnvFile(env: Environment | 'main') {
    if (env === 'main') {
        return `${firebaseEnvAndroidFile}.json`;
    } else {
        return `${firebaseEnvAndroidFile}-${env}.json`;
    }
}

function generateRightFirebaseEnvironmentFile(environment: Environment) {
    console.log(`*********************************************`);
    console.log(`Generating firebase environment files. Environment: ${environment}`);

    //Defining paths. Given `firebase-environment.ts` is stored in `../projectName/tools/firebase-environment`
    const androidPath = path.join(__dirname, '..', '..', 'android', 'app');
    const iosPath = path.join(__dirname, '..', '..', 'ios', 'Runner');

    const androidEnvFile = getAndroidEnvFile(environment);
    const androidMainFile = getAndroidEnvFile('main');

    fs.copyFile(`${androidEnvFile}`, `${androidPath}/${androidMainFile}`, (e) => {
        if (e === null) {
            console.log(`${androidEnvFile} file copied successfully.`);
        } else {
            console.log(`Error while copying ${androidEnvFile} file: ${e}`);
        }

    });

    const IOSEnvFile = getIOSEnvFile(environment);
    const IOSMainFile = getIOSEnvFile('main');

    fs.copyFile(`${IOSEnvFile}`, `${iosPath}/${IOSMainFile}`, (e) => {
        if (e === null) {
            console.log(`${IOSEnvFile} file copied successfully.`);
        } else {
            console.log(`Error while copying ${IOSEnvFile} file: ${e}`);
        }
    });
}

//Once file is running, it will execute [copyRightEnvironmentFile] function with given arguments
function generateEnvironmentFiles(environment: string) {
    //If environment match, execute copying script
    if (environment === 'prod' || environment === 'dev') {
        generateRightFirebaseEnvironmentFile(environment);
    }
}

//Example `node firebase-environment-generator.js prod`
process.argv.forEach(function (val, index, array) {
    generateEnvironmentFiles(val);
});