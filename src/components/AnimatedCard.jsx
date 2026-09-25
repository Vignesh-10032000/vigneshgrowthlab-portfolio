import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const AnimatedCard = ({
  children,
  className = "",
  glowColor = "rgba(75, 114, 232, 0.4)",
  accentColor = "bg-[#4B72E8]",
  showCornerDot = true,
  onClick,
  ...props
}) => {
  const cardRef = useRef(null);
  const glareRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const xTilt = gsap.quickTo(card, "rotationY", { duration: 0.35, ease: "power3.out" });
    const yTilt = gsap.quickTo(card, "rotationX", { duration: 0.35, ease: "power3.out" });

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Set mouse position for spotlight
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // 3D Tilt Physics
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = -((y - centerY) / centerY) * 8;
      const rotateY = ((x - centerX) / centerX) * 8;

      xTilt(rotateY);
      yTilt(rotateX);

      // Glare mapping
      if (glareRef.current) {
        gsap.to(glareRef.current, {
          x: x - rect.width / 2,
          y: y - rect.height / 2,
          opacity: 0.25,
          duration: 0.2
        });
      }
    };

    const handleMouseLeave = () => {
      xTilt(0);
      yTilt(0);
      if (glareRef.current) {
        gsap.to(glareRef.current, { opacity: 0, duration: 0.3 });
      }
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`relative group transform-gpu perspective-[1000px] will-change-transform ${className}`}
      {...props}
    >
      {/* Outer Neon Glow Aura */}
      <div 
        className="absolute -inset-1 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, transparent 70%)`
        }}
      />

      {/* Main Glass Card Surface */}
      <div className="relative h-full w-full bg-[#141414]/90 backdrop-blur-2xl rounded-3xl border border-white/10 group-hover:border-[#4B72E8]/60 p-6 sm:p-8 shadow-2xl transition-colors duration-500 overflow-hidden">
        
        {/* Real-time Mouse Spotlight Layer */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: 'radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(75,114,232,0.22), transparent 70%)'
          }}
        />

        {/* Specular Glare Reflection */}
        <div 
          ref={glareRef}
          className="absolute inset-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transform-gpu z-20 opacity-0"
        />

        {/* Card Content */}
        <div className="relative z-30 h-full flex flex-col justify-between">
          {children}
        </div>

        {/* Glowing Corner Accent Dot */}
        {showCornerDot && (
          <div className={`absolute bottom-3.5 right-3.5 w-2 h-2 rounded-full ${accentColor} group-hover:shadow-[0_0_15px_#4B72E8] transition-all z-40`} />
        )}
      </div>
    </div>
  );
};

export default AnimatedCard;
