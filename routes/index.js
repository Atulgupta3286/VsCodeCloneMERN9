var express = require('express');
var router = express.Router();
const fs = require("fs");
const path = require("path");
const globalpath = path.join(__dirname, "../", "public", "uploads");

function readdir() {
  return fs.readdirSync(globalpath);
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    files: readdir(),
    filedata: ""
  });
});

router.get('/file/:filename', function (req, res, next) {
  const filedata = fs.readFileSync(
    path.join(globalpath, req.params.filename),
    "utf-8"
  );
  console.log('f', filedata)
  res.render('index', {
    files: readdir(),
    filedata: filedata
  });
});

router.post('/createfile', function (req, res, next) {
  const filename = req.body.filename;
  // const {filename}  = req.body;

  fs.writeFileSync(path.join(globalpath, filename), "");
  res.redirect(`/file/${filename}`);
});

router.get('/delete/:filename', function (req, res, next) {
  fs.unlinkSync(
    path.join(globalpath, req.params.filename));
  res.redirect("/")
});

module.exports = router;

