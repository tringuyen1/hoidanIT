import { useEffect, useState } from "react";
import { Table, Button, Modal, Input, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusCircleOutlined } from "@ant-design/icons";
// import "../../styles/users.scss";

interface IUsers {
  _id: string;
  email: string;
  name: string;
  role: string;
}

const UsersTable = () => {
  const [listUsers, setListUsers] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

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
      setIsModalOpen(false);
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: JSON.stringify(isNewUser.message),
      });
    }
  };

  const handleOk = () => {
    const data = {
      name,
      email,
      password,
      age,
      gender,
      role,
      address,
    };
    addNewUser(data);
    setIsModalOpen(false);
    handleCloseCreateModal();
  };

  const handleCloseCreateModal = () => {
    setIsModalOpen(false);
    setName("");
    setEmail("");
    setPassword("");
    setAge("");
    setGender("");
    setAddress("");
    setRole("");
  };

  return (
    <>
      <div className="container mt-3">
        <div className="pb-3 d-flex justify-content-between">
          <h2 className="text-center">Table Users</h2>
          <Button
            type="primary"
            onClick={() => {
              setIsModalOpen(true);
            }}
            icon={<PlusCircleOutlined />}
          >
            Open Modal
          </Button>
        </div>

        <Table columns={columns} dataSource={listUsers} rowKey={"_id"} />

        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={() => handleCloseCreateModal()}
          maskClosable={false}
        >
          <div>
            <label>Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label>Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password</label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label>Age</label>
            <Input value={age} onChange={(e) => setAge(e.target.value)} />
          </div>
          <div>
            <label>Gender</label>
            <Input value={gender} onChange={(e) => setGender(e.target.value)} />
          </div>
          <div>
            <label>Address</label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label>Role</label>
            <Input value={role} onChange={(e) => setRole(e.target.value)} />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default UsersTable;
