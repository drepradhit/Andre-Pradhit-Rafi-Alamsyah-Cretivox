import { useState, useEffect } from "react";

export default function TerminalRoles({ roles = ["UI/UX Designer", "Mobile Developer", "Web Developer", "Graphic Designer", "Video Editor"] }) {
  const [currentRoleIdx, setCurrentRoleIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const role = roles[currentRoleIdx];
    
    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayedText(role.substring(0, displayedText.length + 1));
        setTypingSpeed(70);

        if (displayedText === role) {
          setIsDeleting(true);
          setTypingSpeed(1500);
        }
      } else {
        setDisplayedText(role.substring(0, displayedText.length - 1));
        setTypingSpeed(30);

        if (displayedText === "") {
          setIsDeleting(false);
          setCurrentRoleIdx((prev) => (prev + 1) % roles.length);
          setTypingSpeed(300);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIdx, roles, typingSpeed]);

  return (
    <div className="w-full max-w-full bg-white border border-neutral-200/60 rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] font-mono">
      <div className="flex items-center px-4 py-3 bg-[#f5f5f5] border-b border-neutral-200/60 relative">
        <div className="flex gap-2 z-10">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs text-neutral-400 font-sans font-medium tracking-wide">Role - zsh</span>
        </div>
      </div>

      <div className="p-4 md:p-5 min-h-[90px] flex flex-col gap-1.5 bg-white overflow-hidden text-sm md:text-base">
        <div className="flex flex-row items-center flex-nowrap gap-2 w-full">
          <span className="text-emerald-500 font-medium whitespace-nowrap shrink-0">~ $</span>
          <span className="text-neutral-700 tracking-tight whitespace-nowrap shrink-0">role</span>
        </div>
        <div className="flex flex-row items-center flex-nowrap w-full text-neutral-500">
          <span className="tracking-tight whitespace-nowrap shrink-0 flex items-center h-6">
            {displayedText}
            <span className="terminal-cursor ml-1 inline-block h-4 w-2 bg-neutral-300 md:h-5 md:w-2.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
