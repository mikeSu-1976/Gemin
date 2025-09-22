
import React from 'react';

interface Props {
  onBack: () => void;
  onNext: () => void;
  isNextDisabled?: boolean;
  nextText?: string;
}

const StepNavigator: React.FC<Props> = ({ onBack, onNext, isNextDisabled = false, nextText = 'Next Step' }) => {
  return (
    <div className="mt-10 pt-6 border-t border-gray-700 flex justify-between items-center">
      <button
        onClick={onBack}
        className="text-gray-300 hover:text-white font-bold py-2 px-4 rounded-lg transition-colors"
      >
        Back
      </button>
      <button
        onClick={onNext}
        disabled={isNextDisabled}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed disabled:hover:bg-gray-600"
      >
        {nextText}
      </button>
    </div>
  );
};

export default StepNavigator;
