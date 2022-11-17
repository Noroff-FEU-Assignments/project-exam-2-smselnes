import React from "react";
import ScrollToTop from "../../common/ScrollToTop";
import SearchProfiles from "./SearchProfiles";
import ViewProfiles from "./ViewProfiles";

export default function ProfilesPage() {
  return (
    <>
      <SearchProfiles />

      <div className="profilePage__wrapper">
        <ViewProfiles />
        <ScrollToTop />
      </div>
    </>
  );
}
