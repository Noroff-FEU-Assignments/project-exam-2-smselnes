import React from "react";
import { Form, Button } from "react-bootstrap";

export default function SearchProfiles() {
  return (
    <div className="profiles__search text-center">
      <Form className="profiles__searchForm d-flex w-50 mx-auto m-3">
        <Form.Control type="search" aria-label="Search" disabled={true} />
        <Button
          variant="outline-success"
          className="profiles__searchForm--btn"
          disabled
        >
          Search
        </Button>
      </Form>
      <span className="profiles__searchForm--message">
        Filter/search function is not available at the moment.
      </span>
    </div>
  );
}
