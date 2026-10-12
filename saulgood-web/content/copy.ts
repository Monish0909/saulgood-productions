export interface CopyModel {
  brand: {
    name: string;
    legalName: string;
    tagline: string;
    descriptor: string;
    servicesLine: string;
    locationLine: string;
    email: string;
    footerPropertyTypes: string;
    copyrightNotice: string;
  };
  hero: {
    headline: string;
    eyebrow: string;
    body: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
  };
  philosophy: {
    label: string;
    heading: string;
    lead: string;
    paragraphs: [string, string, string];
    closer: string;
  };
  about: {
    label: string;
    heading: string;
    paragraphs: [string, string, string, string];
    closer: string;
    statChip: string;
  };
  specialisation: {
    label: string;
    heading: string;
    lead: string;
    services: Array<{
      id: string;
      number: string;
      title: string;
      tagline: string;
      body: string;
      tags: string[];
    }>;
  };
  creativeStandard: {
    label: string;
    heading: string;
    lead: string;
    paragraphs: [string, string];
    pillars: Array<{
      id: number;
      title: string;
      description: string;
    }>;
  };
  work: {
    label: string;
    heading: string;
    lead: string;
    body: string;
    cta: string;
    categories: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  };
  approach: {
    label: string;
    heading: string;
    steps: Array<{
      step: string;
      title: string;
      description: string;
    }>;
  };
  whySaulGood: {
    heading: string;
    points: Array<{
      title: string;
      description: string;
    }>;
  };
  clients: {
    label: string;
    heading: string;
    body: string;
    briefNote: string;
    placeholderLabel: string;
    placeholderCount: number;
  };
  contact: {
    label: string;
    heading: string;
    lead: string;
    body: string;
    closer: string;
    cta: string;
    companyBlock: string;
  };
  footer: {
    brandName: string;
    tagline: string;
    propertyTypes: string;
    copyrightText: string;
  };
}

