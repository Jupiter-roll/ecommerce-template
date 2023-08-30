"use client";
import { FormEvent, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import '../../styles/form.css';
import Link from "next/link";
import { useCart } from "@/helpers/CartContext";

function Signup() {
  const { cartItems } = useCart();
  const [error, setError] = useState();
  const router = useRouter();
  const { data: session } = useSession();

  console.log(cartItems)

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const signupResponse = await axios.post("/api/auth/signup", {
        email: formData.get("email"),
        password: formData.get("password"),
        fullname: formData.get("fullname"),
        cart: cartItems,
      });
      console.log(signupResponse);
      const res = await signIn("credentials", {
        email: signupResponse.data.email,
        password: formData.get("password"),
        redirect: false,
      });

      if (res?.ok) return router.push("/");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message;
        setError(errorMessage);
      }
    }
  };

  return (
    <section className="login-register">
      <form onSubmit={handleSubmit} className="">
        {error && <div className="">{error}</div>}
        <h1 className="">Signup</h1>

        <label className="">Fullname:</label>
        <input
          type="text"
          placeholder="Fullname"
          className=""
          name="fullname"
        />

        <label className="text-slate-300">Email:</label>
        <input
          type="email"
          placeholder="Email"
          className=""
          name="email"
        />

        <label className="">Password:</label>
        <input
          type="password"
          placeholder="Password"
          className=""
          name="password"
        />

        <button className="">
          Signup
        </button>
        <Link href="/login">Already have an account?</Link>
      </form>
    </section>
  );
}

export default Signup;
