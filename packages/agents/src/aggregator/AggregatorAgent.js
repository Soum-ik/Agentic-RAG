const { BaseAgent } = require('../BaseAgent');
const { MemoryModule } = require('../memory/MemoryModule');
const { PlanningAgent } = require('../planning/PlanningAgent');
const { LocalDataAgent } = require('../specialized/local-data/LocalDataAgent');
const { createStandardPrompt } = require('../llm/prompt-template');
const { LLMRouter } = require('../llm/LLMRouter');

class AggregatorAgent extends BaseAgent {
  constructor() {
    super();
    this.memory = new MemoryModule();
    this.planner = new PlanningAgent();
    this.agentRegistry = {
      LocalDataAgent: LocalDataAgent,
    };
    this.llmRouter = new LLMRouter();
    console.log('AggregatorAgent initialized with Memory, Planning, Agent Registry, and LLM Router.');
  }

  /**
   * Runs the agent with the given input.
   * @param {any} input - The input for the agent.
   * @returns {Promise<any>} The output from the agent.
   */
  async run(input) {
    console.log('AggregatorAgent running with input:', input);

    // 1. Add user input to short-term memory
    this.memory.addShortTermMemory({ user: input });

    // 2. Run the planner to get a course of action
    const plan = await this.planner.run(input);

    // 3. Add the plan to short-term memory
    this.memory.addShortTermMemory({ agent: plan });

    // 4. Execute the plan
    if (plan.agent && this.agentRegistry[plan.agent]) {
      console.log(`Executing plan with ${plan.agent}`);
      const AgentClass = this.agentRegistry[plan.agent];
      const agent = new AgentClass();
      const result = await agent.run(plan.query);

      // 5. Add agent's result to memory
      this.memory.addShortTermMemory({ agent: result });

      // 6. Create the final prompt for the LLM
      const finalPrompt = createStandardPrompt(
        input,
        this.memory.getShortTermMemory(),
        result
      );

      // 7. Route the prompt to the selected LLM
      const llmResponse = await this.llmRouter.run(finalPrompt);

      // 8. Normalize the output (placeholder)
      const finalResponse = {
        answer: llmResponse,
        source: result.source,
      };

      // 9. Add final response to memory
      this.memory.addShortTermMemory({ agent: finalResponse });

      return finalResponse;
    }

    console.log('No specific agent required by the plan. Returning the plan itself.');
    return plan;
  }
}


module.exports = { AggregatorAgent };
