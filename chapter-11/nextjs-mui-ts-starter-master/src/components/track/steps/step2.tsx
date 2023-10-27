"use client"

import { useState, useEffect } from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useSession } from 'next-auth/react';
import Axios from "axios";
import { sendRequestFile } from '@/app/utils/api';

interface IProps {
    setTrackUpload: (v: { filename: string, percent: number, uploadTrackFileName: string }) => void,
    trackUpload: { filename: string, percent: number, uploadTrackFileName: string }
}

const LinearProgressWithLabel = (props: LinearProgressProps & { value: number }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const category = [
    {
        value: 'CHILL',
        label: 'CHILL',
    },
    {
        value: 'WORKOUT',
        label: 'WORKOUT',
    },
    {
        value: 'PARTY',
        label: 'PARTY',
    }
];

interface INewTrack {
    title: string,
    description: string,
    trackUrl: string,
    imgUrl: string,
    category: string
}


const Step2 = (props: IProps) => {
    const { data: session } = useSession();
    const [info, setInfo] = useState<INewTrack>({
        title: "",
        description: "",
        trackUrl: "",
        imgUrl: "",
        category: ""
    });
    const { trackUpload } = props;
    // const [progress, setProgress] = useState(10);

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
    //     }, 800);
    //     return () => {
    //         clearInterval(timer);
    //     };
    // }, []);

    useEffect(() => {
        if (trackUpload && trackUpload.uploadTrackFileName) {
            setInfo({
                ...info,
                trackUrl: trackUpload.uploadTrackFileName
            })
        }
    }, [trackUpload])

    const handleCreateNewTrack = async () => {
        console.log(">>>> check", info);
        const res = await sendRequestFile<IBackendRes<ITrackTop[]>>({
            url: "http://localhost:8000/api/v1/tracks",
            method: "POST",
            body: info,
        });

        if (!res.data) {
            alert(res.message);
        }
    }

    const uploadImages = async (filename: string) => {
        const formData = new FormData();
        formData.append("fileUpload", filename)
        const config = {
            headers: { Authorization: `Bearer ${session?.access_token}`, target_type: "images" },
        }
        try {
            const res = await Axios.post("http://localhost:8000/api/v1/files/upload", formData, config);
            setInfo({
                ...info,
                imgUrl: res.data.data.filename
            })
        } catch (error) {
            alert("upload failed")
        }
    }

    return (
        <>
            <div className='step-2'>
                <Box sx={{ width: '100%' }}>
                    <div>
                        Your uploading track: {trackUpload.filename}
                    </div>
                    <LinearProgressWithLabel value={trackUpload.percent} />
                </Box>

                <Box sx={{ flexGrow: 1, marginTop: "15px" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={4} sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "10px"
                        }}>
                            <div style={{ height: 250, width: 250, background: "#ccc" }}>
                                <div>
                                    {info.imgUrl && (
                                        <img
                                            style={{ height: 250, width: 250 }}
                                            src={`${process.env}/images/${info.imgUrl}`}
                                            alt=''>
                                        </img>
                                    )}
                                </div>
                            </div>

                            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}
                                onChange={(e) => {
                                    const getFile = e.target as HTMLInputElement
                                    if (getFile.files) {
                                        uploadImages(getFile.files[0].name)
                                    }
                                }}
                            >
                                Upload file
                                <VisuallyHiddenInput type="file" />
                            </Button>
                        </Grid>
                        <Grid item xs={6} md={8}>
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1 },
                                    display: "flex",
                                    flexDirection: "column"
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField
                                    value={info?.title}
                                    onChange={(e) => {
                                        setInfo({
                                            ...info,
                                            title: e.target.value,
                                        })
                                    }}
                                    label="Title" variant="standard" fullWidth margin="dense"
                                />
                                <TextField
                                    value={info?.description}
                                    onChange={(e) => {
                                        setInfo({
                                            ...info,
                                            description: e.target.value,
                                        })
                                    }}
                                    id="standard-basic"
                                    label="Description" variant="standard" fullWidth margin="dense"
                                />
                                <TextField
                                    value={info?.category}
                                    onChange={(e) => {
                                        setInfo({
                                            ...info,
                                            category: e.target.value,
                                        })
                                    }}
                                    sx={{
                                        mt: 3
                                    }}
                                    id="outlined-select-currency"
                                    select
                                    label="Category"
                                    fullWidth
                                    variant="standard"

                                >
                                    {category.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <Button
                                    variant="outlined"
                                    onClick={() => handleCreateNewTrack()}
                                    sx={{
                                        mt: 5,
                                        width: "25px"
                                    }}>Save</Button>

                            </Box>
                        </Grid>
                    </Grid>

                </Box>
            </div >
        </>
    )
}

export default Step2