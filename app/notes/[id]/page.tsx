import React from "react";

export default async function UpdateTodo({
  params: { id },
}: {
  params: { id: string };
}) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div className="container">
        <h2 className="scroll-m-20 py-8 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Update Todo
        </h2>
        
    </div>
  );
}
