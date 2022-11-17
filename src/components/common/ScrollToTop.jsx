import React from "react";

export default function ScrollToTop() {
  return (
    <button
      className="button mb-3"
      onClick={() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }}
    >
      Scroll to top
    </button>
  );
}