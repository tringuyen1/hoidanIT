import { sendRequest } from "@/app/utils/api";
import WaveTrack from "@/components/track/wave.track";
import Container from "@mui/material/Container";
// import { useSearchParams } from "next/navigation"; // get params vd: ?ad=id
// get params
const DetailTrackPage = async (props: any) => {
     const { params } = props;
     const tracks = await sendRequest<IBackendRes<ITrackTop>>({
          url: `http://localhost:8000/api/v1/tracks/${params.slug}`,
          method: "GET"
     });

     return (
          <>
               <Container>
                    <WaveTrack track={tracks?.data ?? null} />
               </Container>
          </>
     );
};

export default DetailTrackPage;
