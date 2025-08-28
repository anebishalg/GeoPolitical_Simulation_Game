import { Nation } from '../types/Nation';
import { WorldEvent } from '../types/WorldEvent';

export class AIAgent {
  private eventTemplates = {
    economic: [
      'Global Market Volatility',
      'Trade War Escalation',
      'Economic Recovery Summit',
      'Currency Crisis',
      'Tech Bubble Burst',
      'Resource Price Spike'
    ],
    political: [
      'Democratic Elections',
      'Government Coup',
      'International Summit',
      'Border Dispute',
      'Refugee Crisis',
      'Diplomatic Breakthrough'
    ],
    environmental: [
      'Climate Change Impact',
      'Natural Disaster',
      'Environmental Accord',
      'Resource Depletion',
      'Renewable Energy Breakthrough',
      'Pollution Crisis'
    ],
    crisis: [
      'Terrorist Attack',
      'Pandemic Outbreak',
      'Nuclear Incident',
      'Cyber Attack',
      'Food Shortage',
      'Water Crisis'
    ],
    diplomatic: [
      'Alliance Formation',
      'Trade Agreement',
      'Peace Treaty',
      'Sanctions Imposed',
      'Embassy Closure',
      'Cultural Exchange'
    ]
  };

  private eventDescriptions = {
    economic: [
      'Global markets experience significant volatility due to uncertain economic conditions.',
      'International trade tensions escalate, affecting global supply chains.',
      'World leaders convene to discuss economic recovery strategies.',
      'Major currency experiences rapid devaluation, impacting international trade.',
      'Technology sector faces major corrections after overvaluation concerns.',
      'Critical resource prices surge due to supply constraints.'
    ],
    political: [
      'Democratic elections bring new leadership and policy changes.',
      'Military forces overthrow civilian government in sudden coup.',
      'International leaders meet to discuss global cooperation.',
      'Territorial disputes escalate along contested borders.',
      'Mass population displacement creates humanitarian crisis.',
      'Long-standing diplomatic tensions finally see resolution.'
    ],
    environmental: [
      'Climate change effects intensify, requiring immediate action.',
      'Natural disasters cause widespread damage and displacement.',
      'Nations unite to sign comprehensive environmental protection treaty.',
      'Critical natural resources face depletion warnings.',
      'Revolutionary clean energy technology promises global change.',
      'Industrial pollution reaches crisis levels in major cities.'
    ],
    crisis: [
      'Coordinated terrorist attacks disrupt global security.',
      'Infectious disease spreads rapidly across international borders.',
      'Nuclear facility incident raises global safety concerns.',
      'Sophisticated cyber attacks target critical infrastructure.',
      'Agricultural failures lead to widespread food insecurity.',
      'Water scarcity reaches critical levels in populated regions.'
    ],
    diplomatic: [
      'Historic alliance formed between former adversaries.',
      'Comprehensive trade agreement opens new economic opportunities.',
      'Long-standing conflict finally resolved through negotiations.',
      'International sanctions imposed on aggressive nation.',
      'Diplomatic relations severed amid escalating tensions.',
      'Cultural and educational exchanges strengthen international bonds.'
    ]
  };

