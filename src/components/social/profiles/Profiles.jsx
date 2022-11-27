import React from "react";
import ScrollToTop from "../../common/ScrollToTop";
import SearchProfiles from "./SearchProfiles";
import ViewProfiles from "./ProfileList";

export default function ProfilesPage() {
  document.title = "Medi@holic | Profiles";
  return (
    <>
      <SearchProfiles />
      <div className="profilePage__wrapper">
        <ViewProfiles />
      </div>
      <ScrollToTop />
    </>
  );
}
