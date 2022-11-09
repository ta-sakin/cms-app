import React, { useEffect, useState } from "react";
import ButtonSpin from "../components/shared/ButtonSpin";
import Error from "../components/shared/Error";
import wardsList from "../wardsList";
import { DropzoneArea } from "mui-file-dropzone";
import { useDebounce } from "use-debounce";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const defaulValues = {
  address: "",
  ward: "",
  description: "",
};
// `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`
const SubmitComplain = () => {
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState({ publicSubmit: false, anonymous: false });
  const { publicSubmit, anonymous } = type;
  const [imgs, setImgs] = useState([]);
  const [userInput, setUserInput] = useState(defaulValues);
  const [imgUrls, setImgUrls] = useState("");
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
    setType({ ...type, [e.target.name]: e.target.checked });
  };

  const reset = () => {
    setImgs([]);
    setImgUrls("");
    setUserInput(defaulValues);
    setType({});
    setKey(key + 1);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address || !ward || !description) {
      if (!address) setError("Enter your address");
      if (!ward) setError("Select your ward");
      if (!description) setError("Describe your problem");
      return;
    }
    if (!currentUser) {
      setError("Something went wrong");
      return;
    }
    const complain = {
      address,
      ward,
      description,
      imgUrls: imgUrls ? imgUrls : [],
      type,
      phone: currentUser?.phoneNumber,
    };

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/complain",
        complain,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Complain submitted successfully", {
          theme: "colored",
        });
        reset();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.response.data.message.includes("defined")) {
        setError("Something went wrong");
        // return;
      } else {
        setError(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    imgs.forEach((img) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImgUrls((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(img);
    });
  }, [imgs]);

  return (
    <div className="sm:max-w-lg max-w-md mx-auto my-20 bg-white rounded-xl border-2 py-12 px-4 sm:px-10 ">
      <div className="mb-6">
        <h1 className="text-2xl font-bold ">What's your complain?</h1>
        <p className="text-gray-600 text-sm">
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
                <option key={key} value={wardsList[key]}>
                  {wardsList[key]}
                </option>
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
            onChange={(files) => setImgs(files)}
            dropzoneParagraphClass={
              "!text-base !font-montserrat !text-gray-700"
            }
            clearOnUnmount
            dropzoneClass={"!bg-slate-50"}
            filesLimit={3}
            showAlerts={["error"]}
            initialFiles={imgs}
            useChipsForPreview={true}
          />
          <div class="flex border-2 justify-between bg-gray-100 hover:shadow rounded-lg  py-3">
            <div class="flex items-center mx-2">
              <input
                id="inline-checkbox"
                type="checkbox"
                name="publicSubmit"
                checked={publicSubmit}
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
              class={`flex items-center mx-2 ${
                publicSubmit ? "block" : "hidden"
              }`}
            >
              <input
                id="inline-2-checkbox"
                type="checkbox"
                name="anonymous"
                checked={anonymous}
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
