
import ThemeRegistry from "@/components/theme-registry/theme.registry";
import NextAuthWrapper from "@/lib/next.auth.wrapper";
import { ToastProvider } from "./utils/toast";
import { TrackContextProvider } from "@/lib/track.wrapper";
import ProgressWrapper from "@/lib/progress.wrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <ProgressWrapper>
            <NextAuthWrapper>
              <ToastProvider>
                <TrackContextProvider>
                  {children}
                </TrackContextProvider>
              </ToastProvider>
            </NextAuthWrapper>
          </ProgressWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}
