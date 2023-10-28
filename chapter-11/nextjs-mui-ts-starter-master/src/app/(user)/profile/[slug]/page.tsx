"use client"

import { sendRequest } from "@/app/utils/api";

const ProfilePage = async ({ params }: { params: { slug: string } }) => {
     console.log(">>>> check", params.slug)

     const tracks = await sendRequest<IBackendRes<ITrackTop[]>>({
          url: "http://localhost:8000/api/v1/tracks/users?current=1&pageSize=10",
          method: "POST",
          body: {
               id: params.slug
          },
     })

     console.log(tracks.data)


     return (
          <>
               <div>profile page</div>
          </>
     );
};

export default ProfilePage;
