import React from 'react';
import { Nation } from '../types/Nation';
import { BarChart3, TrendingUp, Globe, Users, DollarSign, Shield } from 'lucide-react';

interface StatsPanelProps {
  nations: Nation[];
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ nations }) => {
  const globalStats = {
    totalGDP: nations.reduce((sum, nation) => sum + nation.gdp, 0),
    totalPopulation: nations.reduce((sum, nation) => sum + nation.population, 0),
    averageStability: nations.reduce((sum, nation) => sum + nation.stability, 0) / nations.length,
    averageMilitary: nations.reduce((sum, nation) => sum + nation.military, 0) / nations.length,
    averageEnvironment: nations.reduce((sum, nation) => sum + nation.environment, 0) / nations.length,
  };

  const topNations = {
    highestGDP: nations.sort((a, b) => b.gdp - a.gdp)[0],
    mostStable: nations.sort((a, b) => b.stability - a.stability)[0],
    strongestMilitary: nations.sort((a, b) => b.military - a.military)[0],
  };

  const StatCard = ({ icon: Icon, label, value, suffix = '', color = 'text-blue-400' }: { 
    icon: any, 
    label: string, 
    value: number | string, 
    suffix?: string,
    color?: string
  }) => (
    <div className="bg-slate-700/50 p-3 rounded-lg">
      <div className="flex items-center space-x-2 mb-1">
        <Icon className={`h-4 w-4 ${color}`} />
        <span className="text-xs text-slate-300">{label}</span>
      </div>
      <div className="text-lg font-semibold text-white">{value}{suffix}</div>
    </div>
  );

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Global Statistics</h3>
        <BarChart3 className="h-5 w-5 text-blue-400" />
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <StatCard 
            icon={DollarSign} 
            label="Global GDP" 
            value={`$${globalStats.totalGDP.toFixed(1)}`} 
            suffix="T"
            color="text-green-400"
          />
          <StatCard 
            icon={Users} 
            label="World Population" 
            value={globalStats.totalPopulation.toLocaleString()} 
            suffix="M"
            color="text-blue-400"
          />
          <StatCard 
            icon={Globe} 
            label="Avg Stability" 
            value={globalStats.averageStability.toFixed(1)} 
            suffix="%"
            color="text-yellow-400"
          />
          <StatCard 
            icon={Shield} 
            label="Avg Military" 
            value={globalStats.averageMilitary.toFixed(1)} 
            suffix="%"
            color="text-red-400"
          />
        </div>
        
        <div className="border-t border-slate-700 pt-4">
          <h4 className="text-sm font-semibold text-white mb-3">Top Performers</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
              <span className="text-slate-300">🏆 Strongest Economy:</span>
              <span className="text-white font-semibold">
                {topNations.highestGDP?.flag} {topNations.highestGDP?.name}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
              <span className="text-slate-300">🛡️ Most Stable:</span>
              <span className="text-white font-semibold">
                {topNations.mostStable?.flag} {topNations.mostStable?.name}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
              <span className="text-slate-300">⚔️ Military Leader:</span>
              <span className="text-white font-semibold">
                {topNations.strongestMilitary?.flag} {topNations.strongestMilitary?.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};