import MainSlider from "@/components/main/main.slider";
import AppHeader from "./header/app.header";
import { Container } from "@mui/material";

const HomePage = () => {
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
