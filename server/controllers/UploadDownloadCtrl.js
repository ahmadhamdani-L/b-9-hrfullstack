import formidable from 'formidable';
import fs from 'fs';


//1.declare pathDir untuk menyimpan image di local storage
const pathDir = __dirname + '../../../uploads/';

const upload = async (req, res,next) => {

    // jika directory belum ada then create new one
    if (!fs.existsSync(pathDir)) {
        fs.mkdirSync(pathDir);
    }

    const form = formidable({ multiples: true, uploadDir: pathDir });
    form.parse(req);
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
            req.fileName = file.name;
        })
        .on('end', () => {
            console.log('-> upload to storage done');
            next();
            //res.send("File Uploaded Successfully");
        });
}

const uploadMultipart = async (req,res,next)=>{
    // jika directory belum ada then create new one
    if (!fs.existsSync(pathDir)) {
        fs.mkdirSync(pathDir);
    }

    const files = [];
    const fields = [];
    
    const dataFiles ={
        fields : fields,
        files : files
    }

    const form = formidable({ multiples: true, uploadDir: pathDir });
    form.parse(req);

    form
         .on('fileBegin', (keyName, file) => {
            file.path = pathDir + file.name;
        }) 
        .on('field', (keyName, value) => {
            fields.push({ keyName, value });
        })
        .on('file', (keyName, file) => {
            console.log(file);
            const fileName = file.name;
            const fileSize = file.size;
            const fileType = file.type;
            files.push({ keyName, fileName,fileSize,fileType });
        })
        .on('end', () => {
            console.log('-> upload to storage done');
            req.dataFiles = dataFiles;
            next();
        });
}

const download = async (req, res) => {
    const filename = `${pathDir}/${req.params.filename}`
    res.download(filename);
}

export default {
    upload,
    download,
    uploadMultipart
}

