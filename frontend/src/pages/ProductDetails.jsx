import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Container from "../component/common/Container";
import ProductCard from "../component/common/ProductCard";

import { getProduct, getProducts } from "../services/product.service";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productData, productsData] = await Promise.all([
          getProduct(id),
          getProducts(),
        ]);

        setProduct(productData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <div className="py-20 text-center">
          <h2 className="text-3xl font-bold">Loading...</h2>
        </div>
      </Container>
    );
  }

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
              src={product.images?.[0]?.url}
              alt={product.name}
              className="mx-auto h-[500px] w-full object-contain"
            />
          </div>

          {/* Product Info */}

          <div>
            {product.isFeatured && (
              <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
                Featured
              </span>
            )}

            <h1 className="mt-6 text-4xl font-bold text-gray-800">
              {product.name}
            </h1>

            <p className="mt-4 text-lg text-gray-600">
              {product.description}
            </p>

            <div className="mt-6 flex items-center gap-4">
              <span className="text-4xl font-bold text-orange-500">
                ₹{product.price}
              </span>

              {product.discountPrice > 0 && (
                <span className="text-xl text-gray-400 line-through">
                  ₹{product.discountPrice}
                </span>
              )}
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
            {products
              .filter((item) => item._id !== product._id)
              .slice(0, 4)
              .map((item) => (
                <ProductCard
                  key={item._id}
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