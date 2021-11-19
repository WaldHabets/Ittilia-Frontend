interface CSubclass {
  value: string;
  text: string;
}

export interface CTable {
  headers: string[];
  data: (string | number)[][];
  spellsPerLevel: {
    max: number;
    data: number[][];
  } | null;
}

interface CProgressionEntry {
  level: number;
  value: string;
}

interface CFeatureProgression {
  columns: string[];
  values: CProgressionEntry[];
}

export interface CEnhancement {
  class: string;
  value: string;
}

export interface CFeature {
  name: string;
  class: string;
  description: string;
  progression: CFeatureProgression | null;
}

export interface CLevel {
  level: number;
  enhancements: CEnhancement[] | null;
  features: CFeature[];
}

export interface Class {
  name: string;
  hasHomebrew: boolean;
  subclasses: CSubclass[];
  hitPoints: {
    hitDice: string;
    firstLevel: string;
    higherLevel: string;
  };
  proficiencies: {
    armor: string[];
    weapons: string[];
    tools: string[];
    savingThrows: string[];
    skills: {
      number: string;
      from: string[];
    };
  };
  table: CTable;
  levels: CLevel[];
}
