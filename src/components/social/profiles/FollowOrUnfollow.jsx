import { useEffect, useState } from "react";
import FollowUser from "./FollowUser";
import UnFollowUser from "./UnFollowUser";

import React from "react";

export default function FollowOrUnfollow({ followed, user }) {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const checkFollow = followed.find((FollowUser) => FollowUser.name === user);
    if (checkFollow) {
      setIsFollowing(true);
    }
  }, []);

  if (isFollowing) {
    return <UnFollowUser name={user} setIsFollowing={setIsFollowing} />;
  } else {
    return <FollowUser name={user} setIsFollowing={setIsFollowing} />;
  }
}
