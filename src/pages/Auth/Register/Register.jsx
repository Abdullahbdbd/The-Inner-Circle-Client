import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { registerUser, updateUserProfile } = useAuth();

  const handleRegistration = (data) => {
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", profileImg);

        const image_API_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${
          import.meta.env.VITE_Image_host_Key
        }`;

        axios.post(image_API_URL, formData).then((res) => {
          const photoURL = res.data.data.url;

          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
          };

          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              toast.success("User created in the database");
            }
          });

          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };

          updateUserProfile(userProfile)
            .then(() => {
              console.log("user profile updated");
              navigate(location?.state || "/");
            })
            .catch((err) => console.log(err.message));
        });
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 bg-clip-text text-transparent">
          Create Account
        </h2>

        <form onSubmit={handleSubmit(handleRegistration)} className="space-y-5 mt-7">
          {/* Name field */}
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">Name is required</p>
            )}
          </div>

          {/* Photo field */}
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">
              Profile Photo
            </label>
            <input
              type="file"
              className="w-full file-input file-input-bordered file-input-teal-500 rounded-full"
              {...register("photo", { required: true })}
            />
            {errors.photo && (
              <p className="text-red-500 text-sm mt-1">Photo is required</p>
            )}
          </div>

          {/* Email field */}
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>

          {/* Password field */}
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern:
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
              })}
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-sm mt-1">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-sm mt-1">
                Password must be at least 6 characters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500 text-sm mt-1">
                Must contain uppercase, lowercase, number & special character
              </p>
            )}
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="w-full py-3 rounded-full font-semibold text-white bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 hover:opacity-90 transition-all shadow-md"
          >
            Create account
          </button>
        </form>

        {/* already have account */}
        <p className="text-center text-sm text-slate-600 mt-4">
          Already have an account?{" "}
          <Link
            to={"/login"}
            state={location.state}
            className="text-teal-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

        {/* social login */}
        <div className="mt-4">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
