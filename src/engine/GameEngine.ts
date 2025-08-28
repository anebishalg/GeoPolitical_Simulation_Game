import { Nation } from '../types/Nation';
import { WorldEvent } from '../types/WorldEvent';
import { AIAgent } from './AIAgent';

export class GameEngine {
  private aiAgent: AIAgent;

  constructor() {
    this.aiAgent = new AIAgent();
  }

  initializeNations(): Nation[] {
    const nations: Nation[] = [
      {
        id: 'usa',
        name: 'United States',
        flag: '🇺🇸',
        government: 'Democratic Republic',
        gdp: 21.4,
        population: 331,
        stability: 78,
        military: 85,
        environment: 65,
        policies: {
          defense: 75,
          economy: 80,
          environment: 60,
          diplomacy: 70
        },
        alliances: ['nato', 'anzus'],
        resources: {
          oil: 70,
          minerals: 80,
          technology: 95,
          agriculture: 85
        }
      },
      {
        id: 'china',
        name: 'China',
        flag: '🇨🇳',
        government: 'One-Party State',
        gdp: 14.3,
        population: 1439,
        stability: 82,
        military: 78,
        environment: 45,
        policies: {
          defense: 70,
          economy: 90,
          environment: 40,
          diplomacy: 65
        },
        alliances: ['sco', 'brics'],
        resources: {
          oil: 45,
          minerals: 90,
          technology: 80,
          agriculture: 70
        }
      },
      {
        id: 'germany',
        name: 'Germany',
        flag: '🇩🇪',
        government: 'Federal Republic',
        gdp: 3.8,
        population: 83,
        stability: 85,
        military: 55,
        environment: 78,
        policies: {
          defense: 50,
          economy: 85,
          environment: 80,
          diplomacy: 85
        },
        alliances: ['eu', 'nato'],
        resources: {
          oil: 25,
          minerals: 60,
          technology: 90,
          agriculture: 65
        }
      },
      {
        id: 'japan',
        name: 'Japan',
        flag: '🇯🇵',
        government: 'Constitutional Monarchy',
        gdp: 4.9,
        population: 126,
        stability: 88,
        military: 65,
        environment: 72,
        policies: {
          defense: 60,
          economy: 85,
          environment: 75,
          diplomacy: 80
        },
        alliances: ['anzus'],
        resources: {
          oil: 15,
          minerals: 30,
          technology: 95,
          agriculture: 40
        }
      },
      {
        id: 'russia',
        name: 'Russia',
        flag: '🇷🇺',
        government: 'Federal Republic',
        gdp: 1.7,
        population: 146,
        stability: 65,
        military: 88,
        environment: 55,
        policies: {
          defense: 85,
          economy: 60,
          environment: 50,
          diplomacy: 55
        },
        alliances: ['csto', 'eaeu'],
        resources: {
          oil: 95,
          minerals: 85,
          technology: 70,
          agriculture: 75
        }
      },
      {
        id: 'india',
        name: 'India',
        flag: '🇮🇳',
        government: 'Federal Republic',
        gdp: 2.9,
        population: 1380,
        stability: 70,
        military: 75,
        environment: 52,
        policies: {
          defense: 70,
          economy: 80,
          environment: 55,
          diplomacy: 75
        },
        alliances: ['brics', 'quad'],
        resources: {
          oil: 30,
          minerals: 75,
          technology: 70,
          agriculture: 80
        }
      },
      {
        id: 'brazil',
        name: 'Brazil',
        flag: '🇧🇷',
        government: 'Federal Republic',
        gdp: 1.8,
        population: 212,
        stability: 68,
        military: 60,
        environment: 45,
        policies: {
          defense: 55,
          economy: 70,
          environment: 40,
          diplomacy: 70
        },
        alliances: ['brics', 'mercosur'],
        resources: {
          oil: 60,
          minerals: 70,
          technology: 55,
          agriculture: 95
        }
      },
      {
        id: 'uk',
        name: 'United Kingdom',
        flag: '🇬🇧',
        government: 'Constitutional Monarchy',
        gdp: 2.8,
        population: 67,
        stability: 80,
        military: 70,
        environment: 68,
        policies: {
          defense: 65,
          economy: 75,
          environment: 70,
          diplomacy: 85
        },
        alliances: ['nato', 'commonwealth'],
        resources: {
          oil: 50,
          minerals: 45,
          technology: 85,
          agriculture: 60
        }
      }
    ];

    return nations;
  }

  generateWorldEvents(turn: number): WorldEvent[] {
    const events: WorldEvent[] = [];
    const eventCount = Math.floor(Math.random() * 3) + 1; // 1-3 events per turn

    for (let i = 0; i < eventCount; i++) {
      const event = this.aiAgent.generateRandomEvent(turn);
      events.push(event);
    }

    return events;
  }

  async simulateNationDecisions(nations: Nation[], events: WorldEvent[]): Promise<Nation[]> {
    const updatedNations = [...nations];

    for (let i = 0; i < updatedNations.length; i++) {
      const nation = updatedNations[i];
      const decisions = await this.aiAgent.makeNationDecisions(nation, events, updatedNations);
      
      // Apply decisions to the nation
      updatedNations[i] = this.applyDecisions(nation, decisions);
    }

    return updatedNations;
  }

  private applyDecisions(nation: Nation, decisions: any): Nation {
    const updatedNation = { ...nation };

    // Apply random fluctuations based on policies and world events
    const stabilityChange = (Math.random() - 0.5) * 10;
    const gdpChange = (Math.random() - 0.5) * 0.5;
    const militaryChange = (Math.random() - 0.5) * 5;
    const environmentChange = (Math.random() - 0.5) * 5;

    // Apply changes with bounds
    updatedNation.stability = Math.max(0, Math.min(100, nation.stability + stabilityChange));
    updatedNation.gdp = Math.max(0, nation.gdp + gdpChange);
    updatedNation.military = Math.max(0, Math.min(100, nation.military + militaryChange));
    updatedNation.environment = Math.max(0, Math.min(100, nation.environment + environmentChange));

    // Small random policy adjustments
    Object.keys(updatedNation.policies).forEach(policy => {
      const change = (Math.random() - 0.5) * 8;
      updatedNation.policies[policy as keyof typeof updatedNation.policies] = Math.max(0, Math.min(100, 
        nation.policies[policy as keyof typeof nation.policies] + change
      ));
    });

    return updatedNation;
  }
}