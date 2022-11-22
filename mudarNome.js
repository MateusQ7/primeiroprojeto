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
  const regExp = /(\d{1,4}([.\-/])\d{1,2}([.\-/])\d{1,4})/g;
  const dateAndTime = fileName.match(regExp);
  let date = dateFormat(dateAndTime[0], "yyyyddMM");
  let time = dateAndTime[1].substring(0, 5).replace("-", "");
  return date + "-" + time;
}

function dateFormat(inputDate, format) {
  //parse the input date
  const date = new Date(inputDate);

  //extract the parts of the date
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  //replace the month
  format = format.replace("MM", month.toString().padStart(2, "0"));

  //replace the year
  if (format.indexOf("yyyy") > -1) {
    format = format.replace("yyyy", year.toString());
  } else if (format.indexOf("yy") > -1) {
    format = format.replace("yy", year.toString().substr(2, 2));
  }

  //replace the day
  format = format.replace("dd", day.toString().padStart(2, "0"));

  return format;
}

changeFileNames('C:\\Users\\mlour\\OneDrive\\Documentos\\scriptMudarNome\\teste\\');
