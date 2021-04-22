const update = async (req, res) => {
    console.log(req.fileName);
    const result = await req.context.models.Employees.update(
        { profile: req.fileName },
        { returning: true, where: { employee_id: parseInt(req.params.id) } }
    );
    return res.send(result);
}

const create = async (req, res,next) => {
    // jika gunakan spread operator
    const dataEmployee = req.dataEmployee;


    for (const data of dataEmployee) {
        await createImage(req,res,data);
    }

    // using middleware
    next();


}

 const createImage = async (req, res,data) => {
    const{empId,empName,fileName,fileSize,fileType} = data;
    await req.context.models.EmployeesImages.create({
        emim_filename: fileName,
        emim_filesize : parseInt(fileSize),
        emim_filetype : fileType,
        emim_employee_id : empId
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