import React from 'react';
import { Trophy, TrendingUp, Users, Target } from 'lucide-react';
import type { HomePageStatsItem } from '@/types';

// Non-translatable presentation, keyed by index to the localized text below.
const STAT_META = [
  { icon: <Users className="w-8 h-8 text-white" />, gradient: 'from-blue-500 to-cyan-400' },
  { icon: <Target className="w-8 h-8 text-white" />, gradient: 'from-emerald-500 to-green-400' },
  // text-black for better contrast on the gold gradient
  { icon: <TrendingUp className="w-8 h-8 text-black" />, gradient: 'from-primary-500 to-amber-300' },
  { icon: <Trophy className="w-8 h-8 text-white" />, gradient: 'from-purple-600 to-pink-500' },
];

interface StatsSectionProps {
  items: HomePageStatsItem[];
}

const StatsSection: React.FC<StatsSectionProps> = ({ items }) => {
  const stats = items.map((text, i) => ({ ...text, ...STAT_META[i] }));

  return (
    <div className="relative -mt-20 z-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, id) => (
            <div
              key={id}
              className={`relative overflow-hidden rounded-2xl p-6 shadow-2xl bg-surface border border-border hover:-translate-y-2 transition-transform duration-300 group`}
            >
               {/* Colorful Background Blur */}
               <div className={`absolute -start-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br ${stat.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity`}></div>

               <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <p className="text-muted text-sm font-medium mb-1">{stat.label}</p>
                    <h4 className="text-4xl font-black text-foreground tracking-tight">{stat.value}</h4>
                    <p className={`mt-2 text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient}`}>
                        {stat.description}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                    {stat.icon}
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
