import React from "react";

import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import FormContainer from "../components/FormContainer";
import DataObjectResolver from "../components/DataObjectResolver";
import { useCreateMutation, useGetQuery, useUpdateMutation, useDeleteMutation } from "../slices/adApiSlice";

const ManageScreen = () => {
  const [formValues, setFormValues] = React.useState({});
  const [formType, setFormType] = React.useState("create");

  const { data: ad, error, status } = useGetQuery();

  const [remove] = useDeleteMutation();
  const [create] = useCreateMutation();
  const [update] = useUpdateMutation();

  const formOptions = {
    create: {
      handle: create,
      successMessage: "Ad created successfully",
    },
    update: {
      handle: update,
      successMessage: "Ad updated successfully",
    },
    delete: {
      handle: remove,
      successMessage: "Ad deleted successfully",
    },
  };

  const handleValue = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  React.useEffect(() => {
    if (ad === null) {
      setFormType("create");
      setFormValues({});
    }
    if (ad) {
      setFormType("update");
      setFormValues({
        _id: ad._id,
        name: ad.name,
        description: ad.description,
      });
    }
  }, [ad]);

  const handleDelete = async () => {
    try {
      await formOptions.delete.handle({ ad_id: ad._id }).unwrap();
      toast.success(formOptions.delete.successMessage);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formOption = formOptions[formType];

    try {
      await formOption.handle(formValues).unwrap();
      toast.success(formOption.successMessage);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <DataObjectResolver status={status}>
      <FormContainer>
        <h1>{formType === "update" ? "Update ad" : "Create ad"}</h1>
        {formType === "update" && (
          <div
            className="absolute right-[-1.5rem] top-[-1.5rem] bg-white rounded-full w-[3rem] aspect-square border-1 border-black p-[8px] cursor-pointer"
            onClick={handleDelete}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="full" height="full" fill="currentColor" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
            </svg>
          </div>
        )}
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              required
              placeholder="Enter name"
              value={formValues.name}
              onChange={(e) => handleValue("name", e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              required
              className="h-[24rem]"
              placeholder="Enter description"
              value={formValues.description}
              onChange={(e) => handleValue("description", e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-3">
            {formType === "update" ? "Update" : "Create"}
          </Button>
        </Form>
      </FormContainer>
    </DataObjectResolver>
  );
};

export default ManageScreen;
