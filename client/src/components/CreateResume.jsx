import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Container,
  PermanentDetailConfirmationDialog,
  DangerAlert,
} from "./index";
import person from "../assets/person.svg";
import mail from "../assets/envelop.svg";
import phone from "../assets/phone.svg";
import linkedin from "../assets/linkedin.svg";
import descriptionIcon from "../assets/description-icon.svg";
import git from "../assets/github.svg";
import dgt from "../assets/doubleRight.png";
import buttonLoader from "./../assets/button-loader.gif";
import { useDispatch } from "react-redux";
import {
  createResume,
  getUsersPermanentsDetail,
  uploadImage,
} from "../features/resumeSlice";
import { useNavigate, useParams } from "react-router-dom";

function CreateResume() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { templateId } = useParams();

  const [submiting, setSubmiting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState(true);
  const [showError, setShowError] = useState(false);
  const [isPermanentConfirmation, setIsPermanentConfirmation] = useState(true);
  const [isPermanentDialogOpened, setIsPermanentDialogOpened] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      profileSummary:"",
      contact: { phone: "", email: "", github: "", linkedin: "" },
      experience: [],
      projects: [],
      education: [{ institution: "", degree: "", location: "", duration: "" }],
      skills: {},
      permanentdata: null,
    },
  });

  const {
    fields: experienceFields,
    append: addExperience,
    remove: removeExerienceField,
  } = useFieldArray({
    control,
    name: "experience",
  });

  const {
    fields: projectFields,
    append: addProject,
    remove: removeProjectField,
  } = useFieldArray({
    control,
    name: "projects",
  });

  const {
    fields: educationFields,
    append: addEducation,
    remove: removeEducationField,
  } = useFieldArray({
    control,
    name: "education",
  });

  const removeExerience = (index) => {
    removeExerienceField(index);
  };

  const removeProject = (index) => {
    removeProjectField(index);
  };

  const removeEducation = (index) => {
    removeEducationField(index);
  };

  const handleCancelDeleteClick = () => {
    setIsPermanentConfirmation(false);
  };

  const handleConfirmClick = async () => {
    setDeleting(true);
    console.log("detail confirmed");
    setDeleting(false);
    fetchPermanentDetails();
  };

  const handleInput = (e) => {
    // Allow only digits and limit to 10 characters
    e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
  };

  const fetchPermanentDetails = () => {
    try {
      dispatch(getUsersPermanentsDetail()).then((response) => {
        if (response.payload.data) {
          const data = response.payload.data;
          console.log(data);

          setImagePreview(data.image);
          reset({
            name: data.name,
            profileSummary:data.profileSummary,
            contact: data.contact,
            experience: data.experience,
            projects: data.projects,
            education: data.education,
            skills: data.skills,
          });
          setLoading(false);
        } else {
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 5000);
          console.log("no permanent detail found");
        }
      });
    } catch (error) {
      console.log("resume's data not found");
      setLoading(false);
    }
    setIsPermanentConfirmation(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (formData) => {
    const permanentdata = watch("permanentdata");
    if (!permanentdata) {
      submitForm(formData);
    } else {
      setAllData(formData);
      setIsPermanentDialogOpened(true);
    }
  };

  const handleCloseDialogClick = () => {
    setIsPermanentDialogOpened(false);
  };

  const handleConfirmPermanentClick = async () => {
    setDeleting(true);
    console.log("detail confirmed");
    submitForm(allData);
    setDeleting(false);
    setIsPermanentDialogOpened(false);
  };

  const submitForm = async (formData) => {
    setSubmiting(true);
    if (selectedImage) {
      const data = new FormData();
      data.append("image", selectedImage);

      try {
        const image = await dispatch(uploadImage(data));
        if (image) {
          try {
            const imageUrl = image.payload.imageUrl;
            console.log(formData);
            formData.templateId = templateId;
            formData.image = imageUrl;

            const response = await dispatch(createResume(formData));

            if (response && response.payload && response.payload.data) {
              const data = response.payload.data;
              navigate(`/resumeView/${templateId}/${data._id}`);
            } else {
              console.log(
                "No data in response or response structure is different"
              );
            }
          } catch (error) {
            console.log("Error occurred:", error.message || error);
          }
        } else {
          console.log("image is not propely uploaded.");
        }
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    } else {
      console.log("No image selected");
      try {
        formData.templateId = templateId;

        if (imagePreview) {
          formData.image = imagePreview;
          console.log("image is set");
        }
        console.log(formData);

        const response = await dispatch(createResume(formData));

        if (response && response.payload && response.payload.data) {
          const data = response.payload.data;
          navigate(`/resumeView/${templateId}/${data._id}`);
        } else {
          console.log("No data in response or response structure is different");
        }
      } catch (error) {
        console.log("Error occurred:", error.message || error);
      }
    }
    setSubmiting(false);
  };

  return (
    <Container>
      {/* permanent detaill adding confirmation dialog */}
      {isPermanentConfirmation && (
        <PermanentDetailConfirmationDialog
          deleting={deleting}
          onCancelClick={handleCancelDeleteClick}
          onConfirmClick={handleConfirmClick}
        />
      )}

      {/* permanent detail is true info confirmation dialog */}
      {isPermanentDialogOpened && (
        <PermanentDetailConfirmationDialog
          deleting={deleting}
          onCancelClick={handleCloseDialogClick}
          onConfirmClick={handleConfirmPermanentClick}
          message="You are selected Permanent Detail True"
          description="If you have any previous permanent details, Then your previous permanent detals will be override"
        />
      )}

      {/* No Permanent Detail Error Alert */}
      <DangerAlert
        showAlert={showError}
        setShowAlert={(val) => setShowError(val)}
      />

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-center text-3xl lg:text-5xl my-8 font-bold">
            Career Profile Form
          </h2>
          <p className="hidden sm:block text-lg lg:text-xl mx-14 mt-10 lg:mx-24">
            Enter your information below to build a strong resume.
          </p>
          <div className="lg:mx-28 mt-10 mb-20 sm:mx-10 mr-2 ml-4">
            {/* Presnol information fields */}
            <div className="ml-3 mb-10">
              {/* Personal Information */}
              <div className="flex items-center">
                <img src={dgt} alt="" height="25" width="25" />
                <h1 className="m-6 ml-3 font-bold text-xl">
                  PERSONAL INFORMATION :
                </h1>
              </div>
              <div className="flex flex-col lg:flex-row">
                <div className="h-32 w-32 border border-purple-400 flex items-center justify-center rounded">
                  {/* Image Box */}
                  {imagePreview && (
                    <div>
                      <img
                        src={imagePreview}
                        alt="Selected"
                        className="h-32 w-32 object-cover rounded"
                      />
                    </div>
                  )}
                </div>
                {/* Photo Upload */}
                <div className="flex flex-col">
                  <div className="m-5">
                    <p>Add a Photo to your resume</p>
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="ml-5 block text-sm text-gray-500 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-200"
                    />
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="relative flex lg:items-center gap-6 flex-row my-7">
                {/* <label className="font-medium"> Name: </label> */}
                <img src={person} alt="phone-icon" className="mb-2 h-9" />
                <input
                  type="text"
                  {...register("name", {
                    required: "*name is required",
                  })}
                  placeholder="John Doe"
                  className="border border-gray-400 rounded-sm w-2/4 max-sm:w-[80%] md:w-2/5 h-8 px-3 py-1"
                />
                {errors.name && (
                  <span className="text-red-500 absolute left-16 bottom-[-15px]">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className="flex max-sm:flex-col">
                <div className="relative flex items-center my-2 mr-5">
                  <img src={phone} alt="phone-icon" className="mb-2" />
                  <input
                    type="text"
                    {...register("contact.phone", {
                      required: "*contact number is required",
                      pattern: {
                        value: /^\+?[0-9]{10,14}$/,
                        message: "Invalid phone number",
                      },
                    })}
                    minLength={10}
                    maxLength={10}
                    onInput={handleInput}
                    placeholder="1234567890"
                    className="border border-gray-400 rounded-sm w-[270px] mb-2 mx-8 mt-1 h-8 px-3 py-1"
                  />
                  {errors.contact?.phone && (
                    <span className="text-red-500 absolute left-16 bottom-[-12px]">
                      {errors.contact.phone.message}
                    </span>
                  )}
                </div>
                <div className="relative flex my-2 mr-5">
                  <img src={mail} alt="mail-icon" className="mb-2" />
                  <input
                    type="text"
                    {...register("contact.email", {
                      required: "*email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="johndoe12@example.com"
                    className="border border-gray-400 rounded-sm w-[270px] mb-2 mx-8 mt-1 h-8 px-3 py-1"
                  />
                  {errors.contact?.email && (
                    <span className="text-red-500 absolute left-16 bottom-[-12px]">
                      {errors.contact.email.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex max-sm:flex-col">
                <div className="flex items-center my-2 mr-5">
                  <img src={linkedin} alt="linkedin-icon" className="mb-2" />
                  <input
                    type="text"
                    {...register("contact.linkedin")}
                    placeholder="linkedin.com/in/john"
                    className="border border-gray-400 rounded-sm w-[270px] mb-2 mx-8 mt-1 h-8 px-3 py-1"
                  />
                </div>
                <div className="flex my-2 mr-5">
                  <img src={git} alt="git-icon" className="mb-2" />
                  <input
                    type="text"
                    {...register("contact.github")}
                    placeholder="github.com/john"
                    className="border border-gray-400 rounded-sm w-[270px] mb-2 mx-8 mt-1 h-8 px-3 py-1"
                  />
                </div>
              </div>
              <div className="relative flex lg:items-center gap-6 flex-row my-7">
                {/* <label className="font-medium"> Name: </label> */}
                <img src={descriptionIcon} alt="phone-icon" className="mb-2 h-9" />
                <textarea
                  {...register("profileSummary", {
                    required: "*summary is required",
                  })}
                  placeholder="A highly skilled software engineer with over 5 years of experience..."
                  className="border border-gray-400 rounded-sm w-2/4 max-sm:w-[80%] md:w-2/5 h-24 px-3 py-1"
                />
                {errors.profileSummary && (
                  <span className="text-red-500 absolute left-16 bottom-[-17px]">
                    {errors.profileSummary.message}
                  </span>
                )}
              </div>
            </div>

            {/* Education Fields */}
            <div className="mb-10">
              {educationFields.map((education, index) => (
                <div key={education.id} className="ml-3">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <img src={dgt} alt="" height="25" width="25" />
                      <h1 className="m-6 ml-3 font-bold text-xl">
                        EDUCATION {educationFields.length > 1 ? index + 1 : ""}{" "}
                        :
                      </h1>
                    </div>
                    {educationFields.length > 1 ? (
                      <button
                        type="button"
                        onClick={() => removeEducation(index)}
                        className="ml-0 lg:ml-12 border border-red-300 rounded-full px-4 py-1 text-red-500 bg-purple-50 hover:bg-purple-200"
                      >
                        remove
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="relative flex flex-col lg:items-center lg:gap-10 lg:flex-row mb-7 ">
                    <label className="font-medium w-[20%]">
                      {" "}
                      Institution:{" "}
                    </label>
                    <input
                      type="text"
                      {...register(`education.${index}.institution`, {
                        required: "*institution is required",
                      })}
                      className="border border-gray-400 rounded-sm w-2/4 max-sm:w-[80%] md:w-2/5 h-8 px-3 py-1"
                    />
                    {errors.education?.[index]?.institution && (
                      <span className="text-red-500 absolute sm:relative left-0 bottom-[-20px] sm:bottom-1">
                        {errors.education[index].institution.message}
                      </span>
                    )}
                  </div>
                  <div className="relative flex flex-col lg:items-center lg:gap-10 lg:flex-row mb-7 ">
                    <label className="font-medium w-[20%]"> Degree: </label>
                    <input
                      type="text"
                      {...register(`education.${index}.degree`, {
                        required: "*degree is required",
                      })}
                      className="border border-gray-400 rounded-sm w-2/4 max-sm:w-[80%] md:w-2/5 h-8 px-3 py-1"
                    />
                    {errors.education?.[index]?.degree && (
                      <span className="text-red-500 absolute sm:relative left-0 bottom-[-20px] sm:bottom-1">
                        {errors.education[index].degree.message}
                      </span>
                    )}
                  </div>
                  <div className="relative flex flex-col lg:items-center lg:gap-10 lg:flex-row mb-7 ">
                    <label className="font-medium w-[20%]"> Location: </label>
                    <input
                      type="text"
                      {...register(`education.${index}.location`, {
                        required: "*location is required",
                      })}
                      className="border border-gray-400 rounded-sm w-2/4 max-sm:w-[80%] md:w-2/5 h-8 px-3 py-1"
                    />
                    {errors.education?.[index]?.location && (
                      <span className="text-red-500 absolute sm:relative left-0 bottom-[-20px] sm:bottom-1">
                        {errors.education[index].location.message}
                      </span>
                    )}
                  </div>
                  <div className="relative flex flex-col lg:items-center lg:gap-10 lg:flex-row mb-7 ">
                    <label className="font-medium w-[20%]"> Duration: </label>
                    <input
                      type="text"
                      {...register(`education.${index}.duration`, {
                        required: "*duration is required",
                      })}
                      className="border border-gray-400 rounded-sm w-2/4 max-sm:w-[80%] md:w-2/5 h-8 px-3 py-1"
                    />
                    {errors.education?.[index]?.duration && (
                      <span className="text-red-500 absolute sm:relative left-0 bottom-[-20px] sm:bottom-1">
                        {errors.education[index].duration.message}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addEducation({
                    institution: "",
                    degree: "",
                    location: "",
                    duration: "",
                  })
                }
                className="ml-5 mb-5 border rounded-full px-4 py-1 text-purple-700 bg-purple-50 hover:bg-purple-200"
              >
                {" "}
                Add education
              </button>
            </div>

            {/* Project Fields */}
            <div className="mb-10">
              {projectFields.map((project, index) => (
                <div key={project.id} className="ml-3">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <img src={dgt} alt="" height="25" width="25" />
                      <h1 className="m-6 ml-3 font-bold text-xl">
                        PROJECT {projectFields.length > 1 ? index + 1 : ""} :
                      </h1>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeProject(index)}
                      className="ml-0 lg:ml-12 border border-red-300 rounded-full px-4 py-1 text-red-500 bg-purple-50 hover:bg-purple-200"
                    >
                      remove
                    </button>
                  </div>
                  <div className="relative flex flex-col lg:items-center lg:gap-10 lg:flex-row mb-7 ">
                    <label className="font-medium w-[20%]"> Title: </label>
                    <input
                      type="text"
                      {...register(`projects.${index}.title`, {
                        required: "*title is required",
                      })}
                      className="border border-gray-400 rounded-sm w-2/4 max-sm:w-[80%] md:w-2/5 h-8 px-3 py-1"
                    />
                    {errors.projects?.[index]?.title && (
                      <span className="text-red-500 absolute sm:relative left-0 bottom-[-20px] sm:bottom-1">
                        {errors.projects[index].title.message}
                      </span>
                    )}
                  </div>
                  <div className="relative flex flex-col lg:items-center lg:gap-10 lg:flex-row mb-7 ">
                    <label className="font-medium w-[20%]">
                      {" "}
                      Technologies:{" "}
                    </label>
                    <input
                      type="text"
                      {...register(`projects.${index}.technologies`, {
                        required: "*technologies is required",
                      })}
                      className="border border-gray-400 rounded-sm w-2/4 max-sm:w-[80%] md:w-2/5 h-8 px-3 py-1"
                    />
                    {errors.projects?.[index]?.technologies && (
                      <span className="text-red-500 absolute sm:relative left-0 bottom-[-20px] sm:bottom-1">
                        {errors.projects[index].technologies.message}
                      </span>
                    )}
                  </div>
                  <div className="relative flex flex-col lg:items-center lg:gap-10 lg:flex-row mb-7 ">
                    <label className="font-medium w-[20%]"> Duration: </label>
                    <input
                      type="text"
                      {...register(`projects.${index}.duration`, {
                        required: "*duration is required",
                      })}
                      className="border border-gray-400 rounded-sm w-2/4 max-sm:w-[80%] md:w-2/5 h-8 px-3 py-1"
                    />
                    {errors.projects?.[index]?.duration && (
                      <span className="text-red-500 absolute sm:relative left-0 bottom-[-20px] sm:bottom-1">
                        {errors.projects[index].duration.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col lg:items-center lg:gap-10 lg:flex-row mb-7 ">
                    <label className="font-medium w-[20%]">
                      {" "}
                      Description:{" "}
                    </label>
                    <textarea
                      {...register(`projects.${index}.description`)}
                      className="border border-gray-400 rounded-sm w-2/4 max-sm:w-[80%] md:w-2/5 h-24 px-3 py-1"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addProject({
                    title: "",
                    technologies: "",
                    duration: "",
                    description: "",
                  })
                }
                className="ml-5 mb-5 border rounded-full px-4 py-1 text-purple-700 bg-purple-50 hover:bg-purple-200"
              >
                {" "}
                Add project
              </button>
            </div>

            {/* Experience Fields */}
            <div className="mb-10">
              {experienceFields.map((experience, index) => (
                <div key={experience.id} className="ml-3">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <img src={dgt} alt="" height="25" width="25" />
                      <h1 className="m-6 ml-3 font-bold text-xl">
                        EXPERIENCE{" "}
                        {experienceFields.length > 1 ? index + 1 : ""} :
                      </h1>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeExerience(index)}
                      className="ml-12 border border-red-300 rounded-full px-4 py-1 text-red-500 bg-purple-50 hover:bg-purple-200"
                    >
                      remove
                    </button>
                  </div>
                  <div className="relative flex flex-col lg:items-center lg:gap-10 lg:flex-row mb-7 ">
                    <label className="font-medium w-[20%]"> Title: </label>
                    <input
                      type="text"
                      {...register(`experience.${index}.title`, {
                        required: "*title is required",
                      })}
                      className="border border-gray-400 rounded-sm w-2/4 max-sm:w-[80%] md:w-2/5 h-8 px-3 py-1"
                    />
                    {errors.experience?.[index]?.title && (
                      <span className="text-red-500 absolute sm:relative left-0 bottom-[-20px] sm:bottom-1">
                        {errors.experience[index].title.message}
                      </span>
                    )}
                  </div>
                  <div className="relative flex flex-col lg:items-center lg:gap-10 lg:flex-row mb-7 ">
                    <label className="font-medium w-[20%]"> Company: </label>
                    <input
                      type="text"
                      {...register(`experience.${index}.company`, {
                        required: "*company is required",
                      })}
                      className="border border-gray-400 rounded-sm w-2/4 max-sm:w-[80%] md:w-2/5 h-8 px-3 py-1"
                    />
                    {errors.experience?.[index]?.company && (
                      <span className="text-red-500 absolute sm:relative left-0 bottom-[-20px] sm:bottom-1">
                        {errors.experience[index].company.message}
                      </span>
                    )}
                  </div>
                  <div className="relative flex flex-col lg:items-center lg:gap-10 lg:flex-row mb-7 ">
                    <label className="font-medium w-[20%]"> Location: </label>
                    <input
                      type="text"
                      {...register(`experience.${index}.location`, {
                        required: "*location is required",
                      })}
                      className="border border-gray-400 rounded-sm w-2/4 max-sm:w-[80%] md:w-2/5 h-8 px-3 py-1"
                    />
                    {errors.experience?.[index]?.location && (
                      <span className="text-red-500 absolute sm:relative left-0 bottom-[-20px] sm:bottom-1">
                        {errors.experience[index].location.message}
                      </span>
                    )}
                  </div>
                  <div className="relative flex flex-col lg:items-center lg:gap-10 lg:flex-row mb-7 ">
                    <label className="font-medium w-[20%]"> Duration: </label>
                    <input
                      type="text"
                      {...register(`experience.${index}.duration`, {
                        required: "*duration is required",
                      })}
                      className="border border-gray-400 rounded-sm w-2/4 max-sm:w-[80%] md:w-2/5 h-8 px-3 py-1"
                    />
                    {errors.experience?.[index]?.duration && (
                      <span className="text-red-500 absolute sm:relative left-0 bottom-[-20px] sm:bottom-1">
                        {errors.experience[index].duration.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col lg:items-center lg:gap-10 lg:flex-row mb-7 ">
                    <label className="font-medium w-[20%]">
                      {" "}
                      Responsibilities:{" "}
                    </label>
                    <textarea
                      {...register(`experience.${index}.responsibilities`)}
                      className="border border-gray-400 rounded-sm w-2/4 max-sm:w-[80%] md:w-2/5 h-24 px-3 py-1"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addExperience({
                    title: "",
                    company: "",
                    location: "",
                    duration: "",
                    responsibilities: "",
                  })
                }
                className="ml-5 mb-5 border rounded-full px-4 py-1 text-purple-700 bg-purple-50 hover:bg-purple-200"
              >
                {" "}
                Add experience
              </button>
            </div>

            {/* Stills section */}
            <div className="ml-3 mb-10">
              {/* skills */}
              <div className="flex items-center">
                <img src={dgt} alt="" height="25" width="25" />
                <h1 className="m-6 ml-3 font-bold text-xl">SKILLS : </h1>
              </div>
              <div className="flex flex-col lg:items-center lg:gap-10 lg:flex-row mb-7 ">
                <label className=" font-medium w-[20%]"> Languages: </label>
                <input
                  type="text"
                  placeholder="Java, Python, C++, etc..."
                  {...register("skills.languages")}
                  className="border border-gray-400 rounded-sm w-2/4 max-sm:w-[80%] md:w-2/5 h-8 px-3 py-1"
                />
              </div>
              <div className="flex flex-col lg:items-center lg:gap-10 lg:flex-row mb-7">
                <label className=" font-medium w-[20%]"> Frameworks: </label>
                <input
                  type="text"
                  placeholder="React, Node.js, Flask, etc..."
                  {...register("skills.frameworks")}
                  className="border border-gray-400 rounded-sm w-2/4 max-sm:w-[80%] md:w-2/5 h-8 px-3 py-1"
                />
              </div>
              <div className="flex flex-col lg:items-center lg:gap-10 lg:flex-row mb-7">
                <label className=" font-medium w-[40%] sm:w-[20%]">
                  {" "}
                  Developer Tools:{" "}
                </label>
                <input
                  type="text"
                  placeholder="Git, VS Code, Google Cloud Platform, etc..."
                  {...register("skills.developerTools")}
                  className="border border-gray-400 rounded-sm w-2/4 max-sm:w-[80%] md:w-2/5 h-8 px-3 py-1"
                />
              </div>
              <div className="flex flex-col lg:items-center lg:gap-10 lg:flex-row mb-7">
                <label className=" font-medium w-[20%]"> Libraries: </label>
                <input
                  type="text"
                  placeholder="pandas, NumPy, etc..."
                  {...register("skills.libraries")}
                  className="border border-gray-400 rounded-sm w-2/4 max-sm:w-[80%] md:w-2/5 h-8 px-3 py-1"
                />
              </div>
            </div>
            <div className="">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("permanentdata")}
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text ml-4">
                    It is your Permanent Detail Or Not
                  </span>
                </label>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className={`h-12 flex item-center justify-center px-12 lg:px-16 my-9 py-3 text-white font-bold text-base rounded-full  ${
                  submiting
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
              >
                {submiting ? (
                <img src={buttonLoader} alt="Loading.." className="w-7 h-5" />
              ) : (
                "Create"
              )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default CreateResume;
