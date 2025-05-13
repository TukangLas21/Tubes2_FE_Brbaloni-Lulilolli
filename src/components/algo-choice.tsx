'use client'

import React from 'react';
import { useState } from 'react';

interface AlgoChoiceSpecs {
    onAlgoSelect: (algo: string) => void;
}

export default function AlgoChoice({ onAlgoSelect }: AlgoChoiceSpecs) {
    const [selectedAlgo, setSelectedAlgo] = useState<string | null>(null);

    const algorithms = [
        { id: 1, label: 'BFS' },
        { id: 2, label: 'DFS' },
    ];

    const handleAlgoClick = (algo: string) => {
        setSelectedAlgo(algo);
        onAlgoSelect(algo);
        console.log('Selected algorithm:', algo);
    };

    return (
        <div className='flex flex-col justify-center w-full h-full'>
            <div className='text-xs mb-2 text-start'>
                type of search:
            </div>
            <div className='flex flex-row items-center justify-center w-full mx-auto'>
                {algorithms.map((algo) => (
                    <button
                        key={algo.id}
                        onClick={() => handleAlgoClick(algo.label)}
                        className={`text-xs rounded-full shadow-xl py-3 px-4 mx-2
                        ${selectedAlgo === algo.label ? 'bg-[#46227C] text-white hover:bg-purple-900' : 'bg-white text-black hover:bg-gray-100'}`}
                    >
                        {algo.label}
                    </button>
                ))}
            </div>
        </div>
    );

}