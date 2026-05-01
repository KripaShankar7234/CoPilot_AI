import React, { useState } from 'react';
import axios from 'axios';
import { BookOpen, Search } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const StudyAssistant = () => {
    const [topic, setTopic] = useState('');
    const [mode, setMode] = useState('explain');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const handleStudy = async () => {
        if (!topic) return;
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/ai/study', { topic, mode });
            setResult(res.data.reply);
        } catch (err) {
            setResult('**Error generating study material.**');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full space-y-6">
             <h1 className="text-3xl font-bold flex items-center"><BookOpen className="mr-3 text-emerald-400" /> AI Study Assistant</h1>
             
             <div className="glass-panel p-6">
                <div className="flex space-x-4 mb-6">
                    {['explain', 'quiz', 'roadmap', 'summary'].map((m) => (
                        <button 
                            key={m}
                            onClick={() => setMode(m)}
                            className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${mode === m ? 'bg-emerald-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                        >
                            {m}
                        </button>
                    ))}
                </div>

                <div className="flex space-x-4">
                    <input 
                        type="text"
                        className="flex-1 bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500"
                        placeholder="Enter a topic or paste complete text..."
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleStudy()}
                    />
                    <button 
                        onClick={handleStudy}
                        disabled={loading}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold flex items-center transition-all"
                    >
                        {loading ? 'Thinking...' : <><Search className="w-5 h-5 mr-2" /> Generate</>}
                    </button>
                </div>
             </div>

             {result && (
                 <div className="flex-1 glass-panel p-8 overflow-y-auto">
                     <div className="prose prose-invert max-w-none prose-h2:text-emerald-400">
                         <ReactMarkdown>
                             {result}
                         </ReactMarkdown>
                     </div>
                 </div>
             )}
        </div>
    );
};

export default StudyAssistant;
