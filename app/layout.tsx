import "@/styles/globals.css";
import { Providers } from "../redux/provider";

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
