import React, { useState } from "react";
import ButtonSpin from "../components/shared/ButtonSpin";
import Error from "../components/shared/Error";
import wardsList from "../wardsList";
import { DropzoneArea } from "mui-file-dropzone";

const defaulValues = {
  address: "",
  ward: "",
  description: "",
  img: "",
  publicSubmit: false,
};
const SubmitComplain = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState(defaulValues);
  const { address, ward, description, img, publicSubmit } = userInput;
  const handleChange = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {};
  return (
    <div className="sm:max-w-lg max-w-sm mx-auto my-20 bg-white rounded-xl border-2 py-12 px-4 sm:px-10 ">
      <div className="mb-6">
        <h1 className="text-2xl font-bold ">What’s your complain?</h1>
        <p className="text-gray-600">
          Ensure that you follow our rules and regulations!
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-5">
          <label htmlFor="address">
            <p className="text-sm text-slate-700 pb-2">Address</p>
            <input
              onChange={handleChange}
              value={address}
              name="address"
              type="address"
              id="address"
              className="w-full text-sm py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow placeholder:text-sm  "
              placeholder="Enter an address, zipcode, or location"
            />
          </label>
          <label htmlFor="ward">
            <p className="text-sm text-slate-700 pb-2">Ward</p>
            <select
              value={ward}
              label="ward"
              onChange={handleChange}
              name="ward"
              required
              className="w-full text-sm py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            >
              <option value="" selected disabled hidden>
                Select your ward
              </option>
              {Object.keys(wardsList)?.map((key) => (
                <option value={wardsList[key]}>{wardsList[key]}</option>
              ))}
            </select>
          </label>

          <label htmlFor="description">
            <p className="text-sm text-slate-700 pb-2">Description</p>
            <textarea
              onChange={handleChange}
              value={description}
              name="description"
              type="description"
              id="description"
              className="w-full h-28 text-sm py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow placeholder:text-sm "
              placeholder="Write your complain here..."
            />
          </label>
          {/* <label htmlFor="file-upload">
            <div class="flex justify-center items-center w-full">
              <label
                for="dropzone-file"
                class="flex flex-col justify-center items-center w-full h-48 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer "
              >
                <div class="flex flex-col justify-center items-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    class="mb-3 w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p class="mb-2 text-sm text-gray-700 dark:text-gray-700">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-500">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" />
              </label>
            </div>
          </label> */}
          <DropzoneArea
            acceptedFiles={["image/*"]}
            dropzoneText={"Drag & drop or browse images (MAX. 3)"}
            onChange={(files) => console.log("Files:", files)}
            dropzoneParagraphClass={
              "!text-base !font-montserrat !text-gray-700"
            }
            dropzoneClass={"!bg-slate-50"}
            filesLimit={3}
            showAlerts={["error"]}
            // showPreviewsInDropzone={false}
            // showPreviews={true}
            useChipsForPreview={true}
          />
          {!loading ? (
            <button
              type="submit"
              id="sign-in-button"
              className="w-full mt-4 py-2 font-medium text-white bg-black hover:bg-gray-900 rounded-lg border-gray-900 hover:shadow inline-flex space-x-2 items-center justify-center uppercase"
            >
              <span>Submit Complain</span>
            </button>
          ) : (
            <button
              type="submit"
              className="w-full mt-4 py-2 font-medium text-white bg-black rounded-lg border-black hover:shadow inline-flex space-x-2 items-center justify-center disabled"
              disabled
            >
              <ButtonSpin />
            </button>
          )}
        </div>
        {error && <Error error={error} />}
      </form>
    </div>
  );
};

export default SubmitComplain;
