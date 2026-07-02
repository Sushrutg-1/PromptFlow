import { Button, Input } from "@/components";
import React from "react";

function LoginPage() {
  return (
    <div>
      <h1> hello</h1>

      <Input type="text" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Button className="w-full">Login</Button>
    </div>
  );
}

export default LoginPage;
