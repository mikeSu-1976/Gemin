
import React, { useCallback, useState } from 'react';
import type { RenderSettings } from '../types';
import { UploadIcon } from './icons';

interface Props {
  onNext: () => void;
  settings: RenderSettings;
  updateSettings: (updates: Partial<RenderSettings>) => void;
}

const WelcomeStep: React.FC<Props> = ({ onNext, settings, updateSettings }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      updateSettings({ modelImage: file });
      setPreview(URL.createObjectURL(file));
    }
  }, [updateSettings]);
  
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({ modelImageUrl: e.target.value });
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center animate-fade-in">
      <h2 className="text-2xl font-bold mb-2">Welcome to ArchVision RenderMaster</h2>
      <p className="text-gray-400 mb-6">
        Please upload your building massing model image or provide an image link.
        <br />
        You can also skip this step and generate from a text description only.
      </p>

      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-600 rounded-lg hover:border-indigo-500 transition-colors">
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
            <UploadIcon className="w-10 h-10 mb-3 text-gray-500" />
            <span className="text-indigo-400 font-semibold">Click to upload an image</span>
            <span className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP up to 10MB</span>
          </label>
          <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*"/>
        </div>
        <div className="flex flex-col">
            <input
              type="text"
              placeholder="Or paste an image link here"
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              value={settings.modelImageUrl}
              onChange={handleUrlChange}
            />
            {preview && (
              <div className="mt-4">
                <p className="text-sm font-semibold text-gray-300 mb-2">Image Preview:</p>
                <img src={preview} alt="Model preview" className="rounded-lg max-h-40 mx-auto" />
              </div>
            )}
        </div>
      </div>

      <div className="mt-8">
        <button onClick={onNext} className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 shadow-lg">
          {settings.modelImage || settings.modelImageUrl ? 'Next Step' : 'Skip & Describe'}
        </button>
      </div>
    </div>
  );
};

export default WelcomeStep;
