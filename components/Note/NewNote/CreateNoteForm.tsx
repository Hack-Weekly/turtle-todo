'use client';

import { Input } from '@/components/__shadcn/input';
import { Button } from '../../__shadcn/button';
import { Card, CardContent } from '../../__shadcn/card';
import { FormEvent, useState } from 'react';
import { Textarea } from '@/components/__shadcn/textarea';
import { Combobox } from '@/components/__shadcn/combo-box';
import { DatePicker } from '@/components/__shadcn/date-picker';
import { supabase_client } from '@/db/supabase';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-hot-toast';

const STATUS = [
	{
		value: 'todo',
		label: 'Todo',
	},
	{
		value: 'inprogress',
		label: 'InProgress',
	},
	{
		value: 'done',
		label: 'Done',
	},
];

const PRIORITIES = [
	{
		value: 'low',
		label: 'Low',
	},
	{
		value: 'medium',
		label: 'Medium',
	},
	{
		value: 'high',
		label: 'High',
	},
	{
		value: 'urgent',
		label: 'Urgent',
	},
];

export default function CreateNoteForm() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [priority, setPriority] = useState('');
	const [status, setStatus] = useState('');
	const [startDate, setStartDate] = useState<Date | undefined>();
	const [dueDate, setDueDate] = useState<Date | undefined>();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const { data: todos } = await supabase_client
			.from('todos')
			.select()
			.eq('status', status);
		let maxOrder = 0;
		if (todos) maxOrder = Math.max(...todos.map(todo => todo.order));
		const { error, data } = await supabase_client.from('todos').insert({
			id: uuidv4(),
			title,
			description,
			priority,
			status,
			owner_id: '',
			start_date: startDate!.toUTCString(),
			due_date: dueDate!.toUTCString(),
			created_at: new Date().toUTCString(),
			order: maxOrder + 1024,
		});

		if (error) {
			toast.error(error.message);
			return;
		}

		toast.success('Todo successfully added 🎉');
	};

	return (
		<form
			className="p-8 w-[45rem] mx-auto h-screen flex flex-col gap-4"
			onSubmit={handleSubmit}>
			<h1 className="text-4xl font-semibold">Create New Todo</h1>
			<Card className="bg-black rounded-xl border-0 grow p-6">
				<CardContent className="flex flex-col gap-4 p-0">
					<Input
						className="bg-[#312d2d] text-white border-none outline-none ring-gray-800"
						placeholder="Title"
						value={title}
						onChange={e => {
							setTitle(e.target.value);
						}}
					/>
					<Textarea
						className="bg-[#312d2d] text-white border-none outline-none ring-gray-800"
						placeholder="Description"
						value={description}
						onChange={e => {
							setDescription(e.target.value);
						}}
					/>
					<div className="flex justify-between">
						<DatePicker date={startDate} setDate={setStartDate} />
						<DatePicker date={dueDate} setDate={setDueDate} />
					</div>
					<Combobox value={priority} setValue={setPriority} data={PRIORITIES} />
					<Combobox value={status} setValue={setStatus} data={STATUS} />
					<div>
						<Button
							type="submit"
							className="bg-[#994bff] text-white w-32 border border-[#994bff] hover:bg-white hover:text-[#994bff]">
							Create
						</Button>
					</div>
				</CardContent>
			</Card>
		</form>
	);
}
