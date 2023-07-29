'use client';

import { useEffect, useState } from 'react';
import { supabase_client } from '@/db/supabase';
import { Database } from '@/lib/db.types';
import PublicTodo from '@/components/Todos/PublicTodo';
import { Droppable } from 'react-beautiful-dnd';

type TodoType = Database['public']['Tables']['todos']['Row'];

type CategoryProps = {
	todos: TodoType[] | undefined;
	name: string;
	id: string;
};

export default function Category({ todos, name, id }: CategoryProps) {
	return (
		<div className="mt-5">
			{name}
			<Droppable droppableId={id}>
				{provided => (
					<div
						className="flex flex-col"
						{...provided.droppableProps}
						ref={provided.innerRef}>
						{todos?.map((v, index) => (
							<PublicTodo key={v.id} {...v} index={index} />
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
}
