
export enum AppStep {
  Welcome = 'WELCOME',
  BuildingType = 'BUILDING_TYPE',
  Materials = 'MATERIALS',
  RenderSettings = 'RENDER_SETTINGS',
  Details = 'DETAILS',
  Confirmation = 'CONFIRMATION',
  Loading = 'LOADING',
  Results = 'RESULTS',
}

export interface Material {
  id: string;
  part: string;
  description: string;
}

export interface RenderSettings {
  modelImage: File | null;
  modelImageUrl: string;
  buildingTypes: string[];
  materials: Material[];
  quality: string;
  aspectRatio: string;
  resolution: string;
  style: string;
  view: string;
  details: string;
}
