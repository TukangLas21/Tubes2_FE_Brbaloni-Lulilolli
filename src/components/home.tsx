import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Image from 'next/image';
import "../app/layout"
import { Grandstander } from 'next/font/google';

const grandStander = Grandstander({
    subsets: ["latin"],
    weight: "400",
    style: "normal",
    variable: "--font-grandstander",
  });

const Home: React.FC = () => {
    return (
        <div className='flex flex-col items-center justify-center pr-8 pl-8 pt-12 pb-8 bg-white
        rounded-4xl shadow-lg left-16 right-16 z-10 w-4/5'>
            <div className='flex flex-row p-8 bg-[#A9A4A4] rounded-4xl shadow-2xl w-full'>
                <div className='flex-col w-full'>
                    <h1 className='text-3xl font-bold'>
                        BrBaloni Lulilolli
                    </h1>
                    <p className={`${grandStander.className} text-xl mt-4`}>
                        Jelajahi reaksi elemental untuk <br></br>
                        menjelaskan keanehan dunia, seperti <br></br>
                        sosok capybara di dalam kelapa ٩(^ᗜ^ )و
                    </p>
                </div>
                <Image 
                    src={"/burbaloni-home.png"}
                    alt="Burbaloni"
                    width={460}
                    height={349}
                    className='-mt-28 -mb-8 -mr-8 bottom-0 right-0 w-3/5'
                />
            </div>
            <div className='w-full mt-8'>
                <h1 className='text-left'>Cara menggunakan:</h1>
            </div>
            <div className='flex flex-row w-full mt-4 z-50'>
                <div className='flex flex-col bg-[#CBBA8F] rounded-4xl shadow-lg px-4 py-8 w-1/3 mx-4'>
                    <Image 
                        src={"/search-home.png"}
                        alt="search"
                        width={300}
                        height={70}
                        className='w-full py-2'
                    />
                    <div className='flex flex-col items-center justify-center mt-4 px-4'>
                        <p className={`${grandStander.className} text-md text-center`}>
                            Masukkan nama elemen yang akan dicari resepnya ke dalam search bar
                        </p>
                    </div>
                </div>

                <div className='bg-[#CBBA8F] rounded-4xl shadow-lg p-4 w-1/3 mx-4'>
                    <p className={`${grandStander.className} text-md text-center`}>
                        Tentukan konfigurasi pencarian resep dari elemen, meliputi:
                    </p>
                    <ul className={`${grandStander.className} text-md text-start list-disc pl-5`}>
                        <li>metode pencarian</li>
                        <li>single / multiple recipes</li>
                        <li>jumlah resep yang ditunjukkan oleh opsi multiple recipes</li>
                    </ul>
                </div>

                <div className='bg-[#CBBA8F] rounded-4xl shadow-lg p-4 w-1/3 mx-4'>
                    <Image 
                        src={"/tree-home.png"}
                        alt="tree"
                        width={285}
                        height={151}
                        className='py-2 w-full justify-center'
                    />
                    <p className={`${grandStander.className} text-md text-center mt-2`}>
                        Resep elemen sesuai dengan konfigurasi akan ditampilkan dalam struktur tree!
                    </p>
                </div>

            </div>
        </div>
    );
}
export default Home;