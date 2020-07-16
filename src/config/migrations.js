const {DataTypes} = require('sequelize');

class InjectMigration {
  nameMainTable = '';
  BaseStatus = {};

  getTableDB = () => {
    return this.nameMainTable;
  };

  tableDB = (nameTable) => {
    this.nameMainTable = nameTable;
    return nameTable;
  };

  schemaDB = (schema, foreignKeys = undefined) => {
    // Generate Auto ID
    // Object.keys(schema).find((element) => { if (element.match(/.*id.*/)) { return true;} });
    // const data = Object.keys(schema).find((element) =>
    //   element.toLowerCase().match(/.*id.*/)
    // );
    const searchId = this.searchKey(schema, 'id');
    if (typeof searchId === 'undefined') {
      const idData = {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        }
      };
      Object.assign(idData, schema);
      // eslint-disable-next-line no-param-reassign
      schema = idData;
    }

    // Set Foreign Keys
    if (typeof foreignKeys !== 'undefined') {
      const foreignData = {};
      Object.keys(foreignKeys).forEach((key) => {
        const objectTemp = foreignKeys[key];
        const complements = {
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        };
        let hasType = this.searchKey(objectTemp, 'type');
        Object.keys(objectTemp).forEach((value) => {
          if (!hasType) {
            complements.type = DataTypes.INTEGER;
            hasType = true;
          }
          complements[value] = objectTemp[value];
        });
        // Add Data
        foreignData[key] = complements;
      });

      // Set Data
      Object.assign(schema, foreignData);
    }

    Object.assign(schema, this.BaseStatus);
    return schema;
  };

  searchKey = (objectData, param) => {
    return Object.keys(objectData).find((element) =>
      element.toLowerCase().match(new RegExp(`.*${param}.*`))
    );
  };

  constructor() {
    this.BaseStatus = {
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date()
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE
      }
    };
  }
}

// new InjectMigration().schemaDB({})
module.exports = new InjectMigration();
