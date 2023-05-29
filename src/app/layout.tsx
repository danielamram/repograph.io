import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { WithProviders } from "./context/WithProviders";
import RootStyleRegistry from "./emotion";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RepoGraph.io",
  description: "Explore github repositories and users in a graph",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootStyleRegistry>
          <WithProviders>{children}</WithProviders>
        </RootStyleRegistry>
        <Analytics />
      </body>
    </html>
  );
}
