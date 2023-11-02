"use client"

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Box, useTheme } from '@mui/material';
import { useTrackContext } from '@/lib/track.wrapper';
import { useHasMounted } from '@/app/utils/customHook';
import PauseIcon from '@mui/icons-material/Pause';
import Link from "next/link";
import { convertSlugUrl } from '@/app/utils/api';

interface profileTracks {
     data: any
}

const ProfileTrack = (props: profileTracks) => {
     const { data } = props;
     const theme = useTheme();
     const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;
     const hasMounted = useHasMounted();

     if (!hasMounted) return (<></>);


     const handlePlayPause = (play: boolean) => {
          setCurrentTrack({ ...data, isPlaying: play });
     }

     return (
          <>
               <Card sx={{ display: 'flex', width: "100%", justifyContent: "space-between", }} key={data._id}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                         <CardContent sx={{ flex: '1 0 auto' }}>
                              <Link href={`/track/${convertSlugUrl(data.title)}-${data._id}.html?audio=${data.trackUrl}`} style={{ textDecoration: "none", color: "unset", cursor: "pointer" }}>
                                   <Typography component="div" variant="h5">
                                        {data.title}
                                   </Typography>
                              </Link>

                              <Typography variant="subtitle1" color="text.secondary" component="div">
                                   {data.description}
                              </Typography>
                         </CardContent>
                         <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                              <IconButton aria-label="previous">
                                   {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                              </IconButton>
                              {(data._id === currentTrack._id && currentTrack.isPlaying === true) && (
                                   <IconButton aria-label="play/pause" onClick={() => handlePlayPause(false)}>
                                        <PauseIcon sx={{ height: 38, width: 38 }} />
                                   </IconButton>
                              )}
                              {(data._id !== currentTrack._id || data._id === currentTrack._id && currentTrack.isPlaying === false) && (
                                   <IconButton aria-label="play/pause" onClick={() => handlePlayPause(true)}>
                                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                                   </IconButton>
                              )}
                              <IconButton aria-label="next">
                                   {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                              </IconButton>
                         </Box>
                    </Box>
                    <CardMedia
                         component="img"
                         sx={{ width: 151 }}
                         image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${data.imgUrl}`}
                         alt="Live from space album cover"
                    />
               </Card>
          </>
     )
}

export default ProfileTrack;