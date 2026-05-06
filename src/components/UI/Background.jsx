export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#020617]">
      {/* Premium Dual Radial Gradients */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{ 
          backgroundImage: `
            radial-gradient(circle at 0% 0%, #1e1b4b 0%, transparent 50%),
            radial-gradient(circle at 100% 100%, #1e1b4b 0%, transparent 50%)
          `
        }}
      />

      {/* Grainy Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
}
