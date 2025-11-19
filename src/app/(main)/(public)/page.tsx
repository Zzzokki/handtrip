"use client";

import { HomeCarousel, FeaturedCompanies, FeaturedTravels } from "../../_components";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white w-screen">
      <HomeCarousel />
      <FeaturedTravels />
      <FeaturedCompanies />
    </div>
  );
};

export default HomePage;
