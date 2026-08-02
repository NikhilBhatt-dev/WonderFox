const QuantitySelector = ({
    quantity,
    setQuantity,
    stock,
}) => {

    const decrease = () => {

        if (quantity > 1) {
            setQuantity(quantity - 1);
        }

    };

    const increase = () => {

        if (quantity < stock) {
            setQuantity(quantity + 1);
        }

    };

    return (

        <div className="mt-8">

            <h3 className="mb-4 text-lg font-semibold text-heading">
                Quantity
            </h3>

            <div className="inline-flex items-center overflow-hidden rounded-button border border-gray-200 bg-white">

                <button
                    type="button"
                    onClick={decrease}
                    className="px-5 py-3 text-xl transition hover:bg-gray-100"
                >
                    −
                </button>

                <span className="min-w-16 border-x border-gray-200 py-3 text-center font-semibold">
                    {quantity}
                </span>

                <button
                    type="button"
                    onClick={increase}
                    className="px-5 py-3 text-xl transition hover:bg-gray-100"
                >
                    +
                </button>

            </div>

            <p className="mt-3 text-sm text-body">

                {stock > 0
                    ? `${stock} items available`
                    : "Out of Stock"}

            </p>

        </div>

    );

};

export default QuantitySelector;