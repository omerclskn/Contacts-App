import "./ContactList.scss";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, Card, Popconfirm, message, Avatar, BackTop } from "antd";
import { contactsSelectors } from "../redux/ContactsSlice";
import { deleteContact, deleteAllContacts } from "../redux/ContactsSlice";
import {
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Link, useHistory, useParams } from "react-router-dom";
import { backTopStyle } from "../helper";

const ContactList = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const items = useSelector(contactsSelectors.selectAll);
  const itemCount = useSelector(contactsSelectors.selectTotal);

  const hasEdit = useParams();

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
    message.success("Contact deleted");
    if (hasEdit.id) history.push("/");
  };

  const handleDeleteAll = () => {
    dispatch(deleteAllContacts());
    message.success("All contacts deleted");
  };

  return (
    <div className="list-wrapper">
      <h1>Contacts List</h1>
      <span className="contact-count-label">{itemCount} contacts</span>
      <span className="remove-all">
        <Popconfirm
          disabled={!itemCount || hasEdit.id}
          title="Are you sure to delete all contacts?"
          onConfirm={() => handleDeleteAll()}
          okText="Yes"
          cancelText="No"
        >
          Remove All
        </Popconfirm>
      </span>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        dataSource={Object.values(items)}
        renderItem={({ id, name, phone, avatar }) => (
          <List.Item
            className={hasEdit.id && hasEdit.id !== id && "not-edit-contact"}
          >
            <Card
              hoverable
              extra={
                <Avatar
                  size={52}
                  src={
                    avatar || (
                      <UserOutlined
                        className="user-avatar"
                        style={{ fontSize: "52px", color: "#000" }}
                      />
                    )
                  }
                />
              }
              title={name}
            >
              <span className="phone-prefix">+90</span>
              <PhoneOutlined className="phone-icon" />
              {phone}
            </Card>
            <div className="edit-icon">
              <Link to={`/edit/${id}`}>
                <EditOutlined />
              </Link>
            </div>
            <Popconfirm
              className="delete-icon"
              title="Are you sure to delete this contact?"
              onConfirm={() => handleDelete(id)}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined />
            </Popconfirm>
          </List.Item>
        )}
      />
      <BackTop>
        <div style={backTopStyle}>UP</div>
      </BackTop>
    </div>
  );
};

export default ContactList;
