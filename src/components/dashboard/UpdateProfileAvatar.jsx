import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router-dom";

const schema = yup.object().shape({
  avatar: yup.string().required(),
});

export default function UpdateProfileAvatar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const http = useAxios();
  let { name } = useParams();

  async function changeAvatar(data) {
    try {
      const response = await http.put(`profiles/${name}/media`, data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(changeAvatar)}>
      <div>
        <label htmlFor="avatar">update avatar url</label>
        <input type="url" id="avatar" {...register("avatar")} />
      </div>
      <button>Update avatar</button>
    </form>
  );
}
