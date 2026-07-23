import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import hero1 from "../../assets/image/hero-1.webp";
import hero2 from "../../assets/image/hero-2.webp";
import hero3 from "../../assets/image/hero-3.avif";
import toy3 from "../../assets/image/toy-3.avif";

import Container from "../common/Container";
import Button from "../common/Button";

const Hero = () => {
    const heroSlides = [
        {
            hero: hero1,
            card: toy3,
        },
        {
            hero: hero2,
            card: toy3,
        },
        {
            hero: hero3,
            card: toy3,
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative overflow-hidden bg-[#FFF8F3] py-12 lg:py-16">

            {/* Background Blur */}

            <div className="pointer-events-none absolute -left-40 top-10 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl"></div>

            <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-pink-200/30 blur-3xl"></div>


            {/* Floating Cloud */}

            <motion.div
                animate={{
                    x: [-8, 8, -8],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute left-8 top-12 text-5xl opacity-70"
            >
                ☁️
            </motion.div>


            {/* Floating Star */}

            {/* <motion.div
                animate={{
                    y: [-8, 8, -8],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute left-1/3 top-20 text-2xl"
            >
                ⭐
            </motion.div> */}

            <motion.div
                animate={{
                    y: [0, -10, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-32 right-1/4 text-3xl"
            >
                ✨
            </motion.div>

            <Container className="grid min-h-[72vh] items-center gap-10 lg:grid-cols-2 lg:gap-16">

                {/* LEFT CONTENT */}

                <div className="text-center lg:-translate-y-6 lg:text-left">

                    <span className="inline-block rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-500">
                        ✨ New Collection
                    </span>

                    <h1 className="mt-5 text-4xl font-extrabold leading-tight text-gray-800 sm:text-5xl lg:text-6xl">
                        Make Every
                        <br />
                        Child
                        <span className="text-orange-500">
                            {" "}
                            Smile
                        </span>
                    </h1>

                    <p className="mx-auto mt-5 max-w-lg text-base leading-8 text-gray-600 lg:mx-0 lg:text-lg">
                        Explore our premium collection of educational,
                        plush and creative toys specially crafted
                        for children of every age.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">

                        <Button>
                            Shop Now
                        </Button>

                        <Button variant="secondary">
                            Explore Collection
                        </Button>

                    </div>

                    {/* Trust Section */}

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 lg:justify-start">

                        <div className="flex items-center gap-2">
                            ⭐⭐⭐⭐⭐
                            <span className="font-semibold">
                                4.9/5
                            </span>
                        </div>

                        <div className="font-medium">
                            ❤️ 5000+ Happy Kids
                        </div>

                        <div className="font-medium">
                            🚚 Free Shipping
                        </div>

                    </div>

                </div>
                {/* RIGHT CONTENT */}

                <div className="relative mx-auto flex w-fit items-center justify-center">

                    {/* Background Circle */}

                    <div className="absolute h-[360px] w-[360px] rounded-full bg-gradient-to-br from-orange-200/50 to-orange-100/40 blur-sm lg:h-[470px] lg:w-[470px]"></div>

                    {/* Hero Image */}

                    <AnimatePresence mode="wait">

                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.7 }}
                            className="relative z-10 overflow-hidden rounded-[28px] border-[8px] border-white shadow-2xl"
                        >

                            <img
                                src={heroSlides[currentSlide].hero}
                                alt="WonderFox Toy"
                                className="h-[430px] w-[330px] object-cover lg:h-[540px] lg:w-[420px]"
                            />

                        </motion.div>

                    </AnimatePresence>

                    {/* Floating Card */}

                    <motion.div
                        animate={{
                            y: [-10, 10, -10],
                            rotate: [-2, 2, -2],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute left-[-25px] top-[68%] z-20 w-48 -translate-y-1/2 rounded-3xl bg-white p-4 shadow-2xl lg:w-52"
                    >

                        <img
                            src={heroSlides[currentSlide].card}
                            alt="Toy"
                            className="h-24 w-full rounded-2xl object-cover"
                        />

                        <h3 className="mt-3 text-center text-base font-bold text-gray-800">
                            Little Joy,
                            <br />
                            Big Cuddles
                        </h3>

                        <p className="mt-2 text-center text-sm text-gray-500">
                            Loved by 5,000+ Kids ❤️
                        </p>

                    </motion.div>

                    {/* Balloon */}

                    <motion.div
                        animate={{
                            y: [-18, 18, -18],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute right-[-25px] top-2 z-30 text-4xl"
                    >
                        🎈
                    </motion.div>

                </div>

            </Container>

        </section>
    );
};

export default Hero;