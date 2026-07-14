import React from "react";
import TabImage from "@/assets/3d/floating-cards.svg";
import HistoryImage from "@/assets/3d/workspace-panels.svg";

function CompareSection() {
  return (
    <section className="w-full flex items-center justify-center p-4 text-center my-10 ">
      <div id="product" className="gap-5 flex-1 flex-col my-10 justify-center text-center">
        <p className="opacity-70 my-5">Works with the models you already use</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="chip rounded-2xl px-3  border">Grok</div>
          <div className="chip rounded-2xl px-3  border">Gemini</div>
          <div className="chip rounded-2xl px-3  border opacity-55">Claude · soon</div>
          <div className="chip rounded-2xl px-3  border opacity-55">ChatGPT · soon</div>
        </div>
        <div className="flex flex-col gap-6 my-10">
          <h1 className="text-3xl font-bold">Built for the moment you compare</h1>
          <p className="text-sm opacity-70 my-5">
            Every part of PromptFlow is designed around one job: helping you tell <br /> which model
            actually answered better.
          </p>
          <div className="flex flex-col lg:flex-row gap-5 w-full justify-around my-5">
            <div className="relative z-10 bg-zinc-800 p-6 h-full lg:h-60  rounded-[10px] flex flex-col items-center justify-center text-center">
              <h2 className="text-2xl font-bold text-white mb-1">Side-by-side comparison</h2>
              <p className="text-sm opacity-70 font-medium mb-4">
                See every model's answer to the same prompt in one screen, not five browser tabs
                stitched together.
              </p>
            </div>
            <div className="relative z-10 bg-zinc-800 p-6 h-full lg:h-60  rounded-[10px] flex flex-col items-center justify-center text-center">
              <h2 className="text-2xl font-bold text-white mb-1">Mark the winner</h2>
              <p className="text-sm opacity-70 font-medium mb-4">
                Tap the response that answered best. PromptFlow remembers your preferences over
                time.
              </p>
            </div>
            <div className="relative z-10 bg-zinc-800 p-6 h-full lg:h-60  rounded-[10px] flex flex-col items-center justify-center text-center">
              <h2 className="text-2xl font-bold text-white mb-1">Organized history</h2>
              <p className="text-sm opacity-70 font-medium mb-4">
                Every comparison is saved, searchable, and pinnable — organized like the tools you
                already use daily.
              </p>
            </div>
          </div>
        </div>
        <div id="compare" className="flex flex-col items-center gap-10 py-10 p-8">
          <div className="flex flex-col lg:flex-row  gap-10 border border-zinc-600 rounded-[10px] p-6">
            <div className="w-full md:w-[70%] lg:w-[50%] mx-auto">
              <img src={TabImage} alt="Tab Switching" />
            </div>
            <div className="flex-1 align-center text-center my-auto">
              <h1 className="text-2xl font-bold text-white mb-1">
                Stop tab-switching between AI apps
              </h1>
              <p className="text-sm opacity-70 font-medium mb-4">
                PromptFlow's comparison lane keeps every model's response scrollable and readable at
                once <br /> — no copy-pasting between browser tabs, no losing track of which answer
                came from where.
              </p>
              <ul className="justify-start ">
                <li>Independent scroll per response card</li>
                <li>Mark a winner in one tap</li>
                <li>Unavailable models shown, not hidden</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-10 border border-zinc-600 rounded-[10px] p-6 lg:flex-row ">
            <div className="flex-1 align-center text-center my-auto">
              <h1 className="text-2xl font-bold text-white mb-1">
                Every comparison, organized and searchable
              </h1>
              <p className="text-sm opacity-70 font-medium mb-4">
                Today, Yesterday, Previous 7 Days — just like the tools you already know. <br /> Pin
                the comparisons you'll need again, and find any prompt in seconds.
              </p>
              <ul className="justify-start ">
                <li>Full-text search across every prompt</li>
                <li>Pin your most-used comparisons</li>
                <li>Keyboard-first navigation (⌘K)</li>
              </ul>
            </div>
            <div className="w-full lg:w-[50%]">
              <img src={HistoryImage} alt="Organized History" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CompareSection;
