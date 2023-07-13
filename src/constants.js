export const DEFAULT_WHEEL_SPINS = 5;
export const MAX_ADDITIONAL_SPINS = 0;

export const variants = ['ruby', 'sapphire', 'diamond'];

export const sectorToDegreesMap = {
  SECTOR_1: 0,
  SECTOR_2: 30,
  SECTOR_3: 60,
  SECTOR_4: 90,
  SECTOR_5: 120,
  SECTOR_6: 150,
  SECTOR_7: 180,
  SECTOR_8: 210,
  SECTOR_9: 240,
  SECTOR_10: 270,
  SECTOR_11: 300,
  SECTOR_12: 330,
};

export const sectors = [
  {
    deg: sectorToDegreesMap['SECTOR_1'],
    resultType: 'SECTOR_1',
    type: 'low',
  },
  {
    deg: sectorToDegreesMap['SECTOR_2'],
    resultType: 'SECTOR_2',
    type: 'second',
  },
  {
    deg: sectorToDegreesMap['SECTOR_3'],
    resultType: 'SECTOR_3',
    type: 'low',
  },
  {
    deg: sectorToDegreesMap['SECTOR_4'],
    resultType: 'SECTOR_4',
    type: 'third',
  },
  {
    deg: sectorToDegreesMap['SECTOR_5'],
    resultType: 'SECTOR_5',
    type: 'low',
  },
  {
    deg: sectorToDegreesMap['SECTOR_6'],
    resultType: 'SECTOR_6',
    type: 'high',
  },
  {
    deg: sectorToDegreesMap['SECTOR_7'],
    resultType: 'SECTOR_7',
    type: 'low',
  },
  {
    deg: sectorToDegreesMap['SECTOR_8'],
    resultType: 'SECTOR_8',
    type: 'third',
  },
  {
    deg: sectorToDegreesMap['SECTOR_9'],
    resultType: 'SECTOR_9',
    type: 'low',
  },
  {
    deg: sectorToDegreesMap['SECTOR_10'],
    resultType: 'SECTOR_10',
    type: 'second',
  },
  {
    deg: sectorToDegreesMap['SECTOR_11'],
    resultType: 'SECTOR_11',
    type: 'low',
  },
  {
    deg: sectorToDegreesMap['SECTOR_12'],
    resultType: 'SECTOR_12',
    type: 'third',
  },
];

export const limitToValueMap = {
  ruby: {
    low: '1K',
    second: '1M',
    third: '10M',
    high: '100M',
  },
  sapphire: {
    low: '2K',
    second: '2M',
    third: '20M',
    high: '200M',
  },
  diamond: {
    low: '3K',
    second: '3M',
    third: '30M',
    high: '300M',
  },
};
