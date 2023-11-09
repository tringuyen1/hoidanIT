
import AppHeader from "../../components/header/app.header";
import AppFooter from "../../components/footer/app.footer";

import type { Metadata } from 'next'
import Script from 'next/script'
import { idJsonObject } from "../constant/contstant";



export const metadata: Metadata = {
     title: 'Home Page',
     description: 'describe me',
}


export default function RootLayout({ children }: { children: React.ReactNode; }) {
     return (
          <>
               <AppHeader />
               {children}
               <div style={{ marginTop: "100px" }}></div>
               <AppFooter />
               <Script type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(idJsonObject) }} />
          </>
     );
}
