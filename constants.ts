
import { RenderSettings } from './types';

export const INITIAL_RENDER_SETTINGS: RenderSettings = {
  modelImage: null,
  modelImageUrl: '',
  buildingTypes: [],
  materials: [],
  quality: 'Standard',
  aspectRatio: '16:9',
  resolution: '1080p Full HD',
  style: 'Photorealistic',
  view: 'Single View',
  details: '',
};

export const BUILDING_TYPES = [
  { id: 'office', name: '🏢 商辦大樓', value: 'Office Building' },
  { id: 'retail', name: '🛍️ 百貨商場/零售', value: 'Shopping Mall/Retail' },
  { id: 'residential', name: '🏡 住宅/集合住宅', value: 'Residential/Apartment Complex' },
  { id: 'transport', name: '🚉 交通樞紐/車站', value: 'Transportation Hub/Station' },
  { id: 'hotel', name: '🏨 酒店', value: 'Hotel' },
  { id: 'cultural', name: '🎭 文化場館', value: 'Cultural Venue (Museum, Theater)' },
  { id: 'public', name: '🏛️ 公共建築', value: 'Public Building' },
  { id: 'industrial', name: '🏭 工業建築', value: 'Industrial Building' },
  { id: 'research', name: '🔬 研發中心', value: 'R&D Center' },
  { id: 'other', name: '📦 其他', value: 'Other' },
];

export const PRESET_MATERIALS = {
  'Glass': ['High-Reflectivity Blue Glass', 'Low-Iron Ultra-Clear Glass', 'Frosted Glass', 'Green Glass Curtain Wall'],
  'Metal': ['Anodized Aluminum Panel', 'Titanium-Zinc Panel', 'Corten Steel Plate', 'Polished Stainless Steel'],
  'Concrete': ['Fair-Faced Concrete', 'Precast Concrete Panel', 'Perforated Concrete Block'],
  'Stone': ['Granite Cladding', 'Travertine', 'Marble Dry-Hanging'],
  'Wood': ['Anti-Corrosion Wood Grille', 'Dark Wood Veneer Panel'],
  'Composite': ['UHPC Prefabricated Panel', 'ETFE Membrane Structure'],
};

export const RENDER_QUALITIES = ['Economy', 'Standard', 'High', 'Ultra-High (Photorealistic)'];
export const ASPECT_RATIOS = ['16:9 (Landscape)', '9:16 (Portrait)', '1:1 (Square)', '21:9 (Cinematic Widescreen)'];
export const RESOLUTIONS = ['4K UHD', '1080p Full HD', 'Social Media Optimized'];
export const RENDER_STYLES = [
  '📷 Photorealistic',
  '🎬 Cinematic',
  '🕹️ Stylized CG',
  '🎨 Illustrative/Cartoon',
  '🏙️ Urban Sketch',
  '🌆 Dusk/Night Scene',
];
export const VIEW_OPTIONS = ['Single View', '4-Direction Simulation', 'Bird\'s-Eye View', 'Street-Level Perspective'];

export const LOADING_MESSAGES = [
    "Initializing render engine...",
    "Calculating light bounces...",
    "Applying high-resolution textures...",
    "Simulating atmospheric scattering...",
    "Processing environmental details...",
    "Adding final touches...",
    "Compiling visualization...",
    "Almost there, polishing the final image...",
];
