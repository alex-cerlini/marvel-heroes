"use client";
import { Input } from "@/components/shadcn/input";
import { Eraser, SearchIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/tooltip";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { InputsProps } from "./types";
import { GlobalContext } from "@/context/global";
import { useTranslations } from "next-intl";

export const HomeFilter = () => {
  const { updateInput } = useContext(GlobalContext);
  const handleForm = (formData: InputsProps) => {
    updateInput(formData.heroValue);
  };

  const handleClearForm = () => {
    updateInput("");
  };

  const { register, handleSubmit } = useForm<InputsProps>();

  const t = useTranslations("Home");

  return (
    <form className="mt-8 flex gap-4" onSubmit={handleSubmit(handleForm)}>
      <Input placeholder={t("filter")} {...register("heroValue")} />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <SearchIcon className="w-full h-full" />
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("search")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger type="reset" onClick={handleClearForm}>
            <Eraser className="w-full h-full" />
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("clear")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </form>
  );
};
