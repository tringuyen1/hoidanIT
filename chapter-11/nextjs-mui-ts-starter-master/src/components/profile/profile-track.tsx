
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Box, Grid, useTheme } from '@mui/material';
import { useTrackContext } from '@/lib/track.wrapper';

interface profileTracks {
     data: any
}

const ProfileTrack = (props: profileTracks) => {
     const { data } = props;
     const theme = useTheme();
     const { currentTrack, setcurrentTrack } = useTrackContext() as ITrackContext


     const handlePlayPause = () => {
          setcurrentTrack({
               ...data,
               isPlaying: false
          })
     }

     console.log(currentTrack)

     return (
          <>
               {data && data.map((item: any) => (
                    <Grid item xs={6} md={6}
                         sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: "10px"
                         }}
                         key={item._id}
                    >
                         <Card sx={{ display: 'flex', width: "100%", justifyContent: "space-between", }}>
                              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                   <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography component="div" variant="h5">
                                             {item.title}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                             {item.description}
                                        </Typography>
                                   </CardContent>
                                   <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                        <IconButton aria-label="previous">
                                             {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                                        </IconButton>
                                        <IconButton aria-label="play/pause" onClick={() => handlePlayPause()}>
                                             <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                                        </IconButton>
                                        <IconButton aria-label="next">
                                             {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                                        </IconButton>
                                   </Box>
                              </Box>
                              <CardMedia
                                   component="img"
                                   sx={{ width: 151 }}
                                   image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${item.imgUrl}`}
                                   alt="Live from space album cover"
                              />
                         </Card>
                    </Grid>
               ))}


          </>
     )
}

export default ProfileTrack;