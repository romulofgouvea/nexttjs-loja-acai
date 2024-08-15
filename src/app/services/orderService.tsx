import { CartItem, UserOrder } from "../types";

export class OrderService {
    calculateTotal(items: CartItem[]): number {
        return items.reduce((sum, item) => {
            const itemTotal = item.price;
            return sum + itemTotal;
        }, 0);
    }

    sendOrderToWhatsApp(order: UserOrder): void {
        const phoneNumber = "5532999611396";
        const message = encodeURIComponent(
            `Pedido de *${
                order.userName
            }* no valor total de R$${order.total.toLocaleString(undefined, {
                minimumFractionDigits: 2,
            })}:\n${order.items
                .map(
                    (item, index) =>
                        `\n ${index + 1}. *Item:* ${item.name}` +
                        `\n     *Cobertura:* ${
                            item.condiments.cobertura || "Sem cobertura"
                        } ` +
                        `\n     *Acompanhamentos:* ${
                            item.condiments.acompanhamentos.join(", ") ||
                            "Sem acompanhamentos"
                        }` +
                        `\n     *Adicionais:* ${
                            item.condiments.adicionais.join(", ") ||
                            "Sem adicionais"
                        }`
                )
                .join("\n")}`
        );

        window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    }
}
