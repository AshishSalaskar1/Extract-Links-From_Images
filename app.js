let Tesseract = require("tesseract.js")
let fs = require("fs")

var Express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var app = Express();


var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads');
    },
    filename: function (req, file, callback) {
      callback(null, "test.png");
    }
  });

  var upload = multer({ storage : storage}).single('userPhoto');





var fileName = "./uploads/test.png"
let outString = ''

let getTxtFromImage = async (imageName) => {
    let result = await Tesseract.recognize(fileName);
    outString = result.text;
}





app.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo',function(req,res){
  upload(req,res,function(err) {
      if(err) {
          return res.end("Error uploading file.");
      }

      getTxtFromImage().then(() => {
        console.log(outString);
    
        
        console.log(typeof(outString));

        // res.end("File is uploaded");
        res.json({ Success: 'YES',Extracted_Text: outString });
        

        process.exit(0);
    });

      
  });
});

app.listen(3000,function(){
  console.log("Working on port 3000");
});



