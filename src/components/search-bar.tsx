'use client'

import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

interface SearchBarSpecs {
    value: string;
    onChange: (value: string) => void;
    options?: { name: string; image: string }[];
}

export default function SearchBar({ value, onChange, options = [] }: SearchBarSpecs) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const filteredOptions = options.filter(option => 
        option.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    useEffect(() => {
        setSearchValue(value);
    }, [value]);

    const handleOptionClick = (option: { name: string; image: string }) => {
        setSearchValue(option.name);
        onChange(option.name); 
        setIsOpen(false);
        console.log('Selected option:', option.name);
    };

    return (
        <div className="w-full max-w-md mx-auto relative" ref={dropdownRef}>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    className="bg-white w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                    placeholder="search..."
                    value={searchValue}
                    onChange={(e) => {
                        const newValue = e.target.value;
                        setSearchValue(newValue); // Update local state
                        onChange(newValue); // Pass the value to the parent component
                    }}
                    onClick={() => setIsOpen(true)}
                />
            </div>
            
            {isOpen && (
                <div
                    className="absolute mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-30 max-h-48 overflow-y-auto"
                >
                    {filteredOptions.length > 0 ? (
                        <ul className="py-1">
                            {filteredOptions.map((option) => (
                                <li
                                    key={option.name}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-xs"
                                    onClick={() => handleOptionClick(option)}
                                >
                                    {option.name}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="px-4 py-2 text-gray-500">No results found</div>
                    )}
                </div>
            )}
        </div>
    );
}
