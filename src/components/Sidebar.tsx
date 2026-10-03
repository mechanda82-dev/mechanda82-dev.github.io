import React from 'react';
import {
  BookOpen,
  Briefcase,
  Calculator,
  ClipboardList,
  FileCheck2,
  FileText,
  Layers,
  Scale,
  ShieldCheck,
  X,
} from 'lucide-react';

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

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isCollapsed,
  isMobileOpen,
  onCloseMobile,
}) => {
  const renderNavigation = (compact: boolean) => (
    <nav aria-label="मुख्य नेभिगेसन" className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setActiveTab(item.id);
              onCloseMobile();
            }}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
              isActive
                ? 'bg-red-50 text-red-800'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            } ${compact ? 'justify-center px-2' : ''}`}
            aria-current={isActive ? 'page' : undefined}
            aria-label={compact ? item.label : undefined}
            title={compact ? item.label : undefined}
          >
            <Icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-red-700' : 'text-slate-500'}`} />
            {!compact && <span>{item.label}</span>}
          </button>
        );
      })}
    </nav>
  );

  return (
    <>
      <aside
        className={`sticky top-16 hidden h-[calc(100vh-4rem)] shrink-0 border-r border-slate-200 bg-white transition-[width] duration-200 lg:block ${
          isCollapsed ? 'w-[4.5rem]' : 'w-64'
        }`}
      >
        <div className={`px-3 py-5 ${isCollapsed ? 'px-2' : 'px-4'}`}>
          {!isCollapsed && (
            <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              नेभिगेसन
            </p>
          )}
          {renderNavigation(isCollapsed)}
        </div>
      </aside>

      {isMobileOpen && (
        <div className="fixed inset-x-0 bottom-0 top-16 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 h-full w-full bg-slate-950/40"
            onClick={onCloseMobile}
            aria-label="नेभिगेसन बन्द गर्नुहोस्"
          />
          <aside className="relative h-full w-72 max-w-[85vw] overflow-y-auto border-r border-slate-200 bg-white shadow-xl">
            <div className="flex items-center justify-between px-4 pb-3 pt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                नेभिगेसन
              </p>
              <button
                type="button"
                onClick={onCloseMobile}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                aria-label="नेभिगेसन बन्द गर्नुहोस्"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="px-3 pb-5">{renderNavigation(false)}</div>
          </aside>
        </div>
      )}
    </>
  );
};
