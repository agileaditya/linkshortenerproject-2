'use client';

import { useState } from 'react';

// Pre-generate random particles to maintain React purity
function generateParticles() {
  return Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 6 + Math.random() * 8,
    opacity: Math.random() * 0.6 + 0.3,
    delay: Math.random() * 3,
  }));
}

export function TechVideoBackground() {
  // Use lazy initialization to generate particles only once
  const [particles] = useState(generateParticles);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
      {/* Matrix-style code rain effect */}
      <div className="absolute inset-0">
        {/* Vertical code lines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`line-${i}`}
            className="absolute text-white font-mono text-sm whitespace-nowrap font-semibold"
            style={{
              left: i < 6 ? `${i * 3}%` : `${80 + (i - 6) * 3}%`,
              animation: `slide-down ${20 + i * 1}s linear infinite`,
              fontSize: '0.875rem',
              letterSpacing: '2px',
              textShadow: '0 0 4px rgba(255, 255, 255, 0.4)',
              fontWeight: '600',
            }}
          >
            {`const ${['api', 'data', 'user', 'link', 'auth'][i % 5]} = await fetch();`}
            <br />
            {`if (${['status', 'error', 'loaded', 'valid'][i % 4]}) { return data; }`}
            <br />
            {`execute(${['query', 'request', 'process', 'analyze'][i % 4]});`}
            <br />
            {`console.log('${['processing', 'connecting', 'analyzing', 'rendering'][i % 4]}...');`}
            <br />
          </div>
        ))}
      </div>

      {/* Animated tech circles */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`circle-${i}`}
            className="absolute border border-blue-500/20 rounded-full"
            style={{
              width: `${100 + i * 80}px`,
              height: `${100 + i * 80}px`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              animation: `rotate-slow ${20 + i * 5}s linear infinite`,
              animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
              opacity: 0.1,
            }}
          />
        ))}
      </div>

      {/* Floating data particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={`particle-${particle.id}`}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              opacity: particle.opacity,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Glowing grid effect */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-cyan-500" />
        </svg>
      </div>

      <style jsx>{`
        @keyframes slide-down {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        @keyframes rotate-slow {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          50% {
            transform: translateY(-100px) translateX(50px);
            opacity: 0.3;
          }
          90% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
