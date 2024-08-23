import { API_BASE_URL } from "../../../config/apiConfig";
import { StandardButton } from "../../../ui-components/StandardButton";
import * as Yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { positionsService, usersService } from "../../../services/users";
import { useEffect, useState } from "react";
import { NewUserProps, PositionProps } from "../../../types/users";
import "./style.scss";

const postRequestSchema = Yup.object({
  name: Yup.string()
    .required("name is required")
    .min(2, "need more than 2 characters")
    .max(60, "need less than 60 characters"),
  email: Yup.string()
    .required("email is required")
    .email("Invalid email format")
    .max(100, "need less than 100 characters")
    .matches(
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:+)\])$/,
      "Invalid email format"
    ),
  phone: Yup.string()
    .required("phone is required")
    .matches(/^\+380\d{9}$/, "Invalid phone format"),
  position_id: Yup.number()
    .required("position is required")
    .min(1, "position must be 1 or greater"),
  photo: Yup.mixed()
    .required("photo is required")
    .test("fileSize", "The file is too large", (value) => {
      const fileList = value as FileList;
      return fileList && fileList[0] && fileList[0].size <= 5 * 1024 * 1024; // 5MB
    })
    .test("fileType", "Unsupported file format", (value) => {
      const fileList = value as FileList;
      return (
        fileList &&
        fileList[0] &&
        ["image/jpeg", "image/jpg"].includes(fileList[0].type)
      );
    }),
}) as Yup.ObjectSchema<NewUserProps>;

export const PostBlock = () => {
  const { register, handleSubmit, reset, watch } = useForm<NewUserProps>({
    resolver: yupResolver(postRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      position_id: 1,
      photo: [],
    },
  });

  const watchPhoto = watch("photo");

  // STATES
  const [positions, setPositions] = useState<PositionProps[]>([]);

  // SERVICES
  const { getUserPositions } = positionsService();
  const { getToken } = usersService();

  // FUNCTIONS
  const getUserPositionsFunction = async () => {
    const { data } = await getUserPositions();

    if (data) {
      setPositions((prevUsers) => [...prevUsers, ...data.positions]);
    }
  };

  const loadToken = async () => {
    try {
      await getToken();
    } catch (error) {
      console.error("Error loading token:", error);
    }
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const inputFile = document.getElementById("input-file");
    if (inputFile) {
      inputFile.click();
    }
  };

  const createUserFunction = async (formData: NewUserProps) => {
    try {
      loadToken();
      const token = localStorage.getItem("authToken");

      const axiosPrivate = axios.create({
        baseURL: API_BASE_URL,
        headers: {
          "Content-Type": "multipart/form-data",
          Token: token,
        },
      });
      const formDataBody = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        photo: formData.photo[0],
        position_id: formData.position_id,
      };
      const { data } = await axiosPrivate.post("/users", formDataBody);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitForm: SubmitHandler<NewUserProps> = async (data) => {
    const newUser = await createUserFunction(data);
    if (newUser?.success) {
      reset();
    }
  };

  useEffect(() => {
    getUserPositionsFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="postBlock" className="post-block">
      <div>
        <h2>Working with POST request</h2>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="div-input">
            <input type="text" {...register("name")} />
            <label htmlFor="input" className={"float-label"}>
              Your name
            </label>
          </div>
          <div className="div-input">
            <input type="email" {...register("email")} />
            <label htmlFor="input" className={"float-label"}>
              Email
            </label>
          </div>
          <div className="div-input">
            <input type="tel" {...register("phone")} />
            <label htmlFor="input" className={"float-label"}>
              Phone
            </label>
            <p className="p-helper-text">+38 (XXX) XXX - XX - XX</p>
          </div>

          <div className="div-position-grid">
            <p>Select your position</p>
            {positions.map((position, index) => (
              <div className="div-input div-input-radio" key={index}>
                <input
                  type="radio"
                  value={position.id}
                  {...register("position_id")}
                />
                <span className="custom-radio" />
                <label htmlFor="input">{position.name}</label>
              </div>
            ))}
          </div>

          <div className="div-add-photo">
            <input id="input-file" type="file" {...register("photo")} />
            <button onClick={handleButtonClick}>Upload</button>
            <span>
              {watchPhoto.length > 0 ? (
                <p>{watchPhoto[0].name}</p>
              ) : (
                <p>Upload your photo</p>
              )}
            </span>
          </div>
          <StandardButton title="Sign up" type="submit" />
        </form>
      </div>
    </section>
  );
};
