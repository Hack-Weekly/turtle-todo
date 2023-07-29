'use client'

import { Dispatch, SetStateAction, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Button } from "./button"
import { Check, ChevronsUpDown } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./command"
import { cn } from "@/lib/utils"


type ComboboxItemType = {
    value: string,
    label: string
}

type ComboboxType = {
    data: ComboboxItemType[],
    value: string,
    setValue: Dispatch<SetStateAction<string>>
    commandMessage?: string,
    commandInputMessage?: string,
    commandEmptyMessage?: string
}

export function Combobox(props : ComboboxType) {
  const [open, setOpen] = useState(false)
  // const [value, setValue] = useState("")
 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {props.value
            ? props.data.find((item) => item["value"] === props.value)?.label
            : props.commandMessage ?? "Select Item..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={props.commandInputMessage ?? "Search item..."} />
          <CommandEmpty>{props.commandEmptyMessage ?? "No item found."}</CommandEmpty>
          <CommandGroup>
            {props.data.map((item) => (
              <CommandItem
                key={item.value}
                onSelect={(currentValue) => {
                  props.setValue(currentValue === props.value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    props.value === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}