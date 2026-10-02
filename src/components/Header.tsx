import React from 'react';
import { 
  Search, 
  PlusCircle, 
  Layers, 
  FileCheck2, 
  Calculator, 
  BookOpen, 
  ClipboardList, 
  Briefcase,
  SlidersHorizontal,
  Printer,
  FileText,
  ShieldCheck,
  Scale
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenNewProject: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenNewProject,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'ड्यासबोर्ड', icon: Briefcase },
    { id: 'methods', label: 'खरिद विधिहरू', icon: Layers },
    { id: 'method-checklists', label: 'विधिगत चेकलिस्ट', icon: FileCheck2 },
    { id: 'stages', label: 'प्रक्रियागत चरणहरू', icon: ClipboardList },
    { id: 'templates', label: 'कागजात ढाँचा (Templates)', icon: FileText },
    { id: 'checklists', label: 'एकीकृत चेकलिस्ट', icon: ShieldCheck },
    { id: 'calculator', label: 'सीमा क्याल्कुलेटर', icon: Calculator },
    { id: 'clauses', label: 'कानुनी दफाहरू', icon: BookOpen },
    { id: 'schedules', label: 'अनुसूचीहरू', icon: Scale },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('dashboard')} 
              className="flex items-center gap-2.5 text-left group focus:outline-hidden"
            >
              <div className="w-9 h-9 rounded-lg bg-red-700 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-red-800 transition-colors">
                ख
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-red-700 transition-colors">
                  सार्वजनिक खरिद सहयोगी
                </span>
                <span className="text-[11px] font-medium text-slate-700 hidden sm:block">
                  ऐन २०६३ र नियमावली २०६४ (१६औँ संशोधनसहित)
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Text with active state, strictly single-line) */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                    isActive
                      ? 'text-red-800 bg-red-50 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-red-700' : 'text-slate-700'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
              title="खोज तथा फिल्टर (Ctrl + K)"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span className="hidden md:inline">खोज तथा फिल्टर</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-300 rounded-sm text-slate-500">
                /
              </kbd>
            </button>

            <button
              onClick={() => window.print()}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors no-print"
              title="प्रिन्ट गर्नुहोस्"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenNewProject}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-white bg-red-700 hover:bg-red-800 rounded-lg shadow-xs transition-colors whitespace-nowrap"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">नयाँ खरिद प्रक्रिया</span>
              <span className="sm:hidden">नयाँ</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto py-2 border-t border-slate-100 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'text-red-700 bg-red-50 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-red-700' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
