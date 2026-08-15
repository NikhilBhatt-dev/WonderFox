import Hero from "../component/home/Hero";
import FeaturedProducts from "../component/home/FeaturedProducts";
import Categories from "../component/home/Categories";
// import BestSeller from "../component/home/BestSeller";
import WhyChooseUs from "../component/home/WhyChooseUs";
import Reviews from "../component/home/Reviews";
import Newsletter from "../component/home/Newsletter";
import TrustFeatures from "../component/home/TrustFeatures";
import SpecialCollection from "../component/home/SpecialCollection";

const Home = () => {
    return (
        <>
            <Hero />
            <TrustFeatures />
            <Categories />
            <FeaturedProducts />
            <SpecialCollection />
            {/* <BestSeller /> */}
            <WhyChooseUs />
            <Reviews />
            <Newsletter />
        </>
    );
};

export default Home;
