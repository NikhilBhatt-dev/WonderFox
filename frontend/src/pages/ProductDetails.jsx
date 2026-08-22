import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Container from "../component/common/Container";

import ProductGallery from "../component/product/ProductGallery";
import ProductInfo from "../component/product/ProductInfo";
import ProductTabs from "../component/product/ProductTabs";
import RelatedProducts from "../component/product/RelatedProducts";

import { getProduct, getProducts } from "../services/product.service";

const SITE_URL = "https://e-mart-6rcu.onrender.com";

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

  /*
   * =========================
   * Product SEO
   * =========================
   */
  useEffect(() => {
    if (!product) return;

    const productName = product.name || "Product";
    const productDescription =
      product.description ||
      `Shop ${productName} at WonderFox. Discover cute and premium soft toys for kids.`;

    const productUrl = `${SITE_URL}/product/${product._id}`;

    // Product image
    const productImage =
      product.images?.[0]?.url ||
      product.images?.[0] ||
      `${SITE_URL}/favicon.svg`;

    // Page title
    document.title = `${productName} | WonderFox`;

    // Helper for meta tags
    const setMetaTag = (attribute, value, content) => {
      let tag = document.querySelector(`meta[${attribute}="${value}"]`);

      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, value);
        document.head.appendChild(tag);
      }

      tag.setAttribute("content", content);
    };

    // Standard SEO description
    setMetaTag(
      "name",
      "description",
      productDescription.slice(0, 160)
    );

    // Open Graph
    setMetaTag("property", "og:title", `${productName} | WonderFox`);

    setMetaTag(
      "property",
      "og:description",
      productDescription.slice(0, 160)
    );

    setMetaTag("property", "og:type", "product");

    setMetaTag("property", "og:url", productUrl);

    setMetaTag("property", "og:image", productImage);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute("href", productUrl);

    /*
     * =========================
     * Product Structured Data
     * =========================
     */

    const existingSchema = document.getElementById(
      "product-schema"
    );

    if (existingSchema) {
      existingSchema.remove();
    }

    const schema = document.createElement("script");

    schema.id = "product-schema";
    schema.type = "application/ld+json";

    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      name: productName,
      description: productDescription,
      image: product.images || [],
      sku: product._id,
      brand: {
        "@type": "Brand",
        name: "WonderFox",
      },
      offers: {
        "@type": "Offer",
        url: productUrl,
        priceCurrency: "INR",
        price: product.price,
        availability:
          product.stock > 0
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
      },
    });

    document.head.appendChild(schema);

    // Cleanup schema when leaving product page
    return () => {
      const schemaTag = document.getElementById("product-schema");

      if (schemaTag) {
        schemaTag.remove();
      }
    };
  }, [product]);

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
    <section className="bg-background py-10 sm:py-16">
      <Container>
        <div className="grid min-w-0 gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images} />

          <ProductInfo product={product} />
        </div>

        <ProductTabs
          product={product}
          onProductUpdated={setProduct}
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