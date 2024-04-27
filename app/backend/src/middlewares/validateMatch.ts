import { Request } from 'express';

const message = 'It is not possible to create a match with two equal teams';

const validateMatch = (req: Request) => {
  const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;

  if (!homeTeamId || !awayTeamId || !homeTeamGoals || !awayTeamGoals) {
    return { status: 'NOT_FOUND', data: { message: 'Put the damn data man! sry but im mad' } };
  }

  if (homeTeamId === awayTeamId) {
    return { status: 'UNPROCESSABLE_ENTITY',
      data: { message } };
  }

  if (homeTeamId > 16 || awayTeamId > 16) {
    return { status: 'NOT_FOUND',
      data: { message: 'There is no team with such id!' } };
  }
};

export default validateMatch;
