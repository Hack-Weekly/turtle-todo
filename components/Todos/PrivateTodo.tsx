import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../__shadcn/card";
import { Checkbox } from "../__shadcn/checkbox";
import { Button } from "../__shadcn/button";
import { PlusSquare } from "lucide-react";

//dummy data for now until we connect to Supabase
type Props = {
  title?: string;
  checklist?: Array<{ title: string; checked: boolean }>;
};

const PrivateTodo = (props: Props) => {
  return (
    <Card className="bg-[#151515] border-0 text-white">
      <CardHeader>
        <CardTitle className="text-purple-600">{props.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {props.checklist?.map((item, idx) => (
          <div className="flex items-center space-x-2 mb-2" key={idx}>
            <Checkbox
              className="accent-white border-gray-500 border-2"
              id="item"
              defaultChecked={item.checked}
            />
            <label htmlFor="item">{item.title}</label>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant={"link"} className="text-white p-0 gap-2">
          <PlusSquare className="w-5" />
          Todo
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PrivateTodo;
