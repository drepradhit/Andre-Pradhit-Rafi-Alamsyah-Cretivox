import { useRef, useState } from "react";

const ProfileCard = ({ avatarUrl = "/assets/andre.jpeg", className = "" }) => {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (event) => {
    if (!containerRef.current || window.innerWidth < 768) return;

    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (event.clientX - rect.left) / rect.width - 0.5;
    const yPct = (event.clientY - rect.top) / rect.height - 0.5;

    setTilt({
      x: yPct * -8,
      y: xPct * 8,
    });
  };

  const handleMouseEnter = () => {
    if (window.innerWidth >= 768) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex aspect-[4/6] w-[250px] items-center justify-center sm:w-[330px] ${className}`.trim()}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1500px" }}
    >
      <div
        className="relative aspect-[4/5] w-[220px] cursor-default pointer-events-none transition-transform duration-300 ease-out sm:w-[300px]"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-sm border border-neutral-100 bg-white shadow-xl transition-all duration-300 ease-out"
          style={{
            transform: `translateZ(-60px) rotate(${isHovered ? -12 : -8}deg) translate(${isHovered ? -25 : -15}px, ${isHovered ? 15 : 10}px) scale(${isHovered ? 1.05 : 1})`,
            opacity: isHovered ? 0.8 : 0.6,
          }}
        >
          <img src={avatarUrl} alt="" className="h-full w-full object-cover grayscale-[0.5]" />
        </div>

        <div
          className="absolute inset-0 flex flex-col rounded-sm border border-neutral-100 bg-[#f9f9f9] p-4 shadow-lg transition-transform duration-300 ease-out"
          style={{
            transform: `translateZ(-30px) rotate(${isHovered ? 10 : 6}deg) translate(${isHovered ? 25 : 15}px, ${isHovered ? -10 : -5}px) scale(${isHovered ? 1.02 : 1})`,
          }}
        >
          <div
            className="relative h-full w-full overflow-hidden border border-neutral-200/50"
            style={{
              backgroundImage: "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)",
              backgroundSize: "15px 15px",
            }}
          >
            <span className="absolute left-2 top-2 text-[10px] font-black uppercase tracking-tighter text-neutral-300 opacity-50">
              Viz. 04
            </span>
          </div>
        </div>

        <div
          className="absolute inset-0 flex flex-col border border-neutral-100 bg-white p-3 shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition-transform duration-300 ease-out"
          style={{
            transform: `translateZ(${isHovered ? 40 : 1}px) scale(${isHovered ? 1.06 : 1})`,
          }}
        >
          <div className="relative h-full overflow-hidden rounded-[2px]">
            <img className="h-full w-full object-cover" src={avatarUrl} alt="Andre Pradhit" />
            <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
