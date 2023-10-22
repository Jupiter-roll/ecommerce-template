"use client"

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { format } from 'date-fns';
import { Loader } from "@/helpers/Loader";
import { getOrders } from '@/helpers/ordersFunctions';
import { useOrders } from '@/hooks/OrdersContext';

import '@/styles/orders.css';

const UserOrders = () => {
    const { data: session, status } = useSession();
    const { orders, setOrders } = useOrders();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (orders === null && status === 'authenticated') {
            const userId = session.user._id;
            const fetchUserOrders = async () => {
                const response = await getOrders(userId);
                if (response && Array.isArray(response.orders)) {
                    response.orders.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
                    setOrders(response.orders);
                } else {
                    console.log("No orders available.");
                }

                setLoading(false);
            };

            fetchUserOrders();
        } else if (orders.length >= 0) {
            setLoading(false);
        }

    }, [orders, status]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd LLL yyyy');
    };

    return (
        <div className="page-container">
            {loading ? (
                <Loader />
            ) : orders ? (
                orders.map((order, index) => (
                    <div key={index} className="order-card">
                        <Link href={`/account/orders/${order._id}`}>
                            <h4>{`${formatDate(order.purchaseDate)} | ${(order.total_price / 100).toFixed(2)} €`}</h4>
                            <p>Order number: {order.orderNumber}</p>
                            <div className='bx-imgs'>
                                {order.products.map((product, productIndex) => (
                                    <div key={productIndex} className="product-card">
                                        <img src={product.image} alt={product.name} loading='lazy' />
                                    </div>
                                ))}
                            </div>
                        </Link>
                    </div>
                ))
            ) :
                <p>No orders available.</p>
            }
        </div>
    );
}

export default UserOrders;