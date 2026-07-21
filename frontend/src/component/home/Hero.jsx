import heroImage from "../../assets/hero.png";

const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-[#FFF8F3] py-16 lg:py-20">
            {/* ================= Background Blobs ================= */}
            <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl lg:h-96 lg:w-96"></div>

            <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-pink-200/30 blur-3xl lg:h-96 lg:w-96"></div>

            {/* ================= Floating Elements ================= */}
            <div className="absolute left-6 top-16 text-5xl opacity-70 lg:left-12 lg:top-20 lg:text-7xl">
                ☁️
            </div>

            <div className="absolute right-6 top-24 text-5xl opacity-70 lg:right-20 lg:top-32 lg:text-6xl">
                ☁️
            </div>

            <div className="absolute left-1/3 top-20 text-xl lg:top-24 lg:text-2xl">
                ⭐
            </div>

            <div className="absolute bottom-32 right-1/4 text-2xl lg:text-3xl">
                ✨
            </div>

            <div className="absolute right-10 top-40 text-4xl lg:right-32 lg:top-44 lg:text-5xl">
                🎈
            </div>

            {/* ================= Main Container ================= */}
            <div className="mx-auto grid min-h-[85vh] max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

                {/* ================= Left Content ================= */}
                <div className="text-center lg:text-left">

                    <span className="inline-block rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-500">
                        ✨ New Collection
                    </span>

                    <h1 className="mt-6 text-5xl font-extrabold leading-[1.1] text-gray-800 sm:text-6xl lg:text-7xl">
                        Make Every
                        <br />
                        Child
                        <span className="text-orange-500"> Smile</span>
                    </h1>

                    <p className="mt-6 max-w-lg text-base text-gray-600 sm:text-lg lg:mx-0 mx-auto">
                        Explore our premium collection of educational,
                        plush and creative toys specially crafted
                        for children of every age.
                    </p>

                    <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">

                        <button className="rounded-2xl bg-orange-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-orange-600">
                            Shop Now
                        </button>

                        <button className="rounded-2xl border border-gray-300 bg-white px-8 py-4 font-semibold transition-all duration-300 hover:scale-105 hover:bg-gray-100">
                            Explore
                        </button>

                    </div>

                </div>

                {/* ================= Right Content ================= */}
                <div className="relative flex justify-center">

                    {/* Background Circle */}
                    <div className="absolute h-80 w-80 rounded-full bg-gradient-to-br from-orange-200 to-orange-100 lg:h-[500px] lg:w-[500px]"></div>

                    {/* Hero Image */}
                    <img
                        src={heroImage}
                        alt="Cute Toy"
                        className="relative z-10 w-full max-w-sm object-contain lg:max-w-md"
                    />

                    {/* Floating Card */}
                    <div className="absolute bottom-8 left-4 rounded-2xl bg-white px-5 py-4 shadow-xl backdrop-blur-md lg:bottom-10 lg:left-0">

                        <p className="text-sm text-gray-500">
                            Happy Kids
                        </p>

                        <h3 className="text-xl font-bold text-gray-800">
                            5000+
                        </h3>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default Hero;