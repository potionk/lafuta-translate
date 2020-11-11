var express = require('express');
var router = express.Router();

const pythonPath = "~/.conda/envs/keyword_extract/bin/python";
const rakeNLTKPath = __dirname+"/extract_keyword.py"



router.get('/get_key', async (req, res, next) => {
  try {
    const fs = require('fs');
    const article = fs.readFileSync(__dirname + "/google_key.txt");
    key = article.toString();
    res.send({ key });
  } catch (error) {
    console.log(error);
    res.send({
      error: true,
      errorCode: 1
    });
  }
});

router.get('/get_key_exec', async (req, res, next) => {
  var exec = require('child_process').exec;
  try {
    let key;
    exec("gcloud auth print-access-token", function (err, stdout, stderr) {
      key = stdout;
      if (err !== null) {
        console.log('error: ' + err);
      } else {
        res.send({ key });
      }
    });
  } catch (error) {
    console.error(error);
  }
});

router.post('/get_eng_extracted', async (req, res, next) => {
  const input = req.body.input;
  var exec = require('child_process').exec;
  try {
    let key;
    exec(pythonPath + " " + rakeNLTKPath + " " + input, function (err, stdout, stderr) {
      result = stdout;
      if (err !== null) {
        console.log('error: ' + err);
      } else {
        res.send({ result });
      }
    });
  } catch (error) {
    console.error(error);
    res.send({ error: true, errorCode: 5 })
  }
})


module.exports = router;