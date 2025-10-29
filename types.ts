export interface ScoreCategory {
  label: string;
  key: string;
  value: number;
}

export interface ScoreRow {
  name: string;
  people: ScoreCategory[];
  planet: ScoreCategory[];
  profit: ScoreCategory[];
}

export type SectionData = ScoreRow[];

export type Section = 'product' | 'process';
export type Category = 'people' | 'planet' | 'profit';
export type SubCategoryKey = string;

export interface Calculations {
  means: { [key: string]: number };
  maxes: { [key: string]: number };
  mins: { [key: string]: number };
  indexMeans: {
    people: number;
    planet: number;
    profit: number;
  };
  normalisedMeans: {
    people: number;
    planet: number;
    profit: number;
  };
}