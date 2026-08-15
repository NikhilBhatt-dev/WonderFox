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
            <div className="grid gap-5 sm:grid-cols-3 sm:divide-x sm:divide-orange-100">
                {features.map(({ icon: Icon, title, description }) => (
                    <div key={title} className="flex items-center gap-4 px-2 sm:px-6 first:pl-0 last:pr-0">
                        <span className="rounded-2xl bg-orange-50 p-3 text-orange-500"><Icon size={22} /></span>
                        <div><h2 className="font-bold text-slate-800">{title}</h2><p className="mt-1 text-sm text-slate-500">{description}</p></div>
                    </div>
                ))}
            </div>
        </Container>
    </section>
);

export default TrustFeatures;
