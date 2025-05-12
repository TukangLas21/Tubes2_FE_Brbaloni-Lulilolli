'use client'

import React from 'react';
import { useState } from 'react';
import SearchBar from '@/components/search-bar';
import AlgoChoice from '@/components/algo-choice';
import MultChoice from '@/components/mult-choice';
import Link from 'next/link';
import Image from 'next/image';

interface SearchData {
    element: string;
    algo: string;
    numRecipes: number;
}

interface SidebarSpecs {
    onSearch: (data: SearchData) => void;
    error?: string;
}

const Sidebar: React.FC<SidebarSpecs> = ({ onSearch, error }) => {
    
    const [targetElement, setTargetElement] = useState<string>("");
    const [elementOptions, setElementOptions] = useState<{ id: number; label: string }[]>([
        { id: 1, label: 'Fire' },
        { id: 2, label: 'Water' },
        { id: 3, label: 'Earth' },
        { id: 4, label: 'Air' },
    ]);
    const [selectedAlgo, setSelectedAlgo] = useState<string>("");
    const [multiRecipes, setMultiRecipes] = useState(false);
    const [selectedNumRecipes, setSelectedNumRecipes] = useState(1);
    const [start, setStart] = useState(false);

    const handleSearchChange = (value: string) => {
        setTargetElement(value);
        console.log('Search value:', value);
    }

    const handleSearch = () => {
        console.log('Search button clicked');
        console.log('Selected element:', targetElement);
        console.log('Selected algorithm:', selectedAlgo);
        console.log('Selected number of recipes:', selectedNumRecipes);
        onSearch({
            element: targetElement,
            algo: selectedAlgo,
            numRecipes: multiRecipes ? selectedNumRecipes : 1,
        });
        setStart(true);
    }

    return (
        <div className='h-full w-full'>
            <div className='flex flex-col bg-[#d9d9d9] rounded-4xl shadow-lg w-full h-full p-4'>
                <div className='text-center w-full text-xs mb-2'>
                    you're searching for:
                </div>

                <div className='flex items-center justify-center w-full h-1/5 mx-auto bg-gray-600 rounded-lg mb-4'>
                    <p className='text-white text-xs'>placeholder</p>
                </div>

                <div className='flex w-full mb-2 justify-center mx-auto'>
                    <SearchBar 
                        value={targetElement}
                        onChange={handleSearchChange}
                        options={elementOptions}
                    />
                </div>

                <div className='flex w-full h-1/6 justify-center'>
                    <AlgoChoice 
                        onAlgoSelect={setSelectedAlgo}
                    />
                </div>

                <div className='flex w-full h-1/6 justify-center mb-4'>
                    <MultChoice 
                        onToggle={setMultiRecipes}
                        onNumChoicesChange={(num) => setSelectedNumRecipes(num ?? 1)}
                        initialEnabled={false}
                    />
                </div>

                <div className='flex w-full h-1/10 justify-center items-center text-xs'>
                    <p className='text-red-500'>{error}</p>
                </div>

                {/* {error && (
                    <div className='flex w-full h-1/10 justify-center items-center text-xs'>
                        <p className='text-red-500'>{error}</p>
                    </div>
                )} */}

                <div className='flex w-full h-1/8 justify-center items-center'>
                    <button 
                        className='bg-white rounded-full py-4 px-2 shadow-xl hover:bg-gray-200 text-xs'
                        onClick={handleSearch}
                    >
                        start searching!
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;