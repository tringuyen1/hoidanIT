"use client";
import WaveTrack from "@/components/track/wave.track";
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
      <div>
        <WaveTrack />
      </div>
    </>
  );
};

export default DetailTrackPage;
