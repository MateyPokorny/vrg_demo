import { MilitaryUnit, Morale, Experience, Ammo, Affiliation } from './types/index';

// objekty vojenských jednotek pro zobrazení na mapě
const mockData: MilitaryUnit[] = [
  {
    imgIcon: "friendly_infantry.png",
    type: "Pěchota",
    morale: Morale.HIGH,
    experience: Experience.EXPERIENCED,
    ammo: Ammo.ENOUGH,
    combatEffectiveness: 85,
    position: { latitude: 48.594070, longitude: 37.806024 },
    affiliation: Affiliation.FRIENDLY,
  },
  {
    imgIcon: "friendly_mechanized_infantry.png",
    type: "Mechanizovaná pěchota",
    morale: Morale.OK,
    experience: Experience.VETERAN,
    ammo: Ammo.RUNNING_LOW,
    combatEffectiveness: 55,
    position: { latitude: 48.574075, longitude: 37.813483 },
    affiliation: Affiliation.FRIENDLY,
  },
  {
    imgIcon: "friendly_rocket_arty.png",
    type: "Raketové dělostřelectvo",
    morale: Morale.WEAK,
    experience: Experience.UNEXPERIENCED,
    ammo: Ammo.VERY_LOW,
    combatEffectiveness: 20,
    position: { latitude: 48.598618, longitude: 37.748993 },
    affiliation: Affiliation.FRIENDLY,
  },
  {
    imgIcon: "enemy_infantry.png",
    type: "Pěchota",
    morale: Morale.VERY_WEAK,
    experience: Experience.UNEXPERIENCED,
    ammo: Ammo.VERY_LOW,
    combatEffectiveness: 50,
    position: { latitude: 48.593019, longitude: 37.852407 },
    affiliation: Affiliation.ENEMY,
  },
  {
    imgIcon: "enemy_armour.png",
    type: "Tankový prapor",
    morale: Morale.WEAK,
    experience: Experience.EXPERIENCED,
    ammo: Ammo.RUNNING_LOW,
    combatEffectiveness: 60,
    position: { latitude: 48.605298, longitude: 37.840986 },
    affiliation: Affiliation.ENEMY,
  },
  {
    imgIcon: "enemy_arty.png",
    type: "Dělostřelectvo",
    morale: Morale.OK,
    experience: Experience.VETERAN,
    ammo: Ammo.ENOUGH,
    combatEffectiveness: 80,
    position: { latitude: 48.607027, longitude: 38.001328 },
    affiliation: Affiliation.ENEMY,
  },
];

export default mockData;