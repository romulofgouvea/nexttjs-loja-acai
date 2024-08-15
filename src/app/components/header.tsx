import React from "react";
import { ShoppingCart, Leaf } from "lucide-react";

interface HeaderProps {
    cartItemsCount: number;
    onCartClick: (force?: boolean) => void;
    onLogoClick: () => void;
    userName: string;
}

export const Header: React.FC<HeaderProps> = ({
    cartItemsCount,
    userName,
    onCartClick,
    onLogoClick,
}) => (
    <header className="bg-purple-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center" onClick={onLogoClick}>
                <Leaf className="mr-2" />
                <span className="text-2xl font-bold">Açai +Kisabor</span>
            </div>
            <div className="flex items-center">
                <span className="mr-4">Olá, {userName}!</span>
                <button onClick={() => onCartClick()} className="relative">
                    <ShoppingCart size={24} />
                    {cartItemsCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            {cartItemsCount}
                        </span>
                    )}
                </button>
            </div>
        </div>
    </header>
);
