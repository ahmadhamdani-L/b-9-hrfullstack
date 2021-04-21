import { sequelize } from '../../config/config-db';

// findAll = select * from regions
const findAll = async (req, res) => {
    const regions = await req.context.models.Regions.findAll({
        include: [{
            model: req.context.models.Countries
        }]
    });
    return res.send(regions);
}
// findone = select * from regions where region_id=:id
const findOne = async (req, res) => {
    const regions = await req.context.models.Regions.findOne({
        where: { region_id: req.params.id }
    });
    return res.send(regions);
}

// create new region
const create = async (req, res) => {
    const regions = await req.context.models.Regions.create({
        region_name: req.body.region_name
    });
    return res.send(regions);
}

// update regions set region_name=:2,region_desc=:4 where region_id=:3
const update = async (req, res) => {
    const { region_name } = req.body;
    const regions = await req.context.models.Regions.update(
        { region_name: region_name },// nama attribute yg akan di update
        { returning: true, where: { region_id: req.params.id } }
    );
    return res.send(regions);
}

// delete 
const remove = async (req, res) => {
    await req.context.models.Regions.destroy({
          where: { region_id: req.params.id }
    }).then(result =>{
        console.log(result);
        return res.send("delete "+result+" rows.");
    });
    
}

const rawSQL = async (req, res) => {
    await sequelize.query('SELECT * FROM regions where region_id = :regionId',
        { replacements: { regionId: parseInt(req.params.id) }, type: sequelize.QueryTypes.SELECT } 
    ).then(result => {
        return res.send(result);
    })
}


export default {
    findAll,
    findOne,
    create,
    update,
    remove,
    rawSQL
}