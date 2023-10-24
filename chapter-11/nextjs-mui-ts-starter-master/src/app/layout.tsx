import ThemeRegistry from "@/components/theme-registry/theme.registry";
import AppHeader from "./header/app.header";
import AppFooter from "./footer/app.footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AppHeader />
          {children}
          <AppFooter />
        </ThemeRegistry>
      </body>
    </html>
  );
}
