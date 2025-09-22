
import React from 'react';

interface Props {
  images: string[];
  onStartOver: () => void;
}

const ResultsStep: React.FC<Props> = ({ images, onStartOver }) => {
  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-xl animate-fade-in">
      <h2 className="text-3xl font-bold mb-4 text-center">Rendering Complete</h2>
      <p className="text-gray-400 mb-8 text-center">Here is your generated architectural visualization.</p>

      <div className={`grid gap-6 ${images.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
        {images.map((image, index) => (
          <div key={index} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            <img src={image} alt={`Rendered image ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={onStartOver}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 shadow-lg"
        >
          Create Another Rendering
        </button>
      </div>
    </div>
  );
};

export default ResultsStep;
