import { Link } from "react-router-dom";

export const NotFoundPage: React.FC = () => {
    return (
        <div className="p-4 flex items-center justify-center flex-col h-full">
            <p className="font-bold text-center text-gray-600 dark:text-gray-400">No se encontró la página</p>
            <Link to="/dashboard" className="bg-blue-500 dark:bg-blue-600 text-white p-2 rounded mt-2">
                ← Volver al inicio
            </Link>
        </div>
    );
};