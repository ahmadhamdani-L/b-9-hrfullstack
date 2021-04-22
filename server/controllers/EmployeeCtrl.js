const update = async (req, res) => {
    console.log(req.fileName);
    const result = await req.context.models.Employees.update(
        { profile: req.fileName },
        { returning: true, where: { employee_id: parseInt(req.params.id) } }
    );
    return res.send(result);
}

const create = async (req, res,next) => {
    const {fields,files} = req.dataFiles;
    
    
    let empId = undefined;
    let empName = undefined;

    // jika terdapat > 1 fields
    fields.map(data =>{
        if (data.keyName ==='employee_id'){
            empId = data.value;
        }else if (data.keyName ==='employee_name'){
            empName = data.value;
        }
    })

    for (const data of files) {
        await createImage(req,res,empId,data);
    }

    // using middleware
    next();

    // no middleware
/*     const result = await req.context.models.EmployeesImages.findAll();
    return res.send(result); */

}

 const createImage = async (req, res,id,data) => {
    const{fileName,fileSize,fileType} = data;
    await req.context.models.EmployeesImages.create({
        emim_filename: fileName,
        emim_filesize : parseInt(fileSize),
        emim_filetype : fileType,
        emim_employee_id : id
    }).catch(error=>{
        console.log(error);
    });
    
} 

const findAll = async (req, res) => {
    const result = await req.context.models.EmployeesImages.findAll();
    return res.send(result);
}


export default {
    update,
    create,
    findAll
}