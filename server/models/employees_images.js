
const employeesImages= (sequelize, DataTypes)=> {
  const EmployeesImages = sequelize.define('employees_images', {
    emim_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    emim_filename: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    emim_filesize: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    emim_filetype: {
      type: DataTypes.STRING(35),
      allowNull: true
    },
    emim_employee_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'employees',
        key: 'employee_id'
      }
    }
  }, {
    sequelize,
    tableName: 'employees_images',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "employees_images_pkey",
        unique: true,
        fields: [
          { name: "emim_id" },
        ]
      },
    ]
  });
  return EmployeesImages;
};

export default employeesImages;
