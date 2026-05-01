import React from 'react';
import { Settings as SettingsIcon, Save } from 'lucide-react';

const Settings = () => {
    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold flex items-center mb-8"><SettingsIcon className="mr-3 text-gray-300" /> Platform Settings</h1>

            <div className="glass-panel p-8 space-y-6">
                <div>
                    <h3 className="text-lg font-semibold mb-4 border-b border-white/10 pb-2">Profile</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Display Name</label>
                            <input type="text" className="w-full bg-gray-900 border border-white/10 rounded-lg px-4 py-2 text-white outline-none" defaultValue="User Name" />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Role</label>
                            <select className="w-full bg-gray-900 border border-white/10 rounded-lg px-4 py-2 text-white outline-none">
                                <option>Developer</option>
                                <option>Student</option>
                                <option>Creator</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4 border-b border-white/10 pb-2">AI Preferences</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Default AI Model</label>
                            <select className="w-full bg-gray-900 border border-white/10 rounded-lg px-4 py-2 text-white outline-none">
                                <option>Gemini 2.5 Flash (Fast)</option>
                                <option>Gemini 2.5 Pro (Advanced)</option>
                            </select>
                        </div>
                        <div className="flex items-center space-x-3">
                            <input type="checkbox" className="w-5 h-5 rounded border-white/10 bg-gray-900" defaultChecked />
                            <span className="text-gray-300">Save Conversation History</span>
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg font-medium flex items-center transition-colors">
                        <Save className="w-4 h-4 mr-2" /> Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
