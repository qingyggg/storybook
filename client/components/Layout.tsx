
import { ReactElement } from "react"
import Footer from "./Footer"
import MolsBar from "./MolsBar"


export default function Layout({ children }:{children:ReactElement}) {
  return (
    <>
      <MolsBar />
      <main>{children}</main>
      <Footer/>
    </>
  )
}