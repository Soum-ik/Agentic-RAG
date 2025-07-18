require('dotenv').config({ path: '../../.env' });
const express = require('express');

const { AggregatorAgent } = require('agents');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.post('/api/agent', async (req, res) => {
  try {
    const agent = new AggregatorAgent();
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({ error: 'Input is required' });
    }

    const result = await agent.run(input);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in /api/agent:', error);
    res.status(500).json({ error: 'Failed to process agent request.' });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
