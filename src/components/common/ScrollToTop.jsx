import React from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

export default function ScrollToTop() {
  return (
    <div className="text-center scrollToTop">
      <BsFillArrowUpCircleFill
        className="icon m-3"
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
}
