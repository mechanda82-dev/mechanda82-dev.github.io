import React from 'react';
import {
  Search,
  PlusCircle,
  Printer,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';

interface HeaderProps {
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenNewProject: () => void;
  isSidebarCollapsed: boolean;
  isMobileSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onToggleMobileSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  setActiveTab,
  onOpenSearch,
  onOpenNewProject,
  isSidebarCollapsed,
  isMobileSidebarOpen,
  onToggleSidebar,
  onToggleMobileSidebar,
}) => (
  <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-xs backdrop-blur-md">
    <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 lg:hidden"
          aria-label={isMobileSidebarOpen ? 'नेभिगेसन बन्द गर्नुहोस्' : 'नेभिगेसन खोल्नुहोस्'}
          aria-expanded={isMobileSidebarOpen}
          title={isMobileSidebarOpen ? 'नेभिगेसन बन्द गर्नुहोस्' : 'नेभिगेसन खोल्नुहोस्'}
        >
          {isMobileSidebarOpen
            ? <X className="h-5 w-5" />
            : <Menu className="h-5 w-5" />}
        </button>

        <button
          type="button"
          onClick={onToggleSidebar}
          className="hidden rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 lg:block"
          aria-label={isSidebarCollapsed ? 'साइडबार खोल्नुहोस्' : 'साइडबार खुम्च्याउनुहोस्'}
          aria-expanded={!isSidebarCollapsed}
          title={isSidebarCollapsed ? 'साइडबार खोल्नुहोस्' : 'साइडबार खुम्च्याउनुहोस्'}
        >
          {isSidebarCollapsed
            ? <PanelLeftOpen className="h-5 w-5" />
            : <PanelLeftClose className="h-5 w-5" />}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('dashboard')}
          className="group flex min-w-0 items-center gap-2.5 text-left"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-700 text-lg font-bold text-white shadow-sm transition-colors group-hover:bg-red-800">
            ख
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-base font-bold tracking-tight text-slate-900 transition-colors group-hover:text-red-700 sm:text-lg">
              सार्वजनिक खरिद सहयोगी
            </span>
            <span className="hidden text-[11px] font-medium text-slate-700 sm:block">
              ऐन २०६३ र नियमावली २०६४ (१६औँ संशोधनसहित)
            </span>
          </div>
        </button>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-200 sm:text-sm"
          title="खोज तथा फिल्टर (Ctrl + K)"
        >
          <Search className="h-4 w-4 text-slate-500" />
          <span className="hidden md:inline">खोज तथा फिल्टर</span>
          <kbd className="hidden rounded-sm border border-slate-300 bg-white px-1.5 py-0.5 font-mono text-[10px] text-slate-500 md:inline-block">
            /
          </kbd>
        </button>

        <button
          type="button"
          onClick={() => window.print()}
          className="no-print rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
          title="प्रिन्ट गर्नुहोस्"
          aria-label="प्रिन्ट गर्नुहोस्"
        >
          <Printer className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={onOpenNewProject}
          className="flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-red-700 px-3.5 py-2 text-xs font-medium text-white shadow-xs transition-colors hover:bg-red-800 sm:text-sm"
        >
          <PlusCircle className="h-4 w-4" />
          <span className="hidden sm:inline">नयाँ खरिद प्रक्रिया</span>
          <span className="sm:hidden">नयाँ</span>
        </button>
      </div>
    </div>
  </header>
);
