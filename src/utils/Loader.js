import { Spinner } from "react-bootstrap";
import React from "react";

export default function Loader() {
  return (
    <Spinner className="d-grid loader " role="status">
      <span className="loader__text p-3">Loading...</span>
    </Spinner>
  );
}
