const sample = require('lodash.sample');
const weapons = require('../db/weapons.json');
const materials = require('../db/materials.json');

const RULES = {
  BLACK_NUCLEUS: {
    ssr: .3,
    eheart: 1, // Element Heart
    sr: 3,
    steb: 5, // Standard Energy Battery
    ecore: 20, // Element Core
    r: 30.7,
    smeb: 40, // Small Energy Battery
  }
};

const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;

/**
 * Pull on black nucleus
 * 
 * @param {boolean} isTenPull
 * @returns {Array}
 */
const blackNucleus = (isTenPull) => {
  const { BLACK_NUCLEUS: bn } = RULES;
  let pulls = [];

  for (let i = 0; i < (isTenPull ? 10 : 1); i++) {
    const gacha = getRandomArbitrary(1, 100);

    if (gacha <= bn.ssr) pulls.push('SSR');
    else if (gacha <= bn.ssr + bn.eheart) pulls.push('Elementheart');
    else if (gacha <= bn.ssr + bn.eheart + bn.sr) pulls.push('SR');
    else if (gacha <= bn.ssr + bn.eheart + bn.sr + bn.steb) pulls.push('Standard Energy Battery');
    else if (gacha <= bn.ssr + bn.eheart + bn.sr + bn.steb + bn.ecore) pulls.push('Elementcore');
    else if (gacha <= bn.ssr + bn.eheart + bn.sr + bn.steb + bn.ecore + bn.r) pulls.push('R');
    else if (gacha <= bn.ssr + bn.eheart + bn.sr + bn.steb + bn.ecore + bn.r + bn.smeb) pulls.push('Small Energy Battery');
    else pulls.push('If this showed up... my formula is wrong...');
  }

  for (let i = 0; i < pulls.length; i++) {
    const pull = pulls[i];

    if (pull === 'SSR' || pull === 'SR' || pull === 'R') {
      const _weaponCollection = weapons.filter($ => $.rarity === pull);
      pulls[i] = sample(_weaponCollection);
    } else {
      pulls[i] = sample(materials);
    }
  }

  return pulls;
};

exports.blackNucleus = blackNucleus;