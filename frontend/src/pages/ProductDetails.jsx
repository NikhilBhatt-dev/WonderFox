import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Container from "../component/common/Container";

import ProductGallery from "../component/product/ProductGallery";
import ProductInfo from "../component/product/ProductInfo";
import ProductTabs from "../component/product/ProductTabs";
import RelatedProducts from "../component/product/RelatedProducts";

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
        setProducts(productsData.products);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    fetchData();

  }, [id]);

  if (loading) {

    return (

      <Container>

        <div className="flex h-[60vh] items-center justify-center">

          <h2 className="text-2xl font-semibold">
            Loading Product...
          </h2>

        </div>

      </Container>

    );

  }

  if (!product) {

    return (

      <Container>

        <div className="flex h-[60vh] items-center justify-center">

          <h2 className="text-2xl font-semibold">
            Product Not Found
          </h2>

        </div>

      </Container>

    );

  }

  return (

    <section className="bg-background py-16">

      <Container>

        <div className="grid gap-16 lg:grid-cols-2">

          <ProductGallery
            images={product.images}
          />

          <ProductInfo
            product={product}
          />

        </div>

        <ProductTabs
          product={product}
        />

        <RelatedProducts
          products={products}
          currentProductId={product._id}
        />

      </Container>

    </section>

  );

};

export default ProductDetails;