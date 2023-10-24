import MainSlider from "@/components/main/main.slider";
import { Container } from "@mui/material";
import { sendRequestJS } from "../app/utils/old.api";

const HomePage = async () => {

     // const res = await fetch(`http://localhost:8000/api/v1/tracks/top`, {
     //      method: "POST",
     //      headers: {

     //      },
     //      body: JSON.stringify({
     //           category: "CHILL",
     //           limit: 10
     //      })
     // });

     // console.log(res.json());

     const res = sendRequestJS({
          url: "http://localhost:8000/api/v1/tracks/top",
          method: "POST",
          body: {
               category: "CHILL",
               limit: 10
          }
     })

     console.log(res);

     return (
          <>
               <Container>
                    <MainSlider />
                    <MainSlider />
                    <MainSlider />
               </Container>
          </>
     )
};

export default HomePage;
