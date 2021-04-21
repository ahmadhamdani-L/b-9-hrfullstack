import Sequelize from 'sequelize';
import { sequelize } from '../../config/config-db';
import regions from './regions';
import countries from './countries';
import employees from './employees'


const models = {
    Regions: regions(sequelize, Sequelize),
    Countries: countries(sequelize, Sequelize),
    Employees: employees(sequelize, Sequelize),
}

//4. create relation OneToMany | ManyToMany
Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

// 5. export sequalize agar bisa di-call di module lain
export default models;