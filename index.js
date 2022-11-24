const { rename, readdir } = require('fs');
const path = require("path");

const fs = require('fs');
let fullArray = [];

function getFileList(path) {
  let files = [];

  //Ler uma pasta e adiciona os arquivos
  fs.readdirSync(path).forEach(file => {
    files.push(file);
  });

  return files;
}

function getFileNames() {
  let files = getFileList("teste");

  let fileOldName = [];
  let fileNewName = [];

  files.forEach(file => {
    fileOldName.push(file);

    const date = getDateAndTime(file);
    const cam = getCam(file);
    const ext = getExtension(file);

    let newName = date + "-" + cam + "_Preset01" + ext;
    
    fileNewName.push(newName);
  })
  let fileNames = [];
  fileNames.push(fileOldName);
  fileNames.push(fileNewName);

  return fileNames;
}

function changeFileNames(path){
  
  let fileName = getFileNames();
  let oldNames = fileName[0];
  let newNames = fileName[1];

  for(let i=0;i<oldNames.length;i++){
    let oldPath = oldNames[i];
    let newPath = newNames[i];
    fs.renameSync(path + oldPath, path + newPath);
  }
}

function getCam(fileName) {
  return fileName.split(" ")[0];
}

function getExtension(fileName) {
  return path.extname(fileName);
}

function getDateAndTime(fileName) {
  const splittedName = fileName.split("(")
  const date = splittedName[1].substring(0, 10)
  const ddMMyyyy = date.replace(/-/gm,'')
  const yyyyMMdd = ddMMyyyy.substring(4,8) + ddMMyyyy.substring(2,4) + ddMMyyyy.substring(0,2)

  const time = fileName.split("_")[1].replace('-','').substring(0,4)

  return yyyyMMdd + "-" + time;
}
try{
  changeFileNames('./teste/');

}catch(err){
  console.log(err);
}
