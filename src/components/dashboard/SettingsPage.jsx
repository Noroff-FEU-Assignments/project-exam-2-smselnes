import React from "react";
import UpdateUserProfile from "./UpdateUserProfile";

export default function SettingsPage() {
  return (
    <div>
      <h1>Settings page</h1>
      <p>
        On this page there will be a form used to update avatar and banner on
        own profile.
      </p>
      <UpdateUserProfile />
    </div>
  );
}
