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
     playlist: any
}

const PlayListTag = (props: IProps) => {
     const { playlist } = props;
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
                    <Accordion>
                         <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                         >
                              <Typography>Accordion 1</Typography>
                         </AccordionSummary>
                         <AccordionDetails>
                              <Typography>
                                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                   malesuada lacus ex, sit amet blandit leo lobortis eget.
                              </Typography>
                         </AccordionDetails>
                    </Accordion>
                    <Accordion>
                         <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel2a-content"
                              id="panel2a-header"
                         >
                              <Typography>Accordion 2</Typography>
                         </AccordionSummary>
                         <AccordionDetails>
                              <Typography>
                                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                   malesuada lacus ex, sit amet blandit leo lobortis eget.
                              </Typography>
                         </AccordionDetails>
                    </Accordion>
               </Container>

               <Modal
                    modal={modal}
                    open={open}
                    setOpen={setOpen}
                    setModal={setModal}
               />
          </div>

     );
}

export default PlayListTag