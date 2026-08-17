import { Gift, ShieldCheck, Truck } from "lucide-react";
import Container from "../common/Container";

const features = [
    { icon: ShieldCheck, title: "Premium Quality", description: "Safe & child-friendly toys" },
    { icon: Truck, title: "Fast Delivery", description: "Quick delivery at your door" },
    { icon: Gift, title: "Gift Ready", description: "Made for every little occasion" },
];

const TrustFeatures = () => (
    <section className="border-y border-orange-100 bg-white py-6">
        <Container>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 sm:divide-x sm:divide-orange-100">
                {features.map(({ icon: Icon, title, description }) => (
                    <div key={title} className="flex min-w-0 items-start gap-2 px-1 sm:items-center sm:gap-4 sm:px-6 first:pl-0 last:pr-0">
                        <span className="shrink-0 rounded-xl bg-orange-50 p-2 text-orange-500 sm:rounded-2xl sm:p-3"><Icon size={16} className="sm:h-[22px] sm:w-[22px]" /></span>
                        <div className="min-w-0"><h2 className="break-words text-xs font-bold text-slate-800 sm:text-base">{title}</h2><p className="mt-1 break-words text-[10px] leading-4 text-slate-500 sm:text-sm sm:leading-normal">{description}</p></div>
                    </div>
                ))}
            </div>
        </Container>
    </section>
);

export default TrustFeatures;
