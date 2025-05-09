import Sidebar from "@/components/sidebar";

export default function MainPage() {
    return (
        <div className="flex flex-row w-full h-full">
            <div className="flex flex-col w-1/5 h-full mx-8">
                <Sidebar />
            </div>
        </div>
    );
}