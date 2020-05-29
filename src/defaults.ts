import { CompleteEvent } from './Server';

export const forumsGlobals = {
  embedColor: 'ffaa00',
};

export type degreeTag = 'major'|'minor'|'fake';

export type typeTag = 
  'spire'|
  'blockhead'|
  'beast'|
  'ragepit'|
  'squads'|
  'raffle'|
  'robbery'|
  'tdm'|
  'pizza'|
  'koth'|
  'dragon'|
  'package'|
  'kotl'|
  'double'|
  'auction'|
  'cake'|
  'bounty'|
  'test';

export const degrees = {
  major: {
    prefix: 'MAJOR EVENT!',
    postfix: 'starting in 3 minutes!',
    color: '#fac400',
  },
  minor: {
    prefix: 'MINOR EVENT!',
    color: '#9040ff',
    postfix: 'starting now!',
  },
  fake: {
    ignore: true,
    prefix: 'FAKE EVENT!',
    color: '#000000',
  },
}

export type defaultType = {
  degree: degreeTag;
  name: string;
  postfix?: string;
  toString?(this: CompleteEvent): string;
  ignore?: boolean,
}

export const eventGlobals = {
  ignore: false,
  postfix: '',
  toString(this: CompleteEvent){
    return `**${this.prefix} ${this.name}** ${this.postfix}`;
  },
  showId: false,
}

export const types: {[p in typeTag]: defaultType} = {
  spire:{
    degree: 'major',
    name: 'SPIRE',
  },
  blockhead:{
    degree: 'major',
    name: 'BLOCKHEAD',
  },
  beast:{
    degree: 'major',
    name: 'BEAST',
  },
  ragepit:{
    degree: 'major',
    name: 'RAGE PIT',
  },
  squads:{
    degree: 'major',
    name: 'SQUADS',
  },
  raffle:{
    degree: 'major',
    name: 'RAFFLE',
  },
  robbery:{
    degree: 'major',
    name: 'ROBBERY',
  },
  tdm:{
    degree: 'major',
    name: 'TEAM DEATH MATCH',
  },
  pizza:{
    degree: 'major',
    name: 'PIZZA',
  },
  koth: {
    degree: 'minor',
    name: 'KING OF THE HILL',
    postfix: 'for 4 minutes!',
  },
  dragon: {
    degree: 'minor',
    name: 'DRAGON EGG',
  },
  package: {
    degree: 'minor',
    name: 'CARE PACKAGE',
    postfix: 'dropping now!',
  },
  kotl: {
    degree: 'minor',
    name: 'KING OF THE LADDER',
    postfix: 'for 3 minutes',
  },
  double: {
    degree: 'minor',
    name: '2X REWARDS',
    postfix: 'for 4 minutes',
  },
  auction: {
    degree: 'minor',
    name: 'AUCTION',
  },
  cake: {
    degree: 'minor',
    name: 'GIANT CAKE',
  },
  bounty: {
    degree: 'minor',
    name: 'EVERYONE GETS A BOUNTY!',
    postfix: '',
  },
  test:{
    degree: 'fake',
    name: 'TEST!',
    ignore: true,
  },
};