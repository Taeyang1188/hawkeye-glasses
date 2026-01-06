
import React, { useState } from 'react';
import { ArrowLeft, Lock } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onCancel: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onCancel }) => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id === 'admin' && pw === '1230!!!') {
      onLoginSuccess();
    } else {
      alert('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-12">
        <div className="text-center space-y-4">
          <button onClick={onCancel} className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 mx-auto hover:text-black">
            <ArrowLeft size={14} /> <span>Back to Home</span>
          </button>
          <img src="https://i.imgur.com/sTJufRT.png" alt="Hawkeye" className="h-12 w-auto mx-auto object-contain" />
          <h2 className="text-xl font-light uppercase tracking-widest pt-4">Administrator Access</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Administrator ID</label>
              <input 
                type="text" 
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Password</label>
              <input 
                type="password" 
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent"
                required
              />
            </div>
          </div>
          
          <button type="submit" className="w-full bg-[#191919] text-white py-5 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center space-x-2 hover:bg-black transition-all">
            <Lock size={14} />
            <span>LOGIN TO DASHBOARD</span>
          </button>
        </form>

        <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest leading-relaxed">
          Authorized personnel only.<br />
          All access attempts are logged for security purposes.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
