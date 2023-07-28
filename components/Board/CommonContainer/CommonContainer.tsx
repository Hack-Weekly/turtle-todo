'use client';

import { supabase_client } from '@/db/supabase';
import Category from './Category';
import { useEffect, useState } from 'react';
import { DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd';

const categories = [
	{ dbValue: 'inprogress', name: 'In Progress' },
	{ dbValue: 'todo', name: 'Todo' },
	{ dbValue: 'completed', name: 'Completed' },
];

const initialData = {};

export default function CommonContainer() {
	const [data, setData] = useState<any | undefined>(undefined); // I'm against using any but the structure is too complex for me to create a type for it

	useEffect(() => {
		supabase_client
			.from('todos')
			.select()
			.then(({ data }) => {
				const initialData: any = {
					tasks: {},
					columns: {},
				};

				categories.forEach(category => {
					initialData.columns[category.dbValue] = {
						id: category.dbValue,
						title: category.name,
						todoIds: data
							?.filter(todo => todo.status === category.dbValue)
							.map(todo => todo.id),
					};
				});
				data?.forEach(todo => {
					initialData.tasks[todo.id] = todo;
				});

				setData(initialData);
			});
	}, []);

	const onDragEndHandler: OnDragEndResponder = result => {
		const { destination, source, draggableId } = result;

		if (!destination) {
			return;
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		const column = data.columns[source.droppableId];
		const newTodoIds = Array.from(column.todoIds);
		newTodoIds.splice(source.index, 1);
		newTodoIds.splice(destination.index, 0, draggableId);

		const newColumn = {
			...column,
			todoIds: newTodoIds,
		};

		setData((oldState: any) => {
			return {
				...oldState,
				columns: {
					...oldState.columns,
					[newColumn.id]: newColumn,
				},
			};
		});
	};

	return (
		<div className="grid grid-cols-3 mt-10">
			<DragDropContext onDragEnd={onDragEndHandler}>
				<Category
					name="Todo"
					id="todo"
					todos={data?.columns['todo'].todoIds.map(
						(taskId: string) => data.tasks[taskId]
					)}
				/>
			</DragDropContext>
		</div>
	);
}
