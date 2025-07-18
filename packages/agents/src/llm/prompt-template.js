/**
 * Creates a standardized prompt for the LLM.
 * @param {string} userQuery - The original query from the user.
 * @param {Array<any>} memory - The conversation history from the MemoryModule.
 * @param {any} agentResult - The result from the specialized agent (e.g., LocalDataAgent).
 * @returns {string} The formatted prompt string.
 */
function createStandardPrompt(userQuery, memory, agentResult) {
  const memoryLog = memory.map(item => {
    if (item.user) return `User: ${item.user}`;
    if (item.agent) return `Agent: ${JSON.stringify(item.agent)}`;
    return '';
  }).join('\n');

  const prompt = `
You are a helpful AI assistant. Based on the following conversation history and the data retrieved by a specialized agent, please provide a comprehensive answer to the user's query.

## Conversation History:
${memoryLog}

## Retrieved Data:
Source: ${agentResult.source}
Data: ${agentResult.data}

## User's Query:
${userQuery}

## Your Answer:
`;

  return prompt;
}

module.exports = { createStandardPrompt };
