import { Table, Button, notification, Popconfirm, message } from "antd";
import { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";

interface IComments {
     _id: string
     content: string;
     track: {
          title: string
     };
     user: {
          email: string
     };
}


const CommentTablePage = () => {
     const accessToken = localStorage.getItem("access_token") as string;
     const [listComents, setListComment] = useState([]);
     const [meta, setMeta] = useState({
          current: 1,
          pageSize: 10,
          pages: 0,
          total: 0
     });

     const confirmDeleteComment = async (id: string) => {
          const config = {
               method: "DELETE",
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
               },
          }
          const res = await fetch(`http://localhost:8000/api/v1/comments/${id}`, config)

          const deleteComment = await res.json();
          if (deleteComment.data) {
               await getData();
               message.success("delete success");
          }
     }

     const getData = async () => {
          const config = {
               method: "GET",
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
               },
          }
          const res = await fetch(`http://localhost:8000/api/v1/comments?current=1&pageSize=10`, config);

          const comments = await res.json();
          if (!comments.data) {
               notification.error({
                    message: JSON.stringify(comments.message)
               })
          }

          setListComment(comments.data.result);
          setMeta({
               current: comments.data?.meta?.current,
               pageSize: comments.data.meta.pageSize,
               pages: comments.data.meta.pages,
               total: comments.data.meta.total,
          })
     }

     useEffect(() => {
          getData();
     }, [])

     const columns: ColumnsType<IComments> = [
          {
               title: "STT",
               dataIndex: "index",
               render: (text, record, index) => index + 1,
          },
          {
               title: "Content",
               dataIndex: "content",
          },
          {
               title: "Track",
               dataIndex: ["track", "title"],
          },
          {
               title: "User",
               dataIndex: ["user", "email"],
          },
          {
               title: "Action",
               render: (value, record) => {
                    return (
                         <div>
                              <Popconfirm
                                   title="Delete the user"
                                   description={`Are you sure to delete ${record.track.title}?`}
                                   onConfirm={() => confirmDeleteComment(record._id)}
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

     const handleOnChange = async (page: number, pageSize: number) => {
          const config = {
               method: "GET",
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
               },
          }
          const res = await fetch(`http://localhost:8000/api/v1/comments?current=${page}&pageSize=${pageSize}`, config);

          const comments = await res.json();
          if (!comments.data) {
               notification.error({
                    message: JSON.stringify(comments.message)
               });
          }

          setListComment(comments.data.result);
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
                         <h2 className="text-center">Table Comments</h2>
                    </div>

                    <Table
                         columns={columns}
                         dataSource={listComents}
                         rowKey={"_id"}
                         pagination={
                              {
                                   current: meta.current,
                                   pageSize: meta.pageSize,
                                   total: meta.total,
                                   showTotal: (total, range) =>
                                        `${range[0]}-${range[1]} of ${total} items`,
                                   onChange: (page: number, pageSize: number) =>
                                        handleOnChange(page, pageSize),
                                   showSizeChanger: true,
                              }
                         }
                    />
               </div>
          </>
     )
}

export default CommentTablePage;