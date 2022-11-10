import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router-dom";

const schema = yup.object().shape({
  banner: yup.string().required(),
});

export default function UpdateProfileBanner() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const http = useAxios();
  let { name } = useParams();

  async function changeBanner(data) {
    try {
      const response = await http.put(`profiles/${name}/media`, data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(changeBanner)}>
      <div>
        <label htmlFor="banner">New banner url</label>
        <input type="url" id="banner" {...register("banner")} />
      </div>
      <button>Update Banner</button>
    </form>
  );
}
