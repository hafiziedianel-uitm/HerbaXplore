"use client";

import { useState, useEffect } from "react";
import { plantsData, Plant, PlantPart, Compound } from "@/lib/data";
import { PlantViewer } from "./PlantViewer";
import { DetailsPanel } from "./DetailsPanel";
import { Leaf, ArrowLeft, Search, Moon, Sun, ChevronLeft, ChevronRight, Menu, X as CloseIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useIsMobile } from "@/hooks/use-mobile";

export function PharmacognosyDashboard() {
  const isMobile = useIsMobile();
  const [selectedPlant, setSelectedPlant] = useState<Plant>(plantsData[0]);
  const [selectedPart, setSelectedPart] = useState<PlantPart | null>(null);
  const [selectedCompound, setSelectedCompound] = useState<Compound | null>(null);
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(true);
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(true);

  // Initialize sidebars based on mobile status
  useEffect(() => {
    if (!isMobile) {
      setLeftSidebarCollapsed(false); // eslint-disable-line react-hooks/set-state-in-effect
      setRightSidebarCollapsed(false);
    } else {
      setLeftSidebarCollapsed(true);
      setRightSidebarCollapsed(true);
    }
  }, [isMobile]);

  const handlePartClick = (part: PlantPart) => {
    setSelectedPart(part);
    setSelectedCompound(null);
  };

  const handlePartDoubleClick = (part: PlantPart) => {
    setSelectedPart(part);
    setSelectedCompound(null);
    setRightSidebarCollapsed(false);
  };

  const handleCompoundClick = (compound: Compound) => {
    setSelectedCompound(compound);
  };

  const handleBackToPlant = () => {
    setSelectedPart(null);
    setSelectedCompound(null);
  };

  const handleBackToPart = () => {
    setSelectedCompound(null);
  };

  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-stone-100 dark:bg-stone-950 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between shrink-0 shadow-sm z-10 transition-colors duration-300">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-emerald-100 dark:bg-emerald-900/30 p-1.5 sm:p-2 rounded-lg text-emerald-700 dark:text-emerald-400">
            <Leaf size={isMobile ? 20 : 24} />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-stone-800 dark:text-stone-100 leading-tight">HerbaXplore</h1>
            {!isMobile && <p className="text-sm text-stone-500 dark:text-stone-400 font-medium">Interactive Plant Molecule Database</p>}
          </div>
        </div>
        
        {/* Breadcrumbs / Navigation */}
        <div className="flex items-center gap-3 sm:gap-6">
          {!isMobile && (
            <div className="flex items-center gap-2 text-sm font-medium text-stone-600 dark:text-stone-400">
              <button 
                onClick={handleBackToPlant}
                className={`hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ${!selectedPart ? 'text-emerald-700 dark:text-emerald-400 font-semibold' : ''}`}
              >
                {selectedPlant.name}
              </button>
              
              {selectedPart && (
                <>
                  <span className="text-stone-300 dark:text-stone-600">/</span>
                  <button 
                    onClick={handleBackToPart}
                    className={`hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ${!selectedCompound ? 'text-emerald-700 dark:text-emerald-400 font-semibold' : ''}`}
                  >
                    {selectedPart.name}
                  </button>
                </>
              )}
              
              {selectedCompound && (
                <>
                  <span className="text-stone-300 dark:text-stone-600">/</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{selectedCompound.name}</span>
                </>
              )}
            </div>
          )}

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar Overlay for Mobile */}
        {isMobile && !leftSidebarCollapsed && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={() => setLeftSidebarCollapsed(true)}
          />
        )}

        {/* Left Sidebar: Plant List */}
        <div className={`
          ${isMobile ? 'fixed inset-y-0 left-0 z-50' : 'relative'} 
          flex shrink-0 transition-all duration-300 
          ${leftSidebarCollapsed ? (isMobile ? '-translate-x-full' : 'w-0') : (isMobile ? 'w-[280px] translate-x-0' : 'w-64')}
        `}>
          <div className={`w-full bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-colors duration-300 h-full overflow-hidden`}>
            <div className="p-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
              <h2 className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider">Plant Database</h2>
              {isMobile && (
                <button onClick={() => setLeftSidebarCollapsed(true)} className="text-stone-400 hover:text-stone-600">
                  <CloseIcon size={18} />
                </button>
              )}
            </div>
            <div className="p-4 border-b border-stone-100 dark:border-stone-800">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500" />
                <input 
                  type="text" 
                  placeholder="Search plants..." 
                  className="w-full bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 rounded-lg pl-9 pr-3 py-2 text-sm text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:focus:border-emerald-500 transition-all placeholder:text-stone-400 dark:placeholder:text-stone-500"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              {plantsData.map(p => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedPlant(p);
                    setSelectedPart(null);
                    setSelectedCompound(null);
                    if (isMobile) setLeftSidebarCollapsed(true);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                    selectedPlant.id === p.id 
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-medium shadow-sm border border-emerald-100 dark:border-emerald-800/50' 
                      : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800/50 border border-transparent'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full transition-colors ${selectedPlant.id === p.id ? 'bg-emerald-500 dark:bg-emerald-400' : 'bg-stone-300 dark:bg-stone-600'}`} />
                  {p.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Left Toggle Button (Desktop only) */}
          {!isMobile && (
            <button 
              onClick={() => setLeftSidebarCollapsed(!leftSidebarCollapsed)}
              className={`absolute top-1/2 -translate-y-1/2 z-30 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-full p-1.5 shadow-lg text-stone-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all ${leftSidebarCollapsed ? 'left-2' : 'right-[-14px]'}`}
              title={leftSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {leftSidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          )}
        </div>

        {/* Middle Column: Plant Viewer */}
        <div className="flex-1 relative overflow-hidden flex flex-col bg-stone-200/50 dark:bg-stone-950/50 transition-colors duration-300">
          {/* Mobile Menu Toggles */}
          {isMobile && (
            <>
              <button 
                onClick={() => setLeftSidebarCollapsed(false)}
                className="absolute bottom-4 left-4 z-30 pointer-events-auto bg-white/90 dark:bg-stone-900/90 p-2.5 rounded-xl shadow-lg border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300"
              >
                <Menu size={20} />
              </button>
              <button 
                onClick={() => setRightSidebarCollapsed(false)}
                className="absolute top-4 right-4 z-30 pointer-events-auto bg-white/90 dark:bg-stone-900/90 p-2.5 rounded-xl shadow-lg border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300"
              >
                <ChevronLeft size={20} />
              </button>
            </>
          )}

          <PlantViewer 
            plant={selectedPlant} 
            selectedPart={selectedPart}
            onPartClick={handlePartClick} 
            onPartDoubleClick={handlePartDoubleClick}
            isMobile={isMobile}
          />
        </div>

        {/* Right Sidebar Overlay for Mobile */}
        {isMobile && !rightSidebarCollapsed && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={() => setRightSidebarCollapsed(true)}
          />
        )}

        {/* Right Column: Details Panel */}
        <div className={`
          ${isMobile ? 'fixed inset-y-0 right-0 z-50' : 'relative'} 
          flex shrink-0 transition-all duration-300 
          ${rightSidebarCollapsed ? (isMobile ? 'translate-x-full' : 'w-0') : (isMobile ? 'w-[90%] translate-x-0' : 'w-[400px] xl:w-[480px]')}
        `}>
          {/* Right Toggle Button (Desktop only) */}
          {!isMobile && (
            <button 
              onClick={() => setRightSidebarCollapsed(!rightSidebarCollapsed)}
              className={`absolute top-1/2 -translate-y-1/2 z-30 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-full p-1.5 shadow-lg text-stone-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all ${rightSidebarCollapsed ? 'right-2' : 'left-[-14px]'}`}
              title={rightSidebarCollapsed ? "Expand Details" : "Collapse Details"}
            >
              {rightSidebarCollapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          )}

          <div className={`w-full bg-white dark:bg-stone-900 border-l border-stone-200 dark:border-stone-800 shadow-xl flex flex-col h-full overflow-hidden transition-colors duration-300`}>
            <div className="p-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between shrink-0">
              <h2 className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider">Details</h2>
              <button onClick={() => setRightSidebarCollapsed(true)} className="text-stone-400 hover:text-stone-600">
                <CloseIcon size={18} />
              </button>
            </div>
            <div className="flex-1 flex flex-col overflow-hidden">
              <DetailsPanel 
                plant={selectedPlant}
                part={selectedPart}
                compound={selectedCompound}
                onCompoundClick={handleCompoundClick}
                onBackToPlant={handleBackToPlant}
                onBackToPart={handleBackToPart}
                isMobile={isMobile}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
