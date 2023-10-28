"use client"

import { sendRequest } from "@/app/utils/api";
import { Box, Container, Grid } from "@mui/material";
import ProfileTrack from "@/components/profile/profile-track";


const ProfilePage = async ({ params }: { params: { slug: string } }) => {

     const tracks = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
          url: "http://localhost:8000/api/v1/tracks/users?current=1&pageSize=10",
          method: "POST",
          body: {
               id: params.slug
          },
     });
     const data = tracks?.data?.result ?? [];

     return (
          <>
               <Box sx={{ flex: 1, marginTop: "15px" }}>
                    <Container>
                         <Grid container spacing={2}>
                              <ProfileTrack data={data} />
                         </Grid>
                    </Container>
               </Box>
          </>
     );
};

export default ProfilePage;
