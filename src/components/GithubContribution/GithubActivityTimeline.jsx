import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FiBook } from 'react-icons/fi';
import { FaCodeBranch } from 'react-icons/fa';
import { gsap } from 'gsap';

export default function GithubActivityTimeline() {
  const timelineRef = useRef(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = "drepradhit";

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
        const data = await response.json();
        
        const filteredRepos = data
          .filter(repo => repo.name.toLowerCase() !== 'nike')
          .slice(0, 5); 
          
        setRepos(filteredRepos);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };
    fetchGithubData();
  }, []);

  useLayoutEffect(() => {
    if (loading || !repos.length || !timelineRef.current) return;

    const rows = timelineRef.current.querySelectorAll('.github-activity-row');
    const bars = timelineRef.current.querySelectorAll('.github-activity-bar');

    if (rows.length) {
      gsap.from(rows, {
        autoAlpha: 0,
        y: 12,
        duration: 0.45,
        stagger: 0.06,
        ease: 'power3.out',
      });
    }

    if (bars.length) {
      gsap.from(bars, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.5,
        stagger: 0.06,
        ease: 'power3.out',
      });
    }
  }, [loading, repos]);

  const formatDate = (dateString, showYear = false) => {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' };
    if (showYear) options.year = 'numeric';
    return date.toLocaleDateString('id-ID', options);
  };

  if (loading) {
    return (
      <div className="w-full h-full min-h-[400px] bg-white rounded-xl border border-neutral-200/60 p-5 shadow-sm animate-pulse flex flex-col">
        <div className="h-3 bg-neutral-100 rounded w-1/3 mb-8"></div>
        <div className="space-y-6 flex-1">
          {[1,2,3,4].map(i => <div key={i} className="h-10 bg-neutral-50 rounded"></div>)}
        </div>
      </div>
    );
  }

  return (
    <div ref={timelineRef} className="w-full text-sm font-inter bg-white rounded-xl border border-neutral-200/60 p-5 shadow-sm h-full flex flex-col overflow-hidden">
      <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.15em] mb-6">Contribution activity</h3>
      
      <div className="relative pl-3 border-l border-neutral-100 ml-2 flex-1">
        
        <div className="relative -ml-2.5 flex items-center mb-6">
          <div className="bg-white px-2 py-0.5 text-[10px] font-bold text-neutral-500 rounded border border-neutral-100 shadow-sm uppercase tracking-wider">
            {new Date().toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
          </div>
          <div className="flex-1 h-px bg-neutral-100 ml-2" />
        </div>

        <div className="mb-8 relative">
          <div className="absolute -left-[20px] top-0 bg-white p-1 rounded-full text-neutral-400 border border-neutral-100 shadow-sm">
             <FaCodeBranch className="w-2.5 h-2.5" />
          </div>
          
          <div className="text-neutral-900 font-bold px-2 text-[13px] mb-4">
             Recent updates
          </div>

          <div className="flex flex-col gap-4 px-2">
            {repos.slice(0, 4).map((repo) => (
              <div key={repo.id} className="github-activity-row flex flex-col gap-1.5 group">
                <div className="flex items-center justify-between">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-[#007aff] hover:underline font-bold text-[12.5px] truncate max-w-[140px] sm:max-w-none">
                    {repo.name}
                  </a>
                  <span className="text-neutral-400 text-[10px] whitespace-nowrap">Update {formatDate(repo.updated_at)}</span>
                </div>
                <div className="w-full h-[3px] bg-neutral-50 rounded-full overflow-hidden">
                   <div 
                    className="github-activity-bar h-full bg-[#2da44e]/70 rounded-full"
                    style={{ 
                      width: `${Math.min(95, Math.max(15, ((repo.stargazers_count * 2) + repo.forks_count + (repo.size / 1000)) * 5 + 20))}%` 
                    }} 
                   />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-[20px] top-0 bg-white p-1 rounded-full text-neutral-400 border border-neutral-100 shadow-sm">
             <FiBook className="w-2.5 h-2.5" />
          </div>
          
          <div className="text-neutral-900 font-bold px-2 text-[13px] mb-3">
             Repositories
          </div>

          <div className="flex flex-col gap-3.5 px-2">
            {repos.slice(0, 3).map((repo) => (
              <div key={`create-${repo.id}`} className="github-activity-row flex items-center justify-between group">
                <div className="flex items-center gap-2 text-[12px] truncate">
                  <FiBook className="text-neutral-300 w-3 h-3 flex-shrink-0" />
                  <span className="text-neutral-700 font-medium truncate">{repo.name}</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-neutral-400 flex-shrink-0">
                   {repo.language && (
                     <div className="flex items-center gap-1 hidden sm:flex">
                       <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: repo.language === 'TypeScript' ? '#3178c6' : repo.language === 'JavaScript' ? '#f7df1e' : '#888' }} />
                       <span className="font-medium text-[9px]">{repo.language}</span>
                     </div>
                   )}
                   <span className="font-medium">{formatDate(repo.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
