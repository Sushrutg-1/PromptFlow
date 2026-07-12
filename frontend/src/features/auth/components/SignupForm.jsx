import { useForm } from "react-hook-form";
import Logo from "@/assets/logos/logo-vertical.svg";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../auth.thunks";
import { Link, useNavigate } from "react-router-dom";

export default function SignupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function onSubmit(data) {
    try {
      await dispatch(signupUser(data)).unwrap();
      navigate("/login");
    } catch (error) {
      // console.error(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-zinc-700 text-silver-900 max-w-85 w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10"
    >
      <div className="flex flex-col text-center mb-10">
        <img src={Logo} alt="" className="h-25" />
        <h2 className="text-2xl font-bold text-center text-silver-800">Create your account</h2>
        <p>Compare AI models in seconds.</p>
      </div>
      <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
        <svg
          width="18"
          height="18"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.5 7.188a2.188 2.188 0 1 0 0-4.376 2.188 2.188 0 0 0 0 4.376Z"
            stroke="#6B7280"
            strokeOpacity=".6"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.125 11.875c0-1.812 1.96-3.125 4.375-3.125s4.375 1.313 4.375 3.125"
            stroke="#6B7280"
            strokeOpacity=".6"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input
          className="w-full outline-none bg-transparent py-2.5"
          type="text"
          placeholder="Name"
          autoComplete="name"

          {...register("name", {
            required: "Name is required",
            pattern: {
              value: /^[a-zA-Z\s]+$/,
              message: "Please enter a valid name",
            },
          })}
        />
      </div>
      {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
        <svg
          width="18"
          height="18"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m2.5 4.375 3.875 2.906c.667.5 1.583.5 2.25 0L12.5 4.375"
            stroke="#6B7280"
            strokeOpacity=".6"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.875 3.125h-8.75c-.69 0-1.25.56-1.25 1.25v6.25c0 .69.56 1.25 1.25 1.25h8.75c.69 0 1.25-.56 1.25-1.25v-6.25c0-.69-.56-1.25-1.25-1.25Z"
            stroke="#6B7280"
            strokeOpacity=".6"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
        <input
          className="w-full outline-none bg-transparent py-2.5"
          type="email"
          placeholder="Email"
          autoComplete="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Please enter a valid email",
            },
          })}
        />
      </div>
      {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      <div className="flex items-center mt-2 mb-4 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
        <svg
          width="13"
          height="17"
          viewBox="0 0 13 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
            fill="#6B7280"
          />
        </svg>
        <input
          className="w-full outline-none bg-transparent py-2.5"
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          {...register("password", {
            required: "Password is required",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
            },
          })}
        />
      </div>
      {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-1">
          <input id="checkbox" type="checkbox" />
          <label htmlFor="checkbox">I agree to the Terms and Privacy Policy</label>
        </div>
      </div>
      <button
        disabled={isLoading}
        type="submit"
        className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600/90 transition py-2.5 rounded text-white font-medium disabled:opacity-50"
      >
        {isLoading ? "Creating account..." : "Create Account"}
      </button>
      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link className="text-blue-500 underline" to="/login">
          Login
        </Link>
      </p>
    </form>
  );
}
