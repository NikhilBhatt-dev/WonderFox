import AboutHero from "../component/about/AboutHero";
import OurStory from "../component/about/OurStory";
import WhyChooseUs from "../component/about/WhyChooseUs";
import CoreValues from "../component/about/CoreValues";
import OurProcess from "../component/about/OurProcess";
import ContactInfo from "../component/about/ContactInfo";
import CTASection from "../component/about/CTASection";

const About = () => {
  return (
    <>
      <AboutHero />
      <OurStory />
      <WhyChooseUs />
      <CoreValues />
      <OurProcess />
      <ContactInfo />
      <CTASection />
    </>
  );
};

export default About;