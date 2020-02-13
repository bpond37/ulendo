import { Model } from 'sequelize';

export default class Memo extends Model {
  public id!: number;
  public title!: string;
  public contents!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

