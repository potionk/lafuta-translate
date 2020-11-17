var express = require('express');
var router = express.Router();

// server
const pythonPath = "/root/anaconda3/bin/python";
const rakeNLTKPath = __dirname+"/extract_keyword.py"

// MBP
// const pythonPath = "~/.conda/envs/keyword_extract/bin/python";
// const rakeNLTKPath = __dirname + "/extract_keyword.py"


router.get('/get_key_exec', async (req, res, next) => {
    var exec = require('child_process').exec;
    try {
        let key;
        exec("gcloud auth print-access-token", function (err, stdout, stderr) {
            key = stdout;
            if (err !== null) {
                console.log('error: ' + err);
            } else {
                res.send({key});
            }
        });
    } catch (error) {
        console.error(error);
    }
});

router.post('/get_eng_extracted', async (req, res, next) => {
    const input = req.body.input;
    const minLen = req.body.minLen;
    const maxLen = req.body.maxLen;
    const size = req.body.size;
    var exec = require('child_process').exec;
    try {
        exec(pythonPath + " " + rakeNLTKPath + " " + minLen + " " + maxLen + " " + size + " " + input, function (err, stdout, stderr) {
            let result = stdout;
            if (err !== null) {
                console.log('error: ' + err);
            } else {
                res.send({result});
            }
        });
    } catch (error) {
        console.error(error);
        res.send({error: true, errorCode: 5})
    }
})


module.exports = router;