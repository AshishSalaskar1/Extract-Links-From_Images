let Tesseract = require("tesseract.js")

var fileName = "test2.png"
let outString = ''

let getTxtFromImage = async (imageName) => {
    let result = await Tesseract.recognize(fileName);

    //console.log(result.text);

    outString = result.text;
}

getTxtFromImage().then(() => {
    console.log(outString);
    console.log(typeof(outString));
    process.exit(0);
});


// Tesseract.recognize(fileName)
//     .progress((p) => console.log("Progress: ",p))
//     .catch((err) => console.log(err))
//     .then((result) => console.log(result.text))