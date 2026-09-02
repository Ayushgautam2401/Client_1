import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Philosophy from "@/components/Philosophy";
import CTABanner from "@/components/CTABanner";
import QASection from "@/components/QASection";
import Program from "@/components/Program";
import Connect from "@/components/Connect";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Philosophy />
        <CTABanner
          heading="Real transformation starts with a single decision."
          subheading="Explore the methodology, ask your questions, or connect directly."
          primaryLabel="Explore Q&A"
          primaryHref="#qa"
          secondaryLabel="View the Program"
          secondaryHref="#program"
        />
        <QASection />
        <Program />
        <CTABanner
          heading={`"The people who get the strongest results are those who have\nan urgent problem to solve."`}
          primaryLabel="Start Your Journey"
          primaryHref="#connect"
          secondaryLabel="Ask Agrika"
          secondaryHref="#qa"
          dark
        />
        <Connect />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
