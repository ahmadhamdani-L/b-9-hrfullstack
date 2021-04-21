const update = async (req, res) => {
    console.log(req.fileName);
    const result = await req.context.models.Employees.update(
        { profile: req.fileName },
        { returning: true, where: { employee_id: parseInt(req.params.id) } }
    );
    return res.send(result);
}

const create = async (req, res) => {
    const result = req.dataFiles;
    return res.send(result);
}

export default {
    update,
    create
}