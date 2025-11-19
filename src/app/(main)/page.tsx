import { Footer, Header, Hero, Recommendations } from "../_components";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white w-screen">
      <Header />
      <Hero />
      <Recommendations />
      <Footer />
    </div>
  );
};

export default HomePage;
