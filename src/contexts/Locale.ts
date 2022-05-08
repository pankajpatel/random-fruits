import { createContext } from "react";

export interface ILocaleContext {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const LocaleContext = createContext<ILocaleContext>({
  locale: "en",
  setLocale: (newLocale: Locale) => {},
});
