export type Compound = {
  id: string;
  name: string;
  smiles?: string;
  pharmacologicalActivity: string;
  therapeuticActivity: string;
  structure2DPlaceholder: string;
  structure3DPlaceholder: string;
  pharmaceuticalAnalysis?: {
    molecularWeight: string;
    nominalMass: string;
    isotopeFormula: string;
    massSpectrumUrl: string;
    hnmrUrl: string;
    cnmrUrl: string;
  };
};

export type PlantPart = {
  id: string;
  name: string;
  description: string;
  compounds: Compound[];
  coordinates: { x: number; y: number; width: number; height: number }; // For interactive SVG/image mapping
};

export type Plant = {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  imageUrl: string;
  marketAvailability: string;
  parts: PlantPart[];
};

export const plantsData: Plant[] = [
  {
    id: "misai-kucing",
    name: "Misai Kucing",
    scientificName: "Orthosiphon aristatus",
    description: "A medicinal herb widely grown in Southeast Asia, known for its white or purple flowers bearing long, protruding stamens that resemble cat's whiskers. Traditionally used for treating kidney diseases, bladder inflammation, gout, and diabetes.",
    imageUrl: "misai_kucing.jpg",
    marketAvailability: "Commonly available as dried leaves for tea, standardized extracts in capsules, and liquid tinctures in health stores across Southeast Asia and globally.",
    parts: [
      {
        id: "flowers",
        name: "Flowers",
        description: "The distinctive 'cat's whiskers' flowers contain essential oils and specific caffeic acid derivatives.",
        coordinates: { x: 48, y: 8, width: 22, height: 50 }, // Adjusted to target the right flower spike
        compounds: [
          {
            id: "caffeic-acid",
            name: "Caffeic Acid",
            pharmacologicalActivity: "Strong antioxidant and immunomodulatory effects.",
            therapeuticActivity: "Supports immune system and protects against cellular damage.",
            structure2DPlaceholder: "https://picsum.photos/seed/caffeic2d/300/200",
            structure3DPlaceholder: "Upload .pdb or .pdbqt for Caffeic Acid 3D view",
            pharmaceuticalAnalysis: {
              molecularWeight: "180.16 g/mol",
              nominalMass: "180 Da",
              isotopeFormula: "C9H8O4",
              massSpectrumUrl: "https://picsum.photos/seed/caffeic-ms/400/300",
              hnmrUrl: "https://picsum.photos/seed/caffeic-hnmr/400/300",
              cnmrUrl: "https://picsum.photos/seed/caffeic-cnmr/400/300"
            }
          }
        ]
      },
      {
        id: "leaves",
        name: "Leaves",
        description: "The leaves are the most commonly used part of Misai Kucing, rich in phenolic compounds and flavonoids.",
        coordinates: { x: 5, y: 40, width: 36, height: 32 }, // Adjusted to target the larger left leaf cluster
        compounds: [
          {
            id: "rosmarinic-acid",
            name: "Rosmarinic Acid",
            pharmacologicalActivity: "Antioxidant, anti-inflammatory, antimicrobial, and anti-angiogenic properties.",
            therapeuticActivity: "Used in managing oxidative stress-related diseases, inflammation, and as a natural preservative.",
            structure2DPlaceholder: "https://picsum.photos/seed/rosmarinic2d/300/200",
            structure3DPlaceholder: "Upload .pdb or .pdbqt for Rosmarinic Acid 3D view",
            pharmaceuticalAnalysis: {
              molecularWeight: "360.31 g/mol",
              nominalMass: "360 Da",
              isotopeFormula: "C18H16O8",
              massSpectrumUrl: "https://picsum.photos/seed/rosmarinic-ms/400/300",
              hnmrUrl: "https://picsum.photos/seed/rosmarinic-hnmr/400/300",
              cnmrUrl: "https://picsum.photos/seed/rosmarinic-cnmr/400/300"
            }
          },
          {
            id: "sinensetin",
            name: "Sinensetin",
            pharmacologicalActivity: "Potent diuretic, anti-inflammatory, and anti-tumor activities.",
            therapeuticActivity: "Helps in treating kidney stones, edema, and exhibits potential in cancer therapy.",
            structure2DPlaceholder: "https://picsum.photos/seed/sinensetin2d/300/200",
            structure3DPlaceholder: "Upload .pdb or .pdbqt for Sinensetin 3D view",
            pharmaceuticalAnalysis: {
              molecularWeight: "372.37 g/mol",
              nominalMass: "372 Da",
              isotopeFormula: "C20H20O7",
              massSpectrumUrl: "https://picsum.photos/seed/sinensetin-ms/400/300",
              hnmrUrl: "https://picsum.photos/seed/sinensetin-hnmr/400/300",
              cnmrUrl: "https://picsum.photos/seed/sinensetin-cnmr/400/300"
            }
          },
          {
            id: "eupatorin",
            name: "Eupatorin",
            pharmacologicalActivity: "Vasodilatory, anti-proliferative, and anti-inflammatory.",
            therapeuticActivity: "Potential use in cardiovascular health and cancer prevention.",
            structure2DPlaceholder: "https://picsum.photos/seed/eupatorin2d/300/200",
            structure3DPlaceholder: "Upload .pdb or .pdbqt for Eupatorin 3D view",
            pharmaceuticalAnalysis: {
              molecularWeight: "344.32 g/mol",
              nominalMass: "344 Da",
              isotopeFormula: "C18H16O7",
              massSpectrumUrl: "https://picsum.photos/seed/eupatorin-ms/400/300",
              hnmrUrl: "https://picsum.photos/seed/eupatorin-hnmr/400/300",
              cnmrUrl: "https://picsum.photos/seed/eupatorin-cnmr/400/300"
            }
          }
        ]
      },
      {
        id: "stem",
        name: "Stem",
        description: "The stems contain high levels of potassium salts and essential oils.",
        coordinates: { x: 55, y: 62, width: 12, height: 35 }, // Adjusted to target the actual stem on the right
        compounds: [
          {
            id: "potassium-salts",
            name: "Potassium Salts",
            pharmacologicalActivity: "Diuretic effect by altering osmotic pressure.",
            therapeuticActivity: "Flushes out the urinary tract, preventing kidney stones.",
            structure2DPlaceholder: "https://picsum.photos/seed/potassium2d/300/200",
            structure3DPlaceholder: "Upload .pdb or .pdbqt for Potassium Salts 3D view",
            pharmaceuticalAnalysis: {
              molecularWeight: "Varies",
              nominalMass: "Varies",
              isotopeFormula: "K+",
              massSpectrumUrl: "https://picsum.photos/seed/potassium-ms/400/300",
              hnmrUrl: "https://picsum.photos/seed/potassium-hnmr/400/300",
              cnmrUrl: "https://picsum.photos/seed/potassium-cnmr/400/300"
            }
          }
        ]
      }
    ]
  }
];
