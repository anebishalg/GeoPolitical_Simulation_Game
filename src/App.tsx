import React, { useState, useEffect } from 'react';
import { GameHeader } from './components/GameHeader';
import { WorldMap } from './components/WorldMap';
import { NationCard } from './components/NationCard';
import { EventPanel } from './components/EventPanel';
import { SimulationControls } from './components/SimulationControls';
import { StatsPanel } from './components/StatsPanel';
import { GameEngine } from './engine/GameEngine';
import { Nation } from './types/Nation';
import { WorldEvent } from './types/WorldEvent';

function App() {
  const [nations, setNations] = useState<Nation[]>([]);
  const [events, setEvents] = useState<WorldEvent[]>([]);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [selectedNation, setSelectedNation] = useState<Nation | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [gameEngine] = useState(new GameEngine());

  useEffect(() => {
    // Initialize the game
    const initialNations = gameEngine.initializeNations();
    setNations(initialNations);
    setSelectedNation(initialNations[0]);
  }, [gameEngine]);

  const handleSimulateTurn = async () => {
    setIsSimulating(true);
    
    try {
      // Generate world events
      const newEvents = gameEngine.generateWorldEvents(currentTurn);
      setEvents(prev => [...newEvents, ...prev].slice(0, 10));
      
      // Simulate AI decisions for each nation
      const updatedNations = await gameEngine.simulateNationDecisions(nations, newEvents);
      setNations(updatedNations);
      
      // Update selected nation if it exists
      if (selectedNation) {
        const updatedSelected = updatedNations.find(n => n.id === selectedNation.id);
        setSelectedNation(updatedSelected || null);
      }
      
      setCurrentTurn(prev => prev + 1);
    } catch (error) {
      console.error('Simulation error:', error);
    } finally {
      setIsSimulating(false);
    }
  };

  const handleNationSelect = (nation: Nation) => {
    setSelectedNation(nation);
  };

  const handlePolicyChange = (nationId: string, policy: string, value: number) => {
    setNations(prev => prev.map(nation => 
      nation.id === nationId 
        ? { ...nation, policies: { ...nation.policies, [policy]: value } }
        : nation
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <GameHeader currentTurn={currentTurn} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - World Map & Controls */}
          <div className="lg:col-span-2 space-y-6">
            <WorldMap 
              nations={nations}
              selectedNation={selectedNation}
              onNationSelect={handleNationSelect}
            />
            
            <SimulationControls 
              isSimulating={isSimulating}
              onSimulateTurn={handleSimulateTurn}
              currentTurn={currentTurn}
            />
          </div>
          
          {/* Right Panel - Nation Info & Events */}
          <div className="space-y-6">
            {selectedNation && (
              <NationCard 
                nation={selectedNation}
                onPolicyChange={handlePolicyChange}
              />
            )}
            
            <StatsPanel nations={nations} />
            
            <EventPanel events={events} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;