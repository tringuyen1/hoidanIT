import { sendRequest } from "@/app/utils/api";
import PlayListTag from "@/components/playlist/playlist";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import type { Metadata } from 'next'


export const metadata: Metadata = {
     title: 'Playlist',
     description: 'describe me',
}

const PlaylistPage = async () => {
     const session = await getServerSession(authOptions);

     const playlist = await sendRequest<IBackendRes<IModelPaginate<ITrackPlayList[]>>>({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/playlists?current=1&pageSize=10`,
          method: "GET",
          headers: {
               Authorization: `Bearer ${session?.access_token}`
          },
     });

     const tracks = await sendRequest<IBackendRes<IModelPaginate<ITrackTop[]>>>({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks?current=1&pageSize=10`,
          method: "GET",
          headers: {
               Authorization: `Bearer ${session?.access_token}`
          },
     });

     return (
          <>
               <PlayListTag playlist={playlist.data?.result ?? []} tracks={tracks.data?.result ?? []} />
          </>
     );
};

export default PlaylistPage;
