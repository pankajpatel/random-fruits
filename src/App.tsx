import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { IntlProvider, MessageFormatElement } from 'react-intl';
import { QueryClientProvider } from 'react-query';

import { LocaleContext } from '@app/contexts/Locale';
import { GlobalStyles } from '@app/GlobalStyles';
import { RoutedApp } from '@app/pages';
import { queryClient } from '@app/utils/queryClient';
import { Container } from '@app/ds/Container';

import localeEN from '@app/locales/en.json';
import localeFR from '@app/locales/fr.json';

const LOCALES: Record<
  Locale,
  Record<string, string> | Record<string, MessageFormatElement[]> | undefined
> = {
  en: localeEN,
  fr: localeFR,
};

export const App = (): JSX.Element => {
  const [locale, setLocale] = useState<Locale>('en');

  return (
    <QueryClientProvider client={queryClient}>
      <LocaleContext.Provider value={{ locale, setLocale }}>
        <IntlProvider locale={locale} messages={LOCALES[locale]}>
          <Helmet>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="true"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;600&display=swap"
              rel="stylesheet"
            />
          </Helmet>
          <GlobalStyles />
          <Container>
            <RoutedApp />
          </Container>
        </IntlProvider>
      </LocaleContext.Provider>
    </QueryClientProvider>
  );
};
