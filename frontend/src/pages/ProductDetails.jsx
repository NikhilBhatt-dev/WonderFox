import { useParams } from "react-router-dom";

import Container from "../component/common/Container";
import ProductCard from "../component/common/ProductCard";
import products from "../data/Products";

const ProductDetails = () => {

  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <Container>
        <div className="py-20 text-center">
          <h2 className="text-3xl font-bold">
            Product Not Found
          </h2>
        </div>
      </Container>
    );
  }

  return (
    <section className="bg-[#FFF8F3] py-16">

      <Container>

        <div className="grid gap-14 lg:grid-cols-2">

          {/* Product Image */}

          <div className="rounded-3xl bg-white p-8 shadow-md">

            <img
              src={product.image}
              alt={product.name}
              className="mx-auto h-[500px] w-full object-contain"
            />

          </div>

          {/* Product Info */}

          <div>

            <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
              {product.badge}
            </span>

            <h1 className="mt-6 text-4xl font-bold text-gray-800">
              {product.name}
            </h1>

            <p className="mt-4 text-lg text-gray-600">
              Soft, premium quality plush toy made
              with child-safe materials. Perfect
              for gifting and everyday cuddles.
            </p>

            <div className="mt-6 flex items-center gap-4">

              <span className="text-4xl font-bold text-orange-500">
                ₹{product.price}
              </span>

              <span className="text-xl text-gray-400 line-through">
                ₹{product.price + 300}
              </span>

            </div>

            <div className="mt-10 flex gap-4">

              <button className="rounded-2xl border px-6 py-3">
                ❤️ Wishlist
              </button>

              <button className="rounded-2xl bg-orange-500 px-8 py-3 font-semibold text-white">
                🛒 Add To Cart
              </button>

            </div>

          </div>

        </div>

        {/* Related Products */}

        <div className="mt-24">

          <h2 className="mb-10 text-3xl font-bold">
            Related Products
          </h2>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

            {products.slice(0, 4).map((item) => (
              <ProductCard
                key={item.id}
                product={item}
              />
            ))}

          </div>

        </div>

      </Container>

    </section>
  );
};

export default ProductDetails;