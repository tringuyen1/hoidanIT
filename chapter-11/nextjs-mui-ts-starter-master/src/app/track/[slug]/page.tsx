"use client";
import WaveTrack from "@/components/track/wave.track";
import Container from "@mui/material/Container";
import { useSearchParams } from "next/navigation"; // get params vd: ?ad=id
// get params
const DetailTrackPage = (props: any) => {
  const searchParams = useSearchParams();

  const fileName = searchParams.get("audio");
  const { params } = props;
  console.log(params);
  console.log(fileName);
  return (
    <>
      <Container>
        <WaveTrack />
      </Container>
    </>
  );
};

export default DetailTrackPage;
