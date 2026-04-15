import "../styles/globals.css";

export const metadata = {
  title: "WellKare - Your guide to U.S. healthcare",
  description: "Health Care in the U.S. explained simply",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
