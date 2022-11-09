import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxios from "../../../hooks/useAxios";

const schema = yup.object().shape({
  symbol: yup.string().required("Please select a symbol"),
});

export default function ReactOnPost() {
  const [emoji, setEmoji] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const http = useAxios();
  let { id } = useParams();
  let emojiSymbol = emoji;

  async function submitReact() {
    try {
      const response = await http.put(`posts/${id}/react/${emojiSymbol}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(submitReact)}>
      <select
        value={emoji}
        {...register("symbol")}
        onChange={(e) => setEmoji(e.target.value)}
      >
        <option value="">Your reaction</option>
        <option>&#128525;</option>
        <option>&#128077;</option>
      </select>
      <button>Send</button>
    </form>
  );
}
