import React from "react";
import { Coffee } from "lucide-react";
import { CartItem } from "../types";
import { OrderService } from "../services/orderService";

interface CartProps {
    items: CartItem[];
    removeFromCart: (index: number) => void;
    sendToWhatsApp: () => void;
    orderService: OrderService;
}

export const Cart: React.FC<CartProps> = ({
    items,
    removeFromCart,
    sendToWhatsApp,
    orderService,
}) => (
    <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-purple-800">
            Seu Carrinho
        </h2>
        {items.length === 0 ? (
            <p className="text-gray-600">Seu carrinho está vazio.</p>
        ) : (
            <>
                {items.map((item: CartItem, index: number) => (
                    <div
                        key={index + item.name}
                        className="bg-white rounded-lg shadow-md p-4 mb-4"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold text-purple-700">
                                    {item.name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {item.condiments.cobertura != "" ? (
                                        <>
                                            <b>Cobertura: </b>
                                            {item.condiments.cobertura}
                                        </>
                                    ) : (
                                        "Sem cobertura"
                                    )}
                                    {/* &nbsp;&nbsp;|&nbsp;&nbsp; */}
                                    <br />
                                    {item.condiments.acompanhamentos.length >
                                    0 ? (
                                        <>
                                            <b>Complemento:</b>
                                            {item.condiments.acompanhamentos
                                                .map((t) => ` ${t}`)
                                                .join(", ")}
                                        </>
                                    ) : (
                                        "Sem Complementos"
                                    )}
                                    {/* &nbsp;&nbsp;|&nbsp;&nbsp; */}
                                    <br />
                                    {item.condiments.adicionais.length > 0 ? (
                                        <>
                                            <b>Adicionais:</b>
                                            {item.condiments.adicionais.join(
                                                ", "
                                            )}
                                        </>
                                    ) : (
                                        "Sem Adicionais"
                                    )}
                                </p>
                            </div>
                            <div className="flex items-center">
                                <p className="font-bold text-purple-600 mr-4">
                                    R$
                                    {item.price.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                    })}
                                </p>
                                <button
                                    onClick={() => removeFromCart(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    &times;
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="mt-6">
                    <p className="text-xl font-bold text-purple-800">
                        Total: ${orderService.calculateTotal(items).toFixed(2)}
                    </p>
                    <button
                        onClick={sendToWhatsApp}
                        className="mt-4 bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-300 flex items-center justify-center w-full"
                    >
                        <Coffee className="mr-2" />
                        Finalizar Pedido via WhatsApp
                    </button>
                </div>
            </>
        )}
    </div>
);
