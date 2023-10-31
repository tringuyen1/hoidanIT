"use client"

import { fecthDefaultImages, sendRequest } from "@/app/utils/api";
import { useToast } from "@/app/utils/toast";
import { Box, TextField } from "@mui/material";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Chip from '@mui/material/Chip';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
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
     const [likes, setLikes] = useState<ITrackLikes[] | null>(null)
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

     const fetchData = async () => {
          if (session?.access_token) {
               const likes = await sendRequest<IBackendRes<IModelPaginate<ITrackLikes>>>({
                    url: "http://localhost:8000/api/v1/likes?current=1&pageSize=10",
                    method: "GET",
                    headers: {
                         Authorization: `Bearer ${session?.access_token}`
                    },
               })
               if (likes.data?.result) {
                    setLikes(likes.data?.result);
               }
          }
     }

     useEffect(() => {
          fetchData();
     }, [session])

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

     const handleLike = async () => {
          const res = await sendRequest<IBackendRes<ITrackComment>>({
               url: "http://localhost:8000/api/v1/likes",
               method: "POST",
               body: {
                    track: track._id,
                    quantity: likes?.some((likes: any) => likes._id === track._id) ? -1 : 1
               },
               headers: {
                    Authorization: `Bearer ${session?.access_token}`,
               }
          });

          await fetchData();
          router.refresh();
     }

     return (
          <>
               <div className="like-wrapper" style={{ marginTop: "30px", display: "flex" }}>
                    <div className="like" style={{ display: "flex" }}>
                         <div style={{ paddingRight: "10px" }}>
                              <Chip
                                   icon={likes?.some((likes: any) => likes._id === track._id) ? <ThumbUpIcon style={{ color: "blue" }} /> : <ThumbUpOutlinedIcon />}
                                   label="Like"
                                   variant="outlined"
                                   onClick={() => handleLike()}
                                   style={{ padding: "10px" }}
                              />
                         </div>
                    </div>
                    <div className="" style={{ marginLeft: "auto" }}>
                         <Chip
                              avatar={<ThumbUpIcon />}
                              label={track.countLike}
                              variant="outlined"
                              style={{ border: "none" }}
                         />
                         <Chip
                              avatar={<PlayArrowIcon />}
                              label={track.countPlay}
                              variant="outlined"
                              style={{ border: "none" }}
                         />
                    </div>
               </div>
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