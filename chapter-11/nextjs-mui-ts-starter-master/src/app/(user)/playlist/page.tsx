import { sendRequest } from "@/app/utils/api";
import PlayListTag from "@/components/playlist/playlist";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

const PlaylistPage = async () => {
     const session = await getServerSession(authOptions);

     const playlist = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/playlists?current=1&pageSize=10`,
          method: "GET",
          headers: {
               Authorization: `Bearer ${session?.access_token}`
          },
     });

     console.log(playlist)

     return (
          <>
               <PlayListTag playlist={playlist} />
          </>
     );
};

export default PlaylistPage;
