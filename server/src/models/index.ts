import { Sequelize, DataTypes } from 'sequelize'
import config from '../config';
import Memo from './Memo';
import User from './User'
import * as bcrypt from 'bcrypt'

export function init(): Sequelize {
  const connectionUrl: string = config.db.url;
  const sequelize = new Sequelize(connectionUrl);

  User.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(50),
      unique: true,
      autoIncrement: false,
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(150),
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'users',
    engine: 'InnoDB',
    charset: 'utf8',
    indexes: [
      {
        fields: ["email"]
      }
    ],
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
  });

  Memo.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    title: {
      type: new DataTypes.STRING(100),
      allowNull: false,
    },
    contents: {
      type: new DataTypes.STRING(5000),
      allowNull: true,
    }
    }, {
      sequelize,
      tableName: 'memo',
      engine: 'InnoDB',
      charset: 'utf8',
      indexes: [
        {
          fields: ["id"]
        }
      ]
    })

    User.hasMany(Memo, {
      sourceKey: 'id',
      foreignKey: 'userId',
      as: 'memos',
    });
  
  return sequelize;
}
