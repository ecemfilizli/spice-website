"use client";
import { Provider } from "react-redux";
import "./globals.css";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import FixedButton from "../../components/fixed/FixedButton";
import store from "@/redux/store";
import ScrollTopButton from "../../components/fixed/ScrollTopButton";
import { usePathname } from "next/navigation";
import PageTransition from "../../components/design/PageTransition";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const noLayoutRoutes = ["/login", "/admin"];

  const shouldHideLayout = noLayoutRoutes.includes(pathname);

  return (
    <Provider store={store}>
      <html lang="en" suppressHydrationWarning>
        <body suppressHydrationWarning className="antialiased">
          {!shouldHideLayout && <Header />}
          {children}
          {!shouldHideLayout && <FixedButton />}
          <ScrollTopButton />
          {!shouldHideLayout && <Footer />}
        </body>
      </html>
    </Provider>
  );
}
