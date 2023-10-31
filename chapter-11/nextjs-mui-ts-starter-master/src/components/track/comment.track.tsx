"use client"

import { fecthDefaultImages, sendRequest } from "@/app/utils/api";
import { useToast } from "@/app/utils/toast";
import { Box, TextField } from "@mui/material";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
dayjs.extend(relativeTime)

interface IProps {
     track: any;
     trackComment: any;
     waveSurfer: any
}

const CommentTrack = (props: IProps) => {
     const { trackComment, track, waveSurfer } = props;
     const { data: session } = useSession();
     const toast = useToast();
     const [yourComment, setYourComment] = useState("");
     const router = useRouter();

     const handleSubmit = async () => {
          const res = await sendRequest<IBackendRes<ITrackComment>>({
               url: "http://localhost:8000/api/v1/comments",
               method: "POST",
               body: {
                    content: yourComment,
                    moment: Math.round(waveSurfer.getCurrentTime() ?? 0),
                    track: track._id
               },
               headers: {
                    Authorization: `Bearer ${session?.access_token}`
               }
          });

          if (res.data) {
               setYourComment("");
               toast.success("create a new comment success")
               router.refresh();
          } else {
               toast.error(res.message)
          }
     }

     const formatTime = (seconds: number) => {
          const minutes = Math.floor(seconds / 60)
          const secondsRemainder = Math.round(seconds) % 60
          const paddedSeconds = `0${secondsRemainder}`.slice(-2)
          return `${minutes}:${paddedSeconds}`
     }

     const handleJumpTrack = (moment: number) => {
          if (waveSurfer) {
               const duration = waveSurfer.getDuration();
               waveSurfer.seekTo(moment / duration);
               waveSurfer.play();
          }
     }

     return (
          <>
               <div style={{ marginTop: "30px" }}>
                    <TextField value={yourComment} fullWidth id="standard-basic" label="Comment" variant="standard"
                         onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                   handleSubmit()
                              }
                         }}
                         onChange={(e) => {
                              setYourComment(e.target.value)
                         }}
                    />
                    <div className="comment-wrapper" style={{ display: "flex", marginTop: "30px" }}>
                         <div className="left" style={{ paddingRight: "30px", display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "center" }}>
                              <img src={fecthDefaultImages(track?.uploader?.type as string)} alt="" style={{ height: 150, width: 150 }} />
                              <div className="your-email" style={{ textAlign: "center" }}>
                                   <p>{track?.uploader?.email}</p>
                              </div>
                         </div>
                         <div className="right" style={{ width: "calc(100% - 200px)" }}>
                              {
                                   trackComment?.map((item: any, index: any) => (
                                        <Box style={{ display: "flex", marginTop: index >= 1 ? "30px" : "0px" }} key={item._id}>
                                             <div className="comment-info" style={{ display: "flex" }}>
                                                  <img src={fecthDefaultImages(item?.user?.type as string)} alt="" style={{ height: 40, width: 40, marginTop: "6px" }} />
                                                  <div style={{ paddingLeft: 20 }}>
                                                       <p style={{ marginTop: 0, marginBottom: "3px", fontSize: "14px" }}>{item.user.email} at
                                                            <span
                                                                 style={{ cursor: "pointer" }}
                                                                 onClick={() => handleJumpTrack(item.moment)}
                                                            >
                                                                 &nbsp; {formatTime(item.moment)}
                                                            </span>
                                                       </p>
                                                       <p style={{ margin: 0 }}>{item.content}</p>
                                                  </div>
                                             </div>
                                             <div className="date-time" style={{ marginLeft: "auto" }}>
                                                  <p style={{ marginTop: 0, fontSize: "14px", color: "#999" }}>{dayjs(item.createdAt).fromNow()}</p>
                                             </div>
                                        </Box>
                                   ))
                              }
                         </div>
                    </div>
               </div >
          </>
     )
}

export default CommentTrack;