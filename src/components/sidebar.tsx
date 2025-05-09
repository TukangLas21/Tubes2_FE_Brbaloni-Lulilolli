'use client'

import React from 'react';
import { useState } from 'react';
import SearchBar from '@/components/search-bar';
import AlgoChoice from '@/components/algo-choice';
import MultChoice from '@/components/mult-choice';
import Link from 'next/link';
import Image from 'next/image';

const Sidebar: React.FC = () => {
    const [start, setStart] = useState(false);
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
                    <SearchBar />
                </div>

                <div className='flex w-full h-1/6 justify-center'>
                    <AlgoChoice />
                </div>

                <div className='flex w-full h-1/6 justify-center mb-4'>
                    <MultChoice />
                </div>

                <div className='flex w-full h-1/10 justify-center items-center text-xs'>
                    <p className='text-red-500'>error placeholder</p>
                </div>

                <div className='flex w-full h-1/8 justify-center items-center'>
                    <button 
                        className='bg-white rounded-full py-4 px-2 shadow-xl hover:bg-gray-200 text-xs'
                        onClick={() => setStart(true)}
                    >
                        start searching!
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;