export const copy: CopyModel = {
  brand: {
    name: "SAULGOOD PRODUCTIONS",
    legalName: "SaulGood Productions LLP",
    tagline: "Hospitality, elevated through visuals.",
    descriptor: "Hospitality Visual Production Studio",
    servicesLine: "Premium Photography · Cinematic Videography · Aerial Visuals",
    locationLine: "India · Available for selected international projects",
    email: "saulgoodproductions@gmail.com",
    footerPropertyTypes: "Hotels · Resorts · Luxury Villas · Hospitality Properties",
    copyrightNotice: "© {year} SaulGood Productions LLP. All Rights Reserved.",
  },
  hero: {
    headline: "HOSPITALITY, ELEVATED THROUGH VISUALS.",
    eyebrow: "Premium Hospitality Photography · Cinematic Videography · Aerial Visuals",
    body: "We create sophisticated visual experiences for hotels, resorts, villas and hospitality brands. Through exceptional aesthetics, thoughtful composition and cinematic storytelling, we transform spaces into visuals that inspire, captivate and leave a lasting impression.",
    ctaPrimary: {
      label: "EXPLORE OUR WORK",
      href: "#work",
    },
    ctaSecondary: {
      label: "WORK WITH US",
      href: "#contact",
    },
  },
  philosophy: {
    label: "OUR PHILOSOPHY",
    heading: "BEAUTY IS IN THE DETAILS. EXCELLENCE IS IN EVERY FRAME.",
    lead: "In hospitality, the smallest details shape the biggest impressions.",
    paragraphs: [
      "The interplay of natural light and architecture. The textures that define a space. The stillness of a perfectly designed suite. The expansive beauty of a destination.",
      "We believe these details deserve more than documentation. They deserve to be captured with intention, artistry and precision.",
      "At SaulGood Productions, we bring together a refined aesthetic sensibility, technical expertise and a deep understanding of hospitality to create imagery that feels as exceptional as the spaces themselves.",
    ],
    closer: "Every frame is considered. Every detail matters. Every project deserves our best.",
  },
  about: {
    label: "ABOUT US",
    heading: "A VISUAL STUDIO DEDICATED TO HOSPITALITY.",
    paragraphs: [
      "SaulGood Productions is a specialist hospitality visual production studio focused on creating premium photography and videography for hotels, resorts, luxury villas and hospitality properties.",
      "With over seven years of production experience, we approach every project with a commitment to visual excellence, aesthetic consistency and meticulous execution.",
      "Our work goes beyond capturing a property. We capture its character, its atmosphere and the experience it promises.",
      "From architectural compositions and beautifully styled interiors to immersive cinematic films and striking aerial perspectives, we create visual assets that elevate how hospitality brands present themselves to the world.",
    ],
    closer: "Our focus is hospitality. Our standard is premium. Our pursuit is of exceptional visual quality.",
    statChip: "7+ years",
  },
  specialisation: {
    label: "OUR SPECIALISATION",
    heading: "HOSPITALITY, THROUGH A MORE REFINED LENS.",
    lead: "We work exclusively within hospitality, bringing a focused creative perspective to every property we capture.",
    services: [
      {
        id: "hospitality-photography",
        number: "01",
        title: "HOSPITALITY PHOTOGRAPHY",
        tagline: "Spaces captured with precision. Details captured with intention.",
        body: "We create high-end hospitality photography that highlights the architecture, interiors, design details and defining features of a property. Our approach combines considered composition, balanced lighting, accurate colour and refined post-production to deliver imagery that feels elegant, immersive and true to the experience.",
        tags: [
          "Property Photography",
          "Architecture & Exteriors",
          "Interiors",
          "Rooms & Suites",
          "Amenities",
          "Lifestyle & Experiences",
        ],
      },
      {
        id: "cinematic-videography",
        number: "02",
        title: "CINEMATIC VIDEOGRAPHY",
        tagline: "Not just a view of the property. A feeling of being there.",
        body: "Our hospitality films bring spaces to life through cinematic movement, thoughtful framing, atmosphere and visual storytelling. From elegant property walkthroughs to immersive resort films, every sequence is crafted to showcase the experience, character and visual identity of the destination.",
        tags: [
          "Hospitality Films",
          "Property Films",
          "Room Walkthroughs",
          "Experience Films",
          "Promotional Videos",
          "Social Media Films",
        ],
      },
      {
        id: "aerial-visuals",
        number: "03",
        title: "AERIAL PHOTOGRAPHY & VIDEOGRAPHY",
        tagline: "A different perspective. An extraordinary impression.",
        body: "We capture the scale, setting and surroundings of hospitality properties through carefully composed aerial imagery. From architectural overviews to expansive resort landscapes, our aerial work adds depth, context and cinematic impact to a property's visual identity.",
        tags: [
          "Aerial Photography",
          "Drone Cinematography",
          "Property Overviews",
          "Landscape & Surroundings",
          "Destination Visuals",
        ],
      },
    ],
  },
  creativeStandard: {
    label: "OUR CREATIVE STANDARD",
    heading: "PREMIUM IS NOT A FILTER. IT IS A PROCESS.",
    lead: "Premium visual work is built long before the final image is delivered.",
    paragraphs: [
      "It begins with understanding the space, recognising its strongest visual qualities and knowing how to translate them into compelling imagery.",
      "At SaulGood Productions, quality is reflected in every stage of production.",
    ],
    pillars: [
      {
        id: 1,
        title: "AESTHETIC SENSIBILITY",
        description:
          "A refined visual language built around balance, proportion, light, texture and composition.",
      },
      {
        id: 2,
        title: "LIGHT & COMPOSITION",
        description:
          "Carefully considered framing and lighting that bring out the natural character and architectural beauty of every space.",
      },
      {
        id: 3,
        title: "CINEMATIC EXECUTION",
        description:
          "Fluid camera movement, intentional sequencing and visual consistency that make our films immersive and sophisticated.",
      },
      {
        id: 4,
        title: "METICULOUS POST-PRODUCTION",
        description:
          "Professional editing, detailed retouching and considered colour grading to achieve a polished, cohesive finish.",
      },
      {
        id: 5,
        title: "ATTENTION TO DETAIL",
        description:
          "A commitment to capturing the small details that distinguish an ordinary visual from an exceptional one.",
      },
      {
        id: 6,
        title: "CONSISTENCY IN QUALITY",
        description:
          "The same level of care and creative intent across every deliverable, from individual photographs to complete property campaigns.",
      },
    ],
  },
  work: {
    label: "OUR WORK",
    heading: "AESTHETICS THAT SPEAK FOR THEMSELVES.",
    lead: "A curated selection of hospitality properties captured through our lens.",
    body: "Every project is an opportunity to explore the relationship between architecture, atmosphere, design and experience.",
    cta: "DISCOVER OUR PORTFOLIO",
    categories: [
      {
        id: "hotels",
        title: "HOTELS",
        description: "Distinctive spaces. Thoughtfully captured.",
      },
      {
        id: "resorts",
        title: "RESORTS",
        description: "Exceptional destinations. Immersive visual stories.",
      },
      {
        id: "luxury-villas",
        title: "LUXURY VILLAS",
        description: "Intimate details. Elevated aesthetics.",
      },
      {
        id: "hospitality-experiences",
        title: "HOSPITALITY EXPERIENCES",
        description:
          "The atmosphere, character and details that make a stay memorable.",
      },
    ],
  },
  approach: {
    label: "OUR APPROACH",
    heading: "FROM THE FIRST FRAME TO THE FINAL FINISH.",
    steps: [
      {
        step: "01",
        title: "UNDERSTAND",
        description:
          "We study the property, its design language, positioning and intended audience.",
      },
      {
        step: "02",
        title: "ENVISION",
        description:
          "We establish a creative direction that highlights the property's strongest visual characteristics.",
      },
      {
        step: "03",
        title: "CAPTURE",
        description:
          "We execute photography, videography and aerial production with precision and attention to detail.",
      },
      {
        step: "04",
        title: "PERFECT",
        description:
          "We refine every selected image and film through professional post-production, ensuring a cohesive, premium aesthetic.",
      },
      {
        step: "05",
        title: "DELIVER",
        description:
          "We provide polished, high-quality visual assets ready for websites, booking platforms, digital campaigns and brand communication.",
      },
    ],
  },
  whySaulGood: {
    heading: "A SPECIALIST EYE. AN UNCOMPROMISING STANDARD.",
    points: [
      {
        title: "HOSPITALITY IS OUR SPECIALITY.",
        description:
          "A focused understanding of the visual requirements of hospitality properties and the experiences they offer.",
      },
      {
        title: "AESTHETICS COME FIRST.",
        description:
          "We prioritise visual harmony, sophisticated composition and a premium finish in every project.",
      },
      {
        title: "QUALITY OVER CONVENTION.",
        description:
          "We approach each property with creative intent rather than relying on a one-size-fits-all production style.",
      },
      {
        title: "ONE COHESIVE VISUAL LANGUAGE.",
        description:
          "Photography, videography and aerial imagery work together to create a consistent representation of your property.",
      },
      {
        title: "BUILT FOR PREMIUM PRESENTATION.",
        description:
          "Our imagery is created to strengthen the way a property is perceived across its digital and marketing touchpoints.",
      },
    ],
  },
  clients: {
    label: "OUR CLIENTS",
    heading: "TRUSTED TO CAPTURE EXCEPTIONAL SPACES.",
    body: "We collaborate with hospitality brands and property teams to create visual content that reflects the quality, character and experience of their properties.",
    briefNote:
      "Display verified hospitality clients here, supported by selected project imagery.",
    placeholderLabel: "Client logo",
    placeholderCount: 6,
  },
  contact: {
    label: "LET'S CREATE SOMETHING EXCEPTIONAL.",
    heading: "YOUR PROPERTY DESERVES AN EXTRAORDINARY PRESENTATION.",
    lead: "Great hospitality deserves great visuals.",
    body: "If you believe in thoughtful design, exceptional experiences and the power of aesthetics, we'd love to collaborate.",
    closer:
      "Let's create a visual identity that reflects the true quality of your property.",
    cta: "START A CONVERSATION",
    companyBlock:
      "SAULGOOD PRODUCTIONS LLP · Hospitality Visual Production Studio · Premium Photography · Cinematic Videography · Aerial Visuals · India · Available for selected international projects · Email: saulgoodproductions@gmail.com",
  },
  footer: {
    brandName: "SAULGOOD PRODUCTIONS",
    tagline: "Hospitality, elevated through visuals.",
    propertyTypes: "Hotels · Resorts · Luxury Villas · Hospitality Properties",
    copyrightText: "© {year} SaulGood Productions LLP. All Rights Reserved.",
  },
};
