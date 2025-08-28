export interface Nation {
  id: string;
  name: string;
  flag: string;
  government: string;
  gdp: number;
  population: number;
  stability: number;
  military: number;
  environment: number;
  policies: {
    defense: number;
    economy: number;
    environment: number;
    diplomacy: number;
  };
  alliances: string[];
  resources: {
    oil: number;
    minerals: number;
    technology: number;
    agriculture: number;
  };
}