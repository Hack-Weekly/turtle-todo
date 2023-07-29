import Navbar from '@/components/Navbar/Navbar';
import CreateNoteForm from '@/components/Note/NewNote/CreateNoteForm';
import Sidebar from '@/components/Sidebar/Sidebar';

export default function page() {
	return (
		<section className="flex">
			<Navbar />
			{/* <Sidebar /> */}
			<CreateNoteForm />
		</section>
	);
}
