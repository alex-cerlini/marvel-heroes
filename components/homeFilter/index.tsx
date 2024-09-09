"use client";
import { Input } from "@/components/shadcn/input";
import { Eraser, SearchIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../shadcn/tooltip";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { InputsProps } from "./types";
import { FiltersContext } from "@/context/filters";

export const HomeFilter = () => {
  const { updateInput } = useContext(FiltersContext);
  const handleForm = (formData: InputsProps) => {
    updateInput(formData.heroValue);
  };

  const handleClearForm = () => {
    updateInput("");
  };

  const { register, handleSubmit } = useForm<InputsProps>();

  return (
    <form className="mt-8 flex gap-4" onSubmit={handleSubmit(handleForm)}>
      <Input placeholder="Enter your hero name" {...register("heroValue")} />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <SearchIcon className="w-full h-full" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Search</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger type="reset" onClick={handleClearForm}>
            <Eraser className="w-full h-full" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Clear</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </form>
  );
};
