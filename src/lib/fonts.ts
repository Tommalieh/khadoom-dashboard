import localFont from "next/font/local";

export const fontArabic = localFont({
  src: [
    {
      path: "../assets/fonts/HerbLubalin-Bold.otf",
      weight: "700",
    },
  ],
  variable: "--font-ar",
  display: "swap",
});

export const fontEnglishHeading = localFont({
  src: [
    {
      path: "../assets/fonts/FredokaOne-Regular.ttf",
      weight: "400",
    },
  ],
  variable: "--font-en-heading",
  display: "swap",
});

export const fontEnglishBody = localFont({
  src: [
    {
      path: "../assets/fonts/Montserrat-Regular.ttf",
      weight: "400",
    },
    {
      path: "../assets/fonts/Montserrat-Medium.ttf",
      weight: "500",
    },
  ],
  variable: "--font-en-body",
  display: "swap",
});
