import { DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import TeamsModelSequelize from './TeamsModelSequelize';

class MatchesModelSequelize extends Model<InferAttributes<MatchesModelSequelize>,
InferCreationAttributes<MatchesModelSequelize>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchesModelSequelize.init({
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeamId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'home_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'home_team_goals',
  },
  awayTeamId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'away_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'away_team_goals',
  },
  inProgress: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    field: 'in_progress',
  },
}, {
  timestamps: false,
  sequelize: db,
  modelName: 'matches',
});

TeamsModelSequelize.hasMany(MatchesModelSequelize, { foreignKey: 'awayTeamId', as: 'awayTeam' });
TeamsModelSequelize.hasMany(MatchesModelSequelize, { foreignKey: 'homeTeamId', as: 'homeTeam' });

MatchesModelSequelize.belongsTo(TeamsModelSequelize, { foreignKey: 'awayTeamId', as: 'awayTeam' });
MatchesModelSequelize.belongsTo(TeamsModelSequelize, { foreignKey: 'homeTeamId', as: 'homeTeam' });

export default MatchesModelSequelize;
