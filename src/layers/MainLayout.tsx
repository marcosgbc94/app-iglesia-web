import { Outlet } from "react-router-dom";
import { Search } from "../components/Search";

export const MainLayout: React.FC = () => {
    return (
        <div className="absolute top-0 left-0 right-0 bg-slate-50 dark:bg-slate-900 h-full">
            <header className="absolute top-0 left-0 right-0 h-16 flex items-center justify-center px-2">
                <Search />
            </header>
            <main className="absolute top-16 left-0 right-0 bottom-0 overflow-y-auto">
                <Outlet></Outlet>
            </main>
        </div>
    );
};