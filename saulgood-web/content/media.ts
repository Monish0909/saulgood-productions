export interface MediaItem {
  src: string;
  alt: string;
  width: number;
  height: number;
  category?: string;
  caption?: string;
}

export interface MediaManifest {
  heroVideoFrames: {
    basePath: string;
    totalFrames: number;
    extension: string;
    poster: MediaItem;
  };
  heroMosaic: MediaItem[];
  services: {
    photography: MediaItem;
    videography: MediaItem;
    aerial: MediaItem;
  };
  work: Record<"hotels" | "resorts" | "villas" | "experiences", MediaItem[]>;
  approachBg: MediaItem;
  contactBg: MediaItem;
  clientLogoPlaceholder: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

export const mediaManifest: MediaManifest = {
  heroVideoFrames: {
    basePath: "/media/placeholder/hero-frames/",
    totalFrames: 120,
    extension: "webp",
    poster: {
      src: "/media/placeholder/resort.jpg",
      alt: "Luxury resort architecture at dusk",
      width: 1920,
      height: 1080,
    },
  },
  heroMosaic: [
    {
      src: "/media/placeholder/resort.jpg",
      alt: "Panoramic resort exterior with illuminated pools",
      width: 1600,
      height: 1067,
    },
    {
      src: "/media/placeholder/villa-pool.jpg",
      alt: "Infinity pool overlooking private luxury villa grounds",
      width: 1600,
      height: 1067,
    },
    {
      src: "/media/placeholder/suite-interior.jpg",
      alt: "Architectural suite interior with natural daylight and minimalist styling",
      width: 1600,
      height: 1067,
    },
    {
      src: "/media/placeholder/heritage-palace.jpg",
      alt: "Historic Indian heritage palace courtyard architecture",
      width: 1600,
      height: 1067,
    },
    {
      src: "/media/placeholder/spa.jpg",
      alt: "Wellness sanctuary and holistic spa retreat interior",
      width: 1600,
      height: 1067,
    },
    {
      src: "/media/placeholder/aerial-resort.jpg",
      alt: "High-angle drone aerial view of secluded resort coastline",
      width: 1600,
      height: 1067,
    },
    {
      src: "/media/placeholder/architecture.jpg",
      alt: "Sculptural geometric hotel facade and modern lines",
      width: 1600,
      height: 1067,
    },
    {
      src: "/media/placeholder/resort.jpg",
      alt: "Hospitality courtyard ambiance under twilight",
      width: 1600,
      height: 1067,
    },
  ],
  services: {
    photography: {
      src: "/media/placeholder/suite-interior.jpg",
      alt: "Hospitality photography capturing interior textures and balance",
      width: 1600,
      height: 1067,
    },
    videography: {
      src: "/media/placeholder/villa-pool.jpg",
      alt: "Cinematic videography composition at luxury property",
      width: 1600,
      height: 1067,
    },
    aerial: {
      src: "/media/placeholder/aerial-resort.jpg",
      alt: "Aerial drone visual of expansive resort coastline",
      width: 1600,
      height: 1067,
    },
  },
  work: {
    hotels: [
      {
        src: "/media/placeholder/architecture.jpg",
        alt: "Hotel facade composition",
        width: 1600,
        height: 1067,
        category: "Hotels",
        caption: "Contemporary urban hotel facade",
      },
      {
        src: "/media/placeholder/suite-interior.jpg",
        alt: "Hotel executive suite",
        width: 1600,
        height: 1067,
        category: "Hotels",
        caption: "Minimalist executive suite",
      },
      {
        src: "/media/placeholder/resort.jpg",
        alt: "Boutique hotel courtyard",
        width: 1600,
        height: 1067,
        category: "Hotels",
        caption: "Courtyard and reception pavilion",
      },
      {
        src: "/media/placeholder/spa.jpg",
        alt: "Hotel lounge sanctuary",
        width: 1600,
        height: 1067,
        category: "Hotels",
        caption: "Private wellness lounge",
      },
    ],
    resorts: [
      {
        src: "/media/placeholder/resort.jpg",
        alt: "Destination resort grounds",
        width: 1600,
        height: 1067,
        category: "Resorts",
        caption: "Lagoon pool and pavilion",
      },
      {
        src: "/media/placeholder/aerial-resort.jpg",
        alt: "Island resort aerial overview",
        width: 1600,
        height: 1067,
        category: "Resorts",
        caption: "Expansive shoreline setting",
      },
      {
        src: "/media/placeholder/villa-pool.jpg",
        alt: "Resort water villa",
        width: 1600,
        height: 1067,
        category: "Resorts",
        caption: "Overwater deck and infinity plunge",
      },
      {
        src: "/media/placeholder/spa.jpg",
        alt: "Resort spa retreat",
        width: 1600,
        height: 1067,
        category: "Resorts",
        caption: "Tropical open-air relaxation pavilion",
      },
    ],
    villas: [
      {
        src: "/media/placeholder/villa-pool.jpg",
        alt: "Private luxury villa pool",
        width: 1600,
        height: 1067,
        category: "Luxury Villas",
        caption: "Exclusive hillside villa deck",
      },
      {
        src: "/media/placeholder/suite-interior.jpg",
        alt: "Villa master bedroom",
        width: 1600,
        height: 1067,
        category: "Luxury Villas",
        caption: "Curated bedroom with native stone",
      },
      {
        src: "/media/placeholder/architecture.jpg",
        alt: "Villa geometric pavilion",
        width: 1600,
        height: 1067,
        category: "Luxury Villas",
        caption: "Seamless indoor-outdoor living",
      },
      {
        src: "/media/placeholder/heritage-palace.jpg",
        alt: "Heritage villa residence",
        width: 1600,
        height: 1067,
        category: "Luxury Villas",
        caption: "Restored royal private estate",
      },
    ],
    experiences: [
      {
        src: "/media/placeholder/spa.jpg",
        alt: "Holistic spa treatment room",
        width: 1600,
        height: 1067,
        category: "Hospitality Experiences",
        caption: "Subtle daylight in treatment suite",
      },
      {
        src: "/media/placeholder/heritage-palace.jpg",
        alt: "Cultural dining courtyard",
        width: 1600,
        height: 1067,
        category: "Hospitality Experiences",
        caption: "Candelit palace dinner setting",
      },
      {
        src: "/media/placeholder/resort.jpg",
        alt: "Twilight pool atmosphere",
        width: 1600,
        height: 1067,
        category: "Hospitality Experiences",
        caption: "Evening ambiance by the water",
      },
      {
        src: "/media/placeholder/aerial-resort.jpg",
        alt: "Sunset coastal excursion",
        width: 1600,
        height: 1067,
        category: "Hospitality Experiences",
        caption: "Aerial view of private catamaran cruise",
      },
    ],
  },
  approachBg: {
    src: "/media/placeholder/heritage-palace.jpg",
    alt: "Textural architectural backdrop",
    width: 1600,
    height: 1067,
  },
  contactBg: {
    src: "/media/placeholder/architecture.jpg",
    alt: "Sculptural stone and shadow backdrop",
    width: 1600,
    height: 1067,
  },
  clientLogoPlaceholder: {
    src: "/media/placeholder/client-logo-placeholder.svg",
    alt: "Client logo placeholder",
    width: 200,
    height: 80,
  },
};
