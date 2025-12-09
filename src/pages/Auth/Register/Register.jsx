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

          // create user in the database
          const userInfo={
            email:data.email,
            displayName:data.name,
            photoURL: photoURL
          }
          axiosSecure.post("/users", userInfo)
          .then(res=>{
            if(res.data.insertedId){
              toast.success('User created in the database')
            }
          })

          // update user profile to firebase
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };

          updateUserProfile(userProfile)
            .then(() => {
              console.log("user profile updated");
              navigate(location?.state || "/");
            })
            .catch((err) => {
              console.log(err.message);
            });
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="w-[60%] mx-auto">
      <h3 className="text-2xl font-bold">Create Account</h3>
      <form onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          {/* Name field  */}
          <label className="label">Name</label>
          <input
            type="text"
            className="input"
            placeholder="Your Name"
            {...register("name", { required: true })}
          />

          {/* Name error  */}
          {errors.name?.type === "required" && (
            <>
              <p className="text-red-500">Name is required</p>
            </>
          )}

          {/* Photo field  */}
          <label className="label">Photo</label>
          <input
            type="file"
            className="file-input"
            placeholder="Your Photo"
            {...register("photo", { required: true })}
          />

          {/* Name error  */}
          {errors.photo?.type === "required" && (
            <>
              <p className="text-red-500">Photo is required</p>
            </>
          )}

          {/* email field  */}
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Your Email"
            {...register("email", { required: true })}
          />

          {/* email error  */}
          {errors.email?.type === "required" && (
            <>
              <p className="text-red-500">Email is required</p>
            </>
          )}

          {/* Password field  */}
          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
            })}
          />
          {/* Password errors  */}
          {errors.password?.type === "required" && (
            <>
              <p className="text-red-500">Password is required</p>
            </>
          )}
          {errors.password?.type === "minLength" && (
            <>
              <p className="text-red-500">
                Password must be 6 characters or longer
              </p>
            </>
          )}
          {errors.password?.type === "pattern" && (
            <>
              <p className="text-red-500">
                Password must have at least one uppercase, at least one
                lowercase, at least one number, and at least one special
                characters
              </p>
            </>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>

          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
        <p>
          Already have an account{" "}
          <Link
            className="text-blue-500 underline"
            to={"/login"}
            state={location.state}
          >
            Login
          </Link>
        </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
