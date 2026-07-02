import { Button, Card, Input } from "@/components";
import { PATHS } from "@/routes/paths";
import React from "react";
import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <>
      <Card className="w-full max-w-md space-y-6 ">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p>Login to continue using PromptFlow</p>
        </div>
        <div className="space-y-4">
          <Input type="email" placeholder="abc@email.com" label="Email" />
          <Input type="password" placeholder="*******" label="Password" />

          <Button className="w-full">Login</Button>
        </div>

        <p className="text-center text-sm text-zinc-400">
          Don't have an account?{" "}
          <Link to={PATHS.SIGNUP} className="text-violet-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </Card>
    </>
  );
}

export default LoginForm;
