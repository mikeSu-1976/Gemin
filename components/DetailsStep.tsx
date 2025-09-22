
import React from 'react';
import type { RenderSettings } from '../types';
import StepNavigator from './StepNavigator';

interface Props {
  onNext: () => void;
  onBack: () => void;
  settings: RenderSettings;
  updateSettings: (updates: Partial<RenderSettings>) => void;
}

const DetailsStep: React.FC<Props> = ({ onNext, onBack, settings, updateSettings }) => {
  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-xl animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">Environment & Details</h2>
      <p className="text-gray-400 mb-6">
        Describe any other details. The more specific you are, the better the result.
      </p>

      <textarea
        className="w-full h-48 bg-gray-700 border border-gray-600 rounded-md p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
        placeholder={`Suggested topics:
- Main viewpoint: (e.g., looking up from the southeast corner, eye-level from the front)
- Environment: (e.g., urban city block, lush park, seaside, mountains)
- Time & Weather: (e.g., sunny afternoon, overcast, wet ground after rain, golden hour sunset, night)
- People & Activity: (e.g., sparse pedestrians on the plaza, cafe seating at the entrance)
- Vegetation: (e.g., street trees, green planters at the entrance)
- Other details: (e.g., clouds reflected in the glass, entrance design details, hidden rooftop equipment)`}
        value={settings.details}
        onChange={(e) => updateSettings({ details: e.target.value })}
      />

      <StepNavigator onNext={onNext} onBack={onBack} nextText="Review Settings" />
    </div>
  );
};

export default DetailsStep;
