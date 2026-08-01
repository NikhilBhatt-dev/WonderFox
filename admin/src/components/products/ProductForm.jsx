const ProductForm = ({
    formData,
    categories,
    loading,
    submitText,
    onChange,
    onSubmit,
}) => {
    return (
        <form
            onSubmit={onSubmit}
            className="space-y-5"
        >

            <div>

                <label className="mb-2 block font-medium">
                    Product Name
                </label>

                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={onChange}
                    className="w-full rounded-lg border p-3"
                    required
                />

            </div>

            <div>

                <label className="mb-2 block font-medium">
                    Description
                </label>

                <textarea
                    rows="4"
                    name="description"
                    value={formData.description}
                    onChange={onChange}
                    className="w-full rounded-lg border p-3"
                    required
                />

            </div>

            <div className="grid gap-5 md:grid-cols-2">

                <div>

                    <label className="mb-2 block font-medium">
                        Price
                    </label>

                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={onChange}
                        className="w-full rounded-lg border p-3"
                        required
                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">
                        Discount Price
                    </label>

                    <input
                        type="number"
                        name="discountPrice"
                        value={formData.discountPrice}
                        onChange={onChange}
                        className="w-full rounded-lg border p-3"
                    />

                </div>

            </div>

            <div className="grid gap-5 md:grid-cols-2">

                <div>

                    <label className="mb-2 block font-medium">
                        Category
                    </label>

                    <select
                        name="category"
                        value={formData.category}
                        onChange={onChange}
                        className="w-full rounded-lg border p-3"
                        required
                    >

                        <option value="">
                            Select Category
                        </option>

                        {categories.map((category) => (

                            <option
                                key={category._id}
                                value={category._id}
                            >
                                {category.name}
                            </option>

                        ))}

                    </select>

                </div>

                <div>

                    <label className="mb-2 block font-medium">
                        Stock
                    </label>

                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={onChange}
                        className="w-full rounded-lg border p-3"
                    />

                </div>

            </div>

            <div>

                <label className="mb-2 block font-medium">
                    Brand
                </label>

                <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={onChange}
                    className="w-full rounded-lg border p-3"
                />

            </div>

            <label className="flex items-center gap-3">

                <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={onChange}
                />

                Featured Product

            </label>

            <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? "Saving..." : submitText}
            </button>

        </form>
    );
};

export default ProductForm;