import MainSlider from "@/components/main/main.slider";
import { Container } from "@mui/material";
import { sendRequest } from "../utils/api";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  // - cách truyền thống
  // const res = await fetch(`http://localhost:8000/api/v1/tracks/top`, {
  //      method: "POST",
  //      headers: {

  //      },
  //      body: JSON.stringify({
  //           category: "CHILL",
  //           limit: 10
  //      })
  // });

  // console.log(res.json());

  // - cách res js
  // const res = sendRequestJS({
  //      url: "http://localhost:8000/api/v1/tracks/top",
  //      method: "POST",
  //      body: {
  //           category: "CHILL",
  //           limit: 10
  //      }
  // })

  // console.log(res);

  // - cách res ts

  // interface IUser {
  //      name: string,
  //      age: string
  // } // tạo gợi ý code để hứng kết quả

  // if (session) {
  const chills = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: {
      category: "CHILL",
      limit: 10,
    },
  });

  const workouts = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: {
      category: "WORKOUT",
      limit: 10,
    },
  });

  const party = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: {
      category: "PARTY",
      limit: 10,
    },
  });
  // }

  return (
    <>
      <Container>
        {/* <MainSlider data={[]} title={""} /> */}
        <MainSlider
          data={chills?.data ? chills.data : []}
          title={"Top Chill"}
        />
        <MainSlider
          data={workouts?.data ? workouts?.data : []}
          title={"Top Workout"}
        />
        <MainSlider data={party?.data ? party?.data : []} title={"Top Party"} />
      </Container>
    </>
  );
};

export default HomePage;
