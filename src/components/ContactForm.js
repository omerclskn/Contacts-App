import "./ContactForm.scss";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../redux/ContactsSlice";
import { nanoid } from "@reduxjs/toolkit";
import { Button, Input, Upload, message } from "antd";
import {
  PlusOutlined,
  LoadingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { getBase64, handlePhoneNumberChange } from "../helper";

const INITIAL_STATE = {
  name: "",
  phone: "",
  avatar: "",
};

const ContactForm = () => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  const isDisabled = () =>
    !formState.name || !formState.phone || formState.phone.length !== 14;

  const handleChange = (key) => (e) =>
    setFormState({ ...formState, [key]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addContact({
        id: nanoid(),
        ...formState,
      })
    );
    setFormState(INITIAL_STATE);
  };

  const handleLoadAvatar = (info) => {
    setLoading(true);
    getBase64(info.file.originFileObj, (imageUrl) => {
      setFormState({ ...formState, avatar: imageUrl });
    });
    setLoading(false);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  return (
    <div className="form-wrapper">
      <h1>Add Contact</h1>
      <form onSubmit={handleSubmit}>
        <Input
          allowClear
          autoFocus
          type="text"
          placeholder="Name"
          value={formState.name}
          onChange={handleChange("name")}
        />
        <Input
          maxLength={14}
          addonBefore="+90"
          placeholder={"(_ _ _) _ _ _  _ _ _ _"}
          allowClear
          type="text"
          value={handlePhoneNumberChange(formState.phone)}
          onChange={handleChange("phone")}
        />
        <Button
          type="danger"
          disabled={!formState.avatar}
          onClick={() => setFormState({ ...formState, avatar: "" })}
          className="delete-image-icon"
        >
          <DeleteOutlined style={{ color: "#" }} />
          <span>Delete Image</span>
        </Button>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleLoadAvatar}
        >
          {formState.avatar ? (
            <img
              src={formState.avatar}
              alt="avatar"
              style={{ width: "100%", height: "inherit" }}
            />
          ) : (
            <div>
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
        <Button disabled={isDisabled()} type="primary" htmlType="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
