
import React, { useMemo } from 'react';
import { LayoutDashboard, Users, LogOut, TrendingUp, Calendar } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  // 자체 방문자 데이터 불러오기
  const visitorStats = useMemo(() => {
    const statsStr = localStorage.getItem('hawkeye_visitor_stats');
    if (!statsStr) return [];
    
    const stats = JSON.parse(statsStr);
    // 최근 7일 데이터만 정렬해서 추출
    return Object.entries(stats)
      .sort((a, b) => b[0].localeCompare(a[0]))
      .slice(0, 7)
      .map(([date, count]) => ({ date, count: count as number }));
  }, []);

  const totalVisitors = visitorStats.reduce((sum, item) => sum + item.count, 0);
  const todayCount = visitorStats.find(item => item.date === new Date().toISOString().split('T')[0])?.count || 0;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-8 flex flex-col justify-between hidden md:flex">
        <div className="space-y-12">
          <img src="https://i.imgur.com/sTJufRT.png" alt="Hawkeye" className="h-10 w-auto invert brightness-0 object-contain" />
          <nav className="space-y-6">
            <div className="flex items-center space-x-3 text-xs font-bold uppercase tracking-widest opacity-100 cursor-pointer">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </div>
            <div className="flex items-center space-x-3 text-xs font-bold uppercase tracking-widest opacity-50 hover:opacity-100 cursor-pointer">
              <Users size={18} />
              <span>User Stats</span>
            </div>
          </nav>
        </div>
        <button onClick={onLogout} className="flex items-center space-x-3 text-xs font-bold uppercase tracking-widest opacity-50 hover:opacity-100 transition-all">
          <LogOut size={18} />
          <span>Exit Admin</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-10">
          <header className="flex justify-between items-center">
            <div className="space-y-1">
              <h1 className="text-3xl font-light uppercase tracking-tight">Admin Dashboard</h1>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Web Traffic Overview (Self-Tracked)</p>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Current Status</p>
              <div className="flex items-center text-green-600 space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold uppercase tracking-widest">Active & Logging</span>
              </div>
            </div>
          </header>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-8 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-6">
                <Users className="text-gray-300" size={24} />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Daily Visitor</span>
              </div>
              <p className="text-4xl font-light mb-1">{todayCount}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Unique visitors today</p>
            </div>
            <div className="bg-white p-8 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-6">
                <TrendingUp className="text-gray-300" size={24} />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Last 7 Days</span>
              </div>
              <p className="text-4xl font-light mb-1">{totalVisitors}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Accumulated views</p>
            </div>
            <div className="bg-white p-8 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-6">
                <Calendar className="text-gray-300" size={24} />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tracking Info</span>
              </div>
              <p className="text-xl font-medium mb-1">Internal Log</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">No external API dependency</p>
            </div>
          </div>

          {/* Visitor List Card */}
          <div className="bg-white shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em]">Traffic History (Last 7 Days)</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {visitorStats.length > 0 ? (
                visitorStats.map((item, idx) => (
                  <div key={idx} className="px-8 py-6 flex justify-between items-center hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-gray-100 flex items-center justify-center text-[10px] font-bold">
                        {visitorStats.length - idx}
                      </div>
                      <span className="text-sm font-medium">{item.date}</span>
                      {item.date === new Date().toISOString().split('T')[0] && (
                        <span className="bg-black text-white px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest">Today</span>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{item.count} Visitors</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-20 text-center">
                  <p className="text-sm text-gray-400 italic">No traffic logs found yet.</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="pt-10 flex flex-col md:flex-row gap-6">
             <div className="flex-1 bg-black text-white p-10 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest">External Integration Status</h4>
                <ul className="space-y-3 text-[11px] font-light text-gray-400 uppercase tracking-widest">
                   <li className="flex justify-between border-b border-gray-800 pb-2"><span>Google Tag Manager</span> <span className="text-green-500 font-bold">Active</span></li>
                   <li className="flex justify-between border-b border-gray-800 pb-2"><span>Google Analytics 4</span> <span className="text-green-500 font-bold">Active</span></li>
                   <li className="flex justify-between"><span>GTM Container ID</span> <span>GTM-KGHM2227</span></li>
                </ul>
             </div>
             <div className="flex-1 border border-gray-200 p-10 flex flex-col justify-center items-center text-center">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">Support & Dev</p>
                <p className="text-sm font-light leading-relaxed">자체 통계 데이터는 브라우저의 로컬 저장소를 활용합니다.<br />정확한 마케팅 데이터는 Google Analytics를 참고하세요.</p>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
