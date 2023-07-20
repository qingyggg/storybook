import { ReactElement } from 'react';
import Footer from './Footer';
import MolsBar from './MolsBar';
import { MolsAlert } from './MolsAlert';

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <>
      <MolsBar />
      <main>{children}</main>
      <MolsAlert />
      <Footer />
    </>
  );
}
