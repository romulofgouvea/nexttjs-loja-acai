import { IceCream } from "lucide-react";
import { useState, useRef } from "react";
import { CartItem, CatalogItem, Condiment, CondimentItem } from "../types";

interface CatalogProps {
    addToCart: (item: CartItem) => void;
}

const acompanhamentos = [
    "Leite em pó",
    "Amendoim",
    "Paçoca",
    "Sucrilhos",
    "Ovomaltine",
    "Jujuba",
    "Confete",
    "Granulado",
    "Granola",
    "Aveia",
    "Chocoball",
];

const coberturas = [
    "Leite condensado",
    "Chocolate Branco",
    "Caramelo",
    "Morango",
    "Menta",
    "Kiwi",
    "Chocolate",
    "Uva",
    "Doce de leite",
    "Brigadeiro",
    "Abacaxi",
];

const adicionais = [
    { name: "Tortuguita Chocolate", price: 2 },
    { name: "Creme Laka oreo", price: 3 },
    { name: "Leite moça", price: 2 },
    { name: "Oreo", price: 2 },
    { name: "Creme de ninho", price: 3 },
    { name: "Uva", price: 2 },
    { name: "Nutella", price: 3 },
    { name: "Bis", price: 2 },
    { name: "Banana", price: 1 },
    { name: "Bombom ouro branco", price: 2 },
    { name: "Kitkat", price: 2 },
] as CondimentItem[];

const catalogItems = [
    {
        id: 1,
        name: "200ml",
        description: "Açaí",
        price: 7,
        icon: <IceCream size={24} />,
    },
    {
        id: 2,
        name: "330ml",
        description: "Açaí",
        price: 10,
        icon: <IceCream size={24} />,
    },
    {
        id: 3,
        name: "440ml",
        description: "Açaí",
        price: 13,
        icon: <IceCream size={24} />,
    },
    {
        id: 4,
        name: "550ml",
        description: "Açaí",
        price: 15,
        icon: <IceCream size={24} />,
    },
    {
        id: 5,
        name: "770ml",
        description: "Açaí",
        price: 22,
        icon: <IceCream size={24} />,
    },
] as CatalogItem[];

export const Catalog: React.FC<CatalogProps> = ({ addToCart }) => {
    const modalRef = useRef(null);
    const overlayRef = useRef(null);

    const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null);
    const [condimentsSelected, setCondimentsSelected] = useState({
        cobertura: "",
        acompanhamentos: [],
        adicionais: [],
    } as Condiment);

    const openModal = (item: CatalogItem) => {
        setSelectedItem(item);
        if (!overlayRef.current) return;
        overlayRef.current.classList.remove("hidden");
        setCondimentsSelected({
            cobertura: "",
            acompanhamentos: [],
            adicionais: [],
        });
    };

    const closeModal = () => {
        if (!overlayRef.current) return;
        overlayRef.current.classList.add("hidden");
        setSelectedItem(null);
        setCondimentsSelected({
            cobertura: "",
            acompanhamentos: [],
            adicionais: [],
        });
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeModal();
        }
    };

    const handleSelection = (category: string, item: string) => {
        setCondimentsSelected((prev: any) => {
            if (category === "cobertura") {
                return {
                    ...prev,
                    cobertura: prev.cobertura === item ? "" : item,
                };
            }
            if (category === "acompanhamentos") {
                const newacompanhamentos = prev.acompanhamentos.includes(item)
                    ? prev.acompanhamentos.filter((r: string) => r !== item)
                    : [...prev.acompanhamentos, item].slice(0, 3);
                return { ...prev, acompanhamentos: newacompanhamentos };
            }
            if (category === "adicionais") {
                const newAdicionais = prev.adicionais.includes(item)
                    ? prev.adicionais.filter((a: string) => a !== item)
                    : [...prev.adicionais, item].slice(0, 4);
                return { ...prev, adicionais: newAdicionais };
            }
            return prev;
        });
    };

    const handleAddToCart = () => {
        if (!selectedItem) return;

        const totalPrice =
            selectedItem.price +
            condimentsSelected.adicionais.reduce(
                (sum: number, item: any): number => {
                    return (
                        sum +
                        (adicionais?.find((a: CondimentItem) => a.name === item)
                            ?.price ?? 0)
                    );
                },
                0
            );

        addToCart({
            ...selectedItem,
            condiments: condimentsSelected,
            price: totalPrice,
        });
        closeModal();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-purple-800">
                Nossos Açaís
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {catalogItems.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                        onClick={() => openModal(item)}
                    >
                        <div className="p-4">
                            <div className="flex items-center mb-2">
                                {item.icon}
                                <h2 className="text-xl font-semibold ml-2">
                                    {item.name}
                                </h2>
                            </div>
                            <p className="text-gray-600 mb-2">
                                {item.description}
                            </p>
                            <p className="text-lg font-bold text-purple-600">
                                R$
                                {item.price.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                })}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedItem && (
                <div
                    ref={overlayRef}
                    onClick={handleClickOutside}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
                >
                    <div
                        ref={modalRef}
                        onClick={(e) => e.stopPropagation()}
                        className="relative bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                    >
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="absolute top-4 right-4 text-purple-600 hover:text-green-500 transition duration-300"
                        >
                            &times; Fechar
                        </button>

                        <h2 className="text-2xl font-bold text-purple-800 mb-4">
                            {selectedItem.name}
                        </h2>

                        {["cobertura", "acompanhamentos", "adicionais"].map(
                            (category: string) => (
                                <div key={category} className="mb-4">
                                    <h3 className="text-lg font-semibold mb-2 capitalize">
                                        {category}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {(category === "acompanhamentos"
                                            ? acompanhamentos
                                            : category === "cobertura"
                                            ? coberturas
                                            : adicionais
                                        ).map(
                                            (item: string | CondimentItem) => (
                                                <button
                                                    key={
                                                        typeof item === "string"
                                                            ? item
                                                            : item.name
                                                    }
                                                    onClick={() =>
                                                        handleSelection(
                                                            category,
                                                            typeof item ===
                                                                "string"
                                                                ? item
                                                                : item.name
                                                        )
                                                    }
                                                    className={`px-3 py-1 rounded ${
                                                        condimentsSelected[
                                                            category
                                                        ].includes(
                                                            typeof item ===
                                                                "string"
                                                                ? item
                                                                : item.name
                                                        )
                                                            ? "bg-purple-500 text-white"
                                                            : "bg-gray-200 text-gray-800"
                                                    } hover:opacity-80`}
                                                >
                                                    {typeof item === "string"
                                                        ? item
                                                        : `${
                                                              item.name
                                                          } (R$ ${item.price.toFixed(
                                                              2
                                                          )})`}
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                            )
                        )}

                        <button
                            onClick={handleAddToCart}
                            className="w-full py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition duration-300"
                        >
                            Adicionar ao Carrinho
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Catalog;
