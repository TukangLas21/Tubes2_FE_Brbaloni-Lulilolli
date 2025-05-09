import Sidebar from "@/components/sidebar";
import MainBody  from "@/components/main-body";

export default function MainPage() {
    return (
        <div className="flex flex-row w-full h-full">
            <div className="flex flex-col w-1/5 h-full ml-8">
                <Sidebar />
            </div>
            <div className='flex flex-col w-4/5 h-full ml-4 mr-8'>
                <MainBody />
            </div>
        </div>
    );
}