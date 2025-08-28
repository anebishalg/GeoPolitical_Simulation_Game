import React from 'react';
import { Globe, Calendar, Users } from 'lucide-react';

interface GameHeaderProps {
  currentTurn: number;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ currentTurn }) => {
  return (
    <header className="bg-slate-800 border-b border-slate-700 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-blue-400" />
              <div>
                <h1 className="text-2xl font-bold text-white">Geopolitical Simulation</h1>
                <p className="text-sm text-slate-300">Strategic World Governance</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-slate-300">
              <Calendar className="h-5 w-5" />
              <span className="font-semibold">Turn {currentTurn}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-slate-300">
              <Users className="h-5 w-5" />
              <span>World Leaders Summit</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};