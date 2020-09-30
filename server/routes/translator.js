var express = require('express');
var router = express.Router();

router.get('/get_key', async (req, res, next) => {
    try {
        const fs = require('fs');
        const article = fs.readFileSync(__dirname+"/google_key.txt");
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



module.exports = router;