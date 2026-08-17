import { useEffect, useState } from "react";
import { Package, CalendarDays, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import Container from "../component/common/Container";
import Card from "../component/ui/Card";
import Badge from "../component/ui/Badge";
import Button from "../component/ui/Button";

import { getMyOrders } from "../services/order.service";

const statusVariant = {
    PENDING: "warning",
    CONFIRMED: "info",
    PACKED: "secondary",
    SHIPPED: "primary",
    DELIVERED: "success",
    CANCELLED: "danger",
};

const MyOrders = () => {

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchOrders();

    }, []);

    const fetchOrders = async () => {

        try {

            const data = await getMyOrders();

            setOrders(data);

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to load orders."

            );

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <Container>

                <div className="py-24 text-center text-2xl font-semibold">

                    Loading Orders...

                </div>

            </Container>

        );

    }

    if (orders.length === 0) {

        return (

            <Container>

                <div className="py-24 text-center">

                    <Package
                        size={70}
                        className="mx-auto text-gray-400"
                    />

                    <h2 className="mt-5 text-3xl font-bold">

                        No Orders Yet

                    </h2>

                    <p className="mt-3 text-gray-500">

                        Start shopping to see your orders here.

                    </p>

                    <Link to="/collection">

                        <Button className="mt-8">

                            Shop Now

                        </Button>

                    </Link>

                </div>

            </Container>

        );

    }

    return (

        <section className="bg-background py-16">

            <Container>

                <h1 className="mb-8 text-3xl font-bold sm:mb-10 sm:text-4xl">

                    My Orders

                </h1>

                <div className="space-y-8">

                    {orders.map((order) => (

                        <Card
                            key={order._id}
                            className="min-w-0 p-4 sm:p-6"
                        >

                            <div className="flex flex-wrap items-center justify-between gap-5">

                                <div>

                                    <h2 className="text-xl font-bold">

                                        {order.orderNumber}

                                    </h2>

                                    <div className="mt-2 flex items-center gap-2 text-gray-500">

                                        <CalendarDays size={18} />

                                        {new Date(
                                            order.createdAt
                                        ).toLocaleDateString()}

                                    </div>

                                </div>

                                <Badge
                                    variant={
                                        statusVariant[
                                        order.orderStatus
                                        ] || "primary"
                                    }
                                >

                                    {order.orderStatus}

                                </Badge>

                            </div>


                            <div className="mt-8 space-y-5">
                                {order.items.map((item, index) => (

                                    <div
                                        key={`${order._id}-${index}`}
                                        className="flex min-w-0 items-center gap-3 sm:gap-5"
                                    >

                                      

                                        <img
                                            src={item.image || "/favicon.svg"}
                                            alt={item.name}
                                            className="h-16 w-16 shrink-0 rounded-xl object-cover sm:h-20 sm:w-20"
                                        />
                                        
                                        <div className="min-w-0 flex-1">

                                            <h3 className="break-words font-semibold">

                                                {item.name}

                                            </h3>

                                            <p className="text-sm text-gray-500">

                                                Qty : {item.quantity}

                                            </p>

                                        </div>

                                        <div className="shrink-0 whitespace-nowrap font-bold">

                                            <IndianRupee size={16} />

                                          
                                            ₹{item.price}

                                        </div>

                                    </div>

                                ))}

                           </div>

                            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t pt-6">

                                <h3 className="text-xl font-bold">

                                    Total

                                </h3>

                                <h3 className="text-2xl font-bold text-primary">

                                    ₹{order.totalPrice}

                                </h3>

                            </div>

                        </Card>

                    ))}

                </div>

            </Container>

        </section>

    );

};

export default MyOrders;
