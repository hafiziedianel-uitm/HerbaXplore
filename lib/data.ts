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
    imageUrl: "/misai_kucing.jpg",
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
  },
  {
    id: "tobacco-plant",
    name: "Tobacco plant",
    scientificName: "Nicotiana tabacum",
    description: "Nicotiana tabacum is an annual herbaceous plant belonging to the family Solanaceae. It is one of the most widely cultivated commercial plants in the world and is primarily grown for its nicotine-rich leaves. The plant typically reaches 1–3 meters in height, possesses large sticky leaves, pink tubular flowers, and a thick hairy stem. It originated in the Americas and later spread globally through colonial trade and agriculture. Chemically, the plant is rich in alkaloids, especially nicotine, together with nornicotine, anatabine, flavonoids, terpenoids, and phenolic compounds. Biologically, it exhibits insecticidal, antimicrobial, antioxidant, and neuroactive properties. Tobacco has also become an important model organism in plant biotechnology and molecular farming for recombinant protein and vaccine production. However, many descriptions of tobacco become intellectually dishonest because they isolate pharmacological activities from toxicological reality. The same plant associated with useful bioactive metabolites is also linked to addiction, carcinogenicity, cardiovascular disease, and respiratory disorders due to nicotine and tobacco-specific nitrosamines. Any scientific discussion that ignores both dimensions is incomplete and scientifically weak.",
    imageUrl: "https://images.unsplash.com/photo-1599577180572-88d402ad7dc5?q=80&w=800&auto=format&fit=crop",
    marketAvailability: "Widely available globally.",
    parts: [
      {
        id: "leaves",
        name: "Leaves",
        description: "The primary source of nicotine and other alkaloids.",
        coordinates: { x: 30, y: 30, width: 40, height: 40 },
        compounds: [
          {
            id: "nicotine",
            name: "Nicotine",
            pharmacologicalActivity: "Potent neuroactive and insecticidal properties. antimicrobial, antifungal, insecticidal, antioxidant, anti-inflammatory, and cytotoxic activities.",
            therapeuticActivity: "Used in agricultural pesticides and nicotine replacement therapies.",
            structure2DPlaceholder: "https://picsum.photos/seed/nicotine2d/300/200",
            structure3DPlaceholder: "Interactive 3D view for Nicotine",
            pharmaceuticalAnalysis: {
              molecularWeight: "162.23 g/mol",
              nominalMass: "162 Da",
              isotopeFormula: "C10H14N2",
              massSpectrumUrl: "https://picsum.photos/seed/nicotine-ms/400/300",
              hnmrUrl: "https://picsum.photos/seed/nicotine-hnmr/400/300",
              cnmrUrl: "https://picsum.photos/seed/nicotine-cnmr/400/300"
            }
          }
        ]
      }
    ]
  },
  {
    id: "ceylon-cinnamon",
    name: "Ceylon cinnamon",
    scientificName: "Cinnamomum verum",
    description: "Evergreen tree; its inner bark is used to make cinnamon, a spice widely used in cooking. The bark is also used traditionally for GI upset, diarrhea, and infections.",
    imageUrl: "https://images.unsplash.com/photo-1610471271109-80ab44464c1c?q=80&w=800&auto=format&fit=crop",
    marketAvailability: "Yes (spice, essential oil, medicinal products).",
    parts: [
      {
        id: "bark",
        name: "Bark",
        description: "Bark used as stomachic, for abdominal pains.",
        coordinates: { x: 40, y: 40, width: 20, height: 30 },
        compounds: [
          {
            id: "cinnamaldehyde",
            name: "Cinnamaldehyde",
            pharmacologicalActivity: "Antispasmodic, antimicrobial, and potential antiulcer properties.",
            therapeuticActivity: "Used for digestive disorders and as an antimicrobial agent.",
            structure2DPlaceholder: "https://picsum.photos/seed/cinnamaldehyde2d/300/200",
            structure3DPlaceholder: "Interactive 3D view for Cinnamaldehyde",
            pharmaceuticalAnalysis: {
              molecularWeight: "132.16 g/mol",
              nominalMass: "132 Da",
              isotopeFormula: "C9H8O",
              massSpectrumUrl: "https://picsum.photos/seed/cinnamaldehyde-ms/400/300",
              hnmrUrl: "https://picsum.photos/seed/cinnamaldehyde-hnmr/400/300",
              cnmrUrl: "https://picsum.photos/seed/cinnamaldehyde-cnmr/400/300"
            }
          }
        ]
      }
    ]
  },
  {
    id: "nutmeg",
    name: "Nutmeg",
    scientificName: "Myristica fragrans",
    description: "Nutmeg is a spice made from the seed of the nutmeg tree, a tropical evergreen native to Indonesia. The seed is used for digestive disorders, asthenia, and weight gain.",
    imageUrl: "https://images.unsplash.com/photo-1596647890635-7798b3687313?q=80&w=800&auto=format&fit=crop",
    marketAvailability: "Widely available globally as a spice and essential oil.",
    parts: [
      {
        id: "seed",
        name: "Seed (nut)",
        description: "The inner seed is dried and used as the spice nutmeg.",
        coordinates: { x: 45, y: 55, width: 25, height: 25 },
        compounds: [
          {
            id: "myristicin",
            name: "Myristicin",
            pharmacologicalActivity: "Antimicrobial, anti-inflammatory; hallucinogenic at high doses.",
            therapeuticActivity: "Used for digestive disorders and historically for pain relief.",
            structure2DPlaceholder: "https://picsum.photos/seed/myristicin2d/300/200",
            structure3DPlaceholder: "Interactive 3D view for Myristicin",
            pharmaceuticalAnalysis: {
              molecularWeight: "192.21 g/mol",
              nominalMass: "192 Da",
              isotopeFormula: "C11H12O3",
              massSpectrumUrl: "https://picsum.photos/seed/myristicin-ms/400/300",
              hnmrUrl: "https://picsum.photos/seed/myristicin-hnmr/400/300",
              cnmrUrl: "https://picsum.photos/seed/myristicin-cnmr/400/300"
            }
          }
        ]
      }
    ]
  },
  {
    id: "star-anise",
    name: "Star Anise",
    scientificName: "Illicium verum",
    description: "A medium-sized evergreen tree native to northeast Vietnam and southwest China. The star shaped fruits are harvested just before ripening and are widely used in culinary and medicinal applications.",
    imageUrl: "https://images.unsplash.com/photo-1608831540955-35094d48694a?q=80&w=800&auto=format&fit=crop",
    marketAvailability: "Available globally as whole fruit, powder, or essential oil.",
    parts: [
      {
        id: "fruit",
        name: "Fruit (star capsule)",
        description: "The ripe fruit is used for respiratory infections, dyspepsia, and bloating.",
        coordinates: { x: 50, y: 50, width: 40, height: 40 },
        compounds: [
          {
            id: "anethole",
            name: "Anethole",
            pharmacologicalActivity: "Antispasmodic, carminative, and expectorant.",
            therapeuticActivity: "Relieves bloating, coughs, and acts as a mild digestive tonic.",
            structure2DPlaceholder: "https://picsum.photos/seed/anethole2d/300/200",
            structure3DPlaceholder: "Interactive 3D view for Anethole",
            pharmaceuticalAnalysis: {
              molecularWeight: "148.20 g/mol",
              nominalMass: "148 Da",
              isotopeFormula: "C10H12O",
              massSpectrumUrl: "https://picsum.photos/seed/anethole-ms/400/300",
              hnmrUrl: "https://picsum.photos/seed/anethole-hnmr/400/300",
              cnmrUrl: "https://picsum.photos/seed/anethole-cnmr/400/300"
            }
          }
        ]
      }
    ]
  },
  {
    id: "aloe-vera",
    name: "Aloe Vera",
    scientificName: "Aloe barbadensis Miller",
    description: "Aloe vera is a popular, low-maintenance succulent known for its thick, fleshy green leaves containing a medicinal gel used for skin burns and irritations.",
    imageUrl: "https://images.unsplash.com/photo-1596547633250-7164cc9e28dc?q=80&w=800&auto=format&fit=crop",
    marketAvailability: "Gel, juice, capsules, extract, topical gels, cosmetics.",
    parts: [
      {
        id: "leaves",
        name: "Leaves",
        description: "The inner leaf contains a mucilage gel widely used in medicine." ,
        coordinates: { x: 50, y: 50, width: 30, height: 60 },
        compounds: [
          {
            id: "aloin",
            name: "Aloin",
            pharmacologicalActivity: "Wound healing, anti-inflammatory, and strong laxative effects.",
            therapeuticActivity: "Used for short-term constipation relief.",
            structure2DPlaceholder: "https://picsum.photos/seed/aloin2d/300/200",
            structure3DPlaceholder: "Interactive 3D view for Aloin",
            pharmaceuticalAnalysis: {
              molecularWeight: "418.40 g/mol",
              nominalMass: "418 Da",
              isotopeFormula: "C21H22O9",
              massSpectrumUrl: "https://picsum.photos/seed/aloin-ms/400/300",
              hnmrUrl: "https://picsum.photos/seed/aloin-hnmr/400/300",
              cnmrUrl: "https://picsum.photos/seed/aloin-cnmr/400/300"
            }
          }
        ]
      }
    ]
  },
  {
    id: "castor-plant",
    name: "Castor Bean",
    scientificName: "Ricinus communis",
    description: "The castor bean is a fast-growing shrub or small tree. The fixed oil obtained from its seeds is a potent medicinal agent.",
    imageUrl: "https://images.unsplash.com/photo-1628156828532-effb250772f4?q=80&w=800&auto=format&fit=crop",
    marketAvailability: "Available globally as pure Castor Oil for medicinal and cosmetic use.",
    parts: [
      {
        id: "seeds",
        name: "Seeds",
        description: "Pressed to yield Castor Oil.",
        coordinates: { x: 30, y: 30, width: 30, height: 30 },
        compounds: [
          {
            id: "ricinoleic-acid",
            name: "Ricinoleic acid",
            pharmacologicalActivity: "Stimulant laxative, emollient, lubricant.",
            therapeuticActivity: "Used heavily in pharmaceutical vehicles and as an active laxative.",
            structure2DPlaceholder: "https://picsum.photos/seed/ricinoleic2d/300/200",
            structure3DPlaceholder: "Interactive 3D view for Ricinoleic acid",
            pharmaceuticalAnalysis: {
              molecularWeight: "298.46 g/mol",
              nominalMass: "298 Da",
              isotopeFormula: "C18H34O3",
              massSpectrumUrl: "https://picsum.photos/seed/ricinoleic-ms/400/300",
              hnmrUrl: "https://picsum.photos/seed/ricinoleic-hnmr/400/300",
              cnmrUrl: "https://picsum.photos/seed/ricinoleic-cnmr/400/300"
            }
          }
        ]
      }
    ]
  },
  {
    id: "brown-seaweeds",
    name: "Brown seaweeds (Alginic)",
    scientificName: "Laminaria, Macrocystis",
    description: "The whole thallus (marine algal body) is used as the source material. Mainly composed of linear copolymers of β-D-mannuronic acid (M units) and α-L-guluronic acid (G units).",
    imageUrl: "https://images.unsplash.com/photo-1590747448375-1e0c25b42fa0?q=80&w=800&auto=format&fit=crop",
    marketAvailability: "Antacid formulations, wound dressings, dental impression materials, pharma excipient suppliers.",
    parts: [
      {
        id: "thallus",
        name: "Thallus",
        description: "The entire algal body is used to extract alginates.",
        coordinates: { x: 50, y: 50, width: 40, height: 40 },
        compounds: [
          {
            id: "alginic-acid",
            name: "Alginic Acid",
            pharmacologicalActivity: "Thickening agent, suspending agent, tablet binder, wound dressing, dental impression material.",
            therapeuticActivity: "Used in antacids to form a protective raft, and as a hydrophilic excipient.",
            structure2DPlaceholder: "https://picsum.photos/seed/alginic2d/300/200",
            structure3DPlaceholder: "Interactive 3D view for Alginate",
            pharmaceuticalAnalysis: {
              molecularWeight: "~176 g/mol per unit",
              nominalMass: "176 Da",
              isotopeFormula: "C6H8O6 (monomer)",
              massSpectrumUrl: "https://picsum.photos/seed/alginic-ms/400/300",
              hnmrUrl: "https://picsum.photos/seed/alginic-hnmr/400/300",
              cnmrUrl: "https://picsum.photos/seed/alginic-cnmr/400/300"
            }
          }
        ]
      }
    ]
  },
  {
    id: "red-seaweeds-carrageenans",
    name: "Red seaweeds (Carrageenans)",
    scientificName: "Chondrus crispus and Gigartina species",
    description: "Sulfated polysaccharides composed mainly of D-galactose and 3,6-anhydro-D-galactose units extracted from the entire algal body (thallus).",
    imageUrl: "https://images.unsplash.com/photo-1549615234-fa2c54c344d5?q=80&w=800&auto=format&fit=crop",
    marketAvailability: "Powder (kappa, iota, lambda) for use as gelling, stabilizing, emulsifying agent.",
    parts: [
      {
        id: "thallus-carrageenan",
        name: "Thallus",
        description: "Source of carrageenans.",
        coordinates: { x: 50, y: 50, width: 60, height: 60 },
        compounds: [
          {
            id: "carrageenan",
            name: "Carrageenan",
            pharmacologicalActivity: "Pharmaceutical suspensions, gels, food stabilizers.",
            therapeuticActivity: "Gelling, stabilizing, emulsifying agent.",
            structure2DPlaceholder: "https://picsum.photos/seed/carrageenan2d/300/200",
            structure3DPlaceholder: "Interactive 3D view for Carrageenan",
            pharmaceuticalAnalysis: {
              molecularWeight: "100k - 800k Da",
              nominalMass: "Varies",
              isotopeFormula: "Mainly C, H, O, S",
              massSpectrumUrl: "https://picsum.photos/seed/carrageenan-ms/400/300",
              hnmrUrl: "https://picsum.photos/seed/carrageenan-hnmr/400/300",
              cnmrUrl: "https://picsum.photos/seed/carrageenan-cnmr/400/300"
            }
          }
        ]
      }
    ]
  },
  {
    id: "red-seaweeds-agar",
    name: "Red seaweeds (Agar)",
    scientificName: "Gelidium and Gracilaria species",
    description: "Consists mainly of agarose (neutral gelling fraction) and agaropectin (charged non-gelling fraction). These are galactose-based polysaccharides containing repeating agarobiose units.",
    imageUrl: "https://images.unsplash.com/photo-1518388487770-985223c6f14b?q=80&w=800&auto=format&fit=crop",
    marketAvailability: "Powder, strips, flakes. Culture media, laxative preparations, pharmaceutical suspending agent.",
    parts: [
      {
        id: "thallus-agar",
        name: "Thallus",
        description: "Processed to extract agar.",
        coordinates: { x: 45, y: 45, width: 50, height: 50 },
        compounds: [
          {
            id: "agarose",
            name: "Agarose",
            pharmacologicalActivity: "Laxative, culture media, suspending agent, suppository base.",
            therapeuticActivity: "Acts as a bulk laxative and suspending agent.",
            structure2DPlaceholder: "https://picsum.photos/seed/agarose2d/300/200",
            structure3DPlaceholder: "Interactive 3D view for Agarose",
            pharmaceuticalAnalysis: {
              molecularWeight: "Very high",
              nominalMass: "Varies",
              isotopeFormula: "Mainly C, H, O",
              massSpectrumUrl: "https://picsum.photos/seed/agarose-ms/400/300",
              hnmrUrl: "https://picsum.photos/seed/agarose-hnmr/400/300",
              cnmrUrl: "https://picsum.photos/seed/agarose-cnmr/400/300"
            }
          }
        ]
      }
    ]
  },
  {
    id: "citrus-fruit-pectins",
    name: "Citrus fruit (Pectins)",
    scientificName: "Citrus spp.",
    description: "Mainly composed of partially methylated polygalacturonic acid chains. It also contains rhamnose, arabinose, galactose, and methoxyl groups depending on degree of esterification.",
    imageUrl: "https://images.unsplash.com/photo-1547514701-42722101795e?q=80&w=800&auto=format&fit=crop",
    marketAvailability: "Antidiarrheal preparations, food/pharma gelling agents.",
    parts: [
      {
        id: "peel",
        name: "Fruit peel and pulp cell wall",
        description: "The medicinal source is the fruit peel and pulp cell wall.",
        coordinates: { x: 50, y: 50, width: 40, height: 40 },
        compounds: [
          {
            id: "pectin",
            name: "Pectin",
            pharmacologicalActivity: "Gelling agent, stabilizer. Antidiarrheal preparations.",
            therapeuticActivity: "Used as a gelling agent and in antidiarrheal formulations.",
            structure2DPlaceholder: "https://picsum.photos/seed/pectin2d/300/200",
            structure3DPlaceholder: "Interactive 3D view for Pectin",
            pharmaceuticalAnalysis: {
              molecularWeight: "50-150 kDa",
              nominalMass: "Varies",
              isotopeFormula: "Mainly C, H, O",
              massSpectrumUrl: "https://picsum.photos/seed/pectin-ms/400/300",
              hnmrUrl: "https://picsum.photos/seed/pectin-hnmr/400/300",
              cnmrUrl: "https://picsum.photos/seed/pectin-cnmr/400/300"
            }
          }
        ]
      }
    ]
  },
  {
    id: "gums-sterculia",
    name: "GUMS (Sterculia urens)",
    scientificName: "Sterculia urens",
    description: "Obtained as a dried gummy exudate from the bark and stem of Sterculia urens. Contains acidic polysaccharides mainly composed of galactose, rhamnose, and galacturonic acid.",
    imageUrl: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=800&auto=format&fit=crop",
    marketAvailability: "Bulk laxative products, denture adhesives.",
    parts: [
      {
        id: "gum-exudate",
        name: "Gummy exudate",
        description: "Naturally oozes out after injury to the trunk.",
        coordinates: { x: 50, y: 50, width: 30, height: 30 },
        compounds: [
          {
            id: "sterculia-polysaccharide",
            name: "Sterculia Polysaccharide",
            pharmacologicalActivity: "Bulk laxative, tablet binder, thickener.",
            therapeuticActivity: "Used as a bulk-forming laxative.",
            structure2DPlaceholder: "https://picsum.photos/seed/sterculia2d/300/200",
            structure3DPlaceholder: "Interactive 3D view",
            pharmaceuticalAnalysis: {
              molecularWeight: "High",
              nominalMass: "Varies",
              isotopeFormula: "Mainly C, H, O",
              massSpectrumUrl: "https://picsum.photos/seed/sterculia-ms/400/300",
              hnmrUrl: "https://picsum.photos/seed/sterculia-hnmr/400/300",
              cnmrUrl: "https://picsum.photos/seed/sterculia-cnmr/400/300"
            }
          }
        ]
      }
    ]
  },
  {
    id: "acacia-senegal",
    name: "Acacia senegal",
    scientificName: "Acacia senegal",
    description: "Obtained as dried gummy exudate from the stem and branches of Acacia senegal. Contains arabin (a complex polysaccharide), calcium, magnesium, and potassium salts of arabic acid.",
    imageUrl: "https://images.unsplash.com/photo-1542272201-b1ca555f8505?q=80&w=800&auto=format&fit=crop",
    marketAvailability: "Powder, granules, syrups, emulsions, suspensions, tablet binder.",
    parts: [
      {
        id: "gum-arabic",
        name: "Dried gummy exudate",
        description: "Oozes after natural injury or incision.",
        coordinates: { x: 50, y: 50, width: 30, height: 30 },
        compounds: [
          {
            id: "arabin",
            name: "Arabin / Arabic acid salts",
            pharmacologicalActivity: "Emulsifier, suspending agent, binder, demulcent.",
            therapeuticActivity: "Pharmaceutical excipient for stabilization.",
            structure2DPlaceholder: "https://picsum.photos/seed/arabin2d/300/200",
            structure3DPlaceholder: "Interactive 3D view",
            pharmaceuticalAnalysis: {
              molecularWeight: "Highly variable",
              nominalMass: "Varies",
              isotopeFormula: "Mainly C, H, O",
              massSpectrumUrl: "https://picsum.photos/seed/acacia-ms/400/300",
              hnmrUrl: "https://picsum.photos/seed/acacia-hnmr/400/300",
              cnmrUrl: "https://picsum.photos/seed/acacia-cnmr/400/300"
            }
          }
        ]
      }
    ]
  },
  {
    id: "tragacanth-gum",
    name: "Tragacanth Gum",
    scientificName: "Astragalus gummifer",
    description: "Swells in water to form viscous gel. Contains tragacanthin and bassorin.",
    imageUrl: "https://images.unsplash.com/photo-1533575770077-052fa2c609fc?q=80&w=800&auto=format&fit=crop",
    marketAvailability: "Suspensions, emulsifying agent, ointment base.",
    parts: [
      {
        id: "tragacanth-exudate",
        name: "Gummy exudate",
        description: "Dried sap.",
        coordinates: { x: 50, y: 50, width: 30, height: 30 },
        compounds: [
          {
            id: "tragacanthin",
            name: "Tragacanthin and Bassorin",
            pharmacologicalActivity: "Suspending agent, emulsifier, tablet binder.",
            therapeuticActivity: "Strong viscosifying and suspending properties.",
            structure2DPlaceholder: "https://picsum.photos/seed/tragacanthin2d/300/200",
            structure3DPlaceholder: "Interactive 3D view",
            pharmaceuticalAnalysis: {
              molecularWeight: "High",
              nominalMass: "Varies",
              isotopeFormula: "Mainly C, H, O",
              massSpectrumUrl: "https://picsum.photos/seed/tragacanth-ms/400/300",
              hnmrUrl: "https://picsum.photos/seed/tragacanth-hnmr/400/300",
              cnmrUrl: "https://picsum.photos/seed/tragacanth-cnmr/400/300"
            }
          }
        ]
      }
    ]
  },
  {
    id: "plantago-ovata",
    name: "Plantago ovata (Psyllium)",
    scientificName: "Plantago ovata",
    description: "Seed husk rich in mucilage. Contains mucilage and arabinoxylans.",
    imageUrl: "https://images.unsplash.com/photo-1588693822295-a20cabea8138?q=80&w=800&auto=format&fit=crop",
    marketAvailability: "Husk, powder, capsules. Laxatives, fiber supplements.",
    parts: [
      {
        id: "seed-husk",
        name: "Seed husk (Mucilage)",
        description: "The outer layer of the seed, rich in water-soluble fiber.",
        coordinates: { x: 50, y: 50, width: 30, height: 30 },
        compounds: [
          {
            id: "arabinoxylans",
            name: "Arabinoxylans / Mucilage",
            pharmacologicalActivity: "Bulk-forming laxative.",
            therapeuticActivity: "Constipation treatment, bowel regulators.",
            structure2DPlaceholder: "https://picsum.photos/seed/plantago2d/300/200",
            structure3DPlaceholder: "Interactive 3D view",
            pharmaceuticalAnalysis: {
              molecularWeight: "High",
              nominalMass: "Varies",
              isotopeFormula: "Mainly C, H, O",
              massSpectrumUrl: "https://picsum.photos/seed/plantago-ms/400/300",
              hnmrUrl: "https://picsum.photos/seed/plantago-hnmr/400/300",
              cnmrUrl: "https://picsum.photos/seed/plantago-cnmr/400/300"
            }
          }
        ]
      }
    ]
  },
  {
    id: "cod-liver-oil",
    name: "Cod liver oil",
    scientificName: "Gadus morrhua",
    description: "Fixed oil obtained from the fresh livers of cod fish such as Gadus morrhua and related species. Contains Omega-3 fatty acids (EPA, DHA), triglycerides, vitamin A, vitamin D, and small amounts of cholesterol.",
    imageUrl: "https://images.unsplash.com/photo-1544322477-8bb0dd7dcaf0?q=80&w=800&auto=format&fit=crop",
    marketAvailability: "Omega-3 supplement, vitamin A & D supplement.",
    parts: [
      {
        id: "liver-oil",
        name: "Liver Oil",
        description: "Oil from the liver.",
        coordinates: { x: 50, y: 50, width: 40, height: 40 },
        compounds: [
          {
            id: "epa-dha",
            name: "EPA & DHA",
            pharmacologicalActivity: "Nutritional supplement, vitamin A and D source, omega-3 supplement, supportive therapy for deficiency states.",
            therapeuticActivity: "Used for omega-3 supplementation and joint health.",
            structure2DPlaceholder: "https://picsum.photos/seed/codliver2d/300/200",
            structure3DPlaceholder: "Interactive 3D view for EPA",
            pharmaceuticalAnalysis: {
              molecularWeight: "EPA: 302.45 g/mol, DHA: 328.49 g/mol",
              nominalMass: "302, 328 Da",
              isotopeFormula: "Mainly C, H, O",
              massSpectrumUrl: "https://picsum.photos/seed/codliver-ms/400/300",
              hnmrUrl: "https://picsum.photos/seed/codliver-hnmr/400/300",
              cnmrUrl: "https://picsum.photos/seed/codliver-cnmr/400/300"
            }
          }
        ]
      }
    ]
  },
  {
    id: "olive-oil",
    name: "Olive oil",
    scientificName: "Olea europaea",
    description: "Fruit mesocarp as a drug. Contains Oleic acid, linoleic acid, palmitic acid, stearic acid, squalene, tocopherols, phytosterols.",
    imageUrl: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=800&auto=format&fit=crop",
    marketAvailability: "Pharmaceutical emollient, medicinal oil.",
    parts: [
      {
        id: "olive-fruit",
        name: "Fruit (mesocarp)",
        description: "Fleshy part of the fruit yields oil.",
        coordinates: { x: 50, y: 50, width: 30, height: 40 },
        compounds: [
          {
            id: "oleic-acid",
            name: "Oleic Acid",
            pharmacologicalActivity: "Emollient, laxative, vehicle for injections, ointment base, skin protectant.",
            therapeuticActivity: "Used as a pharmaceutical vehicle and emollient.",
            structure2DPlaceholder: "https://picsum.photos/seed/oleicacid2d/300/200",
            structure3DPlaceholder: "Interactive 3D view for Oleic acid",
            pharmaceuticalAnalysis: {
              molecularWeight: "282.46 g/mol",
              nominalMass: "282 Da",
              isotopeFormula: "C18H34O2",
              massSpectrumUrl: "https://picsum.photos/seed/oliveoil-ms/400/300",
              hnmrUrl: "https://picsum.photos/seed/oliveoil-hnmr/400/300",
              cnmrUrl: "https://picsum.photos/seed/oliveoil-cnmr/400/300"
            }
          }
        ]
      }
    ]
  },
  {
    id: "flaxseed",
    name: "Linum usitatissimum",
    scientificName: "Linum usitatissimum (Flaxseed)",
    description: "Source of α-Linolenic acid, linoleic acid, oleic acid, palmitic acid, stearic acid.",
    imageUrl: "https://images.unsplash.com/photo-1616422329737-1e582b1ee135?q=80&w=800&auto=format&fit=crop",
    marketAvailability: "Oil bottle, capsules, nutritional supplement, essential fatty acid source.",
    parts: [
      {
        id: "flax-seeds",
        name: "Seeds",
        description: "Produces linseed/flaxseed oil.",
        coordinates: { x: 50, y: 50, width: 30, height: 30 },
        compounds: [
          {
            id: "alpha-linolenic-acid",
            name: "α-Linolenic acid",
            pharmacologicalActivity: "Nutritional supplement, emollient, source of essential fatty acids.",
            therapeuticActivity: "Source of omega-3.",
            structure2DPlaceholder: "https://picsum.photos/seed/linolenic2d/300/200",
            structure3DPlaceholder: "Interactive 3D view for α-Linolenic acid",
            pharmaceuticalAnalysis: {
              molecularWeight: "278.43 g/mol",
              nominalMass: "278 Da",
              isotopeFormula: "C18H30O2",
              massSpectrumUrl: "https://picsum.photos/seed/flax-ms/400/300",
              hnmrUrl: "https://picsum.photos/seed/flax-hnmr/400/300",
              cnmrUrl: "https://picsum.photos/seed/flax-cnmr/400/300"
            }
          }
        ]
      }
    ]
  },
  {
    id: "cacao",
    name: "Theobroma cacao",
    scientificName: "Theobroma cacao",
    description: "Seeds (cocoa beans) contain triglycerides of stearic acid, palmitic acid, oleic acid.",
    imageUrl: "https://images.unsplash.com/photo-1599587425173-0ff7e258673a?q=80&w=800&auto=format&fit=crop",
    marketAvailability: "Solid fat blocks, suppository base, ointment base.",
    parts: [
      {
        id: "cocoa-beans",
        name: "Cocoa beans",
        description: "Seeds are processed back into cocoa butter.",
        coordinates: { x: 50, y: 50, width: 40, height: 40 },
        compounds: [
          {
            id: "cocoa-butter",
            name: "Cocoa Butter",
            pharmacologicalActivity: "Suppository base, ointment base, emollient.",
            therapeuticActivity: "Used natively as a suppository base melting at body temperature.",
            structure2DPlaceholder: "https://picsum.photos/seed/cocoa2d/300/200",
            structure3DPlaceholder: "Interactive 3D view for Cocoa butter",
            pharmaceuticalAnalysis: {
              molecularWeight: "Varies",
              nominalMass: "Varies",
              isotopeFormula: "C, H, O",
              massSpectrumUrl: "https://picsum.photos/seed/cocoa-ms/400/300",
              hnmrUrl: "https://picsum.photos/seed/cocoa-hnmr/400/300",
              cnmrUrl: "https://picsum.photos/seed/cocoa-cnmr/400/300"
            }
          }
        ]
      }
    ]
  },
  {
    id: "japanese-pagoda",
    name: "Japanese pagoda",
    scientificName: "Sophora japonica L.",
    description: "Cardiovascular protective and antioxidant medicinal plant. Contains Rutin, Quercetin, Kaempferol, Isorhamnetin, Genistein.",
    imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=800&auto=format&fit=crop",
    marketAvailability: "Facial serums, extracts, pharmaceutical preparations.",
    parts: [
      {
        id: "flower-buds",
        name: "Flower buds",
        description: "Rich source of flavonoids like rutin.",
        coordinates: { x: 50, y: 50, width: 40, height: 40 },
        compounds: [
          {
            id: "rutin",
            name: "Rutin (Quercetin-3-O-rutinoside)",
            pharmacologicalActivity: "Antioxidant, Anti-inflammatory, Vasoprotective, Anticancer, Anti-diabetic.",
            therapeuticActivity: "Capillary protectant.",
            structure2DPlaceholder: "https://picsum.photos/seed/rutin2d/300/200",
            structure3DPlaceholder: "Interactive 3D view for Rutin",
            pharmaceuticalAnalysis: {
              molecularWeight: "610.52 g/mol",
              nominalMass: "610 Da",
              isotopeFormula: "C27H30O16",
              massSpectrumUrl: "https://picsum.photos/seed/rutin-ms/400/300",
              hnmrUrl: "https://picsum.photos/seed/rutin-hnmr/400/300",
              cnmrUrl: "https://picsum.photos/seed/rutin-cnmr/400/300"
            }
          }
        ]
      }
    ]
  },
  {
    id: "meadowsweet",
    name: "Queen-of-the-Meadow",
    scientificName: "Filipendula ulmaria (Spirea ulmaria L.), Rosaceae",
    description: "Naturally occurring in Europe as a herbaceous perennial. Relieves rheumatism, arthritis, fever, headache, toothache.",
    imageUrl: "https://images.unsplash.com/photo-1623910398695-1f95be6fd8aa?q=80&w=800&auto=format&fit=crop",
    marketAvailability: "Extracts and herbal infusions.",
    parts: [
      {
        id: "meadowsweet-flowers",
        name: "Flowers",
        description: "Small yellowish-white flowers used in traditional medicine.",
        coordinates: { x: 50, y: 50, width: 40, height: 40 },
        compounds: [
          {
            id: "salicylic-acid",
            name: "Salicylic acid",
            pharmacologicalActivity: "Analgesic, Antimicrobial and antipyretic.",
            therapeuticActivity: "Pain relief, fever reducer.",
            structure2DPlaceholder: "https://picsum.photos/seed/salicylic2d/300/200",
            structure3DPlaceholder: "Interactive 3D view for Salicylic acid",
            pharmaceuticalAnalysis: {
              molecularWeight: "138.12 g/mol",
              nominalMass: "138 Da",
              isotopeFormula: "C7H6O3",
              massSpectrumUrl: "https://picsum.photos/seed/meadowsweet-ms/400/300",
              hnmrUrl: "https://picsum.photos/seed/meadowsweet-hnmr/400/300",
              cnmrUrl: "https://picsum.photos/seed/meadowsweet-cnmr/400/300"
            }
          }
        ]
      }
    ]
  },
  {
    id: "willow",
    name: "Willow",
    scientificName: "Salix alba L. (Salicaceae)",
    description: "The willows are trees common in damp regions all over Europe. The bark of these trees displays a high content of salicin.",
    imageUrl: "https://images.unsplash.com/photo-1579737119047-4c483a906292?q=80&w=800&auto=format&fit=crop",
    marketAvailability: "Herbal supplements and topical solutions.",
    parts: [
      {
        id: "willow-bark",
        name: "Bark",
        description: "High content of salicin.",
        coordinates: { x: 50, y: 60, width: 40, height: 40 },
        compounds: [
          {
            id: "salicin",
            name: "Salicin",
            pharmacologicalActivity: "Analgesic, anti-inflammatory.",
            therapeuticActivity: "Natural alternative for pain relief.",
            structure2DPlaceholder: "https://picsum.photos/seed/salicin2d/300/200",
            structure3DPlaceholder: "Interactive 3D view for Salicin",
            pharmaceuticalAnalysis: {
              molecularWeight: "286.28 g/mol",
              nominalMass: "286 Da",
              isotopeFormula: "C13H18O7",
              massSpectrumUrl: "https://picsum.photos/seed/willow-ms/400/300",
              hnmrUrl: "https://picsum.photos/seed/willow-hnmr/400/300",
              cnmrUrl: "https://picsum.photos/seed/willow-cnmr/400/300"
            }
          }
        ]
      }
    ]
  },
  {
    id: "peruvian-balsam",
    name: "Peruvian Balsam",
    scientificName: "Myroxylon balsamum var. pereirae",
    description: "Antiseptic and vulnerary tree from South and Central America.",
    imageUrl: "https://images.unsplash.com/photo-1601614486602-0e318ff24bb6?q=80&w=800&auto=format&fit=crop",
    marketAvailability: "Used externally in dermatology for minor wounds.",
    parts: [
      {
        id: "balsam-resin",
        name: "Resin",
        description: "Exudate from the scored bark of the tree.",
        coordinates: { x: 50, y: 50, width: 30, height: 30 },
        compounds: [
          {
            id: "benzyl-benzoate",
            name: "Benzyl benzoate",
            pharmacologicalActivity: "Antiseptic and vulnerary.",
            therapeuticActivity: "Treatment of minor wounds, burns, and ulcers.",
            structure2DPlaceholder: "https://picsum.photos/seed/benzylbenzoate2d/300/200",
            structure3DPlaceholder: "Interactive 3D view for Benzyl benzoate",
            pharmaceuticalAnalysis: {
              molecularWeight: "212.25 g/mol",
              nominalMass: "212 Da",
              isotopeFormula: "C14H12O2",
              massSpectrumUrl: "https://picsum.photos/seed/balsam-ms/400/300",
              hnmrUrl: "https://picsum.photos/seed/balsam-hnmr/400/300",
              cnmrUrl: "https://picsum.photos/seed/balsam-cnmr/400/300"
            }
          }
        ]
      }
    ]
  },
  {
    id: "myroxylon-balsamum",
    name: "Myroxylon balsamum",
    scientificName: "Myroxylon balsamum",
    description: "A tall tree from South America and the West Indies. Used for its resin, which contains free benzoic and cinnamic acids, and benzyl benzoate.",
    imageUrl: "https://images.unsplash.com/photo-1542385151-efd5ccca46d0?q=80&w=800&auto=format&fit=crop",
    marketAvailability: "An ingredient of some coughing syrups.",
    parts: [
      {
        id: "balsam-resin-tolu",
        name: "Resin",
        description: "Exudate from the trunk.",
        coordinates: { x: 50, y: 50, width: 30, height: 30 },
        compounds: [
          {
            id: "cinnamic-acid",
            name: "Cinnamic Acid",
            pharmacologicalActivity: "Antiseptic and expectorant.",
            therapeuticActivity: "Used in cough syrups.",
            structure2DPlaceholder: "https://picsum.photos/seed/cinnamicacid2d/300/200",
            structure3DPlaceholder: "Interactive 3D view for Cinnamic acid",
            pharmaceuticalAnalysis: {
              molecularWeight: "148.16 g/mol",
              nominalMass: "148 Da",
              isotopeFormula: "C9H8O2",
              massSpectrumUrl: "https://picsum.photos/seed/myroxylon-ms/400/300",
              hnmrUrl: "https://picsum.photos/seed/myroxylon-hnmr/400/300",
              cnmrUrl: "https://picsum.photos/seed/myroxylon-cnmr/400/300"
            }
          }
        ]
      }
    ]
  },
  {
    id: "sumatra-benzoin",
    name: "Sumatra Benzoin",
    scientificName: "Styrax benzoin",
    description: "Wild in Malaysia and Indonesia, and cultivated in Sumatra. Its balsamic resin is rich in free benzoic and cinnamic acids.",
    imageUrl: "https://images.unsplash.com/photo-1616422329737-1e582b1ee135?q=80&w=800&auto=format&fit=crop",
    marketAvailability: "Used in perfumery and incense.",
    parts: [
      {
        id: "sumatra-resin",
        name: "Benzoin Resin",
        description: "Balsamic resin extracted from the bark.",
        coordinates: { x: 50, y: 50, width: 30, height: 30 },
        compounds: [
          {
            id: "benzoic-acid",
            name: "Benzoic Acid",
            pharmacologicalActivity: "Antiseptic.",
            therapeuticActivity: "Used topically for antiseptic properties.",
            structure2DPlaceholder: "https://picsum.photos/seed/benzoicacid2d/300/200",
            structure3DPlaceholder: "Interactive 3D view for Benzoic acid",
            pharmaceuticalAnalysis: {
              molecularWeight: "122.12 g/mol",
              nominalMass: "122 Da",
              isotopeFormula: "C7H6O2",
              massSpectrumUrl: "https://picsum.photos/seed/benzoin-ms/400/300",
              hnmrUrl: "https://picsum.photos/seed/benzoin-hnmr/400/300",
              cnmrUrl: "https://picsum.photos/seed/benzoin-cnmr/400/300"
            }
          }
        ]
      }
    ]
  },
  {
    id: "siam-benzoin",
    name: "Siam Benzoin",
    scientificName: "Styrax tonkinensis",
    description: "A wild tree from Thailand, Laos, and Northern Vietnam. Produces a fragrant resin.",
    imageUrl: "https://images.unsplash.com/photo-1596710699742-8cbf2d80dffe?q=80&w=800&auto=format&fit=crop",
    marketAvailability: "Used in cosmetology, perfumery, and food industry.",
    parts: [
      {
        id: "siam-resin",
        name: "Siam Resin",
        description: "Exudate from the trunk after injury.",
        coordinates: { x: 50, y: 50, width: 30, height: 30 },
        compounds: [
          {
            id: "coniferyl-benzoate",
            name: "Coniferyl benzoate",
            pharmacologicalActivity: "Antiseptic and vulnerary.",
            therapeuticActivity: "Wound healing and perfumery.",
            structure2DPlaceholder: "https://picsum.photos/seed/coniferyl2d/300/200",
            structure3DPlaceholder: "Interactive 3D view",
            pharmaceuticalAnalysis: {
              molecularWeight: "284.3 g/mol",
              nominalMass: "284 Da",
              isotopeFormula: "C17H16O4",
              massSpectrumUrl: "https://picsum.photos/seed/siam-ms/400/300",
              hnmrUrl: "https://picsum.photos/seed/siam-hnmr/400/300",
              cnmrUrl: "https://picsum.photos/seed/siam-cnmr/400/300"
            }
          }
        ]
      }
    ]
  },
  {
    id: "orthosiphon",
    name: "Orthosiphon aristatus",
    scientificName: "Orthosiphon aristatus (Lamiaceae)",
    description: "A perennial plant with opposite and irregularly dentate leaves. Its flowers are white or lilac. The drug consists of the leaves.",
    imageUrl: "https://images.unsplash.com/photo-1589115714798-5c4d32a93b48?q=80&w=800&auto=format&fit=crop",
    marketAvailability: "Available as herbal tea and extracts for diuretic properties.",
    parts: [
      {
        id: "orthosiphon-leaves",
        name: "Leaves",
        description: "Used primarily in tea for kidney health.",
        coordinates: { x: 50, y: 30, width: 40, height: 40 },
        compounds: [
          {
            id: "rosmarinic-acid-ortho",
            name: "Rosmarinic Acid",
            pharmacologicalActivity: "Diuretic, anti-inflammatory, antioxidant.",
            therapeuticActivity: "Used for kidney stones and urinary tract health.",
            structure2DPlaceholder: "https://picsum.photos/seed/rosmarinic2d/300/200",
            structure3DPlaceholder: "Interactive 3D view for Rosmarinic acid",
            pharmaceuticalAnalysis: {
              molecularWeight: "360.31 g/mol",
              nominalMass: "360 Da",
              isotopeFormula: "C18H16O8",
              massSpectrumUrl: "https://picsum.photos/seed/orthosiphon-ms/400/300",
              hnmrUrl: "https://picsum.photos/seed/orthosiphon-hnmr/400/300",
              cnmrUrl: "https://picsum.photos/seed/orthosiphon-cnmr/400/300"
            }
          }
        ]
      }
    ]
  },
  {
    id: "wintergreen",
    name: "Wintergreen",
    scientificName: "Gaultheria procumbens (Ericaceae)",
    description: "Common damp-region North American plant. The essential oil is obtained from the leaves.",
    imageUrl: "https://images.unsplash.com/photo-1586716035882-019313ea3900?q=80&w=800&auto=format&fit=crop",
    marketAvailability: "Wintergreen oil is used in North America in the formulation of oral hygiene and cosmetic products.",
    parts: [
      {
        id: "wintergreen-leaves",
        name: "Leaves",
        description: "Source of wintergreen essential oil.",
        coordinates: { x: 50, y: 50, width: 50, height: 50 },
        compounds: [
          {
            id: "methyl-salicylate",
            name: "Methyl salicylate",
            pharmacologicalActivity: "Anti-inflammatory, analgesic, counter-irritant.",
            therapeuticActivity: "Used topically for muscle and joint pain.",
            structure2DPlaceholder: "https://picsum.photos/seed/methylsalicylate2d/300/200",
            structure3DPlaceholder: "Interactive 3D view for Methyl salicylate",
            pharmaceuticalAnalysis: {
              molecularWeight: "152.15 g/mol",
              nominalMass: "152 Da",
              isotopeFormula: "C8H8O3",
              massSpectrumUrl: "https://picsum.photos/seed/wintergreen-ms/400/300",
              hnmrUrl: "https://picsum.photos/seed/wintergreen-hnmr/400/300",
              cnmrUrl: "https://picsum.photos/seed/wintergreen-cnmr/400/300"
            }
          }
        ]
      }
    ]
  }
];
