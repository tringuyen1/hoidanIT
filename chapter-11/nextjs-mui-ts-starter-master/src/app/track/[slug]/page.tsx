"use client"
import { useSearchParams } from 'next/navigation' // get params vd: ?ad=id
// get params
const DetailTrackPage = (props: any) => {
    const searchParams = useSearchParams()

    const search = searchParams.get('audio')
    const { params } = props;
    console.log(params)
    console.log(search)
    return (
        <>
            <div>
                track page
            </div>
        </>
    )

}

export default DetailTrackPage;