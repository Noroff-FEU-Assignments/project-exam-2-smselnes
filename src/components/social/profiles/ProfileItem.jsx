import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import defaultAvatar from "../../../assets/default-avatar.jpg";

export default function ProfileItem({
  name,
  avatar,
  followers,
  following,
  count,
}) {
  return (
    <>
      <Card className="profiles__card m-3">
        <Card.Img
          src={avatar ? avatar : defaultAvatar}
          className="profiles__card--avatar"
        />
        <Card.Body className="profiles__card--body">
          <Card.Title className="profiles__card--name mt-2">{name}</Card.Title>
          <Card.Text>Posts:{count.posts}</Card.Text>
          <Link
            to={`/dashboard/profiles/${name}`}
            className="button profiles__card--link mt-auto mb-3"
          >
            Visit profile
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

ProfileItem.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  count: PropTypes.object,
  following: PropTypes.array,
  followers: PropTypes.array,
};
