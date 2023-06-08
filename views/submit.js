// Creates unique file name ID
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

document.getElementById("submitBtn").addEventListener("click", function(event){
  event.preventDefault();
  let postid = uuidv4();
  let inputElem = document.getElementById("file");
  let file = inputElem.files[0];
  let fileName = file.name;
  let ext = fileName.split('.')[1];
  let folderName = document.getElementById("folder").value;
  console.log("BEFORE IF");
  console.log(ext);
  if(ext == "xlsx"){
    console.log("HIHI");
    var XLSX = require('xlsx');
    var workbook = XLSX.readFile(fileName);
    var sheet_name_list = workbook.SheetNames;
    for (let i = 0; i < sheet_name_list.length; i++) {
      
      console.log(sheet_name_list[i]);
    }
    // const xlsxFile = require('read-excel-file/node');
    //   xlsxFile('./Data.xlsx').then((rows) => {
    //     console.log(rows);
    //     console.table(rows);
    //   })
  }
  else{
    console.log("ESLE");
  }












  // Create new file so we can rename the file
  let blob = file.slice(0, file.size, ext);
  newFile = new File([blob], `${postid}_post.${ext}`, { type: ext });
  let formData = new FormData();
  formData.append("file", newFile);
  formData.append("folder", folderName);
  fetch("/upload", {
    method: "POST",
    body: formData
  })
    .then((res) => res.text())
});
