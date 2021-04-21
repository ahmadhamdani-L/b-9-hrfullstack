import formidable from 'formidable';
import fs from 'fs';

//1.declare pathDir untuk menyimpan image di local storage
const pathDir = __dirname + '../../../uploads/';

const upload = async (req, res) => {

    // jika directory belum ada then create new one
    if (!fs.existsSync(pathDir)) {
        fs.mkdirSync(pathDir);
    }

    const form = formidable({ multiples: true, uploadDir: pathDir });

    form
        .on('fileBegin', (keyName, file) => {
            console.log(keyName, file);
            file.path = pathDir + file.name;
        })
        .on('field', (keyName, value) => {
            console.log(keyName, value);
        })
        .on('file', (keyName, file) => {
            console.log(keyName, file.name);
        })
        .on('end', () => {
            console.log('-> upload to storage done');
            res.send("File Uploaded Successfully");
        });

    form.parse(req);
}

const download = async (req, res) => {
    const filename = `${pathDir}/${req.params.filename}`
    res.download(filename);
}

export default {
    upload,
    download
}

