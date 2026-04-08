// ========== Project Data ==========
// Single source of truth for all project detail pages.
// To add a new project, add an entry here and link to project.html?id=<slug>

const PROJECTS = {
  'stuart-highway': {
    title: 'Stuart Highway Upgrade',
    metaDescription: 'Stuart Highway Upgrade — Major highway upgrade works including road base preparation, drainage installation, and pavement works.',
    category: 'Civil Infrastructure',
    badgeColor: 'bg-orange',
    categoryTextColor: 'text-orange',
    client: 'John Holland',
    year: '2024',
    location: 'Stuart Highway, NT',
    paragraphs: [
      'Major highway upgrade works along the Stuart Highway corridor, one of the Northern Territory\'s most critical transport routes. This project involved extensive road base preparation, drainage installation, and pavement works to improve safety and capacity.',
      'Gapunda Civil Construction provided comprehensive civil works including earthworks, stormwater drainage systems, road base construction, and associated concrete works. The project was delivered in partnership with John Holland, meeting all safety and quality standards.',
      'Working in live traffic conditions required careful staging and traffic management coordination. Our team successfully delivered all works within the project timeline while maintaining zero lost-time incidents.'
    ],
    gallery: [
      // Each item: { type: 'image' | 'video', src: '' (optional, empty = placeholder) }
      { type: 'image', src: '' },
      { type: 'image', src: '' },
      { type: 'image', src: '' },
      { type: 'image', src: '' },
      { type: 'video', src: '' },
      { type: 'image', src: '' }
    ]
  },

  'darwin-waterfront': {
    title: 'Darwin Waterfront Precinct',
    metaDescription: 'Darwin Waterfront Precinct — Structural concrete works for the Darwin Waterfront commercial development including foundations, retaining walls, and detailed formwork.',
    category: 'Concrete Works',
    badgeColor: 'bg-earth-brown',
    categoryTextColor: 'text-earth-brown',
    client: 'Civmec',
    year: '2023',
    location: 'Darwin Waterfront, NT',
    paragraphs: [
      'Structural concrete works for the Darwin Waterfront commercial development. Gapunda delivered foundations, retaining walls, and detailed formwork for a multi-storey commercial precinct.',
      'The project required high-tolerance concrete finishes and complex pour sequences to meet architectural specifications.',
      'Working in a high-traffic urban environment demanded careful logistics and coordination with multiple trades.'
    ],
    gallery: [
      { type: 'image', src: '' },
      { type: 'image', src: '' },
      { type: 'image', src: '' },
      { type: 'image', src: '' },
      { type: 'video', src: '' },
      { type: 'image', src: '' }
    ]
  },

  'palmerston-hospital': {
    title: 'Palmerston Regional Hospital',
    metaDescription: 'Palmerston Regional Hospital — Concrete foundation and structural works for the hospital expansion project with precision pours and complex reinforcement detailing.',
    category: 'Concrete Works',
    badgeColor: 'bg-earth-brown',
    categoryTextColor: 'text-earth-brown',
    client: 'Sitzler',
    year: '2023',
    location: 'Palmerston, NT',
    paragraphs: [
      'Concrete foundation and structural works for the hospital expansion project. This critical healthcare infrastructure required precision pours and complex reinforcement detailing to meet stringent structural standards.',
      'Gapunda delivered all concrete elements including pile caps, ground beams, suspended slabs, and lift core walls.',
      'Strict infection control and operational continuity protocols were maintained throughout.'
    ],
    gallery: [
      { type: 'image', src: '' },
      { type: 'image', src: '' },
      { type: 'image', src: '' },
      { type: 'image', src: '' },
      { type: 'video', src: '' },
      { type: 'image', src: '' }
    ]
  },

  'ichthys-lng': {
    title: 'Ichthys LNG Pipeline',
    metaDescription: 'Ichthys LNG Pipeline — Civil earthworks and pipeline corridor preparation for the Ichthys LNG project near-shore infrastructure.',
    category: 'Civil Infrastructure',
    badgeColor: 'bg-orange',
    categoryTextColor: 'text-orange',
    client: 'Boskalis',
    year: '2024',
    location: 'Darwin Region, NT',
    paragraphs: [
      'Civil earthworks and pipeline corridor preparation for the Ichthys LNG project near-shore infrastructure. Gapunda provided bulk earthworks, trenching, and corridor preparation across challenging coastal terrain.',
      'Environmental management was paramount, with strict controls on sediment runoff and habitat protection.',
      'Our team delivered all works within the tight marine construction window.'
    ],
    gallery: [
      { type: 'image', src: '' },
      { type: 'image', src: '' },
      { type: 'image', src: '' },
      { type: 'image', src: '' },
      { type: 'video', src: '' },
      { type: 'image', src: '' }
    ]
  },

  'katherine-bridge': {
    title: 'Katherine Bridge Repair',
    metaDescription: 'Katherine Bridge Repair — Emergency bridge repair and reinforcement works following flood damage, restoring critical road access.',
    category: 'Civil Infrastructure',
    badgeColor: 'bg-orange',
    categoryTextColor: 'text-orange',
    client: 'Smithbridge',
    year: '2025',
    location: 'Katherine, NT',
    paragraphs: [
      'Emergency bridge repair and reinforcement works following flood damage. This urgent project required rapid mobilisation to restore critical road access.',
      'Gapunda delivered concrete remediation, structural strengthening, and scour protection works.',
      'The team worked extended hours in challenging wet-season conditions to restore the bridge to full load capacity ahead of schedule.'
    ],
    gallery: [
      { type: 'image', src: '' },
      { type: 'image', src: '' },
      { type: 'image', src: '' },
      { type: 'image', src: '' },
      { type: 'video', src: '' },
      { type: 'image', src: '' }
    ]
  },

  'mining-access': {
    title: 'Mining Access Roads',
    metaDescription: 'Mining Access Roads — Supply of wet-hire equipment and operators for mining access road construction in remote NT locations.',
    category: 'Plant Hire',
    badgeColor: 'bg-charcoal-light',
    categoryTextColor: 'text-charcoal-light',
    client: 'Ritek',
    year: '2024',
    location: 'Remote NT',
    paragraphs: [
      'Supply of wet-hire equipment and operators for mining access road construction in remote NT locations. Gapunda provided a fleet of excavators, graders, rollers, and water carts with experienced operators.',
      'Working in remote conditions required self-sufficient operations including fuel management and on-site maintenance.',
      'Over 15km of access roads were constructed to mine-spec standards.'
    ],
    gallery: [
      { type: 'image', src: '' },
      { type: 'image', src: '' },
      { type: 'image', src: '' },
      { type: 'image', src: '' },
      { type: 'video', src: '' },
      { type: 'image', src: '' }
    ]
  }
};
