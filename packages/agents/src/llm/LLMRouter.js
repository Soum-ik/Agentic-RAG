const { ChatOpenAI } = require('@langchain/openai');
const { ChatAnthropic } = require('@langchain/anthropic');
const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');

class LLMRouter {
  constructor() {
    this.llms = {};

    if (process.env.OPENAI_API_KEY) {
      this.llms.openai = new ChatOpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        modelName: 'gpt-4',
      });
    }
    if (process.env.CLAUDE_API_KEY) {
      this.llms.anthropic = new ChatAnthropic({
        apiKey: process.env.CLAUDE_API_KEY,
        modelName: 'claude-3-opus-20240229',
      });
    }
    if (process.env.GEMINI_API_KEY) {
      this.llms.google = new ChatGoogleGenerativeAI({
        apiKey: process.env.GEMINI_API_KEY,
        modelName: 'gemini-pro',
      });
    }

    console.log('LLMRouter initialized with available models.');
  }

  /**
   * Gets the requested LLM provider.
   * @param {string} provider - The name of the LLM provider (e.g., 'openai').
   * @returns {object} The LangChain LLM instance.
   */
  getLlm(provider = 'openai') { // Default to OpenAI
    const llm = this.llms[provider];
    if (!llm) {
      throw new Error(`LLM provider '${provider}' is not available or configured.`);
    }
    return llm;
  }

  /**
   * Runs the LLM with a given prompt.
   * @param {string} prompt - The prompt to send to the LLM.
   * @param {string} provider - The LLM provider to use.
   * @returns {Promise<string>} The LLM's response content.
   */
  async run(prompt, provider) {
    const llm = this.getLlm(provider);
    console.log(`Routing prompt to ${provider}...`);
    const response = await llm.invoke(prompt);
    return response.content;
  }
}

module.exports = { LLMRouter };
