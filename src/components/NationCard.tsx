import React from 'react';
import { Nation } from '../types/Nation';
import { Users, DollarSign, Shield, Leaf, Globe, TrendingUp } from 'lucide-react';

interface NationCardProps {
  nation: Nation;
  onPolicyChange: (nationId: string, policy: string, value: number) => void;
}

export const NationCard: React.FC<NationCardProps> = ({ nation, onPolicyChange }) => {
  const getPolicyColor = (value: number) => {
    if (value >= 80) return 'text-green-400';
    if (value >= 60) return 'text-yellow-400';
    if (value >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const StatCard = ({ icon: Icon, label, value, suffix = '' }: { icon: any, label: string, value: number | string, suffix?: string }) => (
    <div className="bg-slate-700/50 p-3 rounded-lg">
      <div className="flex items-center space-x-2 mb-1">
        <Icon className="h-4 w-4 text-blue-400" />
        <span className="text-xs text-slate-300">{label}</span>
      </div>
      <div className="text-lg font-semibold text-white">{value}{suffix}</div>
    </div>
  );

  const PolicySlider = ({ policy, value, label, icon: Icon }: { policy: string, value: number, label: string, icon: any }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon className="h-4 w-4 text-blue-400" />
          <span className="text-sm text-slate-300">{label}</span>
        </div>
        <span className={`text-sm font-semibold ${getPolicyColor(value)}`}>{value}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onPolicyChange(nation.id, policy, parseInt(e.target.value))}
        className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
      />
    </div>
  );

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-4xl">{nation.flag}</span>
          <div>
            <h3 className="text-xl font-bold text-white">{nation.name}</h3>
            <p className="text-sm text-slate-300">{nation.government}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{nation.stability}%</div>
          <div className="text-sm text-slate-300">Stability</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={Users} label="Population" value={nation.population} suffix="M" />
        <StatCard icon={DollarSign} label="GDP" value={`$${nation.gdp.toFixed(1)}`} suffix="T" />
        <StatCard icon={Shield} label="Military" value={nation.military} suffix="%" />
        <StatCard icon={Leaf} label="Environment" value={nation.environment} suffix="%" />
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white flex items-center space-x-2">
          <Globe className="h-5 w-5 text-blue-400" />
          <span>Policy Settings</span>
        </h4>
        
        <div className="space-y-4">
          <PolicySlider 
            policy="defense" 
            value={nation.policies.defense} 
            label="Defense Spending" 
            icon={Shield}
          />
          <PolicySlider 
            policy="economy" 
            value={nation.policies.economy} 
            label="Economic Growth" 
            icon={TrendingUp}
          />
          <PolicySlider 
            policy="environment" 
            value={nation.policies.environment} 
            label="Environmental Protection" 
            icon={Leaf}
          />
          <PolicySlider 
            policy="diplomacy" 
            value={nation.policies.diplomacy} 
            label="Diplomatic Relations" 
            icon={Globe}
          />
        </div>
      </div>

      <div className="bg-slate-700/30 p-4 rounded-lg">
        <h5 className="text-sm font-semibold text-white mb-2">Recent Actions</h5>
        <div className="space-y-1 text-xs text-slate-300">
          <p>• Increased defense spending by 5%</p>
          <p>• Signed climate agreement with neighboring nations</p>
          <p>• Expanded trade partnerships</p>
        </div>
      </div>
    </div>
  );
};