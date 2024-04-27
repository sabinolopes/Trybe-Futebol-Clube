import { NewEntity } from '../types/NewEntity';
import TeamsModelSequelize from '../database/models/TeamsModelSequelize';
import MatchesModelSequelize from '../database/models/MatchesModelSequelize';
import { IMatches } from '../Interfaces/IMatches';
import { IMatchesModel } from '../Interfaces/IMatchesModel';

class MatchesModel implements IMatchesModel {
  private model = MatchesModelSequelize;

  async getAll(): Promise<IMatches[]> {
    const dbMatches = await this.model.findAll(({
      include: [
        { model: TeamsModelSequelize, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamsModelSequelize, as: 'awayTeam', attributes: ['teamName'] },
      ],
    }));

    return dbMatches;
  }

  async getInProgress(progress: true | false): Promise<IMatches[]> {
    const matches = await this.model.findAll({
      where: { inProgress: progress },
      include: [
        { model: TeamsModelSequelize, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamsModelSequelize, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return matches;
  }

  async updateMatch(id: number): Promise<IMatches | false> {
    const match = await this.model.findByPk(id);

    if (!match) {
      return false;
    }

    match.inProgress = false;

    await match.save();

    return match;
  }

  async updateInProgress(id: number, htGoals: number, atGoals: number): Promise<IMatches | false> {
    const match = await this.model.findByPk(id);

    if (!match || match.inProgress !== true) {
      return false;
    }

    match.homeTeamGoals = htGoals;
    match.awayTeamGoals = atGoals;

    await match.save();

    return match;
  }

  async insertMatch(data: NewEntity<IMatches>): Promise<IMatches> {
    const newMatch = await this.model.create(data);

    return newMatch;
  }
}

export default MatchesModel;
