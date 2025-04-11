import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/adminContext";
import { toast } from "react-toastify";
import axios from "axios";
const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 YEAR");
  const [about, setAbout] = useState("");
  const [fee, setFee] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [degree, setDegree] = useState("MBBS");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { aToken, backend_url } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Image not Selected");
      }

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("degree", degree);
      formData.append("about", about);
      formData.append("fee", Number(fee));
      formData.append("speciality", speciality);
      formData.append(
        "Address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      // console.log(formdata)

      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });

      const { data } = await axios.post(
        backend_url + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setEmail("");
        setName("");
        setPassword("");
        setAbout("");
        setAddress1("");
        setAddress2("");
        setDegree("");
        setFee("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8  text-gray-500">
          <label htmlFor="doc-img">
            {
              <img
                className="w-16 bg-gray-100 rounded-full cursor-pointer"
                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              />
            }
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p>
            Upload doctor <br /> picture
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-10  text-gray-600">
          <div className=" w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex-col gap-1">
              <p>Doctor name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full border rounded px-3 py-2"
                type="text"
                placeholder="Name"
                required
              />
            </div>
            <div className="flex-1 flex-col gap-1">
              <p>Doctor Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full border rounded px-3 py-2"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="flex-1 flex-col gap-1">
              <p>Doctor Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full border rounded px-3 py-2"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="flex-1 flex-col gap-1">
              <p>Doctor Experience</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="w-full border rounded px-3 py-2"
                name=""
                id="experience"
              >
                <option value={"1 YEAR"}>1 YEAR</option>
                <option value={"2 YEAR"}>2 YEAR</option>
                <option value={"3 YEAR"}>3 YEAR</option>
                <option value={"4 YEAR"}>4 YEAR</option>
                <option value={"5 YEAR"}>5 YEAR</option>
                <option value={"6 YEAR"}>6 YEAR</option>
                <option value={"7 YEAR"}>7 YEAR</option>
                <option value={"8 YEAR"}>8 YEAR</option>
                <option value={"9 YEAR"}>9 YEAR</option>
                <option value={"10 YEAR"}>10 YEAR</option>
              </select>
            </div>
            <div className=" flex-1 flex-col gap-1">
              <p>Fee</p>
              <input
                onChange={(e) => setFee(e.target.value)}
                value={fee}
                className="w-full border rounded px-3 py-2"
                type="number"
                placeholder="fee"
                required
              />
            </div>
          </div>
          <div className="w-full lg:flex-1 flex flex-col  gap-4">
            <div className="flex-1 flex-col gap-1">
              <p>Speciality</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="w-full border rounded px-3 py-2"
                name=""
                id="speciality"
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="flex-1 flex-col gap-1">
              <p>Eduction</p>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className="w-full border rounded px-3 py-2"
                type="text"
                placeholder="Education"
                required
              />
            </div>
            <div className="flex-1 flex-col gap-1">
              <p>Address</p>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className="w-full border rounded px-3 py-2"
                type="text"
                placeholder="address 1"
                required
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className="w-full border rounded px-3 py-2"
                type="text"
                placeholder="address 2"
                required
              />
            </div>
          </div>
        </div>
        <div>
          <p className="mt-4 mb-2">About</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="w-full px-4 pt-2 border rounded"
            type="text"
            placeholder="write about Doctor"
            row={5}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-10 py-3 mt-4 rounded-full"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
