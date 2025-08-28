import React from 'react';
import { Play, Pause, RotateCcw, Settings, Zap } from 'lucide-react';

interface SimulationControlsProps {
  isSimulating: boolean;
  onSimulateTurn: () => void;
  currentTurn: number;
}

export const SimulationControls: React.FC<SimulationControlsProps> = ({ 
  isSimulating, 
  onSimulateTurn, 
  currentTurn 
}) => {
  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Simulation Controls</h3>
        <div className="flex items-center space-x-2 text-slate-300">
          <Settings className="h-4 w-4" />
          <span className="text-sm">Game Master</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4 mb-4">
        <button
          onClick={onSimulateTurn}
          disabled={isSimulating}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            isSimulating
              ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
          }`}
        >
          {isSimulating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-400 border-t-transparent"></div>
              <span>Simulating...</span>
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              <span>Next Turn</span>
            </>
          )}
        </button>
        
        <button
          disabled={isSimulating}
          className="flex items-center space-x-2 px-4 py-3 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700 transition-colors duration-200"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Reset</span>
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-700/50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-white">{currentTurn}</div>
          <div className="text-xs text-slate-300">Current Turn</div>
        </div>
        
        <div className="bg-slate-700/50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-400">8</div>
          <div className="text-xs text-slate-300">Active Nations</div>
        </div>
        
        <div className="bg-slate-700/50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-400">
            {isSimulating ? (
              <div className="animate-pulse">•</div>
            ) : (
              <Zap className="h-6 w-6 mx-auto" />
            )}
          </div>
          <div className="text-xs text-slate-300">
            {isSimulating ? 'Processing' : 'Ready'}
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-slate-700/30 rounded-lg">
        <p className="text-xs text-slate-300">
          <strong>AI Simulation:</strong> Each turn, AI agents make decisions for each nation based on current policies, world events, and strategic objectives. Click "Next Turn" to advance the simulation.
        </p>
      </div>
    </div>
  );
};