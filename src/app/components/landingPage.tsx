import React, { useState } from "react";

interface LandingPageProps {
    onStartOrder: (name: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartOrder }) => {
    const [name, setName] = useState("");

    return (
        <div className="min-h-screen bg-purple-100 flex flex-col items-center justify-center p-4">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-purple-800 mb-2">
                    Açai +Kisabor
                </h1>
                <p className="text-xl text-purple-600">seu açai predileto</p>
            </div>
            <input
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mb-4 p-2 w-64 rounded border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
                onClick={() => onStartOrder(name)}
                className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition duration-300"
            >
                Fazer Pedido
            </button>
        </div>
    );
};
