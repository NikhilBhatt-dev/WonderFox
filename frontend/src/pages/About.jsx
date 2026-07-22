import Container from "../component/common/Container";

const About = () => {
  return (
    <section className="bg-[#FFF8F3] py-16">

      <Container>

        {/* Hero */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-500">
            About WonderFox
          </span>

          <h1 className="mt-6 text-5xl font-bold text-gray-800">
            Bringing Joy to Every Child
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            At WonderFox, we believe every child deserves toys
            that inspire creativity, imagination, and happiness.
            Our mission is to provide safe, high-quality toys for
            children of all ages.
          </p>

        </div>

        {/* Mission */}

        <div className="mt-20 grid gap-8 md:grid-cols-3">

          <div className="rounded-3xl bg-white p-8 shadow-md">

            <div className="text-5xl">
              🎯
            </div>

            <h3 className="mt-5 text-2xl font-semibold">
              Our Mission
            </h3>

            <p className="mt-4 text-gray-600">
              Make childhood memorable with premium quality toys.
            </p>

          </div>

          <div className="rounded-3xl bg-white p-8 shadow-md">

            <div className="text-5xl">
              🌍
            </div>

            <h3 className="mt-5 text-2xl font-semibold">
              Our Vision
            </h3>

            <p className="mt-4 text-gray-600">
              Become the most trusted toy destination for families.
            </p>

          </div>

          <div className="rounded-3xl bg-white p-8 shadow-md">

            <div className="text-5xl">
              ❤️
            </div>

            <h3 className="mt-5 text-2xl font-semibold">
              Our Promise
            </h3>

            <p className="mt-4 text-gray-600">
              Safe, durable and educational toys that children love.
            </p>

          </div>

        </div>

      </Container>

    </section>
  );
};

export default About;