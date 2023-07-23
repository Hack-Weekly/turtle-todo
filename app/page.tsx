import Navbar from "../components/Navbar/Navbar";
import Sidebar from "./../components/Sidebar/Sidebar";
import Board from "@/components/Board/Board";

export default function page() {
  return (
    <section className="flex">
      <Navbar />
      <Sidebar />
      <Board />
    </section>
  )
}
