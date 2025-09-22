
import React, { useState } from 'react';
import type { Material, RenderSettings } from '../types';
import { PRESET_MATERIALS } from '../constants';
import StepNavigator from './StepNavigator';
import { PlusIcon, TrashIcon } from './icons';

interface Props {
  onNext: () => void;
  onBack: () => void;
  settings: RenderSettings;
  updateSettings: (updates: Partial<RenderSettings>) => void;
}

const MaterialStep: React.FC<Props> = ({ onNext, onBack, settings, updateSettings }) => {
  const [part, setPart] = useState('');
  const [description, setDescription] = useState('');

  const addMaterial = () => {
    if (part && description) {
      const newMaterial: Material = {
        id: Date.now().toString(),
        part,
        description,
      };
      updateSettings({ materials: [...settings.materials, newMaterial] });
      setPart('');
      setDescription('');
    }
  };
  
  const removeMaterial = (id: string) => {
      const updatedMaterials = settings.materials.filter(m => m.id !== id);
      updateSettings({ materials: updatedMaterials });
  };
  
  const handlePresetSelect = (preset: string) => {
    setDescription(prev => prev ? `${prev}, ${preset}` : preset);
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-xl animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">Define Exterior Materials</h2>
      <p className="text-gray-400 mb-6">Specify materials for different parts of the building. You can add multiple entries.</p>
      
      <div className="bg-gray-700 p-4 rounded-lg mb-6">
        <h3 className="font-semibold mb-3 text-lg">Add New Material</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Building Part (e.g., Main Facade)"
            value={part}
            onChange={(e) => setPart(e.target.value)}
            className="bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
          <input
            type="text"
            placeholder="Material Description (e.g., Corten Steel)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
          <button onClick={addMaterial} className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed" disabled={!part || !description}>
            <PlusIcon className="w-5 h-5 mr-2"/>
            Add Material
          </button>
        </div>
      </div>

      <div className="mb-6">
          <h3 className="font-semibold mb-3 text-lg">Or Select from Preset Library</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(PRESET_MATERIALS).map(([category, materials]) => (
                <div key={category} className="group relative">
                    <button className="bg-gray-600 text-gray-200 px-3 py-1 rounded-full text-sm hover:bg-gray-500">{category}</button>
                    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 border border-gray-700 p-2 rounded-lg shadow-lg z-10 w-60">
                        {materials.map(mat => (
                            <button key={mat} onClick={() => handlePresetSelect(mat)} className="block w-full text-left text-sm px-3 py-1.5 text-gray-300 hover:bg-indigo-600 rounded-md">{mat}</button>
                        ))}
                    </div>
                </div>
            ))}
          </div>
      </div>
      
      {settings.materials.length > 0 && (
          <div className="space-y-3">
              <h3 className="font-semibold text-lg border-b border-gray-700 pb-2">Specified Materials:</h3>
              {settings.materials.map(m => (
                  <div key={m.id} className="flex justify-between items-center bg-gray-700 p-3 rounded-lg animate-fade-in-sm">
                      <div>
                        <span className="font-bold text-indigo-400">{m.part}:</span>
                        <span className="text-gray-300 ml-2">{m.description}</span>
                      </div>
                      <button onClick={() => removeMaterial(m.id)} className="text-gray-500 hover:text-red-500">
                          <TrashIcon className="w-5 h-5"/>
                      </button>
                  </div>
              ))}
          </div>
      )}

      <StepNavigator onNext={onNext} onBack={onBack} isNextDisabled={settings.materials.length === 0} />
    </div>
  );
};

export default MaterialStep;
