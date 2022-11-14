import React from "react";
import { Form, Button } from "react-bootstrap";

export default function SearchProfiles() {
  return (
    <Form className="d-flex">
      <Form.Control
        /* onKeyUp={} */
        type="search"
        placeholder="Search"
        className="me-2 searchProfiles"
        aria-label="Search"
      />
      <Button variant="outline-success">Search</Button>
    </Form>
  );
}
