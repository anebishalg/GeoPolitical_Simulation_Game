import React from 'react';
import { WorldEvent } from '../types/WorldEvent';
import { AlertTriangle, TrendingUp, Globe, Users, Zap, Calendar } from 'lucide-react';

interface EventPanelProps {
  events: WorldEvent[];
}

export const EventPanel: React.FC<EventPanelProps> = ({ events }) => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'economic': return <TrendingUp className="h-4 w-4" />;
      case 'political': return <Users className="h-4 w-4" />;
      case 'environmental': return <Globe className="h-4 w-4" />;
      case 'crisis': return <AlertTriangle className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'economic': return 'text-green-400 bg-green-900/20 border-green-700';
      case 'political': return 'text-blue-400 bg-blue-900/20 border-blue-700';
      case 'environmental': return 'text-emerald-400 bg-emerald-900/20 border-emerald-700';
      case 'crisis': return 'text-red-400 bg-red-900/20 border-red-700';
      default: return 'text-yellow-400 bg-yellow-900/20 border-yellow-700';
    }
  };

  const getImpactText = (impact: number) => {
    if (impact > 0) return `+${impact}% positive impact`;
    if (impact < 0) return `${impact}% negative impact`;
    return 'Neutral impact';
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">World Events</h3>
        <div className="flex items-center space-x-1 text-slate-300">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">Recent</span>
        </div>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {events.length === 0 ? (
          <p className="text-slate-400 text-center py-8">No events yet. Start the simulation to see world events unfold.</p>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className={`p-4 rounded-lg border ${getEventColor(event.type)}`}
            >
              <div className="flex items-start space-x-3">
                <div className={`mt-1 ${getEventColor(event.type)}`}>
                  {getEventIcon(event.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-white text-sm">{event.title}</h4>
                    <span className="text-xs text-slate-400">Turn {event.turn}</span>
                  </div>
                  <p className="text-xs text-slate-300 mb-2">{event.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 capitalize">{event.type} Event</span>
                    <span className={`text-xs font-medium ${
                      event.impact > 0 ? 'text-green-400' : 
                      event.impact < 0 ? 'text-red-400' : 'text-slate-400'
                    }`}>
                      {getImpactText(event.impact)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};