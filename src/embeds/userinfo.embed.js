const { emojis, ZERO_WIDTH_SPACE, stats, weapons, equippedWeapon, RED, suppresors } = require('../utils/app-constants');

const solveCritRate = (crit, level) => {
  let multiplier;

  if (level <= 9) multiplier = { a: 0, b: 150, c: 0 };
  else if (level <= 40) multiplier = { a: -4, b: 408, c: -2078 };
  else if (level <= 100) multiplier = { a: -0.163, b: 285, c: -3215 };
  else throw new Error('Crit Error');

  return crit / ((multiplier.a * (level * level)) + (multiplier.b * level) + (multiplier.c));
};

const formatStats = (statsToFormat) => {
  const _stats = Object.entries(statsToFormat).map(([k, v]) => {
    
    if(k.endsWith("Mult")) {

      if(k.substring(0, 3) == "Thu") {
        return `${stats["ThunderAtk"]} ${(Number(v) * 100).toFixed(2)}%`
      } else if (k.substring(0, 4) == "Fire") {
        return `${stats['FireAtk']} ${(Number(v) * 100).toFixed(2)}%`
      }
      
      return `${stats[`${k.substring(0, 3)}Atk`]} ${(Number(v) * 100).toFixed(2)}%`;
    }

    return `${stats[k]} ${Number(v).toFixed(0)}`;
  }).join('\n');

  return _stats;
};

module.exports = (_data) => {
  if (!_data) return { title: 'Player not found!', color: RED };

  const equipments = _data.equipments;
  const stats = _data.stats;

  return {
    title: _data.nickname,
    description: `**Level:** ${_data.level}
    **Crew:** ${_data.guildName}
    **CS:** ${_data.cs}
    **Supressor**: ${_data.suppressor.replace('0', '').replace('_', '.')} — ${suppresors[_data.suppressor]}
    **Server:** ${_data.server}`,
    fields: [
      { name: `${emojis.cloth} Armor`, value: equipments.cloth ? formatStats(equipments.cloth.stats) : 'Nothing equipped', inline: true },
      { name: `${emojis.pants} Legguards`, value: equipments.pants ? formatStats(equipments.pants.stats) : 'Nothing equipped', inline: true },
      { name: `${emojis.shoes} Sabatons`, value: equipments.shoes ? formatStats(equipments.shoes.stats) : 'Nothing equipped', inline: true },
      { name: `${emojis.shawl} Spaulders`, value: equipments.shawl ? formatStats(equipments.shawl.stats) : 'Nothing equipped', inline: true },
      { name: `${emojis.belt} Belt`, value: equipments.belt ? formatStats(equipments.belt.stats) : 'Nothing equipped', inline: true },
      { name: `${emojis.glove} Handguards`, value: equipments.glove ? formatStats(equipments.glove.stats) : 'Nothing equipped', inline: true },
      { name: `${emojis.helmet} Helm`, value: equipments.helmet ? formatStats(equipments.helmet.stats) : 'Nothing equipped', inline: true },
      { name: `${emojis.armband} Bracers`, value: equipments.armband ? formatStats(equipments.armband.stats) : 'Nothing equipped', inline: true },

      { name: equipments.core ? `${emojis[`${equipments.core.element}core`]} Core` : `${emojis.bluecore} Core`, value: equipments.core ? formatStats(equipments.core.stats) : 'Nothing equipped', inline: true },



      { name: ZERO_WIDTH_SPACE, value: ZERO_WIDTH_SPACE, inline: true },

      { name: 'Weapons', value: _data.weapons.length ? _data.weapons.map(_ => `${weapons[_.id]} ・ **Level: **${_.level} ・ ${Number(_.advancement) ? [...Array(Number(_.advancement))].map(() => ':star:').join('') : 'No Advancement'}`).join('\n') : 'No weapons equipped' },

      {
        name: 'Stats',
        value: `${emojis.pAtk} ${stats.patk.toFixed(0)}
        ${emojis.fAtk} ${stats.fatk.toFixed(0)}
        ${emojis.iAtk} ${stats.iatk.toFixed(0)}
        ${emojis.vAtk} ${stats.vatk.toFixed(0)}
        ${emojis.crit} ${stats.crit.toFixed(0)} — ${(solveCritRate(stats.crit, _data.level) * 100).toFixed(2)}%`,
        inline: true
      },
      {
        name: ZERO_WIDTH_SPACE,
        value: `${emojis.critDmg} ${(stats.critdamage * 100).toFixed(2)}
        ${emojis.crit} ${stats.critchance ? stats.critchance : 0}
        ${emojis.hp} ${stats.hp.toFixed(0)}
        ${emojis.end} ${stats.end}
        ${emojis.endReg} ${stats.endreg ? stats.endreg : 0}`,
        inline: true
      },
      {
        name: ZERO_WIDTH_SPACE,
        value: `${emojis.pRes} ${stats.pres.toFixed(0)} — ${(stats.presred * 100).toFixed(2)}%
        ${emojis.fRes} ${stats.fres.toFixed(0)} — ${(stats.fresred * 100).toFixed(2)}%
        ${emojis.iRes} ${stats.ires.toFixed(0)} — ${(stats.iresred * 100).toFixed(2)}%
        ${emojis.aRes} ${stats.vres.toFixed(0)} — ${(stats.vresred * 100).toFixed(2)}%
        ${emojis.vRes} ${stats.abbres.toFixed(0)} — ${(stats.abbresred * 100).toFixed(2)}%`,
        inline: true
      }
    ],
    image: { url: equippedWeapon[_data.equippedWeapon.toLowerCase()] }
  };
};
