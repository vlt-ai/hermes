import * as React from "react";

import { StyleContext } from "../contexts/StyleContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { TerminalContext } from "../contexts/TerminalContext";
import {
  useCurrentLine,
  useScrollToBottom,
} from "../hooks/editor";

import Loader from 'react-loader-spinner';

export default function Editor(props: any) {
  const wrapperRef = React.useRef(null);
  const style = React.useContext(StyleContext);
  const themeStyles = React.useContext(ThemeContext);
  const { bufferedContent } = React.useContext(TerminalContext);

  useScrollToBottom(bufferedContent, wrapperRef);

  const {
    isLoading,
    enableInput,
    welcomeMessage,
    caret,
    consoleFocused,
    prompt,
    commandPassThrough,
    blockInput
  } = props

  const currentLine = useCurrentLine(
    caret,
    consoleFocused,
    prompt,
    enableInput,
    commandPassThrough,
    blockInput
  )

  return (
    <div ref={wrapperRef} className={style.editor} style={{ background: themeStyles.themeBGColor }}>
      {(isLoading) ?
        <div className={style.loader}>
          <Loader
            type="TailSpin"
            color="white"
            width={75}
            height={75}
          />
        </div> :
        <>
          {welcomeMessage}
          {bufferedContent}
          {currentLine}
        </>
      }
    </div>
  );
}
