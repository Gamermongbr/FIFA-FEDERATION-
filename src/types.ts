/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Team {
  code: string;
  name: string;
  flag: string; // Emoji flag or code
  iso2: string; // ISO 3166-1 alpha-2 code
  group: string; // A - L
}

export interface Match {
  id: number;
  date: string; // ISO string in UTC
  team1: string;
  team2: string;
  round: 'Group' | 'Round of 32' | 'Round of 16' | 'Quarter-finals' | 'Semi-finals' | 'Third place' | 'Final';
  group?: string;
  venue: string;
  city: string;
  country?: 'Mexico' | 'Canada' | 'USA';
  isLive?: boolean;
  team1Score?: number | null;
  team2Score?: number | null;
}

export interface GroupStanding {
  teamCode: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface GroupData {
  name: string; // A - L
  teams: Team[];
}

export interface Stadium {
  name: string;
  city: string;
  country: 'Mexico' | 'Canada' | 'USA';
  capacity: string;
  imageGridClass: string; // CSS helper or local styling
  description: string;
}
