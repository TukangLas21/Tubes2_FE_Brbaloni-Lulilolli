'use client';

import Sidebar from "@/components/sidebar";
import MainBody from "@/components/main-body";
import { useState } from "react";

interface SearchData {
    element: string;
    algo: string;
    numRecipes: number;
}

export default function MainPage() {
    const [targetElement, setTargetElement] = useState<string>("");
    const [error, setError] = useState<string | undefined>(undefined);
    const [data, setData] = useState<any>(null);
    const [searchParams, setSearchParams] = useState<SearchData | null>(null);

    const handleSearch = async (searchData: SearchData) => {
        setError(undefined);
        try {
            const response = await fetch(`http://localhost:3000/api/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(searchData)
            });
            
            if (!response.ok) {
                throw new Error("Error in fetching data");
            }
            
            const resultData = await response.json();
            setData(resultData);
            setTargetElement(searchData.element);
            setSearchParams(searchData);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Element not found");
            setData(null);
        }
    };

    return (
        <div className="flex flex-row w-full h-full">
            <div className="flex flex-col w-1/5 h-full ml-8">
                <Sidebar 
                    onSearch={handleSearch}
                    error={error}
                />
            </div>
            <div className='flex flex-col w-4/5 h-full ml-4 mr-8'>
                <MainBody 
                    data={data} 
                    searchParams={searchParams}
                />
            </div>
        </div>
    );
}