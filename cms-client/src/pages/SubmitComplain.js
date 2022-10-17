import React, { useEffect, useState } from "react";
import ButtonSpin from "../components/shared/ButtonSpin";
import Error from "../components/shared/Error";
import wardsList from "../wardsList";
import { DropzoneArea } from "mui-file-dropzone";
import { useDebounce } from "use-debounce";

const defaulValues = {
  address: "",
  ward: "",
  description: "",
};

const SubmitComplain = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState({ publicSubmit: false, anonymous: false });
  const [img, setImg] = useState([]);
  const [userInput, setUserInput] = useState(defaulValues);
  const { address, ward, description } = userInput;
  const [key, setKey] = useState(0);
  const [debounceKey] = useDebounce(key, 1000);
  const handleChange = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };
  const handleCheckbox = (e) => {
    setCheck({ ...check, [e.target.name]: e.target.checked });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(img, userInput, check);
    setUserInput(defaulValues);
    setImg([]);
    setCheck({});
    setKey(key + 1);
  };

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
              id="autocomplete"
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

          <DropzoneArea
            key={debounceKey}
            acceptedFiles={["image/*"]}
            dropzoneText={"Drag & drop or browse images (MAX. 3)"}
            onChange={(files) => setImg(files)}
            dropzoneParagraphClass={
              "!text-base !font-montserrat !text-gray-700"
            }
            clearOnUnmount
            dropzoneClass={"!bg-slate-50"}
            filesLimit={3}
            showAlerts={["error"]}
            initialFiles={img}
            useChipsForPreview={true}
          />
          <div class="flex justify-around border-2 rounded-lg py-3">
            <div class="flex items-center mr-4">
              <input
                id="inline-checkbox"
                type="checkbox"
                name="publicSubmit"
                checked={check.publicSubmit}
                class="w-4 h-4 bg-gray-100 rounded border-gray-300  dark:bg-gray-700 dark:border-gray-600"
                onChange={handleCheckbox}
              />
              <label
                for="inline-checkbox"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-800"
              >
                Complain as Public
              </label>
            </div>

            <div
              class={`flex items-center mr-4 ${
                check.publicSubmit ? "visible" : "invisible"
              }`}
            >
              <input
                id="inline-2-checkbox"
                type="checkbox"
                name="anonymous"
                checked={check.anonymous}
                class="w-4 h-4 bg-gray-100 rounded border-gray-300  dark:bg-gray-700 dark:border-gray-600"
                onChange={handleCheckbox}
              />
              <label
                title="Your name will remain hidden"
                for="inline-2-checkbox"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-800"
              >
                Remain Anonymous
              </label>
            </div>
          </div>
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
