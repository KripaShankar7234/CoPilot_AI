import React, { useState } from 'react';
import axios from 'axios';
import { Code, Play } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodingAssistant = () => {
    const [prompt, setPrompt] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [task, setTask] = useState('Write Function');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!prompt) return;
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/ai/code', { prompt, language, task });
            setResult(res.data.reply);
        } catch (err) {
            setResult('**Error generating code.** Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full space-y-6">
            <h1 className="text-3xl font-bold flex items-center"><Code className="mr-3 text-pink-400" /> AI Coding Pro</h1>
            
            <div className="glass-panel p-6">
                <div className="flex space-x-4 mb-4">
                    <select 
                        value={language} 
                        onChange={(e) => setLanguage(e.target.value)}
                        className="bg-gray-900 border border-white/10 text-white rounded-lg px-4 py-2 outline-none"
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="cpp">C++</option>
                        <option value="java">Java</option>
                        <option value="rust">Rust</option>
                    </select>

                    <select 
                        value={task} 
                        onChange={(e) => setTask(e.target.value)}
                        className="bg-gray-900 border border-white/10 text-white rounded-lg px-4 py-2 outline-none"
                    >
                        <option value="Write Function">Write Function</option>
                        <option value="Debug Code">Debug Code</option>
                        <option value="Optimize Code">Optimize Code</option>
                        <option value="Explain Code">Explain Code</option>
                    </select>
                </div>
                
                <textarea 
                    className="w-full bg-gray-900/50 border border-white/10 rounded-xl p-4 text-white outline-none min-h-[120px] resize-none focus:border-indigo-500"
                    placeholder="Describe what you want to build or paste code here..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                
                <div className="mt-4 flex justify-end">
                    <button 
                        onClick={handleGenerate}
                        disabled={loading}
                        className="bg-pink-600 hover:bg-pink-500 text-white px-6 py-2 rounded-lg font-medium flex items-center transition-colors"
                    >
                        {loading ? 'Processing...' : <><Play className="w-4 h-4 mr-2" /> Execute</>}
                    </button>
                </div>
            </div>

            {result && (
                <div className="flex-1 glass-panel p-6 overflow-y-auto">
                    <h3 className="text-xl font-semibold mb-4 text-gray-300">Result</h3>
                    <div className="prose prose-invert max-w-none">
                        <ReactMarkdown
                            components={{
                                code({node, inline, className, children, ...props}) {
                                    const match = /language-(\w+)/.exec(className || '')
                                    return !inline && match ? (
                                        <SyntaxHighlighter
                                            style={vscDarkPlus}
                                            language={match[1]}
                                            PreTag="div"
                                            {...props}
                                        >
                                            {String(children).replace(/\n$/, '')}
                                        </SyntaxHighlighter>
                                    ) : (
                                        <code className="bg-black/30 px-1.5 py-0.5 rounded text-pink-300" {...props}>
                                            {children}
                                        </code>
                                    )
                                }
                            }}
                        >
                            {result}
                        </ReactMarkdown>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CodingAssistant;
