import { ChangeEvent, ReactNode, useContext } from "react";
import { Header } from "@app/ds/Header";
import { Select } from "@app/ds/Select";
import { LocaleContext } from "@app/contexts/Locale";
import styled from "styled-components";

const H2 = styled.h2`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const PageHeader = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const { locale, setLocale } = useContext(LocaleContext);
  return (
    <Header>
      <H2>{children}</H2>
      <Select
        value={locale}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          console.log(e.target.value, locale);

          setLocale(e.target.value as Locale);
        }}
      >
        <option value="en">🇬🇧</option>
        <option value="fr">🇫🇷</option>
      </Select>
    </Header>
  );
};
