const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const outputFolder = "./output";

if( !fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}

const PORT = 3000;

app.get("/createFile", (req,res) => {
    const currentTime = new Date();
    const year = currentTime.getFullYear().toString();
    const month = (currentTime.getMonth() + 1).toString();
    const date = currentTime.getDate().toString();
    const hour = currentTime.getHours().toString();
    const min = currentTime.getMinutes().toString();
    const sec = currentTime.getSeconds().toString();

    const dateTimeForFileName = `${year}-${month}-${date}-${hour}-${min}-${sec}.txt`;

    const filePath = path.join(outputFolder,dateTimeForFileName);

    fs.writeFile(filePath, currentTime.toISOString(), (err) => {
        if(err) {
            res.status(500).send(`Error creating file: ${err}`);
            return;
        }
        res.send(`File created successfully at :${filePath}`);
    })
});

app.get("/getFiles", (req,res) => {
    fs.readdir(outputFolder, (err, files) => {
        if(err) {
            res.status(500).send(`Error reading file: ${err}`);
            return;
        }
        console.log("List of Files: ",files);
        const textFiles = files.filter( (file) => path.extname(file) === ".txt");

        res.json(textFiles);    
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});