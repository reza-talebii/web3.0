import React from "react";
import { useForm } from "react-hook-form";

import { Input } from "../";

const validate = {
  addressTo: {
    required: true,
    pattern: /^0x[a-fA-F0-9]{40}$/,
  },
  amount: {
    required: true,
    pattern: /^\d+$/,
  },
  keyword: {
    required: true,
  },
  message: {
    required: true,
  },
};

const Form = ({ handleChange, isLoading }) => {
  const {
    register,
    handleSubmit: submitForm,
    formState: { errors },
  } = useForm();

  const handleSubmit = (data) => console.log(data);

  return (
    <>
      <form onSubmit={submitForm(handleSubmit)}>
        <Input
          placeholder="Address To"
          name="addressTo"
          type="text"
          handleChange={handleChange}
          register={register}
          validate={validate.addressTo}
          error={error}
        />
        <Input
          placeholder="Amount (ETH)"
          name="amount"
          type="number"
          handleChange={handleChange}
          register={register}
          validate={validate.amount}
          error={error}
        />
        <Input
          placeholder="Keyword (Gif)"
          name="keyword"
          type="text"
          handleChange={handleChange}
          register={register}
          validate={validate.keyword}
          error={error}
        />
        <Input
          placeholder="Enter Message"
          name="message"
          type="text"
          handleChange={handleChange}
          register={register}
          validate={validate.message}
          error={error}
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
