import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import DataObjectResolver from "../components/DataObjectResolver";
import { useCreateMutation, useGetQuery, useUpdateMutation } from "../slices/adApiSlice";

const ManageScreen = () => {
  const [formValues, setFormValues] = React.useState({});
  const [formType, setFormType] = React.useState("create");

  const { userInfo } = useSelector((state) => state.auth);

  const { data: ad, status } = useGetQuery();

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
  };

  const handleValue = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  React.useEffect(() => {
    if (ad) {
      setFormType("update");
      setFormValues({
        _id: ad._id,
        name: ad.name,
        description: ad.description,
      });
    }
  }, [ad]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formOption = formOptions[formType];

    try {
      const res = await formOption.handle(formValues).unwrap();
      toast.success(formOption.successMessage);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <DataObjectResolver status={status}>
      <FormContainer>
        <h1>{formType === "update" ? "Update ad" : "Create ad"}</h1>

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
