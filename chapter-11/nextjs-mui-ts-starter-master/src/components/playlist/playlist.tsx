"use client"

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import Modal from './modal';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import IconButton from '@mui/material/IconButton';
import { useTrackContext } from '@/lib/track.wrapper';

interface IProps {
     playlist: any;
     tracks: any
}

const PlayListTag = (props: IProps) => {
     const { playlist, tracks } = props;
     const [modal, setModal] = useState("")
     const [open, setOpen] = useState(false);
     const [expanded, setExpanded] = useState<string | false>(false);
     const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;

     const handleClickOpenPlaylist = () => {
          setOpen(true);
     };

     const handleClickOpenTracks = () => {
          setOpen(true);
     };

     const handleChangeAccordion = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
          setExpanded(isExpanded ? panel : false);
     };

     const handlePlayPause = (play: boolean, data: any) => {
          setCurrentTrack({ ...data, isPlaying: play });
     }

     return (
          <div className='playlist-wrapper' style={{ marginTop: "30px" }}>
               <Container>
                    <div className='head-playlist'
                         style={{
                              display: "flex",
                              justifyContent: "space-between"
                         }}
                    >
                         <h3>Danh Sách phát</h3>
                         <div className='action-playlist' style={{ marginLeft: "auto", marginTop: "15px" }}>
                              <Button variant="outlined" startIcon={<AddIcon />} sx={{ mr: "10px" }}
                                   onClick={() => {
                                        handleClickOpenPlaylist()
                                        setModal("playlist")
                                   }}
                              >
                                   PlayList
                              </Button>
                              <Button variant="outlined" startIcon={<AddIcon />}
                                   onClick={() => {
                                        handleClickOpenTracks()
                                        setModal("tracks")
                                   }}
                              >
                                   Track
                              </Button>
                         </div>
                    </div>
               </Container>
               <Container>
                    {
                         playlist.map((item: any) => (
                              <Accordion expanded={expanded === item._id} onChange={handleChangeAccordion(item._id)} key={item._id} sx={{ mt: "30px" }}>
                                   <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                   >
                                        <Typography sx={{ textTransform: "capitalize" }}>{item.title}</Typography>
                                   </AccordionSummary>
                                   {
                                        item.tracks.length > 0 ? item.tracks.map((track: any) => (
                                             <AccordionDetails>
                                                  <div style={{ display: "flex" }}>
                                                       <Typography>
                                                            {track.title}
                                                       </Typography>
                                                       {(track._id === currentTrack._id && currentTrack.isPlaying === true) && (
                                                            <PauseIcon onClick={() => handlePlayPause(false, track)} sx={{ ml: "auto" }} />
                                                       )}
                                                       {(track._id !== currentTrack._id || track._id === currentTrack._id && currentTrack.isPlaying === false) && (
                                                            <PlayArrowIcon onClick={() => handlePlayPause(true, track)} sx={{ ml: "auto" }} />
                                                       )}
                                                  </div>

                                             </AccordionDetails>
                                        )) : (
                                             (
                                                  <AccordionDetails>
                                                       <Typography>
                                                            no data...
                                                       </Typography>
                                                  </AccordionDetails>
                                             )
                                        )
                                   }
                              </Accordion>
                         ))
                    }

               </Container>

               <Modal
                    modal={modal}
                    open={open}
                    setOpen={setOpen}
                    setModal={setModal}
                    playlist={playlist}
                    tracks={tracks}
               />
          </div>

     );
}

export default PlayListTag