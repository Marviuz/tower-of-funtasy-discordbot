exports.ZERO_WIDTH_SPACE = '\u200b';

// Colors
exports.RED = 0xf44336;

// Emojis
exports.emojis = {
  // TOF
  armband: '<:armband:1031754391222485062>',
  belt: '<:belt:1031755470597271643>',
  cloth: '<:cloth:1031754590988812368>',
  helmet: '<:helmet:1031755717838909450>',
  glove: '<:glove:1031754822015254638>',
  pants: '<:pants:1031754719460343848>',
  shawl: '<:shawl:1031755606916333598>',
  shoes: '<:shoes:1031755354037551154>',

  pAtk: '<:patk:1031775869145980990>',
  fAtk: '<:fatk:1031776047630401607>',
  iAtk: '<:iatk:1031776179486728202>',
  vAtk: '<:vatk:1031776235442950194>',
  hp: '<:hp:1031775175550705744>',
  crit: '<:crit:1031775555458187314>',
  critDmg: '<:critdmg:1031775765219516416>',
  end: '<:endurance:1031775401527226389>',
  endReg: '<:endreg:1031775678808461352>',

  pRes: '<:pres:1031775974234267769>',
  fRes: '<:fres:1031776105008463912>',
  iRes: '<:endreg:1031776328044793997>',
  aRes: '<:ares:1031776450136789002>',
  vRes: '<:vres:1031776391856918558>',
};

exports.stats = {
  // offensive
  CommonAtk: this.emojis.pAtk,
  PhyAtk: this.emojis.pAtk,
  IceAtk: this.emojis.iAtk,
  ThunderAtk: this.emojis.vAtk,
  FireAtk: this.emojis.fAtk,
  Crit: this.emojis.crit,

  // defensive
  MaxHealth: this.emojis.hp,
  ElementDef: this.emojis.pRes, // Resistance Icon needed
  FireDef: this.emojis.fRes,
  IceDef: this.emojis.iRes,
  ThunderDef: this.emojis.vRes,
  PhyDef: this.emojis.pRes
};

exports.weapons = {
  bow_ice: '<:icewindarrow:1031807119596458014>',
  frigg_ice: '<:balmung:1031804896489517077>',
  suspension_thunder: '<:venus:1031807227679485982>',
  cube_fire: '<:negatingcube:1031804576262782977>',
  bigsword_ice: '<:rosyedge:1031804727769432136>',
  dgun_thunder: '<:dualemstars:1031812102232490015>',
  darts_physic: '<:charkramoftheseas:1031812213771616266>',
  digger_thunder: '<:thunderblades:1031814149686173747>',
  shieldaxe_fire: '<:moltenshieldv2:1031813655781703691>',
  sword_physic: '<:gurenblade:1031816364589064193>',
  stave_ice: '<:absolutezero:1031816828130951188>',
  sickle_fire: '<:scytheofcrow:1031821176596615188>',
  gun_fire: '<:blazingrevolver:1031821885043904512>',

  // 4*
  hammer_ice: '<:pummeler:1031815906717859942>',
  spear_thunder: '<:thunderoushalberd:1031815804733370458>',
  cannon_ice: '<:theterminator:1031815678455451648>',
  stave_thunder: '<:staffofscars:1031817766740701234>',
  bow_physic: '<:nightingalesfeather:1031818253963628616>',

  // 3*
  digger_physic: '<:combatblade:1031825025940078612>',
  bow_fire: '<:compositebow:1031818600861925437>',
  sword_thunder: '<:emblade:1031820544443695114>',
  spear_ice: '<:frostedspear:1031823308842340352>',
};

exports.equippedWeapon = {
  bow_ice: 'https://i.imgur.com/nIOAtDR.png',
  frigg_ice: 'https://i.imgur.com/aIGOiOV.png',
  suspension_thunder: 'https://i.imgur.com/pknkLy5.png',
  cube_fire: 'https://i.imgur.com/uqstbDD.png',
  bigsword_ice: 'https://i.imgur.com/jgpcXHb.png',
  dgun_thunder: 'https://i.imgur.com/Wi8GibP.png',
  darts_physic: 'https://i.imgur.com/i1cFuiz.png',
  digger_thunder: 'https://i.imgur.com/KAYCBdx.png',
  shieldaxe_fire: 'https://i.imgur.com/3c7iD9G.png',
  sword_physic: 'https://i.imgur.com/IwT2ddq.png',
  stave_ice: 'https://i.imgur.com/bfsOa0t.png',
  sickle_fire: 'https://i.imgur.com/DIzXCpe.png',
  gun_fire: 'https://i.imgur.com/cimh8Ti.png',

  // 4*
  hammer_ice: 'https://i.imgur.com/IjrrpxW.png',
  spear_thunder: 'https://i.imgur.com/UtNFLRW.png',
  cannon_ice: 'https://i.imgur.com/cft5SmN.png',
  stave_thunder: 'https://i.imgur.com/CUMLmhD.png',
  bow_physic: 'https://i.imgur.com/VdUIRTD.png',

  // 3*
  digger_physic: 'https://i.imgur.com/O5rtSts.png',
  bow_fire: 'https://i.imgur.com/SjdWys4.png',
  sword_thunder: 'https://i.imgur.com/logJodz.png',
  spear_ice: 'https://i.imgur.com/4HZWizO.png',
};

exports.suppresors = {
  '01_0': '<:01_0:1032120631321444452>',
  '01_1': '<:01_1:1032120727165485086>',
  '01_2': '<:01_2:1032120772505911331>',
  '01_3': '<:01_3:1032120835214938124>',
  '01_4': '<:01_4:1032120911828103249>',
  '01_5': '<:01_5:1032120958678470676>',
  '02_1': '<:02_1:1032121078161625178>',
  '02_2': '<:02_2:1032121134843445328>',
  '02_3': '<:02_3:1032121192422838352>',
  '02_4': '<:02_4:1032121252195872789>',
  '02_5': '<:02_5:1032121293249708092>',
  '03_1': '<:03_1:1032121403794784296>',
  '03_2': '<:03_2:1032121441577091084>',
  '03_3': '<:03_3:1032121642953998348>',
  '03_4': '<:03_4:1032122301791076402>',
  '03_5': '<:03_5:1032122330694041671>',
  '04_1': '<:04_1:1032122386591535130>',
  '04_2': '<:04_2:1032122420569587772>',
  '04_3': '<:04_3:1032122459471753257>',
  '04_4': '<:04_4:1032122631853449266>',
  '04_5': '<:04_5:1032122676329852938>',
  '05_1': '<:05_1:1032122719837368400>',
  '05_2': '<:05_2:1032122767593709578>',
  '05_3': '<:05_3:1032122790398132285>',
  '05_4': '<:05_4:1032122810975408208>',
  '05_5': '<:05_5:1032122835130392646>',
  '06_1': '<:06_1:1032122881645236224>',
  '06_2': '<:06_2:1032122898183372890>',
  '06_3': '<:06_3:1032122920673214484>',
  '06_4': '<:06_4:1032122944702390314>',
  '06_5': '<:06_5:1032122966076563657>',
  '07_1': '<:07_1:1032123027535691796>',
  '07_2': '<:07_2:1032123084578238464>',
  '07_3': '<:07_3:1032123103024795718>',
  '07_4': '<:07_4:1032123132607213608>',
  '07_5': '<:07_5:1032123153171877908>'
};