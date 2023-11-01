import { sendRequest } from "@/app/utils/api";
import WaveTrack from "@/components/track/wave.track";
import Container from "@mui/material/Container";
// import { useSearchParams } from "next/navigation"; // get params vd: ?ad=id
// get params

import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
     params: { slug: string }
     searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
     { params, searchParams }: Props,
     parent: ResolvingMetadata
): Promise<Metadata> {
     // read route params
     const slug = params.slug

     const res = await sendRequest<IBackendRes<ITrackTop>>({
          url: `http://localhost:8000/api/v1/tracks/${slug}`,
          method: "GET",
          nextOption: { cache: "no-store" }
     });

     return {
          title: res.data?.title,
          description: res.data?.description,
          openGraph: {
               title: 'Hỏi Dân IT',
               description: 'Beyond Your Coding Skills',
               type: 'website',
               images: [`https://raw.githubusercontent.com/hoidanit/imageshosting/master/eric.png`],
          }
     }
}

export function Page({ params, searchParams }: Props) { }

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
               sort: "-createdAt"
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
