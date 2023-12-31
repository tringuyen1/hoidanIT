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
     const slug = params.slug;
     const id = slug.split(".html")[0].split("-").pop();

     const res = await sendRequest<IBackendRes<ITrackTop>>({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${id}`,
          method: "GET",
          nextOption: {
               // cache: "no-store" ,
               tags: ["track-by-id"]
          }
     });

     return {
          title: res.data?.title,
          description: res.data?.description,
          openGraph: {
               title: 'Hỏi Dân IT',
               description: 'Beyond Your Coding Skills',
               type: 'website',
               images: [`https://icons.iconarchive.com/icons/danleech/simple/256/soundcloud-icon.png`],
          }
     }
}

const DetailTrackPage = async (props: any) => {
     const { params } = props;
     const id = params.slug.split(".html")[0].split("-").pop();

     const tracks = await sendRequest<IBackendRes<ITrackTop>>({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${id}`,
          method: "GET",
          nextOption: {
               cache: "no-store", // ko luu lai trong data catch (ko lưu lại dữ liệu. để có thể update lại dữ liệu từ api).
               // next: {
               //      // revalidata: 86400, // update dữ liệu theo thời gian đặt sẵn. ít khi dùng
               //      // tags: ['tracks'], // gọi id để update. sử dụng nhiều hơn
               //      // path: "" // gọi path để update
               // }
          },
     });

     // await new Promise(resolve => setTimeout(resolve, 3000))

     const comments = await sendRequest<IBackendRes<IModelPaginate<ITrackComment>>>({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/comments`,
          method: "POST",
          queryParams: {
               current: 1,
               pageSize: 100,
               trackId: id,
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
