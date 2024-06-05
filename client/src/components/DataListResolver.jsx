import React from "react";
import { Spinner } from "react-bootstrap";

const DataListResolver = ({ status, list, children }) => {
  return (() => {
    switch (status) {
      case "pending":
        return <Spinner className="flex m-auto" animation="border" />;
      case "fulfilled":
        return list.length === 0 ? (
          <div className="m-auto text-3xl font-bold">There are no ads yet, stay tuned</div>
        ) : (
          children
        );
    }
  })();
};

export default DataListResolver;
