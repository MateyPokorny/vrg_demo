export enum Morale {
    VERY_WEAK = "velmi slabá",
    WEAK = "slabá",
    OK = "v pořádku",
    HIGH = "vysoká"
}

export enum Experience {
    UNEXPERIENCED = "zelenáči",
    EXPERIENCED = "ostřílení",
    VETERAN = "veteráni"
}

export enum Ammo {
    VERY_LOW = "nedostatek",
    RUNNING_LOW = "dochází",
    ENOUGH = "dostatek"
}

export enum Affiliation {
    FRIENDLY = "přátelská",
    ENEMY = "nepřátelská",
}

export interface Postition {
    longitude: number;
    latitude: number; 
}

// Interface pro vojenskou jednotku
export interface MilitaryUnit {
    imgIcon: string;
    type: string;
    morale: Morale;
    experience: Experience;
    ammo: Ammo;
    combatEffectiveness: number;
    position: Postition;
    affiliation: Affiliation;
}