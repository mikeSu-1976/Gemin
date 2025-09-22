
import React from 'react';
import type { RenderSettings } from '../types';
import { BUILDING_TYPES } from '../constants';
import StepNavigator from './StepNavigator';

interface Props {
  onNext: () => void;
  onBack: () => void;
  settings: RenderSettings;
  updateSettings: (updates: Partial<RenderSettings>) => void;
}

const BuildingTypeStep: React.FC<Props> = ({ onNext, onBack, settings, updateSettings }) => {
  const handleTypeToggle = (typeValue: string) => {
    const currentTypes = settings.buildingTypes;
    const newTypes = currentTypes.includes(typeValue)
      ? currentTypes.filter(t => t !== typeValue)
      : [...currentTypes, typeValue];
    updateSettings({ buildingTypes: newTypes });
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-xl animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">Select Building Property</h2>
      <p className="text-gray-400 mb-6">Choose one or more categories that best describe your project.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {BUILDING_TYPES.map(type => (
          <button
            key={type.id}
            onClick={() => handleTypeToggle(type.value)}
            className={`p-4 rounded-lg text-center transition-all duration-200 transform hover:scale-105 ${
              settings.buildingTypes.includes(type.value)
                ? 'bg-indigo-600 text-white ring-2 ring-indigo-400 shadow-lg'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
            }`}
          >
            <div className="text-2xl mb-2">{type.name.split(' ')[0]}</div>
            <div className="text-xs font-semibold">{type.name.split(' ').slice(1).join(' ')}</div>
          </button>
        ))}
      </div>

      <StepNavigator onNext={onNext} onBack={onBack} isNextDisabled={settings.buildingTypes.length === 0} />
    </div>
  );
};

export default BuildingTypeStep;
