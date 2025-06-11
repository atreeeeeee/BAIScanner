import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import type { Metadata } from "next";
import ProviderWrapper from "./ProviderWrapper";

export const metadata: Metadata = {
  title: "HoundAttendance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-dark text-white">
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
