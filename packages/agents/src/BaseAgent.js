/**
 * @abstract
 */
class BaseAgent {
  /**
   * Runs the agent with the given input.
   * This method must be implemented by subclasses.
   * @param {any} input - The input for the agent.
   * @returns {Promise<any>} The output from the agent.
   */
  async run(input) {
    throw new Error('The run method must be implemented by subclasses.');
  }
}

module.exports = { BaseAgent };
