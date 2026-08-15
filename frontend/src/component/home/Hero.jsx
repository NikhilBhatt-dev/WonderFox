import homeBanner from "../../assets/image/home-banners.png";

const Home = () => {
  return (
    <main className="w-full">
      <section className="w-full">
        <img
          src={homeBanner}
          alt="Toy Mart - Joyful Companions"
          className="w-full h-auto object-cover block"
        />
      </section>
    </main>
  );
};

export default Home;

