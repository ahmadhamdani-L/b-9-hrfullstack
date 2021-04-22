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

    //1. gunakan spread operator
    const dataEmployee=[];
    let multipart ={};
    let empId = undefined;
    let empName = undefined


    const form = formidable({ multiples: true, uploadDir: pathDir });
    form.parse(req);

    form
         .on('fileBegin', (keyName, file) => {
            file.path = pathDir + file.name;
        }) 
        .on('field', (keyName, value) => {
            fields.push({ keyName, value });
            //2.gunakan spread operator untuk tambah attribute
            empId = (keyName === 'employee_id' ? value : empId)
            empName = (keyName === 'employee_name' ? value : empName)
            multipart = { ...multipart, empId, empName }
        })
        .on('file', (keyName, file) => {
            console.log(file);
            const fileName = file.name;
            const fileSize = file.size;
            const fileType = file.type;
            files.push({ keyName, fileName,fileSize,fileType });
            //3. gunakan spread operator
            multipart = { ...multipart, fileName, fileType, fileSize }
            dataEmployee.push(multipart)
        })
        .on('end', () => {
            console.log('-> upload to storage done');
            //2. kirim dataFiles ke function lain di object req
            req.dataFiles = dataFiles;

            //4.gunakan spread operator
            req.dataEmployee = dataEmployee;

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

