import React from "react";
import { Button } from "..";
import HeroImage from "@/assets/illustrations/welcome-onboarding.svg";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="w-full flex items-center justify-center p-4 text-center my-10">
      <div className="gap-5 flex flex-col text-center align-middle">
        <p className="text-sm mx-auto w-fit bg-zinc-900 text-zinc-500 py-2  px-5  rounded-full justify-center text-center">
          Organize · Create · Compare AI
        </p>
        <h1 className="text-5xl font-bold my-10 lg:text-6xl">
          One prompt. <br /> Every model's answer, side by side.
        </h1>
        <h2 className="text-xl text-gray-400 ">
          PromptFlow sends your prompt to multiple AI models at once, <br /> so you can see who
          answers best — instead of guessing, or juggling five browser tabs.
        </h2>
        <div className="mt-8">
          <Button onClick={() => navigate("/dashboard")}>Start Comparing free →</Button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
