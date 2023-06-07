const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { Storage } = require("@google-cloud/storage");
const Multer = require("multer");
const src = path.join(__dirname, "views");
app.use(express.static(src));

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

let projectId = "kol-test-387814"; 
let keyFilename = "mykey.json";
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket("kol-data");

// Gets all files in the defined bucket
app.get("/upload", async (req, res) => {
  try {
    const [files] = await bucket.getFiles();
    res.send([files]);
    console.log("Success");
  } catch (error) {

    res.send("Error:" + error);
  }
});

// Streams file upload to Google Storage
app.post("/upload", multer.single("file"), (req, res) => {
  console.log("Made it /upload");
  try {
    if (req.file) {
      console.log("File found, trying to upload...");
      const blob = bucket.file(req.file.originalname);
      const blobStream = blob.createWriteStream();

      blobStream.on("finish", () => {
        res.status(200).send("Success");
        console.log("Success");
      });
      blobStream.end(req.file.buffer);
    } else throw "error";
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get the main index html file
app.get("/", (req, res) => {
  res.sendFile(src + "/index.html");
});

// Start the server on port 8080 or as defined
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.use(express.static("public"));
