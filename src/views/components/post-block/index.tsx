import { API_BASE_URL } from "../../../config/apiConfig";
import { StandardButton } from "../../../ui-components/StandardButton";
import * as Yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { usersService } from "../../../services/users";
import { NewUserProps } from "../../../types/users";
import "./style.scss";
import { useUserPositions } from "../../../hooks/usePositions";
import { useState } from "react";
import { toast } from "react-toastify";

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
    .test("fileType", "Unsupported file format", (value) => {
      const fileList = value as FileList;
      return (
        fileList &&
        fileList[0] &&
        ["image/jpeg", "image/jpg"].includes(fileList[0].type)
      );
    }),
}) as Yup.ObjectSchema<NewUserProps>;

type PostBlockProps = {
  refetchGetUsers: (refetchPage: number) => void;
};
export const PostBlock = ({ refetchGetUsers }: PostBlockProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<NewUserProps>({
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
  const [isLoadingNewUser, setIsLoadingNewUser] = useState<boolean>(false);

  // SERVICES
  const { getToken } = usersService();
  const { data, isLoading } = useUserPositions();

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const inputFile = document.getElementById("input-file");
    if (inputFile) {
      inputFile.click();
    }
  };

  const createUserFunction = async (formData: NewUserProps) => {
    try {
      setIsLoadingNewUser(true);
      const response = await getToken();

      const axiosPrivate = axios.create({
        baseURL: API_BASE_URL,
        headers: {
          "Content-Type": "multipart/form-data",
          Token: response.data.token,
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
      setIsLoadingNewUser(false);
    }
  };

  const onSubmitForm: SubmitHandler<NewUserProps> = async (data) => {
    const newUser = await createUserFunction(data);
    if (newUser?.success) {
      setIsLoadingNewUser(false);
      toast("User created!", { type: "success" });
      reset();
      refetchGetUsers(1);
    }
  };

  return (
    <section id="postBlock" className="post-block">
      <div>
        <h2>Working with POST request</h2>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="div-input">
            <input type="text" id="name" {...register("name")} />
            <label htmlFor="name"  className={"float-label"}>
              Your name
            </label>
            {errors.name && (
              <p className="signup-error-text">{errors.name.message}</p>
            )}
          </div>
          <div className="div-input">
            <input type="email" id="email" {...register("email")} />
            <label htmlFor="email" className={"float-label"}>
              Email
            </label>
            {errors.email && (
              <p className="signup-error-text">{errors.email.message}</p>
            )}
          </div>
          <div className="div-input">
            <input type="tel" id="tel" {...register("phone")} />
            <label htmlFor="tel" className={"float-label"}>
              Phone
            </label>
            <p className="p-helper-text">+38 (XXX) XXX - XX - XX</p>
          </div>

          <div className="div-position-grid">
            <p>Select your position</p>
            {isLoading ? (
              <p>loading...</p>
            ) : (
              data?.positions.map((position, index) => (
                <div className="div-input div-input-radio" key={index}>
                  <input
                    id={position.name}
                    type="radio"
                    value={position.id}
                    {...register("position_id")}
                  />
                  <span className="custom-radio" />
                  <label htmlFor={position.name}>{position.name}</label>
                </div>
              ))
            )}
            {errors.position_id && (
              <p className="signup-error-text">{errors.position_id.message}</p>
            )}
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
            {errors.photo && (
              <p className="signup-error-text">{errors.photo.message}</p>
            )}
          </div>
          <StandardButton
            title="Sign up"
            type="submit"
            disabled={isLoadingNewUser}
          />
        </form>
      </div>
    </section>
  );
};
