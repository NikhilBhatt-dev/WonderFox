import { useState, useEffect } from "react";

const ProductGallery = ({ images = [] }) => {

    const [selected, setSelected] = useState(0);

    useEffect(() => {
        setSelected(0);
    }, [images]);

    const image =
        images?.[selected]?.url ||
        "https://placehold.co/600x600?text=No+Image";

    return (

        <div className="space-y-5">

            <div className="overflow-hidden rounded-card bg-surface p-8 shadow-card">

                <img
                    src={image}
                    alt=""
                    className="mx-auto h-[500px] w-full object-contain transition duration-300 hover:scale-105"
                />

            </div>

            {images.length > 1 && (

                <div className="flex gap-4 overflow-auto">

                    {images.map((item, index) => (

                        <button
                            key={item.public_id || index}
                            onClick={() => setSelected(index)}
                            className={`overflow-hidden rounded-button border-2 transition
                                ${selected === index
                                    ? "border-primary"
                                    : "border-gray-200"
                                }`}
                        >

                            <img
                                src={item.url}
                                alt=""
                                className="h-24 w-24 object-cover"
                            />

                        </button>

                    ))}

                </div>

            )}

        </div>

    );

};

export default ProductGallery;