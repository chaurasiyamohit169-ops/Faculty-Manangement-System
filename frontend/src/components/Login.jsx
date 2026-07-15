import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLogIn } from "react-icons/fi";
import axios from "axios";
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { baseApiURL } from "../baseUrl";
const Login = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Admin");
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    if (data.loginid !== "" && data.password !== "") {
      const headers = {
        "Content-Type": "application/json",
      };

      const loginURL = `${baseApiURL()}/${selected.toLowerCase()}/auth/login`;

      console.log("=================================");
      console.log("API URL:", baseApiURL());
      console.log("Login URL:", loginURL);
      console.log("Selected User:", selected);
      console.log("Form Data:", data);
      console.log("=================================");

      toast.loading("Logging");

      axios
        .post(loginURL, data, {
          headers: headers,
        })
        .then((response) => {
          console.log("Login Success:", response.data);

          toast.dismiss();

          navigate(`/${selected.toLowerCase()}`, {
            state: {
              type: selected,
              loginid: response.data.loginid,
            },
          });
        })
        .catch((error) => {
          console.error("Login Error:", error);
          console.error("Response Data:", error.response?.data);
          console.error("Status Code:", error.response?.status);

          toast.dismiss();

          toast.error(
            error.response?.data?.message ||
            error.message ||
            "Login Failed"
          );
        });
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-transparent">
      <div className="w-full max-w-md p-8 rounded-lg bg-white shadow-lg relative">
        <img
          className="mx-auto mb-6 w-40 z-10"
          src='/clg-logo.png'
          alt="College Logo"
        />
        <h2 className="text-3xl font-semibold text-slate-800 mb-6 flex items-center justify-center">{selected} Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="loginid" className="block text-gray-600">
              {selected} Login ID
            </label>
            <input
              type="number"
              id="loginid"
              required
              className="mt-2 px-3 py-2 block w-full rounded border border-gray-300 focus:border-blue-500 focus:outline-none"
              {...register("loginid")}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                required
                className="mt-2 px-3 py-2 block w-full rounded border border-gray-300 focus:border-blue-500 focus:outline-none"
                {...register("password")}
              />
              <button
                type="button"
                className="absolute top-1/2 right-4 transform -translate-y-1/2"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 flex w-full justify-center text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Login <FiLogIn className="ml-2 mt-1" />
          </button>
        </form>
        <div className="mt-4 flex justify-center">
          <button
            className={`mr-8 text-blue-500 font-semibold hover:text-blue-700 transition duration-300 ease-in-out ${selected === "Admin" && "border-b-2 border-blue-500"
              }`}
            onClick={() => setSelected("Admin")}
          >
            Admin
          </button>
          <button
            className={`mr-8 text-blue-500 font-semibold hover:text-blue-700 transition duration-300 ease-in-out ${selected === "Faculty" && "border-b-2 border-blue-500"
              }`}
            onClick={() => setSelected("Faculty")}
          >
            Faculty
          </button>
          <button
            className={`text-blue-500 font-semibold hover:text-blue-700 transition duration-300 ease-in-out ${selected === "Student" && "border-b-2 border-blue-500"
              }`}
            onClick={() => setSelected("Student")}
          >
            Student
          </button>
        </div>
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Developed by <a href="https://csproconnectdevelopers.onrender.com" class="text-blue-500">Team-Titans</a>
          </p>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Login;