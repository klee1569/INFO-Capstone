import "../styles/globals.css";

export const metadata = {
  title: "WellKare - Your guide to U.S. Healthcare",
  description: "Healthcare in the U.S. explained simply",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
