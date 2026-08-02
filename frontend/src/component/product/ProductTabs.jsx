import { useState } from "react";

const tabs = [
    "Description",
    "Specifications",
    "Reviews",
];

const ProductTabs = ({ product }) => {

    const [activeTab, setActiveTab] =
        useState("Description");

    return (

        <div className="mt-20 rounded-card bg-surface p-8 shadow-card">

            {/* Tabs */}

            <div className="mb-8 flex flex-wrap gap-4 border-b pb-4">

                {tabs.map((tab) => (

                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`rounded-button px-5 py-2 font-medium transition
                        ${activeTab === tab
                                ? "bg-primary text-white"
                                : "bg-gray-100 text-body hover:bg-gray-200"
                            }`}
                    >

                        {tab}

                    </button>

                ))}

            </div>

            {/* Description */}

            {activeTab === "Description" && (

                <div>

                    <h3 className="mb-4 text-2xl font-bold text-heading">
                        Product Description
                    </h3>

                    <p className="leading-8 text-body">
                        {product.description}
                    </p>

                </div>

            )}

            {/* Specifications */}

            {activeTab === "Specifications" && (

                <div>

                    <h3 className="mb-4 text-2xl font-bold text-heading">
                        Specifications
                    </h3>

                    <div className="overflow-hidden rounded-button border">

                        <table className="w-full">

                            <tbody>

                                <tr className="border-b">

                                    <td className="bg-gray-50 p-4 font-semibold">
                                        Brand
                                    </td>

                                    <td className="p-4">
                                        {product.brand}
                                    </td>

                                </tr>

                                <tr className="border-b">

                                    <td className="bg-gray-50 p-4 font-semibold">
                                        Category
                                    </td>

                                    <td className="p-4">
                                        {product.category?.name}
                                    </td>

                                </tr>

                                <tr className="border-b">

                                    <td className="bg-gray-50 p-4 font-semibold">
                                        Stock
                                    </td>

                                    <td className="p-4">
                                        {product.stock}
                                    </td>

                                </tr>

                                <tr>

                                    <td className="bg-gray-50 p-4 font-semibold">
                                        Rating
                                    </td>

                                    <td className="p-4">
                                        ⭐ {product.rating}
                                    </td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            )}

            {/* Reviews */}

            {activeTab === "Reviews" && (

                <div>

                    <h3 className="mb-4 text-2xl font-bold text-heading">
                        Customer Reviews
                    </h3>

                    <div className="rounded-button bg-background p-8 text-center">

                        <p className="text-body">
                            Reviews feature coming soon.
                        </p>

                    </div>

                </div>

            )}

        </div>

    );

};

export default ProductTabs;