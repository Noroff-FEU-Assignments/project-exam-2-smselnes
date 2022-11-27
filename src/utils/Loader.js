import { Spinner } from "react-bootstrap";
import React from "react";

export default function Loader() {
  return (
    <Spinner className="d-grid text-center" role="status">
      <span className="loadingText p-3 ">Loading...</span>
    </Spinner>
  );
}
