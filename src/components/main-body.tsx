'use client'

import React from 'react';
import { sampleRecipe } from "@/utils/sample-data";
import RecipeTree from "@/components/recipe-tree";
import { useState } from "react";
import {fetchData } from "@/utils/utils";

interface MainBodyProps {
    data: any;
    targetElement: string;
    isLoading: boolean;
    nodeCount: number;
    searchTime: number;
}

export default function MainBody({ data, targetElement, isLoading, nodeCount, searchTime }: MainBodyProps) {
    const [recipeData, setRecipeData] = useState<any>(null);
    
    return(
        <div className='flex flex-col w-full h-full bg-[#d9d9d9] rounded-4xl shadow-lg py-6 px-4'>
            <div id='tree-container' className='flex items-center justify-center w-full h-4/5 mx-auto bg-gray-600 rounded-lg mb-4 p-4'>
                {/* <RecipeTree recipeData={sampleRecipe} /> */}
                {isLoading ? (
                    <div className='text-white text-xs'>Loading...</div>
                ) : (
                    <RecipeTree 
                        recipeData={data} 
                        target={targetElement} 
                    />
                )}
            </div>

            <div className='flex w-full h-1/5 flex-row'>
                <div className='flex w-1/2 h-full justify-center items-center'>
                    <div className='flex flex-row w-3/4 h-full justify-center items-center bg-[#CCB98D] rounded-full'>
                        <div className='flex w-3/5 h-full items-center justify-center text-center text-s'>
                            waktu pencarian
                        </div>
                        <div className='h-4/5 border-l border-black bg-green-500'></div>

                        <div className='flex w-2/5 h-full justify-center items-center text-center text-s p-2'>
                            {searchTime} ms
                        </div>
                    </div>
                </div>
                <div className='flex w-1/2 h-full justify-center items-center'>
                    <div className='flex flex-row w-3/4 h-full justify-center items-center bg-[#CCB98D] rounded-full'>
                        <div className='flex w-3/5 h-full items-center justify-center text-center text-xs'>
                            banyak node yang dikunjungi
                        </div>
                        <div className='h-4/5 border-l border-black bg-green-500'></div>

                        <div className='flex w-2/5 h-full justify-center text-center items-center text-s p-2'>
                            {nodeCount} nodes
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}