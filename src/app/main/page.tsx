'use client';

import Sidebar from "@/components/sidebar";
import MainBody from "@/components/main-body";
import { useState } from "react";
import { getNodeCount } from "@/utils/utils";

interface SearchData {
    element: string;
    algo: string;
    numRecipes: number;
}

interface ApiResponse {
    totalNodes: number;
    duration: string;
    edges: any;
    nodes: any;
    message: string;
    totalRecipes: number;
    target: string;
}

export default function MainPage() {
    const [targetElement, setTargetElement] = useState<string>("");
    const [error, setError] = useState<string | undefined>(undefined);
    const [nodes, setNodes] = useState<any>(null);
    const [edges, setEdges] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [nodeCount, setNodeCount] = useState<number>(0);
    const [searchTime, setSearchTime] = useState<string>("");

    const handleSearch = async (searchData: SearchData) => {
        setError(undefined);
        setIsLoading(true);
        
        try {
            if (!searchData.element.trim()) {
                throw new Error("Please enter an element");
            }
            if (!searchData.algo) {
                throw new Error("Please select an algorithm");
            }
            if (searchData.numRecipes <= 0) {
                throw new Error("Please enter a valid number of recipes");
            }

            const requestBody = {
                element: searchData.element.trim(),
                algorithm: searchData.algo,
                recipes: searchData.numRecipes
            };
            
            // const response = await fetch(`https://tubes2bebrbaloni-lulilolli-production.up.railway.app/api/v1/search?target=${searchData.element.trim()}&algo=${searchData.algo}&totalrecipe=${searchData.numRecipes}`, {
            const response = await fetch(`http://localhost:8080/api/v1/search?target=${searchData.element.trim()}&algo=${searchData.algo}&totalrecipe=${searchData.numRecipes}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            // Debug
            console.log("Request body:", requestBody); 
            console.log("Raw response:", response);


            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error in fetching data");
            }
            
            const resultData: ApiResponse = await response.json();
            
            if (!resultData) {
                throw new Error("Error in search");
            }

            if (resultData.nodes.length === 0) {
                throw new Error(resultData.message || "No recipes found");
            } else {
                setNodes(resultData.nodes);
                setEdges(resultData.edges);
                setTargetElement(searchData.element);
                setNodeCount(getNodeCount(resultData.nodes));
                setSearchTime(resultData.duration);
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "An unknown error occurred");
            setNodes(null);
            setEdges(null);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-row w-full h-full">
            <div className="flex flex-col w-1/5 h-full ml-8">
                <Sidebar 
                    onSearch={handleSearch}
                />
            </div>
            <div className='flex flex-col w-4/5 h-full ml-4 mr-8'>
                <MainBody 
                    nodes={nodes}
                    edges={edges}
                    targetElement={targetElement}
                    isLoading={isLoading}
                    nodeCount={nodeCount}
                    searchTime={searchTime}
                    error={error}
                />
            </div>
        </div>
    );
}