const { BaseAgent } = require('../BaseAgent');

class PlanningAgent extends BaseAgent {
  constructor() {
    super();
    console.log('PlanningAgent initialized.');
  }

  /**
   * Runs the planning agent to generate a plan.
   * @param {any} input - The user query or goal.
   * @returns {Promise<any>} A plan of action.
   */
  async run(input) {
    console.log('PlanningAgent running with input:', input);

    const localDataKeywords = ['docs', 'local', 'internal'];
    const lowercasedInput = input.toLowerCase();

    if (localDataKeywords.some(keyword => lowercasedInput.includes(keyword))) {
      return {
        plan: 'Use LocalDataAgent to query internal documents.',
        agent: 'LocalDataAgent',
        query: input,
      };
    }

    // Default plan if no specific agent is triggered
    return { plan: 'No specific agent triggered. Defaulting to general knowledge.' };
  }
}

module.exports = { PlanningAgent };
