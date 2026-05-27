/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Match, GroupStanding } from '../types';

export function calculateGroupStandings(groupLetter: string, matches: Match[]): GroupStanding[] {
  // Find all matches for group and filter group matches
  const groupMatches = matches.filter(
    m => m.round === 'Group' && m.group === groupLetter
  );

  // Initialize standings object
  const standingsMap: Record<string, GroupStanding> = {};

  groupMatches.forEach(m => {
    // Only compile for real countries (e.g. 3-character codes)
    if (m.team1.length === 3 && !standingsMap[m.team1]) {
      standingsMap[m.team1] = createEmptyStanding(m.team1);
    }
    if (m.team2.length === 3 && !standingsMap[m.team2]) {
      standingsMap[m.team2] = createEmptyStanding(m.team2);
    }

    const t1Score = m.team1Score;
    const t2Score = m.team2Score;

    // Skip if match has not been played or predicted (defined/not null)
    if (t1Score !== undefined && t1Score !== null && t2Score !== undefined && t2Score !== null) {
      const s1 = standingsMap[m.team1];
      const s2 = standingsMap[m.team2];

      if (s1 && s2) {
        s1.played += 1;
        s2.played += 1;
        s1.goalsFor += t1Score;
        s1.goalsAgainst += t2Score;
        s2.goalsFor += t2Score;
        s2.goalsAgainst += t1Score;

        if (t1Score > t2Score) {
          s1.won += 1;
          s1.points += 3;
          s2.lost += 1;
        } else if (t2Score > t1Score) {
          s2.won += 1;
          s2.points += 3;
          s1.lost += 1;
        } else {
          s1.drawn += 1;
          s1.points += 1;
          s2.drawn += 1;
          s2.points += 1;
        }

        s1.goalDifference = s1.goalsFor - s1.goalsAgainst;
        s2.goalDifference = s2.goalsFor - s2.goalsAgainst;
      }
    }
  });

  // Convert map to array and sort by standard FIFA group tiebreakers
  const standings = Object.values(standingsMap);
  standings.sort((a, b) => {
    // 1. Points
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    // 2. Goal Difference
    if (b.goalDifference !== a.goalDifference) {
      return b.goalDifference - a.goalDifference;
    }
    // 3. Goals For
    if (b.goalsFor !== a.goalsFor) {
      return b.goalsFor - a.goalsFor;
    }
    // 4. Default alphabetic code sorted
    return a.teamCode.localeCompare(b.teamCode);
  });

  return standings;
}

function createEmptyStanding(teamCode: string): GroupStanding {
  return {
    teamCode,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
  };
}
