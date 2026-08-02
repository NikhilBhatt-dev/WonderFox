import { Check } from "lucide-react";

const steps = [
    { id: 1, title: "Cart" },
    { id: 2, title: "Checkout" },
    { id: 3, title: "Review" },
];

const CheckoutStepper = ({ currentStep = 2 }) => {
    return (
        <div className="mb-10 flex items-center justify-center">

            {steps.map((step, index) => (

                <div
                    key={step.id}
                    className="flex items-center"
                >

                    <div
                        className={`flex h-11 w-11 items-center justify-center rounded-full border-2 font-semibold transition-all
                        ${step.id < currentStep
                                ? "border-orange-500 bg-orange-500 text-white"
                                : step.id === currentStep
                                    ? "border-orange-500 text-orange-500"
                                    : "border-gray-300 text-gray-400"
                            }`}
                    >

                        {step.id < currentStep ? (
                            <Check size={18} />
                        ) : (
                            step.id
                        )}

                    </div>

                    <div className="ml-3 mr-6">

                        <p
                            className={`font-medium
                            ${step.id <= currentStep
                                    ? "text-gray-800"
                                    : "text-gray-400"
                                }`}
                        >
                            {step.title}
                        </p>

                    </div>

                    {index !== steps.length - 1 && (

                        <div
                            className={`h-1 w-20 rounded-full
                            ${step.id < currentStep
                                    ? "bg-orange-500"
                                    : "bg-gray-200"
                                }`}
                        />

                    )}

                </div>

            ))}

        </div>
    );
};

export default CheckoutStepper;