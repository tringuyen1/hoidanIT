"use client"

import { Box, Container, Grid } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Link from "next/link";
import { convertSlugUrl } from "@/app/utils/api";

interface IProps {
     liked: any
}

const LikeTag = (props: IProps) => {
     const { liked } = props
     return (
          <>
               <div style={{ marginTop: "30px" }}>
                    <Container>
                         <h3>Hear the track you've liked </h3>
                         <Box sx={{ flexGrow: 1, marginTop: "15px" }}>
                              <Grid container spacing={3}>
                                   {
                                        liked.length > 0 && liked.map((item: any) => (
                                             <Grid item xs={12} md={3} key={item._id}>
                                                  <Card sx={{ display: "flex", height: "100%" }}>
                                                       <CardActionArea>
                                                            <CardMedia
                                                                 component="img"
                                                                 height="140"
                                                                 image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${item.imgUrl}`}
                                                                 alt="green iguana"
                                                            />
                                                            <CardContent sx={{ flex: 1 }}>
                                                                 <Link href={`/track/${convertSlugUrl(item.title)}-${item._id}.html?audio=${item.trackUrl}`} style={{ textDecoration: "none", color: "unset", cursor: "pointer" }}>
                                                                      <Typography gutterBottom variant="h5" component="div">
                                                                           {item.title}
                                                                      </Typography>
                                                                 </Link>

                                                                 <Typography variant="body2" color="text.secondary">
                                                                      {item.description}
                                                                 </Typography>
                                                            </CardContent>
                                                       </CardActionArea>
                                                  </Card>
                                             </Grid>
                                        ))
                                   }

                              </Grid>
                         </Box>
                    </Container>
               </div>
          </>
     )
}

export default LikeTag;