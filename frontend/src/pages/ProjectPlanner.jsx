import React, { useState } from 'react';
import axios from 'axios';
import { Presentation, Layers } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ProjectPlanner = () => {
    const [projectIdea, setProjectIdea] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePlan = async () => {
        if (!projectIdea) return;
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/ai/project-plan', { projectIdea });
            setResult(res.data.reply);
        } catch (err) {
            setResult('**Error generating plan.**');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full space-y-6">
             <h1 className="text-3xl font-bold flex items-center"><Presentation className="mr-3 text-blue-400" /> AI Project Planner</h1>
             
             <div className="glass-panel p-6">
                <textarea 
                    className="w-full bg-gray-900 border border-white/10 rounded-xl p-4 text-white outline-none min-h-[100px] resize-none focus:border-blue-500 mb-4"
                    placeholder="Describe your project idea in detail..."
                    value={projectIdea}
                    onChange={(e) => setProjectIdea(e.target.value)}
                />
                <div className="flex justify-end">
                    <button 
                        onClick={handlePlan}
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold flex items-center transition-all"
                    >
                        {loading ? 'Planning...' : <><Layers className="w-5 h-5 mr-2" /> Generate Roadmap</>}
                    </button>
                </div>
             </div>

             {result && (
                 <div className="flex-1 glass-panel p-8 overflow-y-auto">
                     <div className="prose prose-invert max-w-none prose-h1:text-blue-400 prose-h2:text-blue-300">
                         <ReactMarkdown>
                             {result}
                         </ReactMarkdown>
                     </div>
                 </div>
             )}
        </div>
    );
};

export default ProjectPlanner;
