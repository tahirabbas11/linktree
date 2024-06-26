import '../styles/globals.css';
import { Oswald, Poppins } from '@next/font/google';
import Header from './components/Header';
import Footer from './components/Footer';
import Providers from './Providers';
import { ReduxProviders } from './ReduxProvider';

const oswald = Oswald({
  weight: ['400', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-oswald',
});

const popins = Poppins({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-popins',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <html className="h-full scroll-smooth">
    <html>
      <head />
      {/* <body className="bg-gradient-to-r from-green-50 to-green-200 dark:bg-gradient-to-r dark:from-[#242933] dark:to-[#2A303C] max-w-3xl mx-auto transition-all duration-150"> */}
      <body className="bg-[#FFFFFF] dark:bg-[#212121] max-w-3xl mx-auto transition-all duration-150">
        <ReduxProviders>
          <Providers>
            <div className={`${oswald.variable} ${popins.variable}`}>
              <Header />
              <main>{children}</main>
              <Footer />
            </div>
          </Providers>
        </ReduxProviders>
      </body>
    </html>
  );
}
