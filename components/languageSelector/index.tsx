import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import { useLocale } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

export const LanguageSelector = () => {
  const router = useRouter();
  const localeActive = useLocale();
  const searchParams = useSearchParams();
  const activePage = searchParams.get("page") || 1;

  const onSelectChange = (value: string) => {
    router.replace("/" + value + `?page=${activePage}`);
  };

  const languages = [
    {
      value: "en",
      label: "English",
    },
    {
      value: "pt",
      label: "Português",
    },
  ];

  const selectPlaceHolder =
    languages.find((language) => language.value === localeActive)?.label ??
    languages[0].label;

  return (
    <Select onValueChange={onSelectChange}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder={selectPlaceHolder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select a language</SelectLabel>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="pt">Português</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
