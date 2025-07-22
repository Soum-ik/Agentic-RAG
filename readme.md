# 🧠 Agentic-RAG

> **Agentic Retrieval-Augmented Generation (RAG)** powered by autonomous AI agents, memory, and tool selection for flexible, intelligent, and accurate responses.

---

## 🚀 Overview

**Agentic-RAG** improves on traditional RAG systems by introducing AI agents that can:
- Understand and reason over user queries
- Use **short-term and long-term memory**
- Select appropriate tools and data sources
- Dynamically refine queries and execute multi-step plans
- Coordinate with LLMs to generate precise, contextual answers

---

## 🧭 How It Works

1. **User submits a query**  
   → Routed to the `AggregatorAgent`.

2. **Agent Planning + Memory Retrieval**
   - Uses short-term (chat/session) and long-term (vector DB) memory.
   - Determines the best retrieval strategy (e.g., which tools/agents to activate).

3. **Tool & Agent Execution**
   - Invokes MCP agents to fetch relevant context from:
     - 🔍 Web search engines
     - 🧠 Local/internal documents
     - ☁️ Cloud APIs (e.g., Notion, Airtable, GitHub, etc.)
     - 📚 Vector databases (e.g., Pinecone, Chroma)

4. **LLM Execution**
   - Constructs final input with system prompt + query + retrieved context.
   - Sends to an LLM (OpenAI GPT, Claude, Gemini).
   - Receives and formats the response.

5. **Return Answer**
   - Final output returned to user.
   - Optionally logs agent decisions and trace for debugging/explainability.

---

## 🧩 Components

| Module             | Description |
|--------------------|-------------|
| `AggregatorAgent`  | Core brain — routes input, invokes memory and planners |
| `MemoryManager`    | Handles vector DB and in-session memory |
| `PlanningAgent`    | Uses ReAct, CoT, or tool-calling to plan task execution |
| `MCP Agents`       | Fetch data from web, internal docs, APIs |
| `LLM Interface`    | Sends final prompt/context to model and returns output |
| `Frontend`         | WindSef-powered user interface (or custom UI) |

---

## 🛠 Tech Stack

- **Node.js / LangChain.js**
- **OpenAI / Claude / Gemini APIs**
- **Pinecone / Chroma / Weaviate** for vector search
- **Tavily / SerpAPI** for web data
- **WindSef** for launch, UX, and user flows

---

## 💬 Example Flow

```text
User: "What are the top 3 risks in our Q2 roadmap?"

→ AggregatorAgent receives query
→ PlanningAgent activates:
    • Long-term memory lookup (roadmap docs)
    • Web search for market/comparison data
→ Agents return relevant snippets
→ Final context sent to Claude or GPT
→ Response: "Top 3 risks are infrastructure scaling, hiring bandwidth, and API delays."
