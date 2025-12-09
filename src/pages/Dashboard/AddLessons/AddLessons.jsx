import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddLessons = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors }
  } = useForm();
 const axiosSecure=useAxiosSecure();


  const isPremium = true;

  const handleAddLesson = (data) => {

    axiosSecure.post('/add-lessons', data)
    .then(res=>{
        console.log(res.data);
        if(res.data.insertedId){
            toast.success("Your Lesson has been added");
        }
    })
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">Add New Lesson</h2>
      <form
        onSubmit={handleSubmit(handleAddLesson)}
        className="mt-12 p-4 text-black"
      >
        {/* Lesson Title */}
        <fieldset className="fieldset">
          <label className="label">Lesson Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            placeholder="Enter your lesson title"
            className="input w-full"
          />
        </fieldset>

        {/* Full Description */}
        <fieldset className="fieldset mt-6">
          <label className="label">Full Description / Story / Insight</label>
          <textarea
            {...register("description", { required: true })}
            rows={5}
            placeholder="Write your full lesson or story..."
            className="textarea w-full"
          ></textarea>
        </fieldset>

        {/* Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
          {/* Category */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Category</legend>
            <select
              {...register("category", { required: true })}
              defaultValue="Select a category"
              className="select w-full"
            >
              <option disabled>Select a category</option>
              <option value="Personal Growth">Personal Growth</option>
              <option value="Career">Career</option>
              <option value="Relationships">Relationships</option>
              <option value="Mindset">Mindset</option>
              <option value="Mistakes Learned">Mistakes Learned</option>
            </select>
          </fieldset>

          {/* Emotional Tone */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Emotional Tone</legend>
            <select
              {...register("tone", { required: true })}
              defaultValue="Select emotional tone"
              className="select w-full"
            >
              <option disabled>Select emotional tone</option>
              <option value="Motivational">Motivational</option>
              <option value="Sad">Sad</option>
              <option value="Realization">Realization</option>
              <option value="Gratitude">Gratitude</option>
            </select>
          </fieldset>
        </div>

        {/* Image Upload */}
        <fieldset className="fieldset">
          <label className="label">Image (Optional)</label>
          <input
            type="url"
            {...register("image")}
            placeholder="Paste image URL (optional)"
            className="input w-full"
          />
        </fieldset>

        {/* Privacy */}
        <fieldset className="fieldset mt-6">
          <legend className="fieldset-legend">Privacy</legend>
          <select
            {...register("privacy", { required: true })}
            defaultValue="Public"
            className="select w-full"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </fieldset>

        {/* Access Level */}
        <fieldset className="fieldset mt-6">
          <legend className="fieldset-legend">Access Level</legend>
          <select
            {...register("accessLevel", { required: true })}
            disabled={!isPremium}
            defaultValue={isPremium ? "Free" : "Free"}
            className={`select w-full ${
              !isPremium ? "opacity-60 cursor-not-allowed" : ""
            }`}
            title={
              !isPremium ? "Upgrade to Premium to create paid lessons" : ""
            }
          >
            <option value="Free">Free</option>
            <option value="Premium">Premium</option>
          </select>
        </fieldset>

        {/* Submit Button */}
        <input
          type="submit"
          value="Create Lesson"
          className="btn btn-primary mt-8 text-black"
        />
      </form>
    </div>
  );
};

export default AddLessons;
