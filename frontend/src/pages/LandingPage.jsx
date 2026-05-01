import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Bot, Code, Users } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/30 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-600/20 blur-[150px] rounded-full"></div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="z-10 text-center max-w-4xl px-6"
            >
                <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    <span className="text-sm text-gray-300">CoPilot 2.0 is now live</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight leading-none">
                    Enhance Your <br/>
                    <span className="gradient-text">Human Potential</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Collaborate with an intelligent AI partner to code faster, learn better, and build the future. 
                </p>

                <div className="flex items-center justify-center space-x-6">
                    <button 
                        onClick={() => navigate('/app/dashboard')}
                        className="bg-white text-gray-950 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all hover:scale-105"
                    >
                        Enter Workspace
                    </button>
                    <button className="glass-panel px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
                        Learn More
                    </button>
                </div>
            </motion.div>

            {/* Feature Cards Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 z-10 max-w-5xl px-6">
                <FeatureCard 
                    icon={<Bot className="text-indigo-400" />}
                    title="Smart Chat"
                    desc="Context-aware AI assistance for daily tasks."
                />
                <FeatureCard 
                    icon={<Code className="text-pink-400" />}
                    title="Code Generation"
                    desc="Snippets, debugging, and code reviews instantly."
                />
                <FeatureCard 
                    icon={<Users className="text-purple-400" />}
                    title="Idea Planner"
                    desc="End-to-end hackathon planning and roadmaps."
                />
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <motion.div 
        whileHover={{ y: -10 }}
        className="glass-panel p-6 flex flex-col items-center text-center cursor-pointer hover:border-white/30 transition-all"
    >
        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{desc}</p>
    </motion.div>
)

export default LandingPage;
