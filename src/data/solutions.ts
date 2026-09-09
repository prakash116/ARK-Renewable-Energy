import type { Solution, SolutionSlug } from "@/types/content";

/**
 * Solution content. Capability values marked `isPlaceholder: true` are typical
 * industry ranges and MUST be confirmed against ARK's actual product range.
 *
 * TODO: Verify all capability ranges, warranties and compliance statements.
 */
export const solutions: Solution[] = [
  {
    id: "pumping",
    slug: "solar-water-pumping",
    number: "01",
    title: "Solar Water Pumping",
    shortTitle: "Solar Pumping",
    tagline: "Reliable water, powered by the sun.",
    description:
      "Solar-powered pumping systems for irrigation, drinking water and livestock, engineered for remote sites with no grid or diesel dependency.",
    icon: "droplets",
    heroImage: { alt: "Solar array powering a water pump beside a farm pond", visual: "pumping" },
    overview: [
      "A solar water pumping system converts sunlight directly into the energy needed to lift and move water. A photovoltaic array feeds a controller that drives a submersible or surface pump, so water is delivered whenever the sun is shining, with no fuel, no grid connection and very little maintenance.",
      "ARK designs each system around the site: the water source, the total dynamic head, the daily water requirement and the local solar resource. The result is a correctly sized array, controller and pump that deliver the required flow through the year rather than a one-size-fits-all kit.",
      "Systems are built with MPPT controllers that extract maximum power in low light, brushless motors for long service life, and protections against dry-run, overload and reverse polarity. Optional remote monitoring reports flow and system health to a phone or dashboard.",
    ],
    benefits: [
      { title: "Zero fuel cost", description: "Replace diesel pumps and eliminate recurring fuel and transport expenses.", icon: "zap" },
      { title: "Daytime irrigation", description: "Water availability follows the sun, matching crop irrigation windows.", icon: "sun" },
      { title: "Low maintenance", description: "Brushless DC motors and solid-state controllers with no daily servicing.", icon: "wrench" },
      { title: "Grid independent", description: "Works on remote farms and villages with no grid or unreliable supply.", icon: "network" },
      { title: "Long service life", description: "Panels typically carry 25-year performance warranties from manufacturers.", icon: "shield-check" },
      { title: "Remote monitoring", description: "Optional IoT reporting of flow, power and faults from any location.", icon: "gauge" },
    ],
    applications: [
      { title: "Agricultural irrigation", description: "Flood, sprinkler and drip irrigation for smallholder and commercial farms.", icon: "tractor" },
      { title: "Drinking water supply", description: "Community and institutional water schemes with overhead storage.", icon: "droplets" },
      { title: "Livestock and dairy", description: "Reliable troughs and washing water for cattle sheds and dairies.", icon: "home" },
      { title: "Horticulture", description: "Orchards, nurseries and polyhouses needing precise, scheduled watering.", icon: "sprout" },
      { title: "Aquaculture", description: "Water exchange and aeration support for fish and shrimp ponds.", icon: "recycle" },
      { title: "Institutional campuses", description: "Schools, hostels and health centres in off-grid locations.", icon: "building" },
    ],
    howItWorks: [
      { title: "Sunlight to DC power", description: "The PV array converts sunlight into DC electricity throughout the day." },
      { title: "Controller optimises", description: "An MPPT controller or VFD tracks maximum power and protects the motor." },
      { title: "Pump lifts water", description: "A submersible or surface pump draws water from a borewell, well or canal." },
      { title: "Storage and distribution", description: "Water flows to a tank, canal or drip network sized for the daily requirement." },
    ],
    capabilities: [
      { label: "Pump types", value: "Submersible, surface, floating" },
      { label: "Power range", value: "1 HP to 10 HP", isPlaceholder: true },
      { label: "Motor", value: "BLDC or AC induction with VFD" },
      { label: "Head range", value: "Up to 150 m total dynamic head", isPlaceholder: true },
      { label: "Protections", value: "Dry-run, overload, reverse polarity, surge" },
      { label: "Monitoring", value: "Optional remote monitoring system" },
    ],
    components: [
      { title: "PV array", description: "Mono-PERC or TOPCon modules sized to the pump and head.", icon: "sun" },
      { title: "Mounting structure", description: "Hot-dip galvanised structure with manual seasonal tilt option.", icon: "layers" },
      { title: "Pump controller", description: "MPPT controller or VFD with digital display and protections.", icon: "cpu" },
      { title: "Pump and motor", description: "Stainless-steel submersible or surface pump with matched motor.", icon: "droplets" },
      { title: "Cabling and earthing", description: "UV-resistant DC cables, lightning arrestor and earthing kit.", icon: "plug" },
      { title: "Remote monitoring", description: "GSM/IoT unit reporting flow, energy and faults.", icon: "gauge" },
    ],
    process: [
      { title: "Site and water survey", description: "Borewell yield, head, daily requirement and shading assessment." },
      { title: "System sizing", description: "Array, controller and pump selection using local solar data." },
      { title: "Supply and installation", description: "Delivery, structure erection, pump lowering and wiring." },
      { title: "Commissioning and training", description: "Flow verification, handover and operator training." },
      { title: "Service", description: "Preventive checks, spares and remote fault support." },
    ],
    useCases: [
      {
        title: "Smallholder irrigation",
        segment: "Agriculture",
        description: "A 3 HP submersible system replacing a diesel pump on a 2-hectare farm with drip irrigation.",
        outcome: "Fuel-free daytime irrigation and predictable operating cost.",
      },
      {
        title: "Village drinking water",
        segment: "Community",
        description: "A 5 HP system filling an overhead tank that gravity-feeds household taps.",
        outcome: "Reliable daily supply without dependence on grid timing.",
      },
      {
        title: "Dairy farm",
        segment: "Livestock",
        description: "A surface pump feeding troughs and shed washing lines from an open well.",
        outcome: "Reduced labour and consistent hygiene water supply.",
      },
    ],
    faqs: [
      { question: "Does a solar pump work on cloudy days?", answer: "Yes, at reduced flow. MPPT controllers extract usable power in diffuse light, and systems are sized on annual solar data so seasonal variation is accounted for. Storage tanks bridge low-light periods." },
      { question: "Do I need batteries?", answer: "Usually not. Storing water in a tank is far cheaper than storing electricity in batteries. Batteries are only recommended where night-time pumping is essential." },
      { question: "What maintenance is required?", answer: "Periodic panel cleaning and an annual inspection of cables, structure and controller. Brushless motors have no brushes or carbon to replace." },
      { question: "Can an existing pump be converted to solar?", answer: "In many cases, yes. AC pumps can be driven by a solar VFD. We assess the motor rating, head and daily requirement before recommending conversion or replacement." },
      { question: "Are government subsidies available?", answer: "Subsidy schemes for solar pumps vary by state and change over time. Our team can advise on the schemes applicable at your location at the time of enquiry." },
    ],
    resourceIds: ["cat-pumping", "man-pumping", "guide-pump-sizing"],
    seo: {
      title: "Solar Water Pumping Systems",
      description:
        "Solar water pumping systems from ARK Renewable Energy for irrigation, drinking water and livestock. MPPT controllers, submersible and surface pumps, remote monitoring.",
    },
  },
  {
    id: "rooftop",
    slug: "solar-rooftop",
    number: "02",
    title: "Solar Rooftop",
    shortTitle: "Rooftop",
    tagline: "Turn your roof into a power asset.",
    description:
      "On-grid, hybrid and off-grid rooftop solar for homes, commercial buildings and industrial sheds, designed for maximum yield and clean integration.",
    icon: "home",
    heroImage: { alt: "Commercial building rooftop with solar panel rows", visual: "rooftop" },
    overview: [
      "Rooftop solar converts unused roof area into a generating asset that offsets grid consumption for decades. ARK delivers residential, commercial and industrial rooftop systems as complete projects, from structural assessment and yield simulation to net-metering support and post-installation monitoring.",
      "Every roof is different. We design mounting for RCC slabs, metal sheet roofs and tin sheds, with wind-load calculations for the site and clean cable routing that respects the building. Inverters are selected for the load profile, with string monitoring so performance is visible from a phone.",
      "Systems can be on-grid with net metering, hybrid with battery backup for outages, or fully off-grid for locations without supply. Where applicable, we prepare and file the documentation required for utility approvals on your behalf.",
    ],
    benefits: [
      { title: "Lower electricity bills", description: "Self-consumption and net metering offset grid units at retail rates.", icon: "trending-up" },
      { title: "Long asset life", description: "Modules with 25-year performance warranties and inverters with extendable cover.", icon: "shield-check" },
      { title: "Fast payback", description: "Commercial and industrial systems typically pay back in a few years depending on tariff.", icon: "bar-chart" },
      { title: "Backup ready", description: "Hybrid configurations keep essential loads running during outages.", icon: "battery" },
      { title: "Monitoring included", description: "App and web dashboards for generation, consumption and alerts.", icon: "gauge" },
      { title: "Sustainability reporting", description: "Generation data supports ESG and carbon accounting requirements.", icon: "leaf" },
    ],
    applications: [
      { title: "Homes and housing societies", description: "1 kW upwards, with net metering and optional battery backup.", icon: "home" },
      { title: "Commercial buildings", description: "Offices, retail, hotels and hospitals with daytime load profiles.", icon: "building" },
      { title: "Industrial sheds", description: "Large metal-roof systems for factories and warehouses.", icon: "factory" },
      { title: "Educational campuses", description: "Schools and universities reducing operating cost and teaching sustainability.", icon: "graduation-cap" },
      { title: "Cold storage and agro-processing", description: "High daytime loads matched to solar generation.", icon: "recycle" },
      { title: "Institutions and government", description: "Public buildings with long-term ownership horizons.", icon: "landmark" },
    ],
    howItWorks: [
      { title: "Modules generate DC", description: "Rooftop modules convert sunlight into DC power throughout the day." },
      { title: "Inverter converts to AC", description: "String or hybrid inverters convert DC to grid-quality AC power." },
      { title: "Loads are served first", description: "Solar power feeds building loads directly, reducing grid draw." },
      { title: "Surplus exported or stored", description: "Excess energy is exported through a net meter or stored in batteries." },
    ],
    capabilities: [
      { label: "System types", value: "On-grid, hybrid, off-grid" },
      { label: "Capacity", value: "1 kW to 1 MW and above", isPlaceholder: true },
      { label: "Roof types", value: "RCC, metal sheet, tin shed, tiled" },
      { label: "Inverters", value: "String and hybrid with monitoring" },
      { label: "Mounting", value: "Galvanised or aluminium, ballast or penetrative" },
      { label: "Grid compliance", value: "Designed to applicable DISCOM and grid codes" },
    ],
    components: [
      { title: "PV modules", description: "High-efficiency mono-PERC or TOPCon modules.", icon: "sun" },
      { title: "Inverter", description: "String, micro or hybrid inverter with monitoring.", icon: "cpu" },
      { title: "Mounting structure", description: "Roof-specific structure with wind-load design.", icon: "layers" },
      { title: "AC and DC protection", description: "Combiner boxes, SPDs, isolators and earthing.", icon: "shield-check" },
      { title: "Net meter", description: "Bi-directional meter installed with utility approval.", icon: "gauge" },
      { title: "Battery storage", description: "Optional lithium storage for hybrid configurations.", icon: "battery" },
    ],
    process: [
      { title: "Roof assessment", description: "Structural check, shading analysis and load study." },
      { title: "Design and proposal", description: "Yield simulation, layout, BOM and financial summary." },
      { title: "Approvals", description: "Net-metering application and utility coordination where applicable." },
      { title: "Installation", description: "Structure, modules, inverter, cabling and protection." },
      { title: "Commissioning", description: "Testing, meter installation and monitoring setup." },
      { title: "O&M", description: "Cleaning schedules, performance reviews and warranty support." },
    ],
    useCases: [
      {
        title: "Manufacturing unit",
        segment: "Industrial",
        description: "A metal-roof system covering a large share of daytime load for a fabrication plant.",
        outcome: "Significant reduction in grid consumption with a monitored, low-maintenance asset.",
      },
      {
        title: "Housing society",
        segment: "Residential",
        description: "A shared rooftop system offsetting common-area loads such as lifts and pumps.",
        outcome: "Lower maintenance charges for residents and a visible sustainability commitment.",
      },
      {
        title: "Hospital",
        segment: "Commercial",
        description: "A hybrid system with battery backup for critical loads.",
        outcome: "Daytime savings and resilience during outages.",
      },
    ],
    faqs: [
      { question: "How much roof area is needed?", answer: "As a rule of thumb, around 8 to 10 square metres per kW for modern high-efficiency modules, depending on tilt and layout. We confirm this during the roof survey." },
      { question: "What is net metering?", answer: "A bi-directional meter records both import and export. Surplus solar exported to the grid is credited against consumption according to the applicable state policy." },
      { question: "Will solar work during a power cut?", answer: "Standard on-grid systems shut down during outages for safety. Hybrid systems with batteries continue to supply designated loads." },
      { question: "How long does installation take?", answer: "Residential systems are typically installed in a few days; larger commercial systems take longer and are scheduled around site operations. Utility approvals can add time depending on the DISCOM." },
      { question: "What about maintenance?", answer: "Rooftop systems need periodic cleaning and an annual inspection. Our O&M plans cover cleaning, monitoring and warranty coordination." },
    ],
    resourceIds: ["cat-rooftop", "man-rooftop", "guide-net-metering"],
    seo: {
      title: "Rooftop Solar Systems for Homes and Businesses",
      description:
        "On-grid, hybrid and off-grid rooftop solar from ARK Renewable Energy for residential, commercial and industrial buildings, including design, approvals, installation and O&M.",
    },
  },
  {
    id: "plants",
    slug: "solar-power-plants",
    number: "03",
    title: "Solar Power Plants",
    shortTitle: "Power Plants",
    tagline: "Utility-scale generation, delivered end to end.",
    description:
      "Ground-mounted solar power plants delivered as turnkey EPC projects, from feasibility and engineering to construction, commissioning and long-term O&M.",
    icon: "factory",
    heroImage: { alt: "Ground-mounted solar power plant at dusk", visual: "plant" },
    overview: [
      "ARK delivers ground-mounted solar power plants as complete engineering, procurement and construction projects. We work with captive consumers, developers, industrial groups and institutions that need dependable generation at scale.",
      "Our engineering team handles resource assessment, land and grid studies, layout optimisation, structural and electrical design, and evacuation infrastructure. Procurement follows a qualified vendor list, and construction is managed with defined quality checkpoints and safety protocols.",
      "After commissioning, our operations team keeps plants performing with monitoring, preventive maintenance, module cleaning and performance-ratio reporting, so the asset delivers on its financial model throughout its life.",
    ],
    benefits: [
      { title: "Single accountability", description: "One partner for design, supply, construction and performance.", icon: "target" },
      { title: "Bankable engineering", description: "Designs and documentation prepared to lender and IE expectations.", icon: "clipboard-check" },
      { title: "Optimised yield", description: "Layout, tilt and string design tuned for the site's resource.", icon: "trending-up" },
      { title: "Quality assurance", description: "Vendor qualification, factory inspection and site QA/QC.", icon: "shield-check" },
      { title: "Safety first", description: "Defined HSE processes for construction and operations.", icon: "eye" },
      { title: "Long-term O&M", description: "Monitoring, cleaning and preventive maintenance programmes.", icon: "wrench" },
    ],
    applications: [
      { title: "Captive power", description: "Industrial groups generating for their own consumption.", icon: "factory" },
      { title: "Open access", description: "Plants supplying consumers through open-access arrangements.", icon: "network" },
      { title: "Developer projects", description: "EPC delivery for independent power producers.", icon: "briefcase" },
      { title: "Institutional plants", description: "Universities, hospitals and public bodies with land available.", icon: "landmark" },
      { title: "Agri-voltaic", description: "Elevated arrays that share land with cultivation.", icon: "sprout" },
      { title: "Hybrid with storage", description: "Solar paired with battery systems for firm supply.", icon: "battery" },
    ],
    howItWorks: [
      { title: "Feasibility", description: "Resource, land, grid and financial assessment of the site." },
      { title: "Engineering", description: "Detailed civil, structural and electrical design packages." },
      { title: "Procurement", description: "Modules, inverters, structures and BOS from qualified vendors." },
      { title: "Construction and evacuation", description: "Site works, erection, HT/LT evacuation and grid connection." },
    ],
    capabilities: [
      { label: "Plant scale", value: "100 kW to multi-MW", isPlaceholder: true },
      { label: "Mounting", value: "Fixed tilt, seasonal tilt, elevated agri-voltaic" },
      { label: "Inverters", value: "String or central" },
      { label: "Evacuation", value: "LT and HT up to applicable voltage levels" },
      { label: "Monitoring", value: "SCADA and performance-ratio reporting" },
      { label: "O&M", value: "Preventive, corrective and cleaning programmes" },
    ],
    components: [
      { title: "PV modules", description: "Tier-1 mono-PERC, TOPCon or bifacial modules.", icon: "sun" },
      { title: "Mounting structures", description: "Galvanised fixed-tilt or seasonal-tilt structures.", icon: "layers" },
      { title: "Inverters and transformers", description: "String or central inverters with step-up transformers.", icon: "cpu" },
      { title: "Evacuation", description: "Switchgear, metering and transmission to the grid.", icon: "network" },
      { title: "Monitoring and SCADA", description: "Plant-level monitoring with weather station.", icon: "gauge" },
      { title: "Civil and security", description: "Roads, drainage, fencing and control room.", icon: "building" },
    ],
    process: [
      { title: "Feasibility study", description: "Resource, land, grid and financial assessment." },
      { title: "Detailed engineering", description: "Civil, structural and electrical designs and BOQ." },
      { title: "Procurement", description: "Vendor qualification, ordering and inspection." },
      { title: "Construction", description: "Site development, erection and installation with QA/QC." },
      { title: "Commissioning", description: "Testing, grid synchronisation and performance verification." },
      { title: "Operations and maintenance", description: "Ongoing monitoring, cleaning and maintenance." },
    ],
    useCases: [
      {
        title: "Captive industrial plant",
        segment: "Industrial",
        description: "A ground-mounted plant feeding a manufacturing campus through a dedicated line.",
        outcome: "Predictable long-term energy cost and reduced grid dependence.",
      },
      {
        title: "Developer EPC",
        segment: "Developer",
        description: "Turnkey delivery of a utility-scale plant for an independent power producer.",
        outcome: "On-schedule commissioning with bankable documentation.",
      },
      {
        title: "Agri-voltaic pilot",
        segment: "Agriculture",
        description: "Elevated arrays allowing cultivation beneath the modules.",
        outcome: "Dual land use with generation and crop income.",
      },
    ],
    faqs: [
      { question: "How much land is required?", answer: "Roughly 3.5 to 4.5 acres per MW for fixed-tilt plants, depending on module efficiency, layout and terrain. Detailed layouts are prepared during feasibility." },
      { question: "What does EPC include?", answer: "Engineering, procurement and construction: design, supply of all equipment, civil and electrical works, evacuation, commissioning and handover. O&M is available as a separate long-term contract." },
      { question: "How long does a plant take to build?", answer: "Timelines depend on scale, land readiness and grid approvals. Typical projects run from a few months for smaller plants to longer for multi-MW sites." },
      { question: "Do you provide O&M?", answer: "Yes. We offer monitoring, preventive maintenance, module cleaning and performance reporting under multi-year O&M contracts." },
    ],
    resourceIds: ["cat-plants", "guide-om-checklist"],
    seo: {
      title: "Solar Power Plant EPC",
      description:
        "Turnkey ground-mounted solar power plants from ARK Renewable Energy: feasibility, engineering, procurement, construction, commissioning and O&M for captive, open-access and developer projects.",
    },
  },
  {
    id: "lighting",
    slug: "solar-street-lighting",
    number: "04",
    title: "Solar Street Lighting",
    shortTitle: "Street Lighting",
    tagline: "Light where the grid does not reach.",
    description:
      "Standalone LED street lighting with integrated solar and lithium storage for rural roads, campuses, highways, parks and industrial premises.",
    icon: "lightbulb",
    heroImage: { alt: "Road at dusk lined with solar street lights", visual: "lighting" },
    overview: [
      "Solar street lights operate independently of the grid. Each unit combines a PV module, lithium battery, charge controller and LED luminaire on a galvanised pole, switching on automatically at dusk and running through the night with no trenching, cabling or electricity bills.",
      "ARK supplies integrated (all-in-one) and semi-integrated designs to suit the location, with lithium iron phosphate batteries for long cycle life and motion-sensing dimming to extend autonomy during poor weather.",
      "Projects range from single village roads to campus-wide installations and highway stretches. We handle site survey, photometric planning, supply, installation and maintenance.",
    ],
    benefits: [
      { title: "No grid or trenching", description: "Install anywhere without cabling or connection costs.", icon: "network" },
      { title: "Zero energy bills", description: "Free operation from the sun for the life of the system.", icon: "zap" },
      { title: "Automatic operation", description: "Dusk-to-dawn control with optional motion dimming.", icon: "clock" },
      { title: "Long-life batteries", description: "LiFePO4 chemistry for thousands of charge cycles.", icon: "battery" },
      { title: "Safety and security", description: "Consistent lighting for roads, campuses and public spaces.", icon: "shield-check" },
      { title: "Fast deployment", description: "Units are installed in hours, not weeks.", icon: "sparkles" },
    ],
    applications: [
      { title: "Rural roads and villages", description: "Reliable lighting for communities beyond the grid.", icon: "map-pin" },
      { title: "Highways and bypasses", description: "High-output units for intersections and stretches without supply.", icon: "compass" },
      { title: "Campuses and townships", description: "Institutional, residential and industrial estates.", icon: "building" },
      { title: "Parks and public spaces", description: "Decorative and functional lighting for open areas.", icon: "tree" },
      { title: "Industrial premises", description: "Perimeter and yard lighting for plants and warehouses.", icon: "factory" },
      { title: "Parking and transit", description: "Bus stops, parking lots and transport hubs.", icon: "landmark" },
    ],
    howItWorks: [
      { title: "Daytime charging", description: "The module charges the lithium battery through the charge controller." },
      { title: "Dusk detection", description: "The controller switches the LED luminaire on automatically at nightfall." },
      { title: "Smart dimming", description: "Motion sensing raises output when activity is detected and dims when idle." },
      { title: "Dawn shutdown", description: "The light switches off at sunrise and the cycle repeats." },
    ],
    capabilities: [
      { label: "Luminaire output", value: "12 W to 60 W and above", isPlaceholder: true },
      { label: "Battery", value: "Lithium iron phosphate (LiFePO4)" },
      { label: "Autonomy", value: "2 to 3 days of backup", isPlaceholder: true },
      { label: "Control", value: "Dusk-to-dawn, motion-sensing dimming" },
      { label: "Pole", value: "4 m to 8 m hot-dip galvanised", isPlaceholder: true },
      { label: "Designs", value: "Integrated and semi-integrated" },
    ],
    components: [
      { title: "PV module", description: "Mono-crystalline module sized to the luminaire and autonomy.", icon: "sun" },
      { title: "LED luminaire", description: "High-efficacy LED with optics for road or area lighting.", icon: "lightbulb" },
      { title: "Lithium battery", description: "LiFePO4 pack with battery management system.", icon: "battery" },
      { title: "Charge controller", description: "MPPT controller with dusk-to-dawn and dimming logic.", icon: "cpu" },
      { title: "Pole and bracket", description: "Galvanised pole with foundation and arm.", icon: "layers" },
      { title: "Motion sensor", description: "PIR or microwave sensor for adaptive output.", icon: "eye" },
    ],
    process: [
      { title: "Site survey", description: "Road width, spacing, shading and mounting review." },
      { title: "Photometric design", description: "Luminaire selection and spacing for the required lux." },
      { title: "Supply and installation", description: "Foundations, poles and units installed by trained teams." },
      { title: "Commissioning", description: "Night testing and handover documentation." },
      { title: "Maintenance", description: "Periodic cleaning, battery health checks and replacements." },
    ],
    useCases: [
      {
        title: "Village road lighting",
        segment: "Community",
        description: "Integrated units along village roads and near community buildings.",
        outcome: "Safer movement after dark without any grid infrastructure.",
      },
      {
        title: "Industrial perimeter",
        segment: "Industrial",
        description: "Semi-integrated high-output units for plant boundaries and yards.",
        outcome: "Security lighting with no cabling across the site.",
      },
      {
        title: "Campus pathways",
        segment: "Institutional",
        description: "Motion-dimming units on walkways across a university campus.",
        outcome: "Extended autonomy and lower maintenance visits.",
      },
    ],
    faqs: [
      { question: "How many nights can the light run without sun?", answer: "Systems are typically designed for two to three nights of autonomy at rated output. Motion dimming extends this further in poor weather." },
      { question: "What is the battery life?", answer: "Lithium iron phosphate batteries are rated for thousands of cycles, which typically translates to several years of service before replacement." },
      { question: "Integrated or semi-integrated?", answer: "Integrated units are compact and quick to install. Semi-integrated designs separate the module and battery from the luminaire, allowing larger modules and easier servicing for higher-output installations." },
      { question: "Can lights be monitored remotely?", answer: "Optional controllers with GSM or LoRa communication allow status monitoring and scheduling from a central dashboard." },
    ],
    resourceIds: ["cat-lighting", "man-lighting"],
    seo: {
      title: "Solar Street Lighting Systems",
      description:
        "Standalone solar LED street lighting from ARK Renewable Energy with lithium batteries, dusk-to-dawn control and motion dimming for roads, campuses, highways and public spaces.",
    },
  },
];

export const solutionSlugs = solutions.map((s) => s.slug) as SolutionSlug[];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}

export function getSolutionTitle(slug: SolutionSlug): string {
  return getSolution(slug)?.title ?? slug;
}
