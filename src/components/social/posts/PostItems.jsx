import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import moment from "moment";

export default function PostItems({
  id,
  title,
  body,
  media,
  created,
  updated,
  _count,
  comments,
  reactions,
  author,
  name,
}) {
  const defaultPostImage =
    "https://via.placeholder.com/150/eff0ea/494031/?text=no image";

  return (
    <>
      <Card className="postList__card m-3">
        <Card.Img
          variant="top"
          className="postList__card--image"
          src={media ? media : defaultPostImage}
        />
        <Card.Body className="postList__card--body">
          <Card.Title className="postList__card--header">{title}</Card.Title>
          <Card.Link
            href={`/dashboard/profiles/${author.name}`}
            className="postList__card--author text-decoration-underline"
          >
            {author.name}
          </Card.Link>
          <Card.Text>
            Last edit: {moment(updated).format("DD MMM YY")}
          </Card.Text>
          <Card.Text>{_count.comments} Comments</Card.Text>
          <Card.Text>{_count.reactions} Reactions </Card.Text>
          <a href={`/dashboard/posts/${id}`}>
            <BsFillArrowRightCircleFill className="postList__card--arrow" />
          </a>
        </Card.Body>
      </Card>
    </>
  );
}

PostItems.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
  media: PropTypes.string,
  comments: PropTypes.array,
  reactions: PropTypes.string,
  _count: PropTypes.object,
  created: PropTypes.string,
  updated: PropTypes.string,
};
