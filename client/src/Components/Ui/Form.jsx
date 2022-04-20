import React from "react";
import { useForm } from "react-hook-form";

import { Input, Loader } from "../";

const Form = ({ isLoading, handleSubmit }) => {
  const {
    register,
    handleSubmit: submitForm,
    formState: { errors },
  } = useForm();

  return (
    <>
      <form onSubmit={submitForm(handleSubmit)}>
        <Input
          placeholder="Address To"
          name="addressTo"
          type="text"
          register={register}
          error={errors}
        />
        <Input
          placeholder="Amount (ETH)"
          name="amount"
          type="number"
          register={register}
          error={errors}
        />
        <Input
          placeholder="Keyword (Gif)"
          name="keyword"
          type="text"
          register={register}
          error={errors}
        />
        <Input
          placeholder="Enter Message"
          name="message"
          type="text"
          register={register}
          error={errors}
        />

        {/* LINE */}
        <div className="h-[1px] w-full bg-gray-400 my-2"></div>

        {/* BUTTON && LOADER*/}
        {isLoading ? (
          <Loader />
        ) : (
          <button
            type="submit"
            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
          >
            Send now
          </button>
        )}
      </form>
    </>
  );
};

export default Form;
