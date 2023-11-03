'use client' // Error components must be Client Components

import { useEffect } from 'react'
import './error.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Error({
     error,
     reset,
}: {
     error: Error & { digest?: string }
     reset: () => void
}) {
     useEffect(() => {
          // Log the error to an error reporting service
          console.error(error)
     }, [error])

     return (
          <>
               <div>
                    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
                    <div className="page-404">
                         <div className="outer">
                              <div className="middle">
                                   <div className="inner">

                                        <div className="inner-circle"><i className="fa fa-home"></i><span>404</span></div>
                                        <span className="inner-status">Oops! You're lost</span>
                                        <span className="inner-detail">
                                             <p>We can not find the page you're looking for.</p>
                                             <a href="#" className="btn btn-info mtl" onClick={() => reset()}><i className="fa fa-home"></i>&nbsp;
                                                  Return home
                                             </a>
                                        </span>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div >
          </>

     )
}