
import React from 'react';
import type { RenderSettings } from '../types';
import StepNavigator from './StepNavigator';

interface Props {
  onRender: () => void;
  onBack: () => void;
  settings: RenderSettings;
  error: string | null;
}

const SummaryItem: React.FC<{ label: string; value: string | undefined | null }> = ({ label, value }) => {
    if (!value || value.length === 0) return null;
    return (
        <div className="bg-gray-700/50 p-3 rounded-lg">
            <p className="text-sm text-gray-400">{label}</p>
            <p className="font-semibold text-white">{value}</p>
        </div>
    );
}

const ConfirmationStep: React.FC<Props> = ({ onRender, onBack, settings, error }) => {
    const materialSummary = settings.materials.map(m => `${m.part}: ${m.description}`).join('; ');
  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-xl animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">Confirm Your Render Settings</h2>
      <p className="text-gray-400 mb-6">Review all settings below. If everything is correct, start the rendering process.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <SummaryItem label="Building Types" value={settings.buildingTypes.join(', ')} />
        <SummaryItem label="Quality" value={settings.quality} />
        <SummaryItem label="Aspect Ratio" value={settings.aspectRatio} />
        <SummaryItem label="Resolution" value={settings.resolution} />
        <SummaryItem label="Style" value={settings.style} />
        <SummaryItem label="View" value={settings.view} />
      </div>
      <div className="space-y-4 mb-6">
        {settings.modelImage && <SummaryItem label="Uploaded Model" value={settings.modelImage.name} />}
        {settings.modelImageUrl && <SummaryItem label="Model URL" value={settings.modelImageUrl} />}
        {materialSummary && <SummaryItem label="Materials" value={materialSummary} />}
        {settings.details && <SummaryItem label="Additional Details" value={settings.details} />}
      </div>
      
      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg mb-6">
            <p className="font-bold">An error occurred:</p>
            <p>{error}</p>
        </div>
      )}

      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <button onClick={onBack} className="w-full sm:w-auto text-gray-300 hover:text-white font-bold py-3 px-6 rounded-lg transition-colors">
            Back
        </button>
        <button onClick={onRender} className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 shadow-lg">
            Start Rendering
        </button>
      </div>
    </div>
  );
};

export default ConfirmationStep;
