import Container from "../component/common/Container";
import ProductCard from "../component/common/ProductCard";
import products from "../data/Products";

const Collection = () => {
  return (
    <section className="bg-[#FFF8F3] py-16">

      <Container>

        {/* ================= Page Header ================= */}

        <div className="mb-12 text-center">

          <h1 className="text-4xl font-bold text-gray-800 lg:text-5xl">
            Our Collection
          </h1>

          <p className="mt-4 text-gray-600">
            Discover the perfect toy for every child.
          </p>

        </div>

        {/* ================= Main Layout ================= */}

        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">

          {/* ================= Sidebar ================= */}

          <aside className="h-fit rounded-3xl bg-white p-6 shadow-md">

            <h2 className="text-2xl font-semibold text-gray-800">
              Filters
            </h2>

            {/* Categories */}

            <div className="mt-8">

              <h3 className="font-semibold text-gray-700">
                Categories
              </h3>

              <div className="mt-4 space-y-3">

                <label className="flex items-center gap-3">
                  <input type="checkbox" />
                  Plush Toys
                </label>

                <label className="flex items-center gap-3">
                  <input type="checkbox" />
                  Educational
                </label>

                <label className="flex items-center gap-3">
                  <input type="checkbox" />
                  Outdoor
                </label>

                <label className="flex items-center gap-3">
                  <input type="checkbox" />
                  New Arrivals
                </label>

              </div>

            </div>

            {/* Price */}

            <div className="mt-10">

              <h3 className="font-semibold text-gray-700">
                Price
              </h3>

              <input
                type="range"
                className="mt-4 w-full"
              />

            </div>

            {/* Rating */}

            <div className="mt-10">

              <h3 className="font-semibold text-gray-700">
                Rating
              </h3>

              <div className="mt-4 space-y-3">

                <label className="flex items-center gap-3">
                  <input type="radio" name="rating" />
                  5 Stars
                </label>

                <label className="flex items-center gap-3">
                  <input type="radio" name="rating" />
                  4★ & Above
                </label>

                <label className="flex items-center gap-3">
                  <input type="radio" name="rating" />
                  3★ & Above
                </label>

              </div>

            </div>

          </aside>

          {/* ================= Products ================= */}

          <section>

            {/* Top Bar */}

            <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">

              <h2 className="text-2xl font-bold text-gray-800">
                All Products
              </h2>

              <div className="flex items-center gap-4">

                <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600">
                  {products.length} Products
                </span>

                <select className="rounded-xl border border-gray-300 bg-white px-4 py-2 outline-none">

                  <option>Sort By</option>
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Highest Rated</option>

                </select>

              </div>

            </div>

            {/* Products Grid */}

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}

            </div>

          </section>

        </div>

      </Container>

    </section>
  );
};

export default Collection;