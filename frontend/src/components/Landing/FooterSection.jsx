import React from "react";
import LogoImage from "@/assets/logos/logo-horizontal.svg";

function FooterSection() {
  return (
    <footer id="docs" className="mt-24 border-t border-zinc-800">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-16 md:flex-row md:justify-between">
        {/* Left */}
        <div className="max-w-sm">
          <img src={LogoImage} alt="PromptFlow Logo" className="mb-5 w-40" />

          <p className="text-sm leading-7 text-zinc-400">
            Organize. Create. Compare AI.
            <br />
            The workspace built for comparing multiple AI models in one place.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Product</h3>

            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="cursor-pointer hover:text-white transition-colors">Features</li>
              <li className="cursor-pointer hover:text-white transition-colors">Comparison Lane</li>
              <li className="cursor-pointer hover:text-white transition-colors">Pricing</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Company</h3>

            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="cursor-pointer hover:text-white transition-colors">About</li>
              <li className="cursor-pointer hover:text-white transition-colors">Careers</li>
              <li className="cursor-pointer hover:text-white transition-colors">Contact</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Resources</h3>

            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="cursor-pointer hover:text-white transition-colors">Documentation</li>
              <li className="cursor-pointer hover:text-white transition-colors">Changelog</li>
              <li className="cursor-pointer hover:text-white transition-colors">Support</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-zinc-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-zinc-500 md:flex-row">
          <p>© {new Date().getFullYear()} PromptFlow. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>

            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>

            <a href="#" className="hover:text-white transition-colors">
              Status
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
