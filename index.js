var fs = require("fs");

const createDir = async dirPath => {
  var dir = `${dirPath}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const startOperation = async (numberOfItems, source) => {
  createDir(`./${source}`);
  for (let i = 1; i <= numberOfItems; i++) {
    // const element = array[index];
  }
};

startOperation(4, "words");
