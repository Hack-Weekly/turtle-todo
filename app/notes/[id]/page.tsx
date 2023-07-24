import React from "react";

export default async function UpdateTodo({
  params: { id },
}: {
  params: { id: string };
}) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return <div>UpdateTodo</div>;
}
