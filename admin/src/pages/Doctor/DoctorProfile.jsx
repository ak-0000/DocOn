import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData ,backend_url} =
    useContext(DoctorContext);
  const { currency  } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async() => {
    try{
      const updateData = {
        address: profileData.address,
        fees : profileData.fee,
        available : profileData.available
      }
      const {data } = await axios.post(backend_url + '/api/doctor/update-profile' , updateData , {headers : {dToken}})

      if(data.success){
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else{
        toast.error(data.message)
      }

    }catch(error){
      toast.error(error.message)
      console.log(error)
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return (
    profileData && (
      <div>
        <div className="flex flex-col ">
          <div>
            <img src={profileData.image} alt="" />
          </div>
          <div>
            {/* doc info  */}
            <p>{profileData.name}</p>
            <div>
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded full ">
                {profileData.experience}
              </button>
            </div>

            <div className="flex items-center gap-1  text-sm font-medium text-neutral-800  mt-3 ">
              <p className="text-sm text-gray-600 max-w-[700px] mt-1 ">
                About :{" "}
              </p>
              <p>{profileData.about}</p>
            </div>

            <p className="text-gray-600 font-medium mt-4">
              Appointment Fee :{" "}
              <span className="text-gray-800">
                {currency}{" "}
                {isEdit ? (
                  <input
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fee: e.target.value,
                      }))
                    }
                    value={profileData.fee}
                    type="number"
                  />
                ) : (
                  profileData.fee
                )}
              </span>
            </p>
            <div className="flex gap-2 py-2">
              <p className="text-sm">Address : </p>
              <p>
                {isEdit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev, line1: e.target.value },
                      }))
                    }
                    value={profileData.address.line1}
                  />
                ) : (
                  profileData.address.line1
                )}
                <br />
                {isEdit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev, line2: e.target.value },
                      }))
                    }
                    value={profileData.address.line2}
                  />
                ) : (
                  profileData.address.line2
                )}
              </p>
            </div>
            <div className="flex gap-1 pt-2">
              <input
                onChange={() =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                checked={profileData.available}
                type="checkbox"
              />
              <label htmlFor="">Available</label>
            </div>

            {isEdit ? (
              <button
                onClick={ updateProfile}
                className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition -all"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition -all"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
