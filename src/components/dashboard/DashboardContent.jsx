import React from "react";

function DashboardContent() {
  return (
    <>
      <ul className="dashboard__menu">
        <li className="dashboard__menu--link">
          <a href="/dashboard/posts">View posts</a>
        </li>
        <li className="dashboard__menu--link">
          {" "}
          <a href="/dashboard/profiles">View profiles</a>
        </li>
        <li className="dashboard__menu--link">
          <a href="/dashboard/createpost">Create post</a>
        </li>
      </ul>
    </>
  );
}

export default DashboardContent;
