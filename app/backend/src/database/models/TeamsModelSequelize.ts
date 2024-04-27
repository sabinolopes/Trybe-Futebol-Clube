import { DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class TeamsModelSequelize extends Model<InferAttributes<TeamsModelSequelize>,
InferCreationAttributes<TeamsModelSequelize>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

TeamsModelSequelize.init({
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'team_name',
  },
}, {
  sequelize: db,
  timestamps: false,
  modelName: 'teams',
});

export default TeamsModelSequelize;
