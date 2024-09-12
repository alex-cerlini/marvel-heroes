import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import { useLocale, useTranslations } from "next-intl";
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

  const t = useTranslations("Home");

  return (
    <Select onValueChange={onSelectChange}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder={selectPlaceHolder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t("selectLanguage")}</SelectLabel>
          <SelectItem value="en" id="en">
            English
          </SelectItem>
          <SelectItem value="pt" id="pt">
            Português
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
