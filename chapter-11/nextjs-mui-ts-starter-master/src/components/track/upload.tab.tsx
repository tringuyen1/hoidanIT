"use client";

import { useState } from "react";
import { Container } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useDropzone } from "react-dropzone";
import Step1 from "./steps/step1";
import Step2 from "./steps/step2";

interface TabPanelProps {
     children?: React.ReactNode;
     index: number;
     value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
     const { children, value, index, ...other } = props;

     return (
          <div
               role="tabpanel"
               hidden={value !== index}
               id={`simple-tabpanel-${index}`}
               aria-labelledby={`simple-tab-${index}`}
               {...other}
          >
               {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
          </div>
     );
};

const UploadTabs = () => {
     const [value, setValue] = useState(0);
     const [trackUpload, setTrackUpload] = useState({
          filename: "",
          percent: 0,
          uploadTrackFileName: ""
     });

     const handleChange = (event: React.SyntheticEvent, newValue: number) => {
          setValue(newValue);
     };
     return (
          <>
               <Container
                    sx={{
                         marginTop: "100px",
                         border: "1px solid #ddd",
                    }}
               >
                    <h2>Upload File</h2>
                    <Box sx={{ width: "100%" }}>
                         <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                              <Tabs
                                   value={value}
                                   onChange={handleChange}
                                   aria-label="basic tabs example"
                              >
                                   <Tab label="Tracks" disabled={value !== 0} />
                                   <Tab label="Basic information" disabled={value !== 1} />
                              </Tabs>
                         </Box>
                         <CustomTabPanel value={value} index={0}>
                              <Step1 setValue={setValue} setTrackUpload={setTrackUpload} trackUpload={trackUpload} />
                         </CustomTabPanel>
                         <CustomTabPanel value={value} index={1}>
                              <Step2 trackUpload={trackUpload} setTrackUpload={setTrackUpload} setValue={setValue} />
                         </CustomTabPanel>
                    </Box>
               </Container>
          </>
     );
};

export default UploadTabs;
