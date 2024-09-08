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
import { useContext, useEffect } from "react";
import { InputsProps } from "./types";
import { HeroesContext } from "@/app/context/Heroes";

export const HomeFilter = () => {
  const { updateResults } = useContext(HeroesContext);

  const handleForm = (formData: InputsProps) => {
    updateResults(formData.heroValue);
  };

  const handleClearForm = () => {
    updateResults("");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsProps>();

  useEffect(() => console.log({ errors }), [errors]);

  return (
    <form className="my-8 flex gap-4" onSubmit={handleSubmit(handleForm)}>
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
