
import AppHeader from "../../components/header/app.header";
import AppFooter from "../../components/footer/app.footer";

import type { Metadata } from 'next'


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
          </>
     );
}
