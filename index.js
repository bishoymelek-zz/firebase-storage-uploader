var fs = require("fs");
var admin = require("firebase-admin");
var serviceAccount = require("./config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "kalimah-dictionary.appspot.com"
});

var bucket = admin.storage().bucket();

/**
 * --------------------------------------
 * ------ HERE VARIABLES TO CHANGE ------
 * --------------------------------------
 */
let numberOfFiles = 4,
  dataType = "222";

/**
 * Create a new directory in local server to format how files are structured
 * @param {String} dirPath
 */
const createDir = async dirPath => {
  var dir = `${dirPath}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

/**
 *
 * @param {String} fromPath path from where to pick a file
 * @param {String} toPath path to where to copy file
 */
const copyFile = async (fromPath, toPath) => {
  fs.copyFile(`${fromPath}`, `${toPath}`, err => {
    if (err) throw err;
    console.log(`file was copied from ${fromPath} ===> ${toPath}`);
  });
};

/**
 * Upload a file to firebase storage
 * @param {Sting} path path to file in local and remote servers
 */
const uploadFiles = async path => {
  await bucket.upload(path, { destination: `${path}` });
};

/**
 * starting point
 * @param {Number} numberOfItems number of items to have the operation on
 * @param {String} dataType type of source of data
 */
const startOperation = async (numberOfItems, dataType) => {
  // Create base directory
  await createDir(`./${dataType}`);
  // Loop a specific number of times to do some
  // async operations from copying to uploading files.
  for (let i = 1; i <= numberOfItems; i++) {
    await createDir(`./${dataType}/${i}`);
    await copyFile(`./source/voice/${i}.mp3`, `${dataType}/${i}/${i}.mp3`);
    await copyFile(`./source/image/${i}.png`, `${dataType}/${i}/${i}.png`);
    await uploadFiles(`${dataType}/${i}/${i}.mp3`, dataType);
    await uploadFiles(`${dataType}/${i}/${i}.png`, dataType);
  }
  console.log("----------------------------------------------");
  console.log("----------- finished operation ---------------");
  console.log("----------------------------------------------");
};

startOperation(numberOfFiles, dataType);
