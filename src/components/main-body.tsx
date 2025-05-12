'use client'

import React from 'react';
import RecipeTree from "@/components/recipe-tree";

interface MainBodyProps {
    nodes: any;
    edges: any;
    targetElement: string;
    isLoading: boolean;
    nodeCount: number;
    searchTime: string;
    error?: string;
}

export default function MainBody({ nodes, edges, targetElement, isLoading, nodeCount, searchTime, error }: MainBodyProps) {    
    return(
        <div className='flex flex-col w-full h-full bg-[#d9d9d9] rounded-4xl shadow-lg py-6 px-4'>
            <div id='tree-container' className='flex items-center justify-center w-full h-4/5 mx-auto bg-gray-600 rounded-lg mb-4 p-4'>
                {isLoading ? (
                    <div className='text-white text-xs'>Loading...</div>
                ) : ( error ? (
                    <div className='text-red-500 text-xs'>{error}</div>
                ) : ( 
                    <RecipeTree 
                        nodesArr={nodes}
                        edgesArr={edges}
                        target={targetElement} 
                    />
                ))}
            </div>

            <div className='flex w-full h-1/5 flex-row'>
                <div className='flex w-1/2 h-full justify-center items-center'>
                    <div className='flex flex-row w-3/4 h-full justify-center items-center bg-[#CCB98D] rounded-full'>
                        <div className='flex w-3/5 h-full items-center justify-center text-center text-s'>
                            waktu pencarian
                        </div>
                        <div className='h-4/5 border-l border-black'></div>

                        <div className='flex w-2/5 h-full justify-center items-center text-center text-s p-2'>
                            {searchTime}
                        </div>
                    </div>
                </div>
                <div className='flex w-1/2 h-full justify-center items-center'>
                    <div className='flex flex-row w-3/4 h-full justify-center items-center bg-[#CCB98D] rounded-full'>
                        <div className='flex w-3/5 h-full items-center justify-center text-center text-s'>
                            total node
                        </div>
                        <div className='h-4/5 border-l border-black'></div>

                        <div className='flex w-2/5 h-full justify-center text-center items-center text-s p-2'>
                            {nodeCount} nodes
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}