
const MB = 2  //2mb
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

const fileSizeLimiter = (req, res, next) => {
    const files = req.files;
  
    const filesOverLimit = [];

    Object.keys(files).forEach(key => {
        if (files[key].size > FILE_SIZE_LIMIT) {
            filesOverLimit.push(files[key].name)
        }
    })


    // if the file over limit is more than one?
    if(filesOverLimit.lenght) {

        const properVerb = filesOverLimit.length > 1 ? "are" : "is";

        const sentence = `Upload failed. ${filesOverLimit.toString()} ${properVerb} over 
        the file size limit of ${MB}`.replaceAll(",", ",");

        const message = filesOverLimit.lenght < 3 ?
        sentence.replace(',','and'):
        sentence.replace(/,(?=[^,]*$)/, "and");

        return res.status(413).json({ status: "error", message})
    }
    next()
};
 
module.exports = fileSizeLimiter;