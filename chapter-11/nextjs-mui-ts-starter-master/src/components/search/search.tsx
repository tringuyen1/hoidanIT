"use client"

import { convertSlugUrl, sendRequest } from "@/app/utils/api";
import { Box, Container } from "@mui/material"
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";



const SearchTag = () => {
     const searchParams = useSearchParams();
     const searchKey = searchParams.get("q");
     const [searchTracks, setSearchTracks] = useState<ITrackTop[]>([]);

     const fetchData = async (search: any) => {
          const res = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
               url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/search`,
               method: "POST",
               body: {
                    current: 1,
                    pageSize: 10,
                    title: search
               }
          })

          if (res.statusCode === 201 && res.data?.result) {
               setSearchTracks(res.data?.result);
          }
     }

     useEffect(() => {
          document.title = `"${searchKey}" search`
          fetchData(searchKey);
     }, [searchKey])


     return (
          <>
               <Container>
                    <div className="search-wrapper">
                         <p>kết quả tìm kiếm: <strong>{searchKey}</strong></p>
                         <hr></hr>
                         {
                              searchTracks?.length > 0 ? searchTracks?.map((item: any) => (
                                   <Box sx={{ flexGrow: 1, marginTop: "15px" }}>
                                        <div style={{ display: "flex", gap: "20px" }}>
                                             <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${item.imgUrl}`} alt="" width={50} height={50}></Image>
                                             <Link href={`/track/${convertSlugUrl(item.title)}-${item._id}.html?audio=${item.trackUrl}`} style={{ textDecoration: "none", color: "unset", cursor: "pointer" }}>
                                                  <p className="title" style={{ textTransform: "capitalize" }}>{item.title}</p>
                                             </Link>

                                        </div>
                                   </Box>
                              )) : (
                                   <p style={{ textTransform: "capitalize" }}>Không tìm thấy kết quả tìm kiếm</p>
                              )
                         }
                    </div>
               </Container>
          </>
     )
}

export default SearchTag;