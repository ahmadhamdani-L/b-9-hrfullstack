
// findAll = select * from regions
const findAll = async (req, res) => {
    const regions = await req.context.models.Regions.findAll();
    return res.send(regions);
}

export default {
    findAll
}