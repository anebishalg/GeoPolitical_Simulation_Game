export interface WorldEvent {
  id: string;
  title: string;
  description: string;
  type: 'economic' | 'political' | 'environmental' | 'crisis' | 'diplomatic';
  impact: number;
  turn: number;
  affectedNations: string[];
}