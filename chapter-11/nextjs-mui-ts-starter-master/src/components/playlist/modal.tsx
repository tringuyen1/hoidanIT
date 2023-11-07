"use client"

import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import DialogTitle from '@mui/material/DialogTitle';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import { Theme, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { sendRequest } from '@/app/utils/api';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


interface IProps {
     modal: any;
     open: any;
     setOpen: any;
     setModal: any;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
     props,
     ref,
) {
     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
     PaperProps: {
          style: {
               maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
               width: 250,
          },
     },
};

const names = [
     'Oliver Hansen',
     'Van Henry',
     'April Tucker',
     'Ralph Hubbard',
     'Omar Alexander',
     'Carlos Abbott',
     'Miriam Wagner',
     'Bradley Wilkerson',
     'Virginia Andrews',
     'Kelly Snyder',
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
     return {
          fontWeight:
               personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
     };
}

const Modal = (props: IProps) => {
     const { modal, open, setOpen, setModal } = props;
     const { data: session } = useSession();
     const theme = useTheme();
     const [age, setAge] = useState('');
     const [openAlert, setOpenAlert] = React.useState(false);
     const [newPlaylist, setNewPlaylist] = useState("");
     const [personName, setPersonName] = useState<string[]>([]);

     const handleAddNewPlayList = async () => {
          const res = await sendRequest<IBackendRes<any>>({
               url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/playlists/empty`,
               method: "POST",
               body: {
                    title: newPlaylist,
                    isPublic: true
               },
               headers: {
                    Authorization: `Bearer ${session?.access_token}`,
               }
          })
          if (res.statusCode === 201) {
               setOpenAlert(true)
          }
     }

     const handleChangeTracks = (event: SelectChangeEvent<typeof personName>) => {
          const {
               target: { value },
          } = event;
          setPersonName(
               // On autofill we get a stringified value.
               typeof value === 'string' ? value.split(',') : value,
          );
     };

     const handleChangePlaylist = (event: SelectChangeEvent) => {
          setAge(event.target.value);
     };

     const handleClose = () => {
          setOpen(false);
          setModal("");
     };

     const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
          if (reason === 'clickaway') {
               return;
          }

          setOpenAlert(false);
     };

     return (
          <>
               <Dialog open={open} onClose={handleClose}>
                    {modal === "playlist" && (
                         <>
                              <DialogTitle>Thêm mới Playlist</DialogTitle>
                              <DialogContent>
                                   <FormControl>
                                        <TextField
                                             autoFocus
                                             margin="dense"
                                             id="playlist"
                                             label="a new playlist"
                                             type="playlist"
                                             sx={{ width: "500px" }}
                                             variant="standard"
                                             onChange={(e) => {
                                                  setNewPlaylist(e.target.value)
                                             }}
                                        />
                                   </FormControl>
                                   <DialogActions sx={{ mt: "30px" }}>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button onClick={handleAddNewPlayList}>Save</Button>
                                   </DialogActions>
                              </DialogContent>
                         </>
                    )}

                    {modal === "tracks" && (
                         <>
                              <DialogTitle>Thêm Track to Playlist</DialogTitle>
                              <DialogContent>
                                   <FormControl variant="standard" sx={{ minWidth: 120 }}>
                                        <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
                                        <Select
                                             labelId="demo-simple-select-standard-label"
                                             id="demo-simple-select-standard"
                                             value={age}
                                             onChange={handleChangePlaylist}
                                             sx={{ width: "550px" }}
                                             label="Age"
                                        >
                                             <MenuItem value="">
                                                  <em>None</em>
                                             </MenuItem>
                                             <MenuItem value={10}>Ten</MenuItem>
                                             <MenuItem value={20}>Twenty</MenuItem>
                                             <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                   </FormControl>
                                   <FormControl variant="standard" sx={{ mt: "30px", width: 300 }}>
                                        <InputLabel id="demo-multiple-chip-label" sx={{ marginLeft: "20px" }}>Chip</InputLabel>
                                        <Select
                                             labelId="demo-multiple-chip-label"
                                             id="demo-multiple-chip"
                                             multiple
                                             sx={{ width: "550px" }}
                                             value={personName}
                                             onChange={handleChangeTracks}
                                             input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                             renderValue={(selected) => (
                                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                       {selected.map((value) => (
                                                            <Chip key={value} label={value} />
                                                       ))}
                                                  </Box>
                                             )}
                                             MenuProps={MenuProps}
                                        >
                                             {names.map((name) => (
                                                  <MenuItem
                                                       key={name}
                                                       value={name}
                                                       style={getStyles(name, personName, theme)}
                                                  >
                                                       {name}
                                                  </MenuItem>
                                             ))}
                                        </Select>
                                   </FormControl>
                                   <DialogActions sx={{ mt: "30px" }}>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button onClick={handleClose}>Save</Button>
                                   </DialogActions>
                              </DialogContent>
                         </>
                    )}

               </Dialog>
               <Snackbar open={openAlert} autoHideDuration={1000} onClose={handleClose}>
                    <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                         This is a success message!
                    </Alert>
               </Snackbar>
          </>
     )
}

export default Modal;