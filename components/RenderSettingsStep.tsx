
import React from 'react';
import type { RenderSettings } from '../types';
import { RENDER_QUALITIES, ASPECT_RATIOS, RESOLUTIONS, RENDER_STYLES, VIEW_OPTIONS } from '../constants';
import StepNavigator from './StepNavigator';

interface Props {
  onNext: () => void;
  onBack: () => void;
  settings: RenderSettings;
  updateSettings: (updates: Partial<RenderSettings>) => void;
}

interface RadioGroupProps<T> {
  label: string;
  options: readonly T[];
  selectedValue: T;
  onChange: (value: T) => void;
}

const RadioGroup = <T extends string,>({ label, options, selectedValue, onChange }: RadioGroupProps<T>) => (
  <div>
    <h3 className="font-semibold mb-3 text-lg text-gray-300">{label}</h3>
    <div className="flex flex-wrap gap-3">
      {options.map(option => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-4 py-2 text-sm rounded-full transition-colors ${
            selectedValue === option
              ? 'bg-indigo-600 text-white font-semibold shadow-md'
              : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);


const RenderSettingsStep: React.FC<Props> = ({ onNext, onBack, settings, updateSettings }) => {
  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-xl animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Detailed Render Settings</h2>

      <div className="space-y-8">
        <RadioGroup
          label="1. Quality"
          options={RENDER_QUALITIES}
          selectedValue={settings.quality}
          onChange={(value) => updateSettings({ quality: value })}
        />
        <div className="grid md:grid-cols-2 gap-8">
            <RadioGroup
              label="2. Aspect Ratio"
              options={ASPECT_RATIOS}
              selectedValue={settings.aspectRatio}
              onChange={(value) => updateSettings({ aspectRatio: value })}
            />
            <RadioGroup
              label="3. Resolution"
              options={RESOLUTIONS}
              selectedValue={settings.resolution}
              onChange={(value) => updateSettings({ resolution: value })}
            />
        </div>
        <RadioGroup
          label="4. Style"
          options={RENDER_STYLES}
          selectedValue={settings.style}
          onChange={(value) => updateSettings({ style: value })}
        />
        <RadioGroup
          label="5. View"
          options={VIEW_OPTIONS}
          selectedValue={settings.view}
          onChange={(value) => updateSettings({ view: value })}
        />
      </div>

      <StepNavigator onNext={onNext} onBack={onBack} />
    </div>
  );
};

export default RenderSettingsStep;
