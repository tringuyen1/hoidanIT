import { fecthDefaultImages } from "@/app/utils/api";
import { Box, TextField } from "@mui/material";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)

interface IProps {
     track: any;
     trackComment: any;
}

const CommentTrack = (props: IProps) => {
     const { trackComment, track } = props
     return (
          <>
               <div style={{ marginTop: "30px" }}>
                    <TextField fullWidth id="standard-basic" label="Comment" variant="standard" />
                    <div className="comment-wrapper" style={{ display: "flex", marginTop: "30px" }}>
                         <div className="left" style={{ paddingRight: "30px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                              <img src={fecthDefaultImages(track?.uploader?.type as string)} alt="" style={{ height: 150, width: 150 }} />
                              <div className="your-email" style={{ textAlign: "center" }}>
                                   <p>{track?.uploader?.email}</p>
                              </div>
                         </div>
                         <div className="right" style={{ width: "calc(100% - 200px)" }}>
                              {
                                   trackComment?.map((item: any) => (
                                        <Box style={{ display: "flex" }}>
                                             <div className="comment-info" style={{ display: "flex" }}>
                                                  <img src={fecthDefaultImages(item?.user?.type as string)} alt="" style={{ height: 40, width: 40, marginTop: "6px" }} />
                                                  <div style={{ paddingLeft: 20 }}>
                                                       <p style={{ marginTop: 0, marginBottom: "3px", fontSize: "14px" }}>{item.user.email}</p>
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