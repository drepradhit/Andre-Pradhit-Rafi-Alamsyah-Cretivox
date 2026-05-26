import "../index.css";

export const metadata = {
  metadataBase: new URL("https://www.drepradhit.me"),
  title: "Andre Pradhit | Portfolio",
  description:
    "Portfolio of Andre Pradhit Rafi Alamsyah, a Computer Science student at BINUS University specializing in UI/UX Design, Frontend Development, and Creative Web Experience.",
  keywords: [
    "Andre Pradhit",
    "Andre Pradhit Rafi Alamsyah",
    "Portfolio",
    "UI/UX Designer",
    "Frontend Developer",
    "BINUS University",
    "Computer Science",
  ],
  authors: [{ name: "Andre Pradhit Rafi Alamsyah" }],
  openGraph: {
    title: "Andre Pradhit | Portfolio",
    description:
      "Computer Science student at BINUS University specializing in UI/UX Design and Frontend Development.",
    url: "https://www.drepradhit.me/",
    siteName: "Andre Pradhit Portfolio",
    images: ["/assets/andre.jpeg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andre Pradhit | Portfolio",
    description:
      "Computer Science student at BINUS University specializing in UI/UX Design and Frontend Development.",
    images: ["/assets/andre.jpeg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/png" href="/assets/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Poppins:wght@400;500;600;700;800;900&family=Outfit:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <meta
          name="google-site-verification"
          content="hA8-V152LBX6Lba6UMGJUKdTYTqxt5Fp8CAKNu6Udbs"
        />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="antialiased" id="home">
        {children}
      </body>
    </html>
  );
}
