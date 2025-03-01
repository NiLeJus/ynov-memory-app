import { iMemoryTheme } from './theme.models';

export interface iProfile {
  id: number;
  // selected: boolean;
  name: string;
  nextSession?: number | null; // Date dernière validation (timestamp) | null  quand il n'y en a pas encore de prévu
  themes?: iMemoryTheme[];
  statistics: iProfileStatistics;
}
export interface iProfileStatistics {
  runsDone: number;
  scoreAllTime: number;
  scoreNow: number;
}
