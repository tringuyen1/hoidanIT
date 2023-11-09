
import { sendRequest } from '@/app/utils/api';
import LikeTag from '@/components/likes/likes';
import type { Metadata } from 'next'
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export const metadata: Metadata = {
     title: 'Like',
     description: 'describe me',
}


const LikePage = async () => {
     const session = await getServerSession(authOptions);

     const liked = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/likes`,
          method: "GET",
          queryParams: { current: 1, pageSize: 100 },
          headers: {
               Authorization: `Bearer ${session?.access_token}`,
          },
          nextOption: {
               next: { tags: ['liked-by-user'] }
          }
     })

     return (
          <>
               <LikeTag liked={liked.data?.result ?? []} />
          </>
     );
};

export default LikePage;
