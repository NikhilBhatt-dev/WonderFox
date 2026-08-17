import { CreditCard, Wallet, CheckCircle2 } from "lucide-react";

const methods = [
    {
        id: "COD",
        title: "Cash on Delivery",
        description: "Pay when your order is delivered.",
        icon: Wallet,
    },
    {
        id: "RAZORPAY",
        title: "Razorpay",
        description: "UPI, Cards, Net Banking & Wallets.",
        icon: CreditCard,
    },
];

const PaymentMethod = ({ paymentMethod, setPaymentMethod }) => {
    return (
        <div className="mt-8 min-w-0 rounded-3xl bg-white p-4 shadow-sm sm:p-8">

            <div className="mb-8">

                <h2 className="text-2xl font-bold text-gray-800">
                    Payment Method
                </h2>

                <p className="mt-2 text-gray-500">
                    Select your preferred payment option.
                </p>

            </div>

            <div className="space-y-5">

                {methods.map((method) => {

                    const Icon = method.icon;

                    const active = paymentMethod === method.id;

                    return (

                        <button
                            type="button"
                            key={method.id}
                            onClick={() => setPaymentMethod(method.id)}
                            className={`w-full rounded-2xl border p-5 text-left transition-all duration-300
                            ${active
                                    ? "border-orange-500 bg-orange-50 shadow-md"
                                    : "border-gray-200 hover:border-orange-300 hover:shadow-sm"
                                }`}
                        >

                            <div className="flex items-start justify-between gap-3">

                                <div className="flex min-w-0 items-center gap-3 sm:gap-4">

                                    <div
                                        className={`rounded-xl p-3
                                        ${active
                                                ? "bg-orange-500 text-white"
                                                : "bg-orange-100 text-orange-500"
                                            }`}
                                    >

                                        <Icon size={24} />

                                    </div>

                                    <div className="min-w-0">

                                        <h3 className="font-semibold text-gray-800">
                                            {method.title}
                                        </h3>

                                        <p className="break-words text-sm text-gray-500">
                                            {method.description}
                                        </p>

                                    </div>

                                </div>

                                {active && (
                                    <CheckCircle2
                                        size={24}
                                        className="text-orange-500"
                                    />
                                )}

                            </div>

                        </button>

                    );

                })}

            </div>

        </div>
    );
};

export default PaymentMethod;
