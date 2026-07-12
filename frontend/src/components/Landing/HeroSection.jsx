import React from "react";
import { Button } from "..";
import HeroImage from "@/assets/illustrations/welcome-onboarding.svg";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="w-full flex items-center justify-center p-4 text-center">
      <div className="gap-5 flex-1 flex-col">
        <p className="text-lg ">Organize · Create · Compare AI</p>
        <h1 className="text-4xl font-bold mb-4">
          One prompt. <br /> Every model's answer, side by side.
        </h1>
        <h2 className="text-xl text-gray-400">
          PromptFlow sends your prompt to multiple AI models at once, so you can see who answers
          best — instead of guessing.
        </h2>
        <div className="mt-8">
          <Button onClick={() => navigate("/dashboard")}>Get Started</Button>
        </div>
      </div>
      <div className="flex-1 flex justify-center p-4">
        <img className="max-w-full h-auto shadow-lg" src={HeroImage} alt="HeroImage" />
      </div>
    </section>
  );
}

export default HeroSection;
