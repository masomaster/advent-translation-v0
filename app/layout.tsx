import "./globals.css";
import { Providers } from "../redux/provider";
import { AuthContextProvider } from "../context/AuthContext";

export const metadata = {
  title: "Advent Translator",
  description:
    "A Next.js app delivering a new translation challenge each day in Advent.",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <Providers>{children}</Providers>
        </AuthContextProvider>
      </body>
    </html>
  );
}
