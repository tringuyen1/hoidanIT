import { useEffect, useState } from "react";
import { Table, Button, notification, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";

interface ITracks {
     _id: string;
     title: string;
     description: string;
     category: string;
     trackUrl: string;
     uploader: {
          name: string;
     };
}

const TracksTable = () => {
     const accessToken = localStorage.getItem("access_token") as string;
     const [listTracks, setListTracks] = useState([]);
     const [meta, setMeta] = useState({
          current: 1,
          pageSize: 10,
          pages: 0,
          total: 0,
     });

     const getData = async () => {
          const res = await fetch(
               `http://localhost:8000/api/v1/tracks?current=${meta.current}&pageSize=${meta.pageSize}`,
               {
                    method: "GET",
                    headers: {
                         "Content-Type": "application/json",
                         Authorization: `Bearer ${accessToken}`,
                    },
               }
          );

          const tracks = await res.json();
          if (!tracks.data) {
               notification.error({
                    message: JSON.stringify(tracks.message),
               });
          }
          setListTracks(tracks.data.result);
          setMeta({
               current: tracks.data.meta.current,
               pageSize: tracks.data.meta.pageSize,
               pages: tracks.data.meta.pages,
               total: tracks.data.meta.total,
          });
     };

     useEffect(() => {
          getData();
     }, []);

     const confirmDeleteTrack = async (id: string) => {
          const res = await fetch(`http://localhost:8000/api/v1/tracks/${id}`, {
               method: "DELETE",
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
               },
          });

          const deleteTrack = await res.json();
          if (deleteTrack.data) {
               await getData();
               message.success("delete success");
          }
     };

     const columns: ColumnsType<ITracks> = [
          {
               title: "STT",
               dataIndex: "index",
               render: (text, record, index) => index + 1,
          },
          {
               title: "Title",
               dataIndex: "title",
          },
          {
               title: "Description",
               dataIndex: "description",
          },
          {
               title: "Category",
               dataIndex: "category",
          },
          {
               title: "Track url",
               dataIndex: "trackUrl",
          },
          {
               title: "Uploader",
               dataIndex: ["uploader", "name"],
          },
          {
               title: "Action",
               render: (value, record) => {
                    return (
                         <div>
                              <Popconfirm
                                   title="Delete the user"
                                   description={`Are you sure to delete ${record.title}?`}
                                   onConfirm={() => confirmDeleteTrack(record._id)}
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
          const res = await fetch(
               `http://localhost:8000/api/v1/tracks?current=${page}&pageSize=${pageSize}`,
               {
                    method: "GET",
                    headers: {
                         "Content-Type": "application/json",
                         Authorization: `Bearer ${accessToken}`,
                    },
               }
          );

          const tracks = await res.json();
          if (!tracks.data) {
               notification.error({
                    message: JSON.stringify(tracks.message),
               });
          }
          setListTracks(tracks.data.result);
          setMeta({
               current: page,
               pageSize: pageSize,
               pages: meta.pages,
               total: meta.total,
          });
     };

     return (
          <>
               <div className="container mt-3">
                    <div className="pb-3 d-flex justify-content-between">
                         <h2 className="text-center">Table Tracks</h2>
                    </div>

                    <Table
                         columns={columns}
                         dataSource={listTracks}
                         rowKey={"_id"}
                         pagination={{
                              current: meta.current,
                              pageSize: meta.pageSize,
                              total: meta.total,
                              showTotal: (total, range) =>
                                   `${range[0]}-${range[1]} of ${total} items`,
                              onChange: (page: number, pageSize: number) =>
                                   handleOnChange(page, pageSize),
                              showSizeChanger: true,
                         }}
                    />
               </div>
          </>
     );
};

export default TracksTable;
