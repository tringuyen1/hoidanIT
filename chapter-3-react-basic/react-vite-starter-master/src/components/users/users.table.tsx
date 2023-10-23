import { useEffect, useState } from "react";
import { Table, Button, notification, Popconfirm, message } from "antd";
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
     const accessToken = localStorage.getItem("access_token") as string;
     const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
     const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
     const [dataUpdate, setDataUpdate] = useState<null | IUsers>(null);
     const [meta, setMeta] = useState({
          current: 1,
          pageSize: 5,
          pages: 0,
          total: 0
     })

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
          const res1 = await fetch(`http://localhost:8000/api/v1/users?current=${meta.current}&pageSize=${meta.pageSize}`, {
               method: "GET",
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
               },
          });

          const users = await res1.json();

          if (!users.data) {
               notification.error({
                    message: JSON.stringify(users.message),
               });
          }
          setListUsers(users.data.result);
          setMeta({
               current: users.data.meta.current,
               pageSize: users.data.meta.pageSize,
               pages: users.data.meta.pages,
               total: users.data.meta.total
          })
     };

     useEffect(() => {
          getData();
     }, []);

     const handleUpdateUser = (user: any) => {
          setDataUpdate(user);
          setIsUpdateModalOpen(true);
     };

     const confirmDeleteUser = async (id: any) => {
          const deleteUserId = await fetch(
               `http://localhost:8000/api/v1/users/${id}`,
               {
                    method: "DELETE",
                    headers: {
                         "Content-Type": "application/json",
                         Authorization: `Bearer ${accessToken}`,
                    },
               }
          );

          const deleteUser = await deleteUserId.json();
          if (deleteUser.data) {
               await getData();
               message.success("Click on Yes");
          }
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
                              <button onClick={() => handleUpdateUser(record)} className="mr-3">
                                   Edit
                              </button>
                              <Popconfirm
                                   title="Delete the user"
                                   description={`Are you sure to delete ${record.name}?`}
                                   onConfirm={() => confirmDeleteUser(record._id)}
                                   okText="Yes"
                                   cancelText="No"
                              >
                                   <Button danger>Delete</Button>
                              </Popconfirm>
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

     const updateUser = async (data: any) => {
          const updateUser = await fetch("http://localhost:8000/api/v1/users", {
               method: "PATCH",
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
               },
               body: JSON.stringify({ ...data }),
          });

          const newUpdate = await updateUser.json();
          if (newUpdate.data) {
               getData();
               notification.success({
                    message: JSON.stringify(newUpdate.message),
               });
          }
     };

     const handleOnChange = async (page: number, pageSize: number) => {
          const res1 = await fetch(`http://localhost:8000/api/v1/users?current=${page}&pageSize=${pageSize}`, {
               method: "GET",
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
               },
          });

          const users = await res1.json();

          if (!users.data) {
               notification.error({
                    message: JSON.stringify(users.message),
               });
          }
          setListUsers(users.data.result);
          setMeta({
               current: page,
               pageSize: pageSize,
               pages: meta.pages,
               total: meta.total
          })
     }

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

                    <Table columns={columns} dataSource={listUsers} rowKey={"_id"} pagination={{
                         current: meta.current,
                         pageSize: meta.pageSize,
                         total: meta.total,
                         showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                         onChange: (page: number, pageSize: number) => handleOnChange(page, pageSize),
                         showSizeChanger: true
                    }} />
                    {/* <Pagination defaultCurrent={1} total={50} />; */}

                    <CreateUserModal
                         addNewUser={addNewUser}
                         isCreateModalOpen={isCreateModalOpen}
                         setIsCreateModalOpen={setIsCreateModalOpen}
                    />

                    <UpdateUserModal
                         isUpdateModalOpen={isUpdateModalOpen}
                         setIsUpdateModalOpen={setIsUpdateModalOpen}
                         dataUpdate={dataUpdate}
                         setDataUpdate={setDataUpdate}
                         updateUser={updateUser}
                    />
               </div>
          </>
     );
};

export default UsersTable;
