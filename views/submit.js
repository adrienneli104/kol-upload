// Creates unique file name ID
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

document.getElementById("submitBtn").addEventListener("click", () => {
  let postid = uuidv4();
  let inputElem = document.getElementById("file");
  let file = inputElem.files[0];
  let fileName = file.name;
  let ext = fileName.split('.')[1];
  console.log("HIHIH");
  // Create new file so we can rename the file
  let blob = file.slice(0, file.size, ext);
  newFile = new File([blob], `${postid}_post.${ext}`, { type: ext });
  let formData = new FormData();
  formData.append("file", newFile);
  fetch("/upload", {
    method: "POST",
    body: formData,
    // folder: folderName
  })
    .then((res) => res.text())
});
