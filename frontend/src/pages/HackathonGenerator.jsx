import React, { useState } from 'react';
import axios from 'axios';
import { Lightbulb, Rocket } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const HackathonGenerator = () => {
    const [domain, setDomain] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!domain) return;
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/ai/hackathon', { domain });
            setResult(res.data.reply);
        } catch (err) {
            setResult('**Error formatting response.**');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full space-y-6">
             <h1 className="text-3xl font-bold flex items-center"><Lightbulb className="mr-3 text-yellow-400" /> Hackathon Idea Generator</h1>
             
             <div className="glass-panel p-6">
                <label className="block text-gray-400 mb-2">Target Domain / Problem Area</label>
                <div className="flex space-x-4">
                    <input 
                        type="text"
                        className="flex-1 bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-500"
                        placeholder="e.g. Healthcare, climate change, fintech, local community..."
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                    />
                    <button 
                        onClick={handleGenerate}
                        disabled={loading}
                        className="bg-yellow-600 hover:bg-yellow-500 text-white px-6 py-3 rounded-xl font-bold flex items-center transition-all"
                    >
                        {loading ? 'Brainstorming...' : <><Rocket className="w-5 h-5 mr-2" /> Generate</>}
                    </button>
                </div>
             </div>

             {result && (
                 <div className="flex-1 glass-panel p-8 overflow-y-auto">
                     <div className="prose prose-invert max-w-none prose-h2:text-yellow-400 prose-h3:text-yellow-200">
                         <ReactMarkdown>
                             {result}
                         </ReactMarkdown>
                     </div>
                 </div>
             )}
        </div>
    );
};

export default HackathonGenerator;
