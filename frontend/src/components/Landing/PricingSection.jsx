import { Button } from "..";
import { useNavigate } from "react-router-dom";

function PricingSection() {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="w-full flex items-center justify-center p-5 text-center my-10 ">
      <div className="gap-5 flex flex-col  justify-center text-center  align-middle">
        <div className="flex flex-col items-center  bg-zinc-700  p-8 md:px-15 rounded-lg w-fit">
          <h1 className="text-3xl font-bold my-4">Ready to see AI side by side?</h1>
          <h2 className="text-xl  mb-5">Free to start — no credit card required.</h2>
          <Button
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Get Started Free
          </Button>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
