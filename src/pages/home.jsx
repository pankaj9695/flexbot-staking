import React from "react";
import "react-toastify/dist/ReactToastify.css";
import Wrapper from "../components/Wrapper";
import Hero from "../sections/Hero";

const Home = () => {
  return (
    <div className="text-white bg-[#010101] font-spaceMono">
      <Wrapper>
        <Hero />
      </Wrapper>
    </div>
  );
};

export default Home;
