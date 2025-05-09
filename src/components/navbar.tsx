'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
    const pathname = usePathname();
    return (
        <nav className='z-100 w-19/20 h-4/5'>
            <div className='relative w-full h-full bg-[#d9d9d9] rounded-full flex items-center opacity-90'>
                <div className='absolute right-0 top-0 w-1/2 h-full rounded-r-full z-20'>
                    <Image 
                        alt='navbar banner'
                        src={'/navbar-banner.png'}
                        fill={true}
                        quality={0}
                    />
                </div>

                {pathname == '/home' && (
                    <div className='absolute w-[85px] h-[85px] left-[10%] md:left-[20%] lg:left-[32%]  top-1/2 -translate-y-1/2 z-20'>
                        <Image 
                            src={'/capy-home.png'}
                            alt='capybara'
                            fill={true}
                            quality={100}
                        />
                    </div>
                )}

                {pathname == '/main' && (
                    <div className='absolute w-[75px] h-[75px] right-[10%] md:right-[20%] lg:right-[45%]  top-1/2 -translate-y-1/2 z-20'>
                        <Image 
                            src={'/coco-main.png'}
                            alt='coconut'
                            fill={true}
                            quality={100}
                        />
                    </div>
                )}

                <div className='flex justify-center max-w-screen-xl mx-auto'>
                    <ul className='flex space-x-72 md:flex-row flex-col justify-center text-md'>
                        <li className={`rounded-4xl py-2 px-4 ${
                        pathname == '/home' ? 'bg-[#46227C]' : 'bg-[#A4A4A4]'} z-30`}>
                            <Link href='/home' className={`${pathname == '/home' ? 'text-white' : 'text-black'} hover:text-gray-300 font-primary`}>
                                home
                            </Link>
                        </li>
                        <li className={`rounded-4xl py-2 px-4 ${
                        pathname == '/main' ? 'bg-[#46227C]' : 'bg-[#A4A4A4]'} z-30`}>
                            <Link href='/main' className={`${pathname == '/main' ? 'text-white' : 'text-black'} hover:text-gray-300`}>
                                time to create!
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;