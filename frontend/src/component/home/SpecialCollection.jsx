import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../common/Container";
import toyImage from "../../assets/image/toy-2.avif";

const SpecialCollection = () => (
    <section className="bg-[#FFF8F3] py-16 sm:py-20">
        <Container>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#26364A] px-7 py-10 text-white sm:px-12 sm:py-14">
                <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-orange-400/20" />
                <div className="absolute -bottom-24 left-[45%] h-48 w-48 rounded-full bg-sky-300/10" />
                <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_360px]">
                    <div className="max-w-xl">
                        <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-orange-300"><Sparkles size={16} /> Limited time offer</p>
                        <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">Special Collection</h2>
                        <p className="mt-5 text-lg leading-8 text-slate-200">Brighten every playtime with toys picked for imagination, giggles, and gift-worthy moments.</p>
                        <Link to="/collection" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#FF6B00] px-6 py-3.5 font-semibold text-white transition hover:bg-orange-600">Shop now <ArrowRight size={18} /></Link>
                    </div>
                    <div className="relative mx-auto w-full max-w-xs rounded-[2rem] bg-white/10 p-4 backdrop-blur-sm"><img src={toyImage} alt="WonderFox special toy collection" className="h-64 w-full rounded-[1.5rem] object-cover" /></div>
                </div>
            </div>
        </Container>
    </section>
);

export default SpecialCollection;
