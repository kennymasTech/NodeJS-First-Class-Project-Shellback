const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const path = require('path');
const filePayLoadExist = require('./middleware/filesPayLoadExist');
const fileExtLimitter = require('./middleware/fileExtLimitter');
const fileSizeLimiter = require('./middleware/fileSizeLimiter');
const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.post('/upload', 
    fileUpload({createParentPath: true}),
    filePayLoadExist,
    fileExtLimitter(['.png', '.jpg', '.jpeg']),
    fileSizeLimiter, 
    (req, res) => {
        const files = req.files;
        console.log(files);

        return res.json({status: 'logged', message: 'logged'})
    }
)

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))