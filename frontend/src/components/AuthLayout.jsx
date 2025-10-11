import React from 'react';

const AuthLayout = ({ children, title }) => {
  return (
    // Main container with a dark base and overflow hidden for the aurora effect
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900 p-4">
      
      {/* Animated Aurora Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-[-10rem] left-[-10rem] w-96 h-96 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-5rem] right-[-5rem] w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full filter blur-3xl animate-pulse animation-delay-3000"></div>
        <div className="absolute top-[5rem] right-[5rem] w-72 h-72 bg-gradient-to-r from-orange-400 to-rose-500 rounded-full filter blur-3xl animate-pulse animation-delay-6000"></div>
      </div>

      {/* The glassmorphism form container with glare effect */}
      <div className="group relative w-full max-w-md bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-2xl z-10">
        
        {/* Mouse-following glare effect */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div className="absolute inset-[-200%] w-[400%] h-[400%] 
            opacity-0 group-hover:opacity-100 transition-opacity duration-500
            bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.08),_transparent_40%)]
            animate-mouse-glare">
          </div>
        </div>

        <div className="relative">
            <h2 className="text-3xl font-bold text-center text-white mb-6">{title}</h2>
            {children} {/* This is where the actual login/signup form will be rendered */}
        </div>
      </div>
    </div>
  );
};

// We need a way to pass mouse coordinates to our CSS for the glare effect.
// This small script, added here, does just that.
if (typeof window !== 'undefined') {
  document.body.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
  });
}

export default AuthLayout;

