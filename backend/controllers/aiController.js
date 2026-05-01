const { GoogleGenAI } = require('@google/genai');

const getAiClient = () => {
    return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
};

exports.handleChat = async (req, res) => {
    try {
        const { message, history } = req.body;
        const ai = getAiClient();
        
        let promptList = history ? [...history, message] : [message];
        let promptString = promptList.join('\n');

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `System: You are an AI Co-Pilot, a helpful, intelligent assistant.\nUser: ${promptString}`
        });

        res.json({ reply: response.text });
    } catch (error) {
        console.error('AI Chat Error:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
};

exports.handleCoding = async (req, res) => {
    try {
        const { prompt, language, task } = req.body;
        const ai = getAiClient();
        
        const systemPrompt = `You are an expert AI Coding Assistant. Task: ${task}. Preferred Language: ${language || 'Any'}. Provide concise, correct code with helpful comments. Use markdown for code blocks.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `System: ${systemPrompt}\nUser Request: ${prompt}`
        });

        res.json({ reply: response.text });
    } catch (error) {
        console.error('AI Code Error:', error);
        res.status(500).json({ error: 'Failed to generate code' });
    }
};

exports.handleStudy = async (req, res) => {
    try {
        const { topic, mode } = req.body;
        const ai = getAiClient();
        
        let systemPrompt = "You are an AI Study Assistant. Help the user learn effectively.";
        if (mode === 'explain') systemPrompt += " Explain the topic simply and clearly, using analogies if helpful.";
        if (mode === 'quiz') systemPrompt += " Generate a short 5-question multiple choice quiz on the topic.";
        if (mode === 'roadmap') systemPrompt += " Create a step-by-step learning roadmap for the topic.";
        if (mode === 'summary') systemPrompt += " Summarize the provided text focusing on key concepts.";

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `System: ${systemPrompt}\nTopic/Input: ${topic}`
        });

        res.json({ reply: response.text });
    } catch (error) {
        console.error('AI Study Error:', error);
        res.status(500).json({ error: 'Failed to generate study materials' });
    }
};

exports.handleHackathon = async (req, res) => {
    try {
        const { domain } = req.body;
        const ai = getAiClient();
        
        const systemPrompt = `You are a Hackathon Idea Generator. The user will provide a domain or problem area. 
Generate a comprehensive project idea including:
1. Project Name
2. Problem Statement
3. Proposed Solution
4. Key Features
5. Recommended Tech Stack
6. Basic Architecture overview.
Format the output in clear Markdown.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `System: ${systemPrompt}\nDomain: ${domain}`
        });

        res.json({ reply: response.text });
    } catch (error) {
        console.error('AI Hackathon Error:', error);
        res.status(500).json({ error: 'Failed to generate hackathon idea' });
    }
};

exports.handleProjectPlan = async (req, res) => {
    try {
        const { projectIdea } = req.body;
        const ai = getAiClient();
        
        const systemPrompt = `You are an AI Project Planner. For the given project idea, generate:
1. Development Roadmap (Phases)
2. Task Breakdown (Epics and tickets)
3. Estimated Timeline
4. Required Technologies
Format the output in clear Markdown.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `System: ${systemPrompt}\nProject Idea: ${projectIdea}`
        });

        res.json({ reply: response.text });
    } catch (error) {
        console.error('AI Project Plan Error:', error);
        res.status(500).json({ error: 'Failed to generate project plan' });
    }
};

exports.handleGeneral = async (req, res) => {
    try {
        const { prompt, context } = req.body;
        const ai = getAiClient();
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `System: You are a helpful assistant.\n${context ? `Context: ${context}\n\n`: ''}Prompt: ${prompt}`
        });

        res.json({ reply: response.text });
    } catch (error) {
        console.error('AI General Error:', error);
        res.status(500).json({ error: 'Failed to generate content' });
    }
};
