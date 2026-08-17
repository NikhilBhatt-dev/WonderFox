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

        <div className="min-w-0 space-y-5">

            <div className="overflow-hidden rounded-card bg-surface p-4 shadow-card sm:p-8">

                <img
                    src={image}
                    alt=""
                    className="mx-auto aspect-square max-h-[500px] w-full object-contain transition duration-300 hover:scale-105"
                />

            </div>

            {images.length > 1 && (

                <div className="flex gap-3 overflow-x-auto pb-1 sm:gap-4">

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
                                className="h-16 w-16 object-cover sm:h-24 sm:w-24"
                            />

                        </button>

                    ))}

                </div>

            )}

        </div>

    );

};

export default ProductGallery;
