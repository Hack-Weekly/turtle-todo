'use client';

import { supabase_client } from '@/db/supabase';
import Category from './Category';
import { useEffect, useState } from 'react';
import { DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd';

const categories = [
	{ dbValue: 'todo', name: 'Todo' },
	{ dbValue: 'inprogress', name: 'In Progress' },
	{ dbValue: 'done', name: 'Done' },
];

export default function CommonContainer() {
	const [data, setData] = useState<any | undefined>(undefined); // I'm against using any but the structure is too complex for me to create a type for it

	useEffect(() => {
		supabase_client
			.from('todos')
			.select()
			.then(({ data }) => {
				const initialData: any = {
					todos: {},
					columns: {},
					columnOrder: categories.map(category => category.dbValue),
				};

				categories.forEach(category => {
					initialData.columns[category.dbValue] = {
						id: category.dbValue,
						title: category.name,
						todoIds: data
							?.filter(todo => todo.status === category.dbValue)
							.sort((a, b) => {
								if (a.order < b.order) {
									return -1;
								} else if (a.order > b.order) {
									return 1;
								} else {
									return 0;
								}
							})
							.map(todo => todo.id),
					};
				});

				data?.forEach(todo => {
					initialData.todos[todo.id] = todo;
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

		const destTodoIds = data.columns[destination.droppableId].todoIds.filter(
			(todoId: string) => todoId !== draggableId
		);
		let newOrder = 0;
		let overlapped = false;
		if (destTodoIds.length === 0) {
			newOrder = 1024;
		} else if (destination.index === 0) {
			// Start of list
			newOrder = Math.floor(data.todos[destTodoIds[0]].order / 2); // Half of the to-be second todo order
			if (data.todos[destTodoIds[0]].order === 1) overlapped = true;
		} else if (destination.index === destTodoIds.length) {
			// End of list
			newOrder = data.todos[destTodoIds[destTodoIds.length - 1]].order + 1024; // 1024 more than the to-be one before last todo order
		} else {
			if (source.droppableId === destination.droppableId) {
				if (source.index < destination.index) {
					newOrder = Math.floor(
						(data.todos[destTodoIds[destination.index + 1]].order +
							data.todos[destTodoIds[destination.index]].order) /
							2
					); // Half of the todos' order wrapping the moving todo

					if (
						Math.abs(
							newOrder - data.todos[destTodoIds[destination.index + 1]].order
						) <= 1
					)
						overlapped = true;
				} else if (source.index > destination.index) {
					newOrder = Math.floor(
						(data.todos[destTodoIds[destination.index]].order +
							data.todos[destTodoIds[destination.index - 1]].order) /
							2
					); // Half of the todos' order wrapping the moving todo
				}
			} else {
				newOrder = Math.floor(
					(data.todos[destTodoIds[destination.index]].order +
						data.todos[destTodoIds[destination.index - 1]].order) /
						2
				); // Half of the todos' order wrapping the moving todo
			}

			if (
				Math.abs(newOrder - data.todos[destTodoIds[destination.index]].order) <=
					1 ||
				Math.abs(
					newOrder - data.todos[destTodoIds[destination.index - 1]].order
				) <= 1
			)
				overlapped = true;
		}

		const srcColumn = data.columns[source.droppableId];
		const destColumn = data.columns[destination.droppableId];

		if (srcColumn === destColumn) {
			const newTodoIds = Array.from(srcColumn.todoIds);
			newTodoIds.splice(source.index, 1);
			newTodoIds.splice(destination.index, 0, draggableId);

			const newColumn = {
				...srcColumn,
				todoIds: newTodoIds,
			};

			setData((oldState: any) => {
				let todos: any = oldState.todos;
				if (overlapped) {
					let multiplier = 0;
					newTodoIds.forEach((todoId: any) => {
						multiplier++;
						todos[todoId] = { ...data.todos[todoId], order: multiplier * 1024 };
					});
				} else {
					todos = {
						...oldState.todos,
						[draggableId]: { ...oldState.todos[draggableId], order: newOrder },
					};
				}

				return {
					todos,
					columns: {
						...oldState.columns,
						[newColumn.id]: newColumn,
					},
				};
			});

			if (overlapped) {
				// Reassign all of the orders
				let multiplier = 0;
				supabase_client
					.from('todos')
					.upsert(
						newTodoIds.map((todoId: any) => {
							multiplier++;
							return {
								...data.todos[todoId],
								order: multiplier * 1024,
							};
						})
					)
					.eq('status', destination.droppableId)
					.then(res => {
						// Works only when there is a 'then'
					});
			} else {
				// I don't want to stall the program so I don't use await
				supabase_client
					.from('todos')
					.update({ order: newOrder })
					.eq('id', draggableId)
					.then(res => {
						// Works only when there is a 'then'
					});
			}
		} else {
			const srcTodoIds = Array.from(srcColumn.todoIds);
			srcTodoIds.splice(source.index, 1);
			const newSrcColumn = {
				...srcColumn,
				todoIds: srcTodoIds,
			};

			const destTodoIds = Array.from(destColumn.todoIds);
			destTodoIds.splice(destination.index, 0, draggableId);
			const newDestColumn = {
				...destColumn,
				todoIds: destTodoIds,
			};

			setData((oldState: any) => {
				let todos: any = oldState.todos;
				if (overlapped) {
					let multiplier = 0;
					destTodoIds.forEach((todoId: any) => {
						multiplier++;
						todos[todoId] = {
							...data.todos[todoId],
							order: multiplier * 1024,
							status: destination.droppableId,
						};
					});
				} else {
					todos = {
						...oldState.todos,
						[draggableId]: { ...oldState.todos[draggableId], order: newOrder },
					};
				}

				return {
					todos,
					columns: {
						...oldState.columns,
						[newSrcColumn.id]: newSrcColumn,
						[newDestColumn.id]: newDestColumn,
					},
				};
			});

			if (overlapped) {
				// Reassign all of the orders
				let multiplier = 0;
				supabase_client
					.from('todos')
					.upsert(
						destTodoIds.map((todoId: any) => {
							multiplier++;
							return {
								...data.todos[todoId],
								order: multiplier * 1024,
							};
						})
					)
					.eq('status', destination.droppableId)
					.then(res => {
						// Works only when there is a 'then'
					});
			} else {
				// I don't want to stall the program so I don't use await
				supabase_client
					.from('todos')
					.update({ order: newOrder, status: destination.droppableId })
					.eq('id', draggableId)
					.then(res => {
						// Works only when there is a 'then'
					});
			}
		}
	};

	return (
		<div className="grid grid-cols-3 mt-10">
			<DragDropContext onDragEnd={onDragEndHandler}>
				{categories.map(category => (
					<Category
						key={category.dbValue}
						name={category.name}
						id={category.dbValue}
						todos={data?.columns[category.dbValue].todoIds.map(
							(taskId: string) => data.todos[taskId]
						)}
					/>
				))}
			</DragDropContext>
		</div>
	);
}
