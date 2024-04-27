import { IMatches } from '../Interfaces/IMatches';
import { Statistics } from '../types/Statistics';

class LeaderBoard {
  teamId: number;
  matches: IMatches[];
  location: string;

  constructor(teamId: number, matches: IMatches[], location: string) {
    this.teamId = teamId;
    this.matches = matches;
    this.location = location;
  }

  games(): number {
    return this.matches.filter((match) => {
      if (this.location === 'home') return this.teamId === match.homeTeamId;
      if (this.location === 'away') return this.teamId === match.awayTeamId;
      return this.teamId === match.homeTeamId || this.teamId === match.awayTeamId;
    }).length;
  }

  victories(): number {
    return this.matches.filter((match) => {
      if (this.location === 'home') {
        return match.homeTeamId === this.teamId && match.homeTeamGoals > match.awayTeamGoals;
      }
      if (this.location === 'away') {
        return match.awayTeamId === this.teamId && match.awayTeamGoals > match.homeTeamGoals;
      }
      return (match.homeTeamId === this.teamId && match.homeTeamGoals > match.awayTeamGoals)
        || (match.awayTeamId === this.teamId && match.awayTeamGoals > match.homeTeamGoals);
    }).length;
  }

  losses(): number {
    return this.matches.filter((match) => {
      if (this.location === 'home') {
        return match.homeTeamId === this.teamId && match.homeTeamGoals < match.awayTeamGoals;
      }
      if (this.location === 'away') {
        return match.awayTeamId === this.teamId && match.awayTeamGoals < match.homeTeamGoals;
      }
      return (match.homeTeamId === this.teamId && match.homeTeamGoals < match.awayTeamGoals)
        || (match.awayTeamId === this.teamId && match.awayTeamGoals < match.homeTeamGoals);
    }).length;
  }

  draws(): number {
    return this.matches.filter((match) => {
      if (this.location === 'home') {
        return match.homeTeamId === this.teamId && match.awayTeamGoals === match.homeTeamGoals;
      }
      if (this.location === 'away') {
        return match.awayTeamId === this.teamId && match.awayTeamGoals === match.homeTeamGoals;
      }
      return (match.homeTeamId === this.teamId && match.homeTeamGoals === match.awayTeamGoals)
        || (match.awayTeamId === this.teamId && match.awayTeamGoals === match.homeTeamGoals);
    }).length;
  }

  points(): number {
    return this.draws() * 1 + this.victories() * 3;
  }

  goalsFavor(): number {
    return this.matches.reduce((acc, curr) => {
      const isHome = curr.homeTeamId === this.teamId;
      const isAway = curr.awayTeamId === this.teamId;
      const isTotal = this.location === 'total';

      const shouldIncludeGoal = (this.location === 'home' && isHome)
        || (this.location === 'away' && isAway)
        || (isTotal && (isHome || isAway));

      return shouldIncludeGoal ? acc + (isHome ? curr.homeTeamGoals
        : curr.awayTeamGoals) : acc;
    }, 0);
  }

  goalsOwn(): number {
    return this.matches.reduce((acc, curr) => {
      const isHome = curr.homeTeamId === this.teamId;
      const isAway = curr.awayTeamId === this.teamId;
      const isTotal = this.location === 'total';

      const shouldIncludeGoal = (this.location === 'home' && isHome)
          || (this.location === 'away' && isAway)
          || (isTotal && (isHome || isAway));

      return shouldIncludeGoal ? acc + (isHome ? curr.awayTeamGoals
        : curr.homeTeamGoals) : acc;
    }, 0);
  }

  goalsBalance(): number {
    return this.goalsFavor() - this.goalsOwn();
  }

  efficiency(): string {
    let totalPoints = this.points();
    let totalGames = this.games();

    if (this.location === 'total') {
      totalPoints = this.points();
      totalGames = this.games();
    }
    return ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  }

  static sortTeams(team: Statistics[]): Statistics[] {
    return team.sort((a, b) => b.totalPoints - a.totalPoints
    || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor);
  }
}

export default LeaderBoard;
