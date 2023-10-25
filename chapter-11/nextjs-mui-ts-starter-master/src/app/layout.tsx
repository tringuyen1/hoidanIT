
import ThemeRegistry from "@/components/theme-registry/theme.registry";
import AppHeader from "./header/app.header";
import AppFooter from "./footer/app.footer";
import NextAuthWrapper from "@/lib/next.auth";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <NextAuthWrapper>
            <AppHeader />
            {children}
            <AppFooter />
          </NextAuthWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}
