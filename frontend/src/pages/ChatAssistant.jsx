import React, { useState } from 'react';
import axios from 'axios';
import { Send, Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ChatAssistant = () => {
    const [messages, setMessages] = useState([{ role: 'ai', content: 'Hello! I am your AI CoPilot. How can I assist you today?' }]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setInput('');
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:5000/api/ai/chat', { message: userMsg, history: messages.map(m => m.content) });
            setMessages(prev => [...prev, { role: 'ai', content: res.data.reply }]);
        } catch (err) {
            console.error(err);
            setMessages(prev => [...prev, { role: 'ai', content: '**Error**: Unable to reach AI server. Please check your API keys.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col">
            <div className="flex-1 glass-panel mb-4 p-6 overflow-y-auto flex flex-col space-y-6">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex space-x-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'ai' && (
                            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                                <Bot className="text-indigo-400 w-6 h-6" />
                            </div>
                        )}
                        <div className={`max-w-[70%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white/5 border border-white/10 rounded-tl-none'}`}>
                            {msg.role === 'user' ? (
                                <p className="whitespace-pre-wrap">{msg.content}</p>
                            ) : (
                                <div className="text-gray-200 prose prose-invert max-w-none">
                                    <ReactMarkdown
                                        components={{
                                            code({ node, inline, className, children, ...props }) {
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
                                        {msg.content}
                                    </ReactMarkdown>
                                </div>
                            )}
                        </div>
                        {msg.role === 'user' && (
                            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                                <User className="text-white w-6 h-6" />
                            </div>
                        )}
                    </div>
                ))}
                {loading && (
                    <div className="flex items-center space-x-2 text-gray-500">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                )}
            </div>

            <div className="glass-panel p-2 flex items-center">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask your AI CoPilot..."
                    className="flex-1 bg-transparent border-none outline-none px-4 text-white placeholder-gray-500"
                />
                <button
                    onClick={handleSend}
                    className="bg-indigo-600 hover:bg-indigo-500 p-3 rounded-xl transition-colors flexitems-center justify-center"
                    disabled={loading}
                >
                    <Send className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default ChatAssistant;
