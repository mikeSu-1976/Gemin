
import React, { useState, useCallback } from 'react';
import { AppStep, RenderSettings } from './types';
import { INITIAL_RENDER_SETTINGS } from './constants';
import WelcomeStep from './components/WelcomeStep';
import BuildingTypeStep from './components/BuildingTypeStep';
import MaterialStep from './components/MaterialStep';
import RenderSettingsStep from './components/RenderSettingsStep';
import DetailsStep from './components/DetailsStep';
import ConfirmationStep from './components/ConfirmationStep';
import LoadingStep from './components/LoadingStep';
import ResultsStep from './components/ResultsStep';
import { generateArchitecturalImage } from './services/geminiService';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.Welcome);
  const [settings, setSettings] = useState<RenderSettings>(INITIAL_RENDER_SETTINGS);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const updateSettings = (updates: Partial<RenderSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    const stepOrder = Object.values(AppStep);
    const currentIndex = stepOrder.indexOf(step);
    if (currentIndex < stepOrder.length - 1) {
      setStep(stepOrder[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const stepOrder = Object.values(AppStep);
    const currentIndex = stepOrder.indexOf(step);
    if (currentIndex > 0) {
      setStep(stepOrder[currentIndex - 1]);
    }
  };

  const handleStartOver = () => {
    setSettings(INITIAL_RENDER_SETTINGS);
    setGeneratedImages([]);
    setError(null);
    setStep(AppStep.Welcome);
  };
  
  const handleRender = useCallback(async () => {
    setStep(AppStep.Loading);
    setError(null);
    try {
      const images = await generateArchitecturalImage(settings);
      setGeneratedImages(images);
      setStep(AppStep.Results);
    } catch (err) {
      console.error("Rendering failed:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred during rendering.");
      setStep(AppStep.Confirmation); // Go back to confirmation step on error
    }
  }, [settings]);

  const renderStep = () => {
    switch (step) {
      case AppStep.Welcome:
        return <WelcomeStep onNext={handleNext} settings={settings} updateSettings={updateSettings} />;
      case AppStep.BuildingType:
        return <BuildingTypeStep onNext={handleNext} onBack={handleBack} settings={settings} updateSettings={updateSettings} />;
      case AppStep.Materials:
        return <MaterialStep onNext={handleNext} onBack={handleBack} settings={settings} updateSettings={updateSettings} />;
      case AppStep.RenderSettings:
        return <RenderSettingsStep onNext={handleNext} onBack={handleBack} settings={settings} updateSettings={updateSettings} />;
      case AppStep.Details:
        return <DetailsStep onNext={handleNext} onBack={handleBack} settings={settings} updateSettings={updateSettings} />;
      case AppStep.Confirmation:
        return <ConfirmationStep onRender={handleRender} onBack={handleBack} settings={settings} error={error} />;
      case AppStep.Loading:
        return <LoadingStep />;
      case AppStep.Results:
        return <ResultsStep images={generatedImages} onStartOver={handleStartOver} />;
      default:
        return <div>Unknown Step</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
          ArchVision RenderMaster
        </h1>
        <p className="text-gray-400 mt-2">Your AI-Powered Architectural Rendering Simulator</p>
      </header>
      <main className="w-full max-w-4xl">
        {renderStep()}
      </main>
    </div>
  );
};

export default App;
