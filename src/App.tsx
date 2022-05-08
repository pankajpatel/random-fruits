import { useState } from "react";
import { IntlProvider, MessageFormatElement } from "react-intl";
import { QueryClientProvider } from "react-query";

import { LocaleContext } from "@app/contexts/Locale";
import { GlobalStyles } from "@app/GlobalStyles";
import { RoutedApp } from "@app/pages";
import { queryClient } from "@app/utils/queryClient";

import localeEN from "@app/locales/en.json";
import localeFR from "@app/locales/fr.json";

const LOCALES: Record<
  Locale,
  Record<string, string> | Record<string, MessageFormatElement[]> | undefined
> = {
  en: localeEN,
  fr: localeFR,
};

export const App = (): JSX.Element => {
  const [locale, setLocale] = useState<Locale>("en");
  console.log("locale", locale);

  return (
    <QueryClientProvider client={queryClient}>
      <LocaleContext.Provider value={{locale, setLocale}}>
        <IntlProvider locale={locale} messages={LOCALES[locale]}>
          <GlobalStyles />
          <RoutedApp />
        </IntlProvider>
      </LocaleContext.Provider>
    </QueryClientProvider>
  );
};
