import "./globals.css";

export const metadata = {
  title: "QR Kiosk",
  description: "A simple QR code kiosk application",
  keywords: "QR code, kiosk, application, Next.js",
  authors: [{ name: "Akathosp" }],
  creator: "Akathosp",
  openGraph: {
    title: "QR Kiosk",
    description: "A simple QR code kiosk application",
    url: "https://akathos.moph.go.th/qr/queue",
    siteName: "QR Kiosk",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Seal_of_the_Ministry_of_Public_Health_of_Thailand.svg/1200px-Seal_of_the_Ministry_of_Public_Health_of_Thailand.svg.png",
        width: 1200,
        height: 630,
        alt: "QR Kiosk Open Graph Image",
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

// app/layout.js (for App Router) or pages/_app.js (for Pages Router)
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Prevent Font Awesome from adding its own CSS

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
