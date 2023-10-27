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

const currencies = [
    {
        value: 'CHILLS',
        label: 'CHILLS',
    },
    {
        value: 'WORKOUT',
        label: 'WORKOUT',
    },
    {
        value: 'PARTY',
        label: 'PARTY',
    },
];

const Step2 = () => {

    const [progress, setProgress] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <>
            <div>
                <Box sx={{ width: '100%' }}>
                    <div>
                        Your uploading track:
                    </div>
                    <LinearProgressWithLabel value={progress} />
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
                                </div>
                            </div>

                            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
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
                                    id="standard-basic"
                                    label="Title" variant="standard" fullWidth margin="dense"
                                />
                                <TextField
                                    id="standard-basic"
                                    label="Description" variant="standard" fullWidth margin="dense"
                                />
                                <TextField
                                    sx={{
                                        mt: 3
                                    }}
                                    id="outlined-select-currency"
                                    select
                                    label="Category"
                                    fullWidth
                                    variant="standard"

                                >
                                    {currencies.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <Button
                                    variant="outlined"
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