import "./ContactForm.scss";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input, message, Upload } from "antd";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { contactsSelectors } from "../redux/ContactsSlice";
import ContactList from "./ContactList";
import { updateContact } from "../redux/ContactsSlice";
import {
  DeleteOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { getBase64, handlePhoneNumberChange } from "../helper";

const EditContact = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const { id } = useParams();
  const contact = useSelector((state) =>
    contactsSelectors.selectById(state, id)
  );

  const [formState, setFormState] = useState(contact);
  const [loading, setLoading] = useState(false);

  if (!contact) {
    message.error("Contact not found");
    return <Redirect to="/" />;
  }

  const handleChange = (key) => (e) =>
    setFormState({ ...formState, [key]: e.target.value });

  const isDisabled = () =>
    Object.keys(formState).every(
      (value) => formState[value] === contact[value]
    ) ||
    !formState.name ||
    !formState.phone ||
    formState.phone.length !== 14;

  console.log(formState.phone.length);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateContact({
        id: contact.id,
        changes: { ...formState },
      })
    );
    message.success("Contact updated");
    history.push("/");
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
    <div>
      <div className="form-wrapper">
        <h1>Edit Contact</h1>
        <form onSubmit={handleSubmit}>
          <Input
            allowClear
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
          <div className="edit-button-wrapper">
            <Button type="primary">
              <Link to="/">Back</Link>
            </Button>
            <Button disabled={isDisabled()} type="danger" htmlType="submit">
              Update
            </Button>
          </div>
        </form>
      </div>
      <ContactList />
    </div>
  );
};

export default EditContact;
