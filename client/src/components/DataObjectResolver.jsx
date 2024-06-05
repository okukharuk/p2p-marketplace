import React from "react";
import { Spinner } from "react-bootstrap";

const DataObjectResolver = ({ status, children }) => {
  return (() => {
    switch (status) {
      case "pending":
        return (
          <div className="flex m-auto">
            <Spinner className="mx-auto" animation="border" />
          </div>
        );
      case "fulfilled":
        return children;
    }
  })();
};

export default DataObjectResolver;
