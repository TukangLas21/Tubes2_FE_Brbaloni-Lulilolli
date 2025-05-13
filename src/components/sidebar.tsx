'use client'

import React, { useEffect } from 'react';
import { useState } from 'react';
import SearchBar from '@/components/search-bar';
import AlgoChoice from '@/components/algo-choice';
import MultChoice from '@/components/mult-choice';
import Image from 'next/image';

interface SearchData {
    element: string;
    algo: string;
    numRecipes: number;
}

interface SidebarSpecs {
    onSearch: (data: SearchData) => void;
}

interface ElementOption {
    name: string;
    image: string;
}

const Sidebar: React.FC<SidebarSpecs> = ({ onSearch }) => {
    
    const [targetElement, setTargetElement] = useState<string>("");
    const [elementOptions, setElementOptions] = useState<ElementOption[]>([]);
    const [selectedAlgo, setSelectedAlgo] = useState<string>("");
    const [multiRecipes, setMultiRecipes] = useState(false);
    const [selectedNumRecipes, setSelectedNumRecipes] = useState(1);
    const [start, setStart] = useState(false);

    useEffect(() => {
        const fetchElementOptions = async () => {
            try {
                // const response = await fetch('https://tubes2bebrbaloni-lulilolli-production.up.railway.app/api/v1/images');
                const response = await fetch('http://localhost:8080/api/v1/images');
                if (!response.ok) {
                    console.log('Response not ok:', response);
                    throw new Error('Failed to fetch element options');
                }
                const data = await response.json();
                console.log('Fetched element options:', data);

                const elementOptions = data.map((element: any) => ({
                    name: element.name,
                    image: element.image
                }));

                setElementOptions(elementOptions);
            } catch (error) {
                console.error('Error fetching element options:', error);
            } 
        };

        fetchElementOptions();
    }, []);

    const handleSearchChange = (value: string) => {
        setTargetElement(value);
        console.log('Search value:', value);
    }

    const handleSearch = () => {
        console.log('Search button clicked');
        console.log('Selected element:', targetElement);
        console.log('Selected algorithm:', selectedAlgo);
        console.log('Selected number of recipes:', selectedNumRecipes);
        const searchData: SearchData = {
            element: targetElement,
            algo: selectedAlgo,
            numRecipes: multiRecipes ? selectedNumRecipes : 1
        };
        onSearch(searchData);
        setStart(true);
    }

    return (
        <div className='h-full w-full'>
            <div className='flex flex-col bg-[#d9d9d9] rounded-4xl shadow-lg w-full h-full p-4'>
                <div className='text-center w-full text-xs mb-2'>
                    you're searching for:
                </div>

                <div className='flex items-center justify-center w-full h-1/5 mx-auto bg-gray-600 rounded-lg mb-4'>
                    {
                        targetElement && (
                            <div className='flex items-center justify-center w-full h-full'>
                                {elementOptions.find(option => option.name === targetElement)?.image && (
                                    <Image 
                                        src={elementOptions.find(option => option.name === targetElement)?.image || '/'}
                                        alt='element'
                                        width={80}
                                        height={80}
                                    />
                                )}
                            </div>
                        )
                    }
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

                {/* <div className='flex w-full min-h-1/10 justify-center items-center text-xs'>
                    <p className='text-red-500'>{error}</p>
                </div> */}

                {/* {error && (
                    <div className='flex w-full h-1/10 justify-center items-center text-xs'>
                        <p className='text-red-500'>{error}</p>
                    </div>
                )} */}

                <div className='flex w-full h-1/8 justify-center items-center my-4'>
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