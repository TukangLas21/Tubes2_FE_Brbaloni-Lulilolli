'use client'

import React, { useState, useEffect } from 'react';

interface MultChoiceProps {
    onToggle?: (enabled: boolean) => void;
    onNumChoicesChange?: (num: number | null) => void;
    initialEnabled?: boolean;
}

export default function MultChoice({ 
    onToggle, 
    onNumChoicesChange,
    initialEnabled = false
}: MultChoiceProps) {
    const [isTrue, setIsTrue] = useState(initialEnabled);
    const [numChoices, setNumChoices] = useState<number | null>(null);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if (onToggle) {
            onToggle(isTrue);
        }
    }, [isTrue, onToggle]);

    useEffect(() => {
        if (onNumChoicesChange) {
            onNumChoicesChange(numChoices);
        }
    }, [numChoices, onNumChoicesChange]);

    const handleToggle = () => {
        const newValue = !isTrue;
        setIsTrue(newValue);
        if (!newValue) {
            setNumChoices(null);
            setInputValue("");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        
        if (value === "") {
            setNumChoices(null);
        } else {
            const num = parseInt(value);
            if (!isNaN(num)) {
                setNumChoices(Math.max(1, num));
            }
        }
    };

    const handleInputBlur = () => {
        if (inputValue === "") {
            setNumChoices(null);
        } else {
            const num = parseInt(inputValue);
            if (isNaN(num)) {
                setInputValue("");
                setNumChoices(null);
            } else {
                setInputValue(Math.max(1, num).toString());
                setNumChoices(Math.max(1, num));
            }
        }
    };

    return (
        <div className='flex flex-col items-center w-full'>
            <div className='flex flex-row items-center w-full'>
                <div className='text-xs w-3/4'>
                    search for multiple recipes?
                </div>

                <button
                    onClick={handleToggle}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors 
                        focus:outline-none focus:ring-2 focus:ring-offset-2 duration-200 ease-in-out mx-auto
                        ${isTrue ? 'bg-[#46227C]' : 'bg-[#A4A4A4]'}`}
                >
                    <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transitio-transform ease-in-out duration-200
                        ${isTrue ? 'translate-x-6' : 'translate-x-0'}`}
                    />
                </button>
            </div>

            {isTrue && (
                <div className='flex flex-row items-center w-full my-2'>
                    <div className='text-xs w-3/4 text-start mx-auto'>
                        number of recipes:
                    </div>

                    <input
                        type='number'
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        min="1"
                        className='bg-white w-1/4 py-2 px-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                        [&::-webkit-inner-spin-button]:appearance-none focus:outline-none focus:ring-2 focus:ring-black'
                    />
                </div>
            )}
        </div>
    );
}