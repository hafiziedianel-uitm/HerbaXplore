"use client";

import { Plant, PlantPart, Compound } from "@/lib/data";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Beaker, Activity, Pill, ShoppingCart, Info, Dna, Maximize2, Headset, X, Search, Download, Network } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

function Interactive3DViewer({ compound, isVRMode, isMobile }: { compound: Compound, isVRMode: boolean, isMobile?: boolean }) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let viewer: any = null;
    
    const initViewer = async () => {
      if (!viewerRef.current || !(window as any).$3Dmol) return;
      
      try {
        setLoading(true);
        setError(false);
        
        // Clear previous
        viewerRef.current.innerHTML = '';
        
        viewer = (window as any).$3Dmol.createViewer(viewerRef.current, {
          backgroundColor: isVRMode ? 'black' : '#1c1917', // stone-900
        });
        
        // Fetch SDF from PubChem
        const response = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(compound.name)}/SDF?record_type=3d`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch 3D structure');
        }
        
        const sdfData = await response.text();
        
        viewer.addModel(sdfData, "sdf");
        viewer.setStyle({}, { stick: { radius: 0.15 }, sphere: { scale: 0.3 } });
        viewer.zoomTo();
        viewer.render();
        
        setLoading(false);
      } catch (err) {
        console.error("Error loading 3D model:", err);
        setError(true);
        setLoading(false);
      }
    };

    // Give the script a moment to load if it hasn't
    if ((window as any).$3Dmol) {
      initViewer();
    } else {
      const checkInterval = setInterval(() => {
        if ((window as any).$3Dmol) {
          clearInterval(checkInterval);
          initViewer();
        }
      }, 100);
      return () => clearInterval(checkInterval);
    }

    return () => {
      if (viewer) {
        viewer.removeAllModels();
      }
    };
  }, [compound.name, isVRMode]);

  return (
    <div className="flex-1 relative w-full h-full bg-stone-900 overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-stone-900/80 backdrop-blur-sm">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-stone-900/80 backdrop-blur-sm text-stone-400">
          <p>Could not load 3D structure for {compound.name}</p>
          <p className="text-sm mt-2">Try another compound.</p>
        </div>
      )}
      <div ref={viewerRef} className="w-full h-full" style={{ position: 'relative' }} />
      
      {!isVRMode && !isMobile && (
        <div className="absolute top-6 left-6 text-stone-400 text-xs flex flex-col gap-3 pointer-events-none z-10 bg-stone-900/50 p-4 rounded-xl border border-stone-800 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300 font-bold">L</div> 
            <span>Left Click + Drag to Rotate</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300 font-bold">↕</div> 
            <span>Scroll Wheel to Zoom</span>
          </div>
        </div>
      )}
    </div>
  );
}

interface DetailsPanelProps {
  plant: Plant;
  part: PlantPart | null;
  compound: Compound | null;
  onCompoundClick: (compound: Compound) => void;
  onBackToPlant: () => void;
  onBackToPart: () => void;
  isMobile?: boolean;
}

export function DetailsPanel({ 
  plant, 
  part, 
  compound, 
  onCompoundClick,
  onBackToPlant,
  onBackToPart,
  isMobile
}: DetailsPanelProps) {
  const [is3DModalOpen, setIs3DModalOpen] = useState(false);
  const [isVRMode, setIsVRMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [enlargedImage, setEnlargedImage] = useState<{ url: string; title: string } | null>(null);

  const filteredCompounds = part?.compounds.filter(comp => 
    comp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    comp.pharmacologicalActivity.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="flex-1 overflow-y-auto bg-white dark:bg-stone-900 relative transition-colors duration-300 custom-scrollbar h-full">
      <AnimatePresence mode="wait">
        {/* VIEW 3: COMPOUND DETAILS */}
        {compound && part && (
          <motion.div 
            key="compound-view"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="p-6 pb-24"
          >
            <button 
              onClick={onBackToPart}
              className="flex items-center gap-2 text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors mb-6 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to {part.name}
            </button>

            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg sm:p-2.5 sm:rounded-xl text-emerald-700 dark:text-emerald-400">
                <Dna size={20} className="sm:w-6 sm:h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-800 dark:text-stone-100">{compound.name}</h2>
            </div>

            <div className="space-y-8">
              {/* 2D Structure */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider flex items-center gap-2">
                    <Beaker size={16} />
                    2D Structure
                  </h3>
                  <button className="text-[10px] font-bold uppercase tracking-wider bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 hover:text-emerald-700 dark:hover:text-emerald-400 px-2 py-1 rounded-md flex items-center gap-1 transition-colors">
                    <Download size={12} /> .mol2
                  </button>
                </div>
                <div 
                  className="bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-100 dark:border-stone-700/50 p-4 flex items-center justify-center aspect-video relative overflow-hidden transition-colors duration-300 cursor-zoom-in group"
                  onClick={() => setEnlargedImage({ url: compound.structure2DPlaceholder, title: `${compound.name} - 2D Structure` })}
                >
                  <Image 
                    src={compound.structure2DPlaceholder} 
                    alt={`2D structure of ${compound.name}`}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-white/90 dark:bg-stone-800/90 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm border border-stone-200 dark:border-stone-700 flex items-center gap-1.5">
                      <Maximize2 size={12} /> Enlarge
                    </span>
                  </div>
                </div>
              </section>

              {/* 2D Binding Interaction */}
              <section>
                <h3 className="text-sm font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Network size={16} />
                  2D Binding Interaction
                </h3>
                <div className="bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-100 dark:border-stone-700/50 p-4 flex items-center justify-center aspect-video relative overflow-hidden transition-colors duration-300">
                  <p className="text-stone-400 dark:text-stone-500 font-medium text-sm">2D Binding Interaction Diagram Placeholder</p>
                </div>
              </section>

              {/* 3D Binding Interaction Placeholder */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider flex items-center gap-2">
                    <Dna size={16} />
                    3D Binding Interaction
                  </h3>
                  <div className="flex gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-2 py-1 rounded-md flex items-center gap-1">
                      <Headset size={12} /> VR Ready
                    </span>
                    <button 
                      onClick={() => setIs3DModalOpen(true)}
                      className="text-stone-400 dark:text-stone-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors p-1"
                      title="Enlarge 3D View"
                    >
                      <Maximize2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="bg-stone-900 dark:bg-stone-950 rounded-2xl p-8 flex flex-col items-center justify-center aspect-video text-center border border-stone-800 shadow-inner relative group transition-colors duration-300">
                  <Dna size={48} className="text-stone-700 dark:text-stone-600 mb-4 group-hover:scale-110 transition-transform" />
                  <p className="text-stone-400 dark:text-stone-500 font-medium">{compound.structure3DPlaceholder}</p>
                  <p className="text-stone-600 dark:text-stone-400 text-sm mt-2">Interactive 3D viewer will be enabled when PDB/PDBQT files are uploaded.</p>
                  <button 
                    onClick={() => setIs3DModalOpen(true)}
                    className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
                  >
                    <span className="bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 shadow-lg">
                      <Maximize2 size={16} /> Enlarge View
                    </span>
                  </button>
                </div>
              </section>

              {/* Pharmacological Activity */}
              <section>
                <h3 className="text-sm font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Activity size={16} />
                  Pharmacological Activity
                </h3>
                <div className="bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/50 p-5 transition-colors duration-300">
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">{compound.pharmacologicalActivity}</p>
                </div>
              </section>

              {/* Therapeutic Activity */}
              <section>
                <h3 className="text-sm font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Pill size={16} />
                  Therapeutic Activity
                </h3>
                <div className="bg-emerald-50/50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800/50 p-5 transition-colors duration-300">
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">{compound.therapeuticActivity}</p>
                </div>
              </section>

              {/* Pharmaceutical Analysis */}
              {compound.pharmaceuticalAnalysis && (
                <section className="space-y-5 sm:space-y-6">
                  <h3 className="text-sm font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider flex items-center gap-2">
                    <Beaker size={16} />
                    Pharmaceutical Analysis
                  </h3>
                  
                  {/* Text Data */}
                  <div className="grid grid-cols-1 gap-3 bg-stone-50 dark:bg-stone-800/50 p-4 rounded-xl border border-stone-100 dark:border-stone-700">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-stone-500 dark:text-stone-400">Molecular Weight:</span>
                      <span className="font-mono font-medium text-stone-800 dark:text-stone-200">{compound.pharmaceuticalAnalysis.molecularWeight}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-stone-500 dark:text-stone-400">Nominal mass:</span>
                      <span className="font-mono font-medium text-stone-800 dark:text-stone-200">{compound.pharmaceuticalAnalysis.nominalMass}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-stone-500 dark:text-stone-400">Isotope formula:</span>
                      <span className="font-mono font-medium text-stone-800 dark:text-stone-200">{compound.pharmaceuticalAnalysis.isotopeFormula}</span>
                    </div>
                  </div>

                  {/* Images */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Mass Spectrum</p>
                      <div 
                        className="relative aspect-video rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-950 cursor-zoom-in group"
                        onClick={() => setEnlargedImage({ url: compound.pharmaceuticalAnalysis!.massSpectrumUrl, title: `${compound.name} - Mass Spectrum` })}
                      >
                        <Image 
                          src={compound.pharmaceuticalAnalysis.massSpectrumUrl} 
                          alt="Mass Spectrum" 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <span className="bg-white/90 dark:bg-stone-800/90 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm border border-stone-200 dark:border-stone-700 flex items-center gap-1.5">
                            <Maximize2 size={12} /> Enlarge
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">HNMR</p>
                        <div 
                          className="relative aspect-square rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-950 cursor-zoom-in group"
                          onClick={() => setEnlargedImage({ url: compound.pharmaceuticalAnalysis!.hnmrUrl, title: `${compound.name} - HNMR` })}
                        >
                          <Image 
                            src={compound.pharmaceuticalAnalysis.hnmrUrl} 
                            alt="HNMR" 
                            fill 
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <span className="bg-white/90 dark:bg-stone-800/90 px-2 py-1 rounded-full text-[8px] font-bold uppercase tracking-wider shadow-sm border border-stone-200 dark:border-stone-700 flex items-center gap-1">
                              <Maximize2 size={10} /> Enlarge
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">CNMR</p>
                        <div 
                          className="relative aspect-square rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-950 cursor-zoom-in group"
                          onClick={() => setEnlargedImage({ url: compound.pharmaceuticalAnalysis!.cnmrUrl, title: `${compound.name} - CNMR` })}
                        >
                          <Image 
                            src={compound.pharmaceuticalAnalysis.cnmrUrl} 
                            alt="CNMR" 
                            fill 
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <span className="bg-white/90 dark:bg-stone-800/90 px-2 py-1 rounded-full text-[8px] font-bold uppercase tracking-wider shadow-sm border border-stone-200 dark:border-stone-700 flex items-center gap-1">
                              <Maximize2 size={10} /> Enlarge
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </motion.div>
        )}

        {/* VIEW 2: PART DETAILS */}
        {!compound && part && (
          <motion.div 
            key="part-view"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="p-6 pb-24"
          >
            <button 
              onClick={onBackToPlant}
              className="flex items-center gap-2 text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors mb-6 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to {plant.name}
            </button>

            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 dark:text-stone-100 mb-2 sm:mb-3">{part.name}</h2>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-base sm:text-lg">{part.description}</p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Beaker size={16} />
                Extracted Compounds
              </h3>

              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-stone-400 dark:text-stone-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search compounds by name or activity..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 rounded-xl text-sm text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:focus:border-emerald-500 transition-all placeholder:text-stone-400 dark:placeholder:text-stone-500"
                />
              </div>
              
              <div className="space-y-3">
                {filteredCompounds.length > 0 ? (
                  filteredCompounds.map((comp) => (
                    <button
                      key={comp.id}
                      onClick={() => onCompoundClick(comp)}
                      className="w-full text-left bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md hover:shadow-emerald-100 dark:hover:shadow-emerald-900/20 transition-all duration-200 rounded-2xl p-5 group flex items-center justify-between"
                    >
                      <div>
                        <h4 className="text-lg font-bold text-stone-800 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">{comp.name}</h4>
                        <p className="text-sm text-stone-500 dark:text-stone-400 mt-1 line-clamp-1">{comp.pharmacologicalActivity}</p>
                      </div>
                      <div className="bg-stone-50 dark:bg-stone-800 text-stone-400 dark:text-stone-500 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 p-2 rounded-full transition-colors shrink-0 ml-4">
                        <ArrowLeft size={20} className="rotate-180" />
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-200 dark:border-stone-700/50 border-dashed transition-colors duration-300">
                    <p className="text-stone-500 dark:text-stone-400 text-sm">No compounds found matching &quot;{searchQuery}&quot;</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 1: PLANT DETAILS */}
        {!compound && !part && (
          <motion.div 
            key="plant-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="p-4 sm:p-8 flex flex-col h-full pt-12 sm:pt-20 space-y-8"
          >
            <div>
              <div className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 transition-colors duration-300">
                <Info size={24} className="sm:w-8 sm:h-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 dark:text-stone-100 mb-1 sm:mb-2">{plant.name}</h2>
              <p className="text-emerald-700 dark:text-emerald-400 italic font-serif text-base sm:text-lg mb-4 sm:mb-6">{plant.scientificName}</p>
              
              <div className="prose prose-stone dark:prose-invert">
                <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-base sm:text-lg">
                  {plant.description}
                </p>
              </div>
            </div>

            {/* Market Availability */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 text-stone-800 dark:text-stone-200 font-semibold">
                <ShoppingCart size={18} className="text-emerald-600" />
                <h3>Market Availability</h3>
              </div>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm sm:text-base">
                {plant.marketAvailability}
              </p>
            </div>

            <div className="bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/50 rounded-2xl p-6 transition-colors duration-300">
              <h3 className="font-bold text-stone-800 dark:text-stone-100 mb-2">How to use this explorer:</h3>
              <ul className="space-y-3 text-stone-600 dark:text-stone-400">
                <li className="flex items-start gap-3">
                  <div className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
                  <p>Hover over the plant image on the left to see interactive regions.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                  <p>Click on a specific part (e.g., Leaves, Flowers) to view its extracted compounds.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
                  <p>Select a compound to reveal its 2D/3D structure and pharmacological properties.</p>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Enlarge Modal */}
      <AnimatePresence>
        {enlargedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8 bg-stone-950/90 backdrop-blur-md"
            onClick={() => setEnlargedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-auto max-h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 right-0 -mt-12 flex items-center gap-4">
                <h3 className="text-white font-medium text-lg hidden sm:block">{enlargedImage.title}</h3>
                <button 
                  onClick={() => setEnlargedImage(null)}
                  className="text-stone-400 hover:text-white bg-stone-800/50 hover:bg-stone-700/50 p-2 rounded-full transition-colors backdrop-blur-md border border-stone-700/50"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="relative w-full h-[70vh] sm:h-[80vh] bg-white dark:bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800">
                <Image 
                  src={enlargedImage.url} 
                  alt={enlargedImage.title} 
                  fill 
                  className="object-contain p-8"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Enlarge Modal */}
      <AnimatePresence>
        {is3DModalOpen && compound && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-stone-900/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-stone-900 w-full max-w-6xl h-full max-h-[800px] rounded-3xl shadow-2xl border border-stone-700 flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-900/50">
                <div className="flex items-center gap-3">
                  <div className="bg-stone-800 p-2 rounded-lg text-stone-300">
                    <Dna size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{compound.name} - 3D Binding Interaction</h3>
                    <p className="text-xs text-stone-400">Interactive Molecular Viewer</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsVRMode(!isVRMode)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors border ${
                      isVRMode 
                        ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                        : 'bg-stone-800 text-stone-400 border-stone-700 hover:bg-stone-700 hover:text-stone-300'
                    }`}
                  >
                    <Headset size={18} />
                    {isVRMode ? 'VR Mode: ON' : 'VR Mode: OFF'}
                  </button>
                  <button className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors shadow-lg shadow-purple-900/20">
                    Enter VR
                  </button>
                  <button 
                    onClick={() => setIs3DModalOpen(false)}
                    className="text-stone-400 hover:text-white bg-stone-800 hover:bg-stone-700 p-2 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              {/* Modal Body */}
              <Interactive3DViewer compound={compound} isVRMode={isVRMode} isMobile={isMobile} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
