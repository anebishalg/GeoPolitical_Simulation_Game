import React from 'react';
import { Nation } from '../types/Nation';
import { MapPin, TrendingUp, TrendingDown } from 'lucide-react';

interface WorldMapProps {
  nations: Nation[];
  selectedNation: Nation | null;
  onNationSelect: (nation: Nation) => void;
}

export const WorldMap: React.FC<WorldMapProps> = ({ nations, selectedNation, onNationSelect }) => {
  const getStabilityColor = (stability: number) => {
    if (stability >= 80) return 'bg-green-500';
    if (stability >= 60) return 'bg-yellow-500';
    if (stability >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getGDPTrend = (gdp: number, previousGDP: number) => {
    if (gdp > previousGDP) return <TrendingUp className="h-3 w-3 text-green-400" />;
    if (gdp < previousGDP) return <TrendingDown className="h-3 w-3 text-red-400" />;
    return null;
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">World Nations</h2>
        <div className="flex items-center space-x-4 text-sm text-slate-300">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Stable</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Moderate</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Unstable</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {nations.map((nation) => (
          <div
            key={nation.id}
            onClick={() => onNationSelect(nation)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedNation?.id === nation.id
                ? 'border-blue-400 bg-blue-900/20 shadow-lg'
                : 'border-slate-600 bg-slate-700/50 hover:border-slate-500'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{nation.flag}</span>
                <span className="font-semibold text-white text-sm">{nation.name}</span>
              </div>
              <div className={`w-3 h-3 rounded-full ${getStabilityColor(nation.stability)}`}></div>
            </div>
            
            <div className="space-y-1 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span>GDP:</span>
                <div className="flex items-center space-x-1">
                  <span>${nation.gdp.toFixed(1)}T</span>
                  {getGDPTrend(nation.gdp, nation.gdp * 0.98)}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Population:</span>
                <span>{nation.population}M</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Stability:</span>
                <span>{nation.stability}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};