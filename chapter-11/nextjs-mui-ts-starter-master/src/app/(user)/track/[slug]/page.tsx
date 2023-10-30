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

     const comments = await sendRequest<IBackendRes<IModelPaginate<ITrackComment>>>({
          url: "http://localhost:8000/api/v1/tracks/comments",
          method: "POST",
          queryParams: {
               current: 1,
               pageSize: 100,
               trackId: params.slug,
               sort: "-createAt"
          }
     })

     return (
          <>
               <Container>
                    <WaveTrack track={tracks?.data ?? null} trackComment={comments?.data?.result ?? null} />
               </Container>
          </>
     );
};

export default DetailTrackPage;
