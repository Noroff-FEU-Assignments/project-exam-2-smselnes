import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxios from "../../../hooks/useAxios";
import { Button, Form } from "react-bootstrap";
import ErrorMessage from "../../common/ErrorMessage";

const schema = yup.object().shape({
  symbol: yup.string().required("Please select a symbol"),
});

export default function ReactOnPost() {
  const [emoji, setEmoji] = useState();
  const [reactOnPostError, setReactOnPostError] = useState(null);

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
      setReactOnPostError(error.toString());
    }
  }

  return (
    <Form onSubmit={handleSubmit(submitReact)} className="reactOnPostForm">
      {reactOnPostError && <ErrorMessage>{reactOnPostError}</ErrorMessage>}
      <Form.Select
        id="symbol"
        value={emoji}
        {...register("symbol")}
        onChange={(e) => setEmoji(e.target.value)}
      >
        <option value="" className="reactOnPostForm__select">
          Your reaction
        </option>
        <option>&#128525;</option>
        <option>&#128077;</option>
        <option>&#128078;</option>
        <option>&#128514;</option>
        <option>&#128558;</option>
      </Form.Select>
      {errors.symbol && <ErrorMessage>{errors.symbol.message}</ErrorMessage>}
      <button
        type="submit"
        className="reactOnPostForm__submit button mx-auto my-3"
      >
        Place emoji
      </button>
    </Form>
  );
}
