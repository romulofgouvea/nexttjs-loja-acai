"use client";
import React, { useState } from "react";
import { Header } from "./components/header";
import { LandingPage } from "./components/landingPage";
import { Catalog } from "./components/catalog";
import { Cart } from "./components/cart";
import { CartItem, UserOrder } from "./types";
import { OrderService } from "./services/orderService";

const AcaiApp: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [showCart, setShowCart] = useState(false);
    const [userName, setUserName] = useState("");
    const [orderStarted, setOrderStarted] = useState(false);

    const orderService = new OrderService();

    const addToCart = (item: CartItem) => {
        setCartItems([...cartItems, item]);
    };

    const removeFromCart = (index: number) => {
        const newCartItems = cartItems.filter((_, i) => i !== index);
        setCartItems(newCartItems);
    };

    const startOrder = (name: string) => {
        setUserName(name);
        setOrderStarted(true);
    };

    const sendToWhatsApp = () => {
        const order: UserOrder = {
            items: cartItems,
            userName: userName,
            total: orderService.calculateTotal(cartItems),
        };
        orderService.sendOrderToWhatsApp(order);
        resetApp();
    };

    const resetApp = () => {
        setCartItems([]);
        setShowCart(false);
        setOrderStarted(false);
        setUserName("");
    };

    return orderStarted ? (
        <div className="min-h-screen bg-purple-50">
            <Header
                cartItemsCount={cartItems.length}
                onLogoClick={() => {
                    resetApp();
                }}
                onCartClick={(force?: boolean) =>
                    setShowCart(force ?? !showCart)
                }
                userName={userName}
            />
            {showCart ? (
                <Cart
                    items={cartItems}
                    removeFromCart={removeFromCart}
                    sendToWhatsApp={sendToWhatsApp}
                    orderService={orderService}
                />
            ) : (
                <Catalog addToCart={addToCart} />
            )}
        </div>
    ) : (
        <LandingPage onStartOrder={startOrder} />
    );
};

export default AcaiApp;
