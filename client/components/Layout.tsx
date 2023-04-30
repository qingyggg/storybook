import { ReactElement } from 'react';
import Footer from './Footer';
import MolsBar from './MolsBar';
import AddCommentDialog from './AddCommentDialog';

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <>
      <MolsBar />
      <main>{children}</main>
      <AddCommentDialog
        open={false}
        handleClickClose={() => void 0}
        handleClickOpen={() => void 0}
      />
      {/* <Footer/> */}
    </>
  );
}
