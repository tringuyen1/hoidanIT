import { sendRequest } from "@/app/utils/api";
import { Box, Container, Grid } from "@mui/material";
import ProfileTrack from "@/components/profile/profile-track";


const ProfilePage = async ({ params }: { params: { slug: string } }) => {

     const tracks = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/users?current=1&pageSize=10`,
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
                              {data && data.map((item: any) => (
                                   <Grid item xs={6} md={6}
                                        sx={{
                                             display: "flex",
                                             flexDirection: "column",
                                             alignItems: "center",
                                             gap: "10px"
                                        }}
                                   >
                                        <ProfileTrack data={item} />
                                   </Grid>
                              ))}
                         </Grid>
                    </Container>
               </Box>
          </>
     );
};

export default ProfilePage;
