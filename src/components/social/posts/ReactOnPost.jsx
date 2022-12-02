import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxios from "../../../hooks/useAxios";
import { Form } from "react-bootstrap";
import ErrorMessage from "../../common/ErrorMessage";
import { useEffect } from "react";
import { SOCIAL_URL } from "../../../constants/Api";
import SuccessMessage from "../../common/SuccessMessage";

const schema = yup.object().shape({
  symbol: yup.string().required("Please select a symbol"),
});

export default function ReactOnPost() {
  const [emoji, setEmoji] = useState();
  const [reactOnPostError, setReactOnPostError] = useState(null);
  const [emojis, setEmojis] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [updated, setUpdated] = useState();
  const http = useAxios();
  let { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    async function FetchReactions() {
      const reactsUrl = SOCIAL_URL + `posts/${id}?_reactions=true`;

      try {
        const response = await http.get(reactsUrl);
        console.log(response);
        const allReactions = response.data.reactions;
        setEmojis(allReactions);
      } catch (error) {
        console.log(error.toString());
        setReactOnPostError(error.toString());
      }
    }
    FetchReactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function submitReact() {
    let symbol = emoji;
    setSubmitting(true);

    const reactionUrl = SOCIAL_URL + `posts/${id}/react/${symbol}`;

    try {
      const response = await http.put(reactionUrl);
      if (response.status === 200) {
        setUpdated(true);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      setReactOnPostError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }
  if (reactOnPostError) {
    return <p>Something went wrong when trying to react on the post.</p>;
  }

  return (
    <>
      <Form onSubmit={handleSubmit(submitReact)} className="reactOnPostForm">
        {updated && <SuccessMessage>Reaction posted!</SuccessMessage>}
        {reactOnPostError && <ErrorMessage>{reactOnPostError}</ErrorMessage>}
        <Form.Select
          disabled={submitting}
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

      <div className="postReactions mb-3">
        {emojis.map((reaction, index) => {
          return (
            <div key={index} className="postReactions__item mb-3">
              <p>
                {reaction.count}
                {reaction.symbol}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
