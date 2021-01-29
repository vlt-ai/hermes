import * as React from "react";
import * as Terminal from "./components/Terminal";
import * as ContextProvider from "./contexts";
import { TerminalContextProvider as _TerminalContextProvider, TerminalContext as _TerminalContext } from "./contexts/TerminalContext"

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export function ReactTerminal(props: any): any {
  return (
    <ContextProvider.default>
      <Terminal.default {...props} />
    </ContextProvider.default>
  );
}

export const TerminalContextProvider = _TerminalContextProvider;
export const TerminalContext = _TerminalContext

export default {
  ReactTerminal,
  TerminalContextProvider
}
