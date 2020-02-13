import { Model, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, Association } from 'sequelize';
import Memo from './Memo';
import config from '../config'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

export default class User extends Model {
  public id!: number;
  public email!: string;
  public password! : string;

  validPassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }

  generateToken(){
    const token = 
    jwt.sign({id: this.id, email: this.email}, config.auth.key, {expiresIn: '7d'})
    return token
  }

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getMemos!: HasManyGetAssociationsMixin<Memo>;
  public addMemo!: HasManyAddAssociationMixin<Memo, number>;

  public static associations: {
    products: Association<User, Memo>;
  };
}