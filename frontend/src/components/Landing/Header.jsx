import { Link, useNavigate } from "react-router-dom";
import Logo from "@/assets/logos/logo-horizontal.svg";
import { Button } from "..";

export default function Header() {
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Product",
      isActive: true,
      path: "/",
      href: "product",
    },
    {
      name: "Compare",
      isActive: false,
      path: "/",
      href: "compare",
    },

    {
      name: "Pricing",
      isActive: false,
      path: "/",
      href: "pricing",
    },
    {
      name: "Docs",
      isActive: false,
      path: "/",
      href: "docs",
    },
  ];

  return (
    <nav className="fixed  top-0 left-0 right-0 h-18  z-50 flex  justify-between text-center items-center bg-[#131318B8]  text-zinc-300 p-3 w-full ">
      <div>
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>
      <div className="hidden md:flex gap-5 w-2xs p-2 items-center justify-center rounded-full bg-zinc-800 ">
        {navItems.map((item) => (
          <a
            key={item.name}
            className={`${item.isActive ? "" : ""}  transition  rounded-full hover:bg-zinc-600 `}
            // to={item.path}
            href={`#${item.href}`}
          >
            {item.name}
          </a>
        ))}
      </div>
      <div className="flex gap-5">
        <Button onClick={() => navigate("/login")} variant="outline" className="hover:bg-zinc-700">
          {" "}
          Login
        </Button>
        <Button onClick={() => navigate("/signup")} variant="primary">
          {" "}
          Sign Up
        </Button>
      </div>
    </nav>
  );
}
