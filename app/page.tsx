import Navbar from "./../components/Navbar";
import Sidebar from "./../components/Sidebar/Sidebar";

export default function page() {
  return (
    <section className="flex">
      <Navbar />
      <Sidebar />
    </section>
  )
}
