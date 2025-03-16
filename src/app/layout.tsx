import Footer from '../components/footer';
import Header from '../components/header'
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >

        <div className="header">
          <Header />
        </div>

        {children}

        <footer className="footer">
          <Footer />
        </footer>


      </body>
    </html>
  );
}
