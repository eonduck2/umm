import React, { createContext, useContext, ReactNode } from "react";

interface MemberInfoTableContextType {
  caption: string;
  head: string[];
  data: Array<{ [key: string]: string }>;
  buttonValue: string;
  setCaption: (caption: string) => void;
  setHead: (head: string[]) => void;
  setData: (data: Array<{ [key: string]: string }>) => void;
  setButtonValue: (buttonValue: string) => void;
}

const MemberInfoTableContext = createContext<
  MemberInfoTableContextType | undefined
>(undefined);

export const MemberInfoTableProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [caption, setCaption] = React.useState<string>("Default Caption");
  const [head, setHead] = React.useState<string[]>([]);
  const [data, setData] = React.useState<Array<{ [key: string]: string }>>([]);
  const [buttonValue, setButtonValue] =
    React.useState<string>("Default Button");

  return (
    <MemberInfoTableContext.Provider
      value={{
        caption,
        head,
        data,
        buttonValue,
        setCaption,
        setHead,
        setData,
        setButtonValue,
      }}
    >
      {children}
    </MemberInfoTableContext.Provider>
  );
};

export const useMemberInfoTable = (): MemberInfoTableContextType => {
  const context = useContext(MemberInfoTableContext);
  if (context === undefined) {
    throw new Error();
  }
  return context;
};
