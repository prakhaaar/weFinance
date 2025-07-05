import "./globals.css";
import { Toaster } from "sonner";

// Default metadata for the entire app
export const metadata = {
  title: "weFinance – Finance Visualizer",
  description: "Track your expenses easily",
};

// Root layout shared across all pages
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Global toast notifications */}
        <Toaster richColors position="top-right" />
        {children}
      </body>
    </html>
  );
}
