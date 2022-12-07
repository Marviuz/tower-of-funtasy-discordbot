const GachaJS = require('gacha-js');

const gachaItems = require('../db/local/gacha.json');

const RULES = {
  BLACK_NUCLEUS: {
    ssr: .3,
    eheart: 1, // Element Heart
    sr: 3,
    steb: 5, // Standard Energy Battery
    ecore: 20, // Element Core
    r: 30.7,
    smeb: 40, // Small Energy Battery
  },
  GOLD_NUCLEUS: { // TODO: Gold nucleus
    ssr: .75, // Guarantee every 80
    sr: 1, // Guarantee every 10
    heeb: 6.85,
    r: 91.4
  }
};

/**
 * Pull on black nucleus
 * 
 * @param {boolean} isTenPull
 * @returns {Array}
 */
const blackNucleus = (isTenPull) => {
  let bn = new GachaJS(
    RULES.BLACK_NUCLEUS,
    {
      collection: gachaItems.filter(_ => _.in.includes('black')),
      findKey: 'rate'
    }
  );

  const pulls = bn.getPullByCollection(isTenPull ? 10 : 1);

  return pulls;
};

const goldNucleus = (isTenPull, isSSRPity) => {
  let gn = new GachaJS(
    RULES.GOLD_NUCLEUS,
    {
      collection: gachaItems.filter(_ => _.in.includes('gold')),
      findKey: 'rate'
    }
  );

  const pulls = gn.getPullByCollection(isTenPull ? 8 : 1); // Only pull 8 to check if pulls has SSR & SR

  // Check if has SR (Guaranteed SR @ 10 pulls)
  if (!pulls.some(pull => pull.rate === 'sr')) {
    const onlySR = gachaItems.filter(_ => (_.in.includes('gold') && _.rate === 'sr')); // Take only SR
    pulls.push(
      new GachaJS({ sr: 100 }, { collection: onlySR, findKey: 'rate' })
        .getPullByCollection()
    );
  } else {
    pulls.push(gn.getPullByCollection());
  }

  // TODO: FIX PITY!!!
  // Check if has SSR (Guaranteed SSR @ 80 pulls)
  if (!(isSSRPity % 79)) { // Check if divisible by 79 'cuz 80th is the last KEKW
    const onlySSR = gachaItems.filter(_ => (_.in.includes('gold') && _.rate === 'ssr')); // Take only SSR
    pulls.push(
      new GachaJS({ ssr: 100 }, { collection: onlySSR, findKey: 'rate' })
        .getPullByCollection()
    );
  } else {
    pulls.push(gn.getPullByCollection());
  }

  return pulls;
};

exports.blackNucleus = blackNucleus;
exports.goldNucleus = goldNucleus;