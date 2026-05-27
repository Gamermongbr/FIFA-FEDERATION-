/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Team, Match, Stadium } from '../types';

export const TEAMS: Record<string, Team> = {
  // Group A
  MEX: { code: 'MEX', name: 'Mexico', flag: '🇲🇽', iso2: 'mx', group: 'A' },
  ZAF: { code: 'ZAF', name: 'South Africa', flag: '🇿🇦', iso2: 'za', group: 'A' },
  KOR: { code: 'KOR', name: 'South Korea', flag: '🇰🇷', iso2: 'kr', group: 'A' },
  CZE: { code: 'CZE', name: 'Czechia', flag: '🇨🇿', iso2: 'cz', group: 'A' },

  // Group B
  CAN: { code: 'CAN', name: 'Canada', flag: '🇨🇦', iso2: 'ca', group: 'B' },
  BIH: { code: 'BIH', name: 'Bosnia and Herzegovina', flag: '🇧🇦', iso2: 'ba', group: 'B' },
  QAT: { code: 'QAT', name: 'Qatar', flag: '🇶🇦', iso2: 'qa', group: 'B' },
  CHE: { code: 'CHE', name: 'Switzerland', flag: '🇨🇭', iso2: 'ch', group: 'B' },

  // Group C
  BRA: { code: 'BRA', name: 'Brazil', flag: '🇧🇷', iso2: 'br', group: 'C' },
  MAR: { code: 'MAR', name: 'Morocco', flag: '🇲🇦', iso2: 'ma', group: 'C' },
  HTI: { code: 'HTI', name: 'Haiti', flag: '🇭🇹', iso2: 'ht', group: 'C' },
  SCO: { code: 'SCO', name: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', iso2: 'gb-sct', group: 'C' },

  // Group D
  USA: { code: 'USA', name: 'USA', flag: '🇺🇸', iso2: 'us', group: 'D' },
  PRY: { code: 'PRY', name: 'Paraguay', flag: '🇵🇾', iso2: 'py', group: 'D' },
  AUS: { code: 'AUS', name: 'Australia', flag: '🇦🇺', iso2: 'au', group: 'D' },
  TUR: { code: 'TUR', name: 'Türkiye', flag: '🇹🇷', iso2: 'tr', group: 'D' },

  // Group E
  GER: { code: 'GER', name: 'Germany', flag: '🇩🇪', iso2: 'de', group: 'E' },
  CUW: { code: 'CUW', name: 'Curaçao', flag: '🇨🇼', iso2: 'cw', group: 'E' },
  CIV: { code: 'CIV', name: 'Ivory Coast', flag: '🇨🇮', iso2: 'ci', group: 'E' },
  ECU: { code: 'ECU', name: 'Ecuador', flag: '🇪🇨', iso2: 'ec', group: 'E' },

  // Group F
  NED: { code: 'NED', name: 'Netherlands', flag: '🇳🇱', iso2: 'nl', group: 'F' },
  JPN: { code: 'JPN', name: 'Japan', flag: '🇯🇵', iso2: 'jp', group: 'F' },
  SWE: { code: 'SWE', name: 'Sweden', flag: '🇸🇪', iso2: 'se', group: 'F' },
  TUN: { code: 'TUN', name: 'Tunisia', flag: '🇹🇳', iso2: 'tn', group: 'F' },

  // Group G
  BEL: { code: 'BEL', name: 'Belgium', flag: '🇧🇪', iso2: 'be', group: 'G' },
  EGY: { code: 'EGY', name: 'Egypt', flag: '🇪🇬', iso2: 'eg', group: 'G' },
  IRN: { code: 'IRN', name: 'Iran', flag: '🇮🇷', iso2: 'ir', group: 'G' },
  NZL: { code: 'NZL', name: 'New Zealand', flag: '🇳🇿', iso2: 'nz', group: 'G' },

  // Group H
  ESP: { code: 'ESP', name: 'Spain', flag: '🇪🇸', iso2: 'es', group: 'H' },
  CPV: { code: 'CPV', name: 'Cape Verde', flag: '🇨🇻', iso2: 'cv', group: 'H' },
  KSA: { code: 'KSA', name: 'Saudi Arabia', flag: '🇸🇦', iso2: 'sa', group: 'H' },
  URU: { code: 'URU', name: 'Uruguay', flag: '🇺🇾', iso2: 'uy', group: 'H' },

  // Group I
  FRA: { code: 'FRA', name: 'France', flag: '🇫🇷', iso2: 'fr', group: 'I' },
  SEN: { code: 'SEN', name: 'Senegal', flag: '🇸🇳', iso2: 'sn', group: 'I' },
  IRQ: { code: 'IRQ', name: 'Iraq', flag: '🇮🇶', iso2: 'iq', group: 'I' },
  NOR: { code: 'NOR', name: 'Norway', flag: '🇳🇴', iso2: 'no', group: 'I' },

  // Group J
  ARG: { code: 'ARG', name: 'Argentina', flag: '🇦🇷', iso2: 'ar', group: 'J' },
  ALG: { code: 'ALG', name: 'Algeria', flag: '🇩🇿', iso2: 'dz', group: 'J' },
  AUT: { code: 'AUT', name: 'Austria', flag: '🇦🇹', iso2: 'at', group: 'J' },
  JOR: { code: 'JOR', name: 'Jordan', flag: '🇯🇴', iso2: 'jo', group: 'J' },

  // Group K
  POR: { code: 'POR', name: 'Portugal', flag: '🇵🇹', iso2: 'pt', group: 'K' },
  COD: { code: 'COD', name: 'DR Congo', flag: '🇨🇩', iso2: 'cd', group: 'K' },
  UZB: { code: 'UZB', name: 'Uzbekistan', flag: '🇺🇿', iso2: 'uz', group: 'K' },
  COL: { code: 'COL', name: 'Colombia', flag: '🇨🇴', iso2: 'co', group: 'K' },

  // Group L
  ENG: { code: 'ENG', name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', iso2: 'gb-eng', group: 'L' },
  CRO: { code: 'CRO', name: 'Croatia', flag: '🇭🇷', iso2: 'hr', group: 'L' },
  GHA: { code: 'GHA', name: 'Ghana', flag: '🇬🇭', iso2: 'gh', group: 'L' },
  PAN: { code: 'PAN', name: 'Panama', flag: '🇵🇦', iso2: 'pa', group: 'L' },
};

export const STADIUMS: Stadium[] = [
  { name: 'Estadio Azteca', city: 'Mexico City', country: 'Mexico', capacity: '87,523', imageGridClass: 'bg-emerald-950', description: 'Historic center of world football hosting its third tournament opening matches.' },
  { name: 'MetLife Stadium', city: 'New York/New Jersey', country: 'USA', capacity: '82,500', imageGridClass: 'bg-sky-950', description: 'Selected venue to host the prestigious FIFA World Cup 2026 Grand Final.' },
  { name: 'AT&T Stadium', city: 'Dallas', country: 'USA', capacity: '92,967', imageGridClass: 'bg-indigo-950', description: 'Spectacular state-of-the-art retractable roof arena, hosting the semi-finals.' },
  { name: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'USA', capacity: '71,000', imageGridClass: 'bg-red-950', description: 'Visual wonder with a retractable pinwheel roof, staging one semi-final.' },
  { name: 'SoFi Stadium', city: 'Los Angeles', country: 'USA', capacity: '70,240', imageGridClass: 'bg-zinc-950', description: 'The most expensive sporting complex in the world hosting USMNT opening matches.' },
  { name: 'Toronto Stadium (BMO Field)', city: 'Toronto', country: 'Canada', capacity: '45,736', imageGridClass: 'bg-red-900', description: 'Staged on the lakeshore of Ontario, hosting Canadian national matches.' },
  { name: 'BC Place', city: 'Vancouver', country: 'Canada', capacity: '54,500', imageGridClass: 'bg-teal-950', description: 'Renowned major covered stadium on Canada\'s beautiful West Coast.' },
  { name: 'Hard Rock Stadium', city: 'Miami', country: 'USA', capacity: '65,326', imageGridClass: 'bg-orange-950', description: 'Vibrant tropical stadium selected for the third-place bronze match.' },
  { name: 'Estadio Akron', city: 'Guadalajara', country: 'Mexico', capacity: '48,071', imageGridClass: 'bg-red-950', description: 'Striking volcano-shaped structure hosting passionate matches in Jalisco.' },
  { name: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico', capacity: '53,500', imageGridClass: 'bg-blue-950', description: 'Dubbed "El Gigante de Acero", built at the foothill of the majestic Cerro de la Silla.' },
  { name: 'Gillette Stadium', city: 'Boston', country: 'USA', capacity: '65,878', imageGridClass: 'bg-teal-900', description: 'Historic sporting ground situated in Foxborough, south of Boston.' },
  { name: 'NRG Stadium', city: 'Houston', country: 'USA', capacity: '72,220', imageGridClass: 'bg-blue-900', description: 'Gigantic indoor retractable dome with high-energy crowd capabilities.' },
  { name: 'Lumen Field', city: 'Seattle', country: 'USA', capacity: '69,000', imageGridClass: 'bg-emerald-900', description: 'Infamous loud stadium known for its electric acoustics and passionate fans.' },
  { name: 'Levi\'s Stadium', city: 'San Francisco', country: 'USA', capacity: '68,500', imageGridClass: 'bg-amber-950', description: 'Solar-powered smart facility situated in Santa Clara in Silicon Valley.' },
  { name: 'Lincoln Financial Field', city: 'Philadelphia', country: 'USA', capacity: '69,796', imageGridClass: 'bg-teal-950', description: 'Eco-friendly modern colosseum powered completely by wind and solar arrays.' },
  { name: 'Arrowhead Stadium', city: 'Kansas City', country: 'USA', capacity: '76,416', imageGridClass: 'bg-red-950', description: 'Guinness-record loudest stadium in the world, bringing intense boxing sound.' },
];

const GROUP_STAGE_DEFS = [
  // Thursday, June 11 (Matchday 1)
  { id: 1, dateUTC: '2026-06-11T19:00:00Z', team1: 'MEX', team2: 'ZAF', group: 'A', stadiumIdx: 0 },
  { id: 2, dateUTC: '2026-06-12T02:00:00Z', team1: 'KOR', team2: 'CZE', group: 'A', stadiumIdx: 8 },

  // Friday, June 12
  { id: 3, dateUTC: '2026-06-12T19:00:00Z', team1: 'CAN', team2: 'BIH', group: 'B', stadiumIdx: 5 },
  { id: 4, dateUTC: '2026-06-13T01:00:00Z', team1: 'USA', team2: 'PRY', group: 'D', stadiumIdx: 4 },

  // Saturday, June 13
  { id: 5, dateUTC: '2026-06-13T19:00:00Z', team1: 'QAT', team2: 'CHE', group: 'B', stadiumIdx: 6 },
  { id: 6, dateUTC: '2026-06-13T22:00:00Z', team1: 'BRA', team2: 'MAR', group: 'C', stadiumIdx: 7 },
  { id: 7, dateUTC: '2026-06-14T01:00:00Z', team1: 'HTI', team2: 'SCO', group: 'C', stadiumIdx: 10 },
  { id: 8, dateUTC: '2026-06-14T04:00:00Z', team1: 'AUS', team2: 'TUR', group: 'D', stadiumIdx: 15 },

  // Sunday, June 14
  { id: 9, dateUTC: '2026-06-14T17:00:00Z', team1: 'GER', team2: 'CUW', group: 'E', stadiumIdx: 3 },
  { id: 10, dateUTC: '2026-06-14T20:00:00Z', team1: 'NED', team2: 'JPN', group: 'F', stadiumIdx: 1 },
  { id: 11, dateUTC: '2026-06-14T23:00:00Z', team1: 'CIV', team2: 'ECU', group: 'E', stadiumIdx: 11 },
  { id: 12, dateUTC: '2026-06-15T02:00:00Z', team1: 'SWE', team2: 'TUN', group: 'F', stadiumIdx: 12 },

  // Monday, June 15
  { id: 13, dateUTC: '2026-06-15T16:00:00Z', team1: 'ESP', team2: 'CPV', group: 'H', stadiumIdx: 13 },
  { id: 14, dateUTC: '2026-06-15T19:00:00Z', team1: 'BEL', team2: 'EGY', group: 'G', stadiumIdx: 2 },
  { id: 15, dateUTC: '2026-06-15T22:00:00Z', team1: 'KSA', team2: 'URU', group: 'H', stadiumIdx: 9 },
  { id: 16, dateUTC: '2026-06-16T01:00:00Z', team1: 'IRN', team2: 'NZL', group: 'G', stadiumIdx: 14 },

  // Tuesday, June 16
  { id: 17, dateUTC: '2026-06-16T19:00:00Z', team1: 'FRA', team2: 'SEN', group: 'I', stadiumIdx: 10 },
  { id: 18, dateUTC: '2026-06-16T22:00:00Z', team1: 'IRQ', team2: 'NOR', group: 'I', stadiumIdx: 15 },
  { id: 19, dateUTC: '2026-06-17T01:00:00Z', team1: 'ARG', team2: 'ALG', group: 'J', stadiumIdx: 2 },
  { id: 20, dateUTC: '2026-06-17T04:00:00Z', team1: 'AUT', team2: 'JOR', group: 'J', stadiumIdx: 7 },

  // Wednesday, June 17
  { id: 21, dateUTC: '2026-06-17T17:00:00Z', team1: 'POR', team2: 'COD', group: 'K', stadiumIdx: 4 },
  { id: 22, dateUTC: '2026-06-17T20:00:00Z', team1: 'ENG', team2: 'CRO', group: 'L', stadiumIdx: 1 },
  { id: 23, dateUTC: '2026-06-17T23:00:00Z', team1: 'GHA', team2: 'PAN', group: 'L', stadiumIdx: 5 },
  { id: 24, dateUTC: '2026-06-18T02:00:00Z', team1: 'UZB', team2: 'COL', group: 'K', stadiumIdx: 6 },

  // Thursday, June 18
  { id: 25, dateUTC: '2026-06-18T16:00:00Z', team1: 'CZE', team2: 'ZAF', group: 'A', stadiumIdx: 9 },
  { id: 26, dateUTC: '2026-06-18T19:00:00Z', team1: 'CHE', team2: 'BIH', group: 'B', stadiumIdx: 5 },
  { id: 27, dateUTC: '2026-06-18T22:00:00Z', team1: 'CAN', team2: 'QAT', group: 'B', stadiumIdx: 6 },
  { id: 28, dateUTC: '2026-06-19T01:00:00Z', team1: 'MEX', team2: 'KOR', group: 'A', stadiumIdx: 0 },

  // Friday, June 19
  { id: 29, dateUTC: '2026-06-19T19:00:00Z', team1: 'USA', team2: 'AUS', group: 'D', stadiumIdx: 4 },
  { id: 30, dateUTC: '2026-06-19T22:00:00Z', team1: 'SCO', team2: 'MAR', group: 'C', stadiumIdx: 10 },
  { id: 31, dateUTC: '2026-06-20T00:30:00Z', team1: 'BRA', team2: 'HTI', group: 'C', stadiumIdx: 14 },
  { id: 32, dateUTC: '2026-06-20T03:00:00Z', team1: 'TUR', team2: 'PRY', group: 'D', stadiumIdx: 11 },

  // Saturday, June 20
  { id: 33, dateUTC: '2026-06-20T17:00:00Z', team1: 'NED', team2: 'SWE', group: 'F', stadiumIdx: 1 },
  { id: 34, dateUTC: '2026-06-20T20:00:00Z', team1: 'GER', team2: 'CIV', group: 'E', stadiumIdx: 3 },
  { id: 35, dateUTC: '2026-06-21T00:00:00Z', team1: 'ECU', team2: 'CUW', group: 'E', stadiumIdx: 15 },
  { id: 36, dateUTC: '2026-06-21T04:00:00Z', team1: 'TUN', team2: 'JPN', group: 'F', stadiumIdx: 12 },

  // Sunday, June 21
  { id: 37, dateUTC: '2026-06-21T16:00:00Z', team1: 'ESP', team2: 'KSA', group: 'H', stadiumIdx: 13 },
  { id: 38, dateUTC: '2026-06-21T19:00:00Z', team1: 'BEL', team2: 'IRN', group: 'G', stadiumIdx: 2 },
  { id: 39, dateUTC: '2026-06-21T22:00:00Z', team1: 'URU', team2: 'CPV', group: 'H', stadiumIdx: 7 },
  { id: 40, dateUTC: '2026-06-22T01:00:00Z', team1: 'NZL', team2: 'EGY', group: 'G', stadiumIdx: 14 },

  // Monday, June 22
  { id: 41, dateUTC: '2026-06-22T17:00:00Z', team1: 'ARG', team2: 'AUT', group: 'J', stadiumIdx: 2 },
  { id: 42, dateUTC: '2026-06-22T21:00:00Z', team1: 'FRA', team2: 'IRQ', group: 'I', stadiumIdx: 4 },
  { id: 43, dateUTC: '2026-06-23T00:00:00Z', team1: 'NOR', team2: 'SEN', group: 'I', stadiumIdx: 12 },
  { id: 44, dateUTC: '2026-06-23T03:00:00Z', team1: 'JOR', team2: 'ALG', group: 'J', stadiumIdx: 11 },

  // Tuesday, June 23
  { id: 45, dateUTC: '2026-06-23T17:00:00Z', team1: 'POR', team2: 'UZB', group: 'K', stadiumIdx: 13 },
  { id: 46, dateUTC: '2026-06-23T20:00:00Z', team1: 'ENG', team2: 'GHA', group: 'L', stadiumIdx: 1 },
  { id: 47, dateUTC: '2026-06-23T23:00:00Z', team1: 'PAN', team2: 'CRO', group: 'L', stadiumIdx: 5 },
  { id: 48, dateUTC: '2026-06-24T02:00:00Z', team1: 'COL', team2: 'COD', group: 'K', stadiumIdx: 6 },

  // Wednesday, June 24
  { id: 49, dateUTC: '2026-06-24T19:00:00Z', team1: 'CHE', team2: 'CAN', group: 'B', stadiumIdx: 5 },
  { id: 50, dateUTC: '2026-06-24T19:00:00Z', team1: 'BIH', team2: 'QAT', group: 'B', stadiumIdx: 6 },
  { id: 51, dateUTC: '2026-06-24T22:00:00Z', team1: 'MAR', team2: 'HTI', group: 'C', stadiumIdx: 7 },
  { id: 52, dateUTC: '2026-06-24T22:00:00Z', team1: 'SCO', team2: 'BRA', group: 'C', stadiumIdx: 10 },
  { id: 53, dateUTC: '2026-06-25T01:00:00Z', team1: 'ZAF', team2: 'KOR', group: 'A', stadiumIdx: 9 },
  { id: 54, dateUTC: '2026-06-25T01:00:00Z', team1: 'CZE', team2: 'MEX', group: 'A', stadiumIdx: 0 },

  // Thursday, June 25
  { id: 55, dateUTC: '2026-06-25T20:00:00Z', team1: 'CUW', team2: 'CIV', group: 'E', stadiumIdx: 11 },
  { id: 56, dateUTC: '2026-06-25T20:00:00Z', team1: 'ECU', team2: 'GER', group: 'E', stadiumIdx: 3 },
  { id: 57, dateUTC: '2026-06-25T23:00:00Z', team1: 'TUN', team2: 'NED', group: 'F', stadiumIdx: 1 },
  { id: 58, dateUTC: '2026-06-25T23:00:00Z', team1: 'JPN', team2: 'SWE', group: 'F', stadiumIdx: 4 },
  { id: 59, dateUTC: '2026-06-26T02:00:00Z', team1: 'TUR', team2: 'USA', group: 'D', stadiumIdx: 12 },
  { id: 60, dateUTC: '2026-06-26T02:00:00Z', team1: 'PRY', team2: 'AUS', group: 'D', stadiumIdx: 15 },

  // Friday, June 26
  { id: 61, dateUTC: '2026-06-26T19:00:00Z', team1: 'NOR', team2: 'FRA', group: 'I', stadiumIdx: 14 },
  { id: 62, dateUTC: '2026-06-26T19:00:00Z', team1: 'SEN', team2: 'IRQ', group: 'I', stadiumIdx: 10 },
  { id: 63, dateUTC: '2026-06-27T00:00:00Z', team1: 'CPV', team2: 'KSA', group: 'H', stadiumIdx: 13 },
  { id: 64, dateUTC: '2026-06-27T00:00:00Z', team1: 'URU', team2: 'ESP', group: 'H', stadiumIdx: 7 },
  { id: 65, dateUTC: '2026-06-27T03:00:00Z', team1: 'NZL', team2: 'BEL', group: 'G', stadiumIdx: 5 },
  { id: 66, dateUTC: '2026-06-27T03:00:00Z', team1: 'EGY', team2: 'IRN', group: 'G', stadiumIdx: 2 },

  // Saturday, June 27
  { id: 67, dateUTC: '2026-06-27T21:00:00Z', team1: 'PAN', team2: 'ENG', group: 'L', stadiumIdx: 1 },
  { id: 68, dateUTC: '2026-06-27T21:00:00Z', team1: 'CRO', team2: 'GHA', group: 'L', stadiumIdx: 10 },
  { id: 69, dateUTC: '2026-06-27T23:30:00Z', team1: 'COL', team2: 'POR', group: 'K', stadiumIdx: 6 },
  { id: 70, dateUTC: '2026-06-27T23:30:00Z', team1: 'COD', team2: 'UZB', group: 'K', stadiumIdx: 15 },
  { id: 71, dateUTC: '2026-06-28T02:00:00Z', team1: 'ALG', team2: 'AUT', group: 'J', stadiumIdx: 2 },
  { id: 72, dateUTC: '2026-06-28T02:00:00Z', team1: 'JOR', team2: 'ARG', group: 'J', stadiumIdx: 4 },
];

export function generateMatches(): Match[] {
  const matches: Match[] = GROUP_STAGE_DEFS.map(def => {
    const stadium = STADIUMS[def.stadiumIdx];
    
    return {
      id: def.id,
      date: def.dateUTC,
      team1: def.team1,
      team2: def.team2,
      round: 'Group',
      group: def.group,
      venue: stadium.name,
      city: stadium.city,
      country: stadium.country as 'Mexico' | 'Canada' | 'USA'
    };
  });

  const knockoutsRaw = [
    // Round of 32
    { id: 73, dateUTC: '2026-06-28T19:00:00Z', team1: '1A', team2: '2B', round: 'Round of 32', stadiumIdx: 4, city: 'Los Angeles', country: 'USA' },
    { id: 74, dateUTC: '2026-06-29T17:00:00Z', team1: '1C', team2: '3A/B/F', round: 'Round of 32', stadiumIdx: 9, city: 'Monterrey', country: 'Mexico' },
    { id: 75, dateUTC: '2026-06-29T20:30:00Z', team1: '1E', team2: '2F', round: 'Round of 32', stadiumIdx: 10, city: 'Boston', country: 'USA' },
    { id: 76, dateUTC: '2026-06-30T01:00:00Z', team1: '1H', team2: '2G', round: 'Round of 32', stadiumIdx: 8, city: 'Guadalajara', country: 'Mexico' },
    { id: 77, dateUTC: '2026-07-01T17:00:00Z', team1: '1B', team2: '3C/D/I', round: 'Round of 32', stadiumIdx: 6, city: 'Vancouver', country: 'Canada' },
    { id: 78, dateUTC: '2026-06-30T21:00:00Z', team1: '1D', team2: '2E', round: 'Round of 32', stadiumIdx: 3, city: 'Atlanta', country: 'USA' },
    { id: 79, dateUTC: '2026-07-01T01:00:00Z', team1: '1F', team2: '2A', round: 'Round of 32', stadiumIdx: 14, city: 'Philadelphia', country: 'USA' },
    { id: 80, dateUTC: '2026-07-02T16:00:00Z', team1: '1G', team2: '2H', round: 'Round of 32', stadiumIdx: 11, city: 'Houston', country: 'USA' },
    { id: 81, dateUTC: '2026-07-01T20:00:00Z', team1: '1I', team2: '2J', round: 'Round of 32', stadiumIdx: 5, city: 'Toronto', country: 'Canada' },
    { id: 82, dateUTC: '2026-07-02T00:00:00Z', team1: '1J', team2: '2I', round: 'Round of 32', stadiumIdx: 15, city: 'Kansas City', country: 'USA' },
    { id: 83, dateUTC: '2026-07-02T19:00:00Z', team1: '1K', team2: '2L', round: 'Round of 32', stadiumIdx: 13, city: 'San Francisco', country: 'USA' },
    { id: 84, dateUTC: '2026-07-02T23:00:00Z', team1: '1L', team2: '2K', round: 'Round of 32', stadiumIdx: 7, city: 'Miami', country: 'USA' },
    { id: 85, dateUTC: '2026-07-03T03:00:00Z', team1: '2C', team2: '2D', round: 'Round of 32', stadiumIdx: 12, city: 'Seattle', country: 'USA' },
    { id: 86, dateUTC: '2026-07-03T18:00:00Z', team1: '2A', team2: '2C', round: 'Round of 32', stadiumIdx: 0, city: 'Mexico City', country: 'Mexico' },
    { id: 87, dateUTC: '2026-07-03T22:00:00Z', team1: '3D/E/F', team2: '3G/H/I', round: 'Round of 32', stadiumIdx: 10, city: 'Boston', country: 'USA' },
    { id: 88, dateUTC: '2026-07-04T01:30:00Z', team1: '3J/K/L', team2: '3A/C/E', round: 'Round of 32', stadiumIdx: 2, city: 'Dallas', country: 'USA' },

    // Round of 16
    { id: 89, dateUTC: '2026-07-04T17:00:00Z', team1: 'Winner #73', team2: 'Winner #74', round: 'Round of 16', stadiumIdx: 4, city: 'Los Angeles', country: 'USA' },
    { id: 90, dateUTC: '2026-07-04T21:00:00Z', team1: 'Winner #75', team2: 'Winner #76', round: 'Round of 16', stadiumIdx: 0, city: 'Mexico City', country: 'Mexico' },
    { id: 91, dateUTC: '2026-07-05T20:00:00Z', team1: 'Winner #77', team2: 'Winner #78', round: 'Round of 16', stadiumIdx: 6, city: 'Vancouver', country: 'Canada' },
    { id: 92, dateUTC: '2026-07-06T00:00:00Z', team1: 'Winner #79', team2: 'Winner #80', round: 'Round of 16', stadiumIdx: 3, city: 'Atlanta', country: 'USA' },
    { id: 93, dateUTC: '2026-07-06T19:00:00Z', team1: 'Winner #81', team2: 'Winner #82', round: 'Round of 16', stadiumIdx: 1, city: 'New York/New Jersey', country: 'USA' },
    { id: 94, dateUTC: '2026-07-07T00:00:00Z', team1: 'Winner #83', team2: 'Winner #84', round: 'Round of 16', stadiumIdx: 7, city: 'Miami', country: 'USA' },
    { id: 95, dateUTC: '2026-07-07T16:00:00Z', team1: 'Winner #85', team2: 'Winner #86', round: 'Round of 16', stadiumIdx: 14, city: 'Philadelphia', country: 'USA' },
    { id: 96, dateUTC: '2026-07-07T20:00:00Z', team1: 'Winner #87', team2: 'Winner #88', round: 'Round of 16', stadiumIdx: 2, city: 'Dallas', country: 'USA' },

    // Quarter-finals
    { id: 97, dateUTC: '2026-07-09T20:00:00Z', team1: 'Winner #89', team2: 'Winner #90', round: 'Quarter-finals', stadiumIdx: 10, city: 'Boston', country: 'USA' },
    { id: 98, dateUTC: '2026-07-10T19:00:00Z', team1: 'Winner #91', team2: 'Winner #92', round: 'Quarter-finals', stadiumIdx: 15, city: 'Kansas City', country: 'USA' },
    { id: 99, dateUTC: '2026-07-11T21:00:00Z', team1: 'Winner #93', team2: 'Winner #94', round: 'Quarter-finals', stadiumIdx: 4, city: 'Los Angeles', country: 'USA' },
    { id: 100, dateUTC: '2026-07-12T01:00:00Z', team1: 'Winner #95', team2: 'Winner #96', round: 'Quarter-finals', stadiumIdx: 7, city: 'Miami', country: 'USA' },

    // Semi-finals
    { id: 101, dateUTC: '2026-07-14T19:00:00Z', team1: 'Winner #97', team2: 'Winner #98', round: 'Semi-finals', stadiumIdx: 2, city: 'Dallas', country: 'USA' },
    { id: 102, dateUTC: '2026-07-15T19:00:00Z', team1: 'Winner #99', team2: 'Winner #100', round: 'Semi-finals', stadiumIdx: 3, city: 'Atlanta', country: 'USA' },

    // Third place
    { id: 103, dateUTC: '2026-07-18T21:00:00Z', team1: 'Loser #101', team2: 'Loser #102', round: 'Third place', stadiumIdx: 7, city: 'Miami', country: 'USA' },

    // Final
    { id: 104, dateUTC: '2026-07-19T19:00:00Z', team1: 'Winner #101', team2: 'Winner #102', round: 'Final', stadiumIdx: 1, city: 'New York/New Jersey', country: 'USA' },
  ];

  const knockouts: Match[] = knockoutsRaw.map(def => {
    const stadium = STADIUMS[def.stadiumIdx];
    
    return {
      id: def.id,
      date: def.dateUTC,
      team1: def.team1,
      team2: def.team2,
      round: def.round as Match['round'],
      venue: stadium.name,
      city: def.city,
      country: def.country as 'Mexico' | 'Canada' | 'USA'
    };
  });

  return [...matches, ...knockouts];
}
