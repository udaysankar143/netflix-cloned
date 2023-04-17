import axios from "axios";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";

const Auth = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [swich, setSwich] = useState("login");
  const toggleSwitch = useCallback(() => {
    setSwich((currentswitch) =>
      currentswitch === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profileView",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);
  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", { name, email, password });
    } catch (error) {
      console.log(error);
    }
    login();
  }, [login, name, email, password]);

  return (
    <div className="relative h-screen w-full bg-[url('/images/hero.jpg')] bg-fixed bg-no-repeat bg-center bg-cover">
      <div className="bg-black h-full w-full lg:bg-opacity-50">
        <nav className="px-12 py-4">
          <Image
            src={"/images/netflix_logo.svg"}
            alt="logo"
            height={60}
            width={100}
            className="h-12"
          />
        </nav>
        <div className="flex justify-center">
          <div className="w-full bg-black/70 px-16 py-16 lg:w-2/5 lg:max-w-screen-md rounded-xl self-center">
            <h1 className="p-0 text-white text-3xl font-semibold mb-8">
              {swich === "login" ? "Login" : "Register"}
            </h1>
            <div className="flex flex-col gap-4">
              {swich === "register" && (
                <input
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
                  type="text"
                  placeholder="UserName"
                  className="px-3 h-10 bg-neutral-700 w-full rounded-md outline-none text-white text-base placeholder:text-gray-300 placeholder:font-semibold focus:border-b-2 focus:border-white"
                />
              )}
              <input
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                type="text"
                placeholder="Email"
                className="px-3 h-10 bg-neutral-700 w-full rounded-md outline-none text-white text-base placeholder:text-gray-300 placeholder:font-semibold focus:border-b-2 focus:border-white"
              />
              <input
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="px-3 h-10 bg-neutral-700 w-full rounded-md outline-none text-white text-base placeholder:text-gray-300 placeholder:font-semibold focus:border-b-2 focus:border-white"
              />
            </div>
            <button
              onClick={swich === "login" ? login : register}
              className="py-2 rounded-md text-white bg-red-600 hover:bg-red-700 transition w-full mt-10">
              {swich === "login" ? "Login" : "Register"}
            </button>
            <h1 className="flex w-full justify-center text-gray-400 mt-4">
              -OR-
            </h1>
            <div className="grid grid-cols-2 w-full mt-6 gap-4">
              <div
                onClick={() =>
                  signIn("google", { callbackUrl: "/profileView" })
                }
                className="flex items-center justify-center bg-white rounded-md py-2 hover:scale-[.98] active:bg-transparent transition cursor-pointer">
                <FcGoogle size={30} />
                <h1 className="px-2 text-zinc-700">Google</h1>
              </div>
              <div
                onClick={() =>
                  signIn("github", { callbackUrl: "/profileView" })
                }
                className="flex items-center justify-center bg-white rounded-md py-2 hover:scale-[.98] active:bg-transparent transition cursor-pointer">
                <BsGithub size={30} />
                <h1 className="px-2 text-zinc-700">GitHub</h1>
              </div>
            </div>
            <p className="mt-10 text-neutral-500">
              {swich === "login"
                ? "First time using Netflix?"
                : "Already have account?"}
              <span
                onClick={toggleSwitch}
                className="text-white font-semibold hover:underline px-2 cursor-pointer">
                {swich === "login" ? "Create an Account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
