











const path = require('path');

const fileExtLimitter = (allowedExtArray) => {
    return (req,res,next) => {
        const files = req.files;

    const fileExtensions = [];
  
    Object.keys(files).forEach(key => {
        fileExtensions.push(path.extname(files[key].name))
    });

    // Are the file ext allowed 
    const allowed = fileExtensions.every(extension => allowedExtArray.includes(extension))

    if(!allowed) {
        const message = `Upload failed. Only ${allowedExtArray.toString()} files allowed`.replaceAll(",",",");

        // Unprocessable content
        return res.status(413).json({ status: "error", message})
    }

    next();

    };
};


module.exports = fileExtLimitter;