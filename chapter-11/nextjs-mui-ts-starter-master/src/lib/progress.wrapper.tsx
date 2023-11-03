// In /app/layout.jsx
'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ProgressWrapper = ({
     children,
}: {
     children: React.ReactNode;
}) => {
     return (
          <html lang="en">
               <body>
                    {children}
                    <ProgressBar
                         height="4px"
                         color="blue"
                         options={{ showSpinner: false }}
                         shallowRouting
                    />
               </body>
          </html>
     );
}

export default ProgressWrapper