  generateRandomEvent(turn: number): WorldEvent {
    const eventTypes = Object.keys(this.eventTemplates) as (keyof typeof this.eventTemplates)[];
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    
    const templates = this.eventTemplates[eventType];
    const descriptions = this.eventDescriptions[eventType];
    
    const titleIndex = Math.floor(Math.random() * templates.length);
    const title = templates[titleIndex];
    const description = descriptions[titleIndex];
    
    const impact = this.generateEventImpact(eventType);
    
    return {
      id: `event-${turn}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title,
      description,
      type: eventType,
      impact,
      turn,
      affectedNations: this.selectAffectedNations()
    };
  }

  private generateEventImpact(eventType: string): number {
    const baseImpacts = {
      economic: () => (Math.random() - 0.5) * 20,
      political: () => (Math.random() - 0.5) * 15,
      environmental: () => (Math.random() - 0.3) * 10, // Usually negative
      crisis: () => -Math.random() * 25, // Always negative
      diplomatic: () => (Math.random() - 0.3) * 12
    };

    return Math.round(baseImpacts[eventType as keyof typeof baseImpacts]?.() || 0);
  }

  private selectAffectedNations(): string[] {
    const allNations = ['usa', 'china', 'germany', 'japan', 'russia', 'india', 'brazil', 'uk'];
    const numAffected = Math.floor(Math.random() * 4) + 1; // 1-4 nations
    
    const shuffled = allNations.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numAffected);
  }

  async makeNationDecisions(nation: Nation, events: WorldEvent[], allNations: Nation[]): Promise<any> {
    // Simulate AI decision making based on nation's characteristics
    const decisions = {
      policyChanges: this.generatePolicyChanges(nation, events),
      diplomaticActions: this.generateDiplomaticActions(nation, allNations),
      economicDecisions: this.generateEconomicDecisions(nation, events),
      militaryDecisions: this.generateMilitaryDecisions(nation, events)
    };

    // Add small delay to simulate processing
    await new Promise(resolve => setTimeout(resolve, 100));

    return decisions;
  }

  private generatePolicyChanges(nation: Nation, events: WorldEvent[]): any {
    const relevantEvents = events.filter(event => 
      event.affectedNations.includes(nation.id) || event.affectedNations.length === 0
    );

    const changes: any = {};

    relevantEvents.forEach(event => {
      switch (event.type) {
        case 'economic':
          changes.economy = (changes.economy || 0) + (event.impact > 0 ? 5 : -3);
          break;
        case 'environmental':
          changes.environment = (changes.environment || 0) + (event.impact < 0 ? 8 : -2);
          break;
        case 'crisis':
          changes.defense = (changes.defense || 0) + 10;
          changes.diplomacy = (changes.diplomacy || 0) - 5;
          break;
        case 'diplomatic':
          changes.diplomacy = (changes.diplomacy || 0) + (event.impact > 0 ? 8 : -5);
          break;
      }
    });

    return changes;
  }

  private generateDiplomaticActions(nation: Nation, allNations: Nation[]): any {
    const actions = [];
    
    // Randomly decide on diplomatic initiatives
    if (Math.random() < 0.3) {
      const potentialPartners = allNations.filter(n => n.id !== nation.id);
      const partner = potentialPartners[Math.floor(Math.random() * potentialPartners.length)];
      
      actions.push({
        type: 'trade_agreement',
        target: partner.id,
        success: Math.random() > 0.5
      });
    }

    if (Math.random() < 0.2) {
      actions.push({
        type: 'alliance_proposal',
        target: 'random',
        success: Math.random() > 0.6
      });
    }

    return actions;
  }

  private generateEconomicDecisions(nation: Nation, events: WorldEvent[]): any {
    const decisions = [];
    
    // Economic policy adjustments based on events
    const economicEvents = events.filter(e => e.type === 'economic');
    
    if (economicEvents.length > 0) {
      const avgImpact = economicEvents.reduce((sum, e) => sum + e.impact, 0) / economicEvents.length;
      
      if (avgImpact < -10) {
        decisions.push('stimulus_package');
      } else if (avgImpact > 10) {
        decisions.push('inflation_control');
      }
    }

    // Random economic initiatives
    if (Math.random() < 0.4) {
      const initiatives = ['infrastructure_investment', 'tax_reform', 'trade_expansion', 'tech_innovation'];
      decisions.push(initiatives[Math.floor(Math.random() * initiatives.length)]);
    }

    return decisions;
  }

  private generateMilitaryDecisions(nation: Nation, events: WorldEvent[]): any {
    const decisions = [];
    
    // Military response to crisis events
    const crisisEvents = events.filter(e => e.type === 'crisis');
    
    if (crisisEvents.length > 0) {
      decisions.push('increase_readiness');
      
      if (nation.military > 70) {
        decisions.push('deploy_peacekeeping');
      }
    }

    // Random military initiatives
    if (Math.random() < 0.3) {
      const initiatives = ['modernization_program', 'joint_exercises', 'defense_cooperation'];
      decisions.push(initiatives[Math.floor(Math.random() * initiatives.length)]);
    }

    return decisions;
  }
}