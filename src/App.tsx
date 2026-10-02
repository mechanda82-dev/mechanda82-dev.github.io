/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { ProcurementMethodsView } from './components/ProcurementMethodsView';
import { MethodChecklistsView } from './components/MethodChecklistsView';
import { StagesGuideView } from './components/StagesGuideView';
import { ChecklistsView } from './components/ChecklistsView';
import { TemplatesView } from './components/TemplatesView';
import { CalculatorView } from './components/CalculatorView';
import { LegalClausesView } from './components/LegalClausesView';
import { SchedulesView } from './components/SchedulesView';
import { SearchAndFilterModal } from './components/SearchAndFilterModal';
import { NewProjectModal } from './components/NewProjectModal';
import { INITIAL_TRACKED_PROJECTS } from './data/procurementData';
import { TrackedProject } from './types/procurement';
import { ShieldCheck, BookOpen, ExternalLink, HelpCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState<boolean>(false);
  const [selectedMethodId, setSelectedMethodId] = useState<string | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  // Projects state persistent in localStorage
  const [projects, setProjects] = useState<TrackedProject[]>(() => {
    try {
      const saved = localStorage.getItem('tracked_procurement_projects');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_TRACKED_PROJECTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('tracked_procurement_projects', JSON.stringify(projects));
    } catch (e) {
      console.error(e);
    }
  }, [projects]);

  // Global keyboard shortcut: "/" or "Ctrl+K" to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) && !isSearchOpen) {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          setIsSearchOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  const handleUpdateProject = (updated: TrackedProject) => {
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleAddProject = (newProject: TrackedProject) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  const handleSelectSearchResult = (category: 'method' | 'stage' | 'checklist' | 'clause' | 'schedule', id: string) => {
    if (category === 'method') {
      setSelectedMethodId(id);
      setActiveTab('methods');
    } else if (category === 'stage') {
      setActiveTab('stages');
    } else if (category === 'checklist') {
      setActiveTab('checklists');
    } else if (category === 'clause') {
      setActiveTab('clauses');
    } else if (category === 'schedule') {
      setActiveTab('schedules');
    }
  };

  const navigateToMethodWithId = (methodId: string) => {
    setSelectedMethodId(methodId);
    setActiveTab('methods');
  };

  const navigateToMethodChecklist = (methodId?: string) => {
    if (methodId) setSelectedMethodId(methodId);
    setActiveTab('method-checklists');
  };

  const navigateToTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
    setActiveTab('templates');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans">
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenNewProject={() => setIsNewProjectOpen(true)}
      />

      {/* Main Viewport Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'dashboard' && (
          <DashboardView
            projects={projects}
            onUpdateProject={handleUpdateProject}
            onOpenNewProjectModal={() => setIsNewProjectOpen(true)}
            onSelectMethod={navigateToMethodWithId}
            onSelectStage={() => setActiveTab('stages')}
          />
        )}

        {activeTab === 'methods' && (
          <ProcurementMethodsView
            initialSelectedMethodId={selectedMethodId}
            onClearInitialMethod={() => setSelectedMethodId(null)}
          />
        )}

        {activeTab === 'method-checklists' && (
          <MethodChecklistsView
            initialMethodId={selectedMethodId || undefined}
            onNavigateToTemplate={navigateToTemplate}
          />
        )}

        {activeTab === 'stages' && (
          <StagesGuideView
            onSelectMethod={navigateToMethodWithId}
          />
        )}

        {activeTab === 'templates' && (
          <TemplatesView
            initialTemplateId={selectedTemplateId}
            onSelectMethod={navigateToMethodWithId}
          />
        )}

        {activeTab === 'checklists' && (
          <ChecklistsView
            onNavigateToMethodChecklists={() => setActiveTab('method-checklists')}
          />
        )}

        {activeTab === 'calculator' && (
          <CalculatorView
            onSelectMethod={navigateToMethodWithId}
          />
        )}

        {activeTab === 'clauses' && (
          <LegalClausesView />
        )}

        {activeTab === 'schedules' && (
          <SchedulesView />
        )}
      </main>

      {/* Search & Multi-facet Filter Modal */}
      <SearchAndFilterModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleSelectSearchResult}
      />

      {/* Add New Procurement Project Modal */}
      <NewProjectModal
        isOpen={isNewProjectOpen}
        onClose={() => setIsNewProjectOpen(false)}
        onAddProject={handleAddProject}
      />

      {/* Official Legal Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-red-700 text-white flex items-center justify-center font-bold text-xs">
              ख
            </div>
            <div>
              <span className="font-semibold text-slate-800">सार्वजनिक खरिद सहयोगी - नेपाल</span>
              <span className="block text-[11px] text-slate-400">
                सार्वजनिक खरिद ऐन, २०६३ तथा सार्वजनिक खरिद नियमावली, २०६४ (१६औँ संशोधन सम्म) मा आधारित।
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => setActiveTab('clauses')}
              className="hover:text-red-700 transition-colors"
            >
              कानुनी दफाहरू
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveTab('templates')}
              className="hover:text-red-700 transition-colors"
            >
              कागजात ढाँचाहरू
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveTab('calculator')}
              className="hover:text-red-700 transition-colors"
            >
              सीमा क्याल्कुलेटर
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveTab('schedules')}
              className="hover:text-red-700 transition-colors"
            >
              अनुसूचीहरू (१-८)
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
