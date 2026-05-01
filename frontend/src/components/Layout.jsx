import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Code, BookOpen, Lightbulb, Presentation, Settings, Zap } from 'lucide-react';

const Layout = () => {
  const navItems = [
    { name: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
    { name: 'AI Chat', path: '/app/chat', icon: MessageSquare },
    { name: 'Coding Pro', path: '/app/code', icon: Code },
    { name: 'Study Buddy', path: '/app/study', icon: BookOpen },
    { name: 'Idea Generator', path: '/app/hackathon', icon: Lightbulb },
    { name: 'Project Planner', path: '/app/plan', icon: Presentation },
    { name: 'Settings', path: '/app/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-white/10 glass-panel m-4 flex flex-col">
        <div className="p-6 flex items-center space-x-3">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2 rounded-xl">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">CoPilot AI</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto pb-4">
          {navItems.map((item) => (
             <NavLink
             key={item.name}
             to={item.path}
             className={({ isActive }) =>
               `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                 isActive 
                   ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] border border-white/20' 
                   : 'text-gray-400 hover:bg-white/5 hover:text-white'
               }`
             }
           >
             <item.icon className="w-5 h-5" />
             <span className="font-medium">{item.name}</span>
           </NavLink>
          ))}
        </nav>

        {/* User profile snippet */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center space-x-3 px-4 py-2 hover:bg-white/5 rounded-xl cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 flex items-center justify-center text-sm font-bold">
              U
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">User Name</span>
              <span className="text-xs text-gray-400">Pro Plan</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-8 backdrop-blur-md bg-transparent z-10 border-b border-white/5">
            <h2 className="text-xl font-semibold tracking-wide">Workspace</h2>
            <div className="flex items-center space-x-4">
                <button className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors border border-white/10">
                   <div className="w-5 h-5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse"></div>
                </button>
            </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-8 relative z-0">
           <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
