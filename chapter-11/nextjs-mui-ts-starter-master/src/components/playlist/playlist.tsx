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

interface IProps {
     playlist: any;
     tracks: any
}

const PlayListTag = (props: IProps) => {
     const { playlist, tracks } = props;
     const [modal, setModal] = useState("")
     const [open, setOpen] = useState(false);

     const handleClickOpenPlaylist = () => {
          setOpen(true);
     };

     const handleClickOpenTracks = () => {
          setOpen(true);
     };

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
                              <Accordion key={item._id} sx={{ mt: "30px" }}>
                                   <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                   >
                                        <Typography>{item.title}</Typography>
                                   </AccordionSummary>
                                   {
                                        item.tracks.length > 0 ? item.tracks.map((track: any) => (
                                             <AccordionDetails>
                                                  <Typography>
                                                       {track.title}
                                                  </Typography>
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