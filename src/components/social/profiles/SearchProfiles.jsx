import React from "react";
import { Form, Button } from "react-bootstrap";

export default function SearchProfiles() {
  return (
    <div className="text-center">
      <Form className="profiles__search d-flex w-50 mx-auto m-3">
        <Form.Control
          /* onKeyUp={} */
          type="search"
          aria-label="Search"
          disabled={true}
        />
        <Button
          variant="outline-success"
          className="profiles__search--btn"
          disabled
        >
          Search
        </Button>
      </Form>
      <span className="profiles__search--message">
        Filter/search function is not available at the moment.
      </span>
    </div>
  );
}
