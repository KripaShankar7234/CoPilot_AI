import React from 'react';
import { motion } from 'framer-motion';
import { Activity, CheckCircle, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', focus: 40 },
  { name: 'Tue', focus: 30 },
  { name: 'Wed', focus: 60 },
  { name: 'Thu', focus: 80 },
  { name: 'Fri', focus: 50 },
];

const Dashboard = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold mb-8">Productivity Board</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Tasks Completed" value="12" icon={<CheckCircle className="text-green-400" />} />
                <StatCard title="Focus Hours" value="28h" icon={<Clock className="text-indigo-400" />} />
                <StatCard title="AI Interactions" value="154" icon={<Activity className="text-pink-400" />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-panel p-6">
                    <h3 className="text-xl font-semibold mb-4">Focus Trend</h3>
                    <div className="h-64">
                         <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <XAxis dataKey="name" stroke="#64748b" />
                                <YAxis stroke="#64748b" />
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                                <Line type="monotone" dataKey="focus" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass-panel p-6 overflow-hidden">
                    <h3 className="text-xl font-semibold mb-4 text-indigo-300">AI Suggested Next Steps</h3>
                    <div className="space-y-3">
                        <TaskSuggestion title="Review React components" time="25 min" />
                        <TaskSuggestion title="Read Hackathon Idea output" time="10 min" />
                        <TaskSuggestion title="Complete Auth implementation" time="45 min" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon }) => (
    <motion.div whileHover={{ scale: 1.02 }} className="glass-panel p-6 flex flex-col justify-center">
        <div className="flex items-center justify-between mb-4">
           <span className="text-gray-400 font-medium">{title}</span>
           {icon}
        </div>
        <div className="text-4xl font-black">{value}</div>
    </motion.div>
);

const TaskSuggestion = ({ title, time }) => (
    <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer">
        <span className="font-medium text-gray-200">{title}</span>
        <span className="text-sm text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded-md">{time}</span>
    </div>
);

export default Dashboard;
