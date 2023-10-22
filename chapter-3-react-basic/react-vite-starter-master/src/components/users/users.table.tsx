import { useEffect, useState } from "react";
import { Table, Button, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusCircleOutlined } from "@ant-design/icons";
import CreateUserModal from "./create.user.modal";
import UpdateUserModal from "./update.user.modal";
// import "../../styles/users.scss";

export interface IUsers {
  _id: string;
  name: string;
  email: string;
  password: string;
  age: string;
  gender: string;
  role: string;
  address: string;
}

const UsersTable = () => {
  const [listUsers, setListUsers] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState<null | IUsers>(null);

  const getData = async () => {
    const res = await fetch("http://localhost:8000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "admin@gmail.com",
        password: "123456",
      }),
    });
    const data = await res.json();
    const res1 = await fetch("http://localhost:8000/api/v1/users/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.data.access_token}`,
      },
    });
    const users = await res1.json();
    setListUsers(users.data.result);
    setAccessToken(data.data.access_token);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleUpdateUser = (user: any) => {
    setDataUpdate(user);
    setIsUpdateModalOpen(true);
  };

  const columns: ColumnsType<IUsers> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (value, record) => {
        return <a href="/">{record.name}</a>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Action",
      render: (value, record) => {
        return (
          <div>
            <button onClick={() => handleUpdateUser(record)}>Edit</button>
          </div>
        );
      },
    },
  ];

  const addNewUser = async (data: any) => {
    const newUser = await fetch("http://localhost:8000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ ...data }),
    });

    const isNewUser = await newUser.json();

    if (isNewUser.data) {
      getData();
      notification.success({
        message: JSON.stringify(isNewUser.message),
      });
      setIsCreateModalOpen(false);
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: JSON.stringify(isNewUser.message),
      });
    }
  };

  return (
    <>
      <div className="container mt-3">
        <div className="pb-3 d-flex justify-content-between">
          <h2 className="text-center">Table Users</h2>
          <Button
            type="primary"
            onClick={() => {
              setIsCreateModalOpen(true);
            }}
            icon={<PlusCircleOutlined />}
          >
            Open Modal
          </Button>
        </div>

        <Table columns={columns} dataSource={listUsers} rowKey={"_id"} />

        <CreateUserModal
          addNewUser={addNewUser}
          isCreateModalOpen={isCreateModalOpen}
          setIsCreateModalOpen={setIsCreateModalOpen}
        />

        <UpdateUserModal
          addNewUser={addNewUser}
          isUpdateModalOpen={isUpdateModalOpen}
          setIsUpdateModalOpen={setIsUpdateModalOpen}
          dataUpdate={dataUpdate}
          setDataUpdate={setDataUpdate}
        />
      </div>
    </>
  );
};

export default UsersTable;
