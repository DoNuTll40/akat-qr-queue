import "./globals.css";

export const metadata = {
  title: "QR Kiosk",
  description: "A simple QR code kiosk application",
  keywords: "QR code, kiosk, application, Next.js",
  authors: [{ name: "Akathosp" }],
  creator: "Akathosp",
  icons: {
    icon: [
      {
        url: '/qr/queue/images/moph-md-logo.png',
        href: '/qr/queue/images/moph-md-logo.png'
      }
    ]
  },
};

import Header from "@/components/Header";
import Footer from "@/components/Footer";

// app/layout.js (for App Router) or pages/_app.js (for Pages Router)
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { AntdRegistry } from "@ant-design/nextjs-registry";
config.autoAddCss = false; // Prevent Font Awesome from adding its own CSS

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full m-0 p-0">
        <div className="flex flex-col h-full">
          <Header />
          <main className="flex-1 overflow-y-auto max-w-[80rem] mx-auto p-4 w-full">
            <AntdRegistry>
            {children}
            </AntdRegistry>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
