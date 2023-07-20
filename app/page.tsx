import { Button } from "@/components/ui/button";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function page() {
  return (
    <section className="flex">
      <Navbar />
      <Sidebar />
      <Button>Testing</Button>
      Homepage
    </section>
  )
}
