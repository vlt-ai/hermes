import * as React from "react"
import { isMobile } from "react-device-detect"

import { StyleContext } from "../contexts/StyleContext"
import { ThemeContext } from "../contexts/ThemeContext"
import { TerminalContext } from "../contexts/TerminalContext"

import TextareaAutosize from 'react-textarea-autosize';

export const useEditorInput = (
  consoleFocused: boolean,
  editorInput: string,
  setEditorInput: any,
  setProcessCurrentLine: any,
  enableInput: boolean,  //enableInput parameter
  blockInput: boolean,
) => {

  const { getPreviousCommand, getNextCommand } = React.useContext(TerminalContext);
  const handleKeyDownEvent = (event: any) => {

    if (blockInput || !consoleFocused || !enableInput) return
    event.preventDefault()
    const eventKey = event.key

    if (eventKey === "Enter") {
      setProcessCurrentLine(true)
      return
    }

    let nextInput = null

    if (eventKey === "Backspace") {
      nextInput = editorInput.slice(0, -1);
    } else if (eventKey === "ArrowUp") {
      nextInput = getPreviousCommand()
    } else if (eventKey === "ArrowDown") {
      nextInput = getNextCommand()
    } else {
      nextInput = eventKey && eventKey.length === 1 ? editorInput + eventKey : editorInput;
    }

    setEditorInput(nextInput);
    setProcessCurrentLine(false);
  }

  React.useEffect(() => {
    // bind the event listener
    document.addEventListener("keydown", handleKeyDownEvent);
    return () => {
      // nbind the event listener on clean up
      document.removeEventListener("keydown", handleKeyDownEvent);
    };
  })
}

export const useBufferedContent = (
  prompt: string,
  processCurrentLine: any,
  setProcessCurrentLine: any,
  currentText: any,
  setCurrentText: any,
  commandPassThrough: any
) => {

  const { bufferedContent, setBufferedContent } = React.useContext(TerminalContext)
  const themeStyle = React.useContext(ThemeContext)

  React.useEffect(
    () => {

      if (!processCurrentLine) return

      const processCommand = async (text: string) => {

        if (text === "") {
          let newline = <><span style={{ color: themeStyle.themePromptColor }}> {prompt} </span> <br /></>
          setBufferedContent(<>{bufferedContent}{newline}</>)
          setCurrentText("")
          setProcessCurrentLine(false)
        } else if (text === "clear") {
          setBufferedContent("")
          setCurrentText("")
          setProcessCurrentLine(false)
          if (commandPassThrough) commandPassThrough(text)
        } else {
          setCurrentText("")
          if (commandPassThrough) commandPassThrough(text)
        }

      }
      processCommand(currentText);
    }, [processCurrentLine]
  );
};

export const updateBlocking = (
  blockInput: boolean,
  setProcessCurrentLine: any
) => {
  React.useEffect(() => {
    if (blockInput) setProcessCurrentLine(true)
    else setProcessCurrentLine(false)
  }, [blockInput])
}

export const useCurrentLine = (
  caret: boolean,  // caret parameter 
  consoleFocused: boolean,
  prompt: string,
  enableInput: boolean,  //enableInput parameter
  commandPassThrough: any,
  blockInput: boolean
) => {

  const style = React.useContext(StyleContext);
  const themeStyle = React.useContext(ThemeContext);
  const { editorInput, setEditorInput, appendCommandToHistory } = React.useContext(TerminalContext);
  const mobileInputRef = React.useRef(null);
  const [processCurrentLine, setProcessCurrentLine] = React.useState(false);

  React.useEffect(
    () => {
      if (!isMobile) return
      if (consoleFocused) mobileInputRef.current.focus();
    }, [consoleFocused]
  )

  React.useEffect(
    () => {
      if (!processCurrentLine) return
      appendCommandToHistory(editorInput);
    }, [processCurrentLine]
  )

  const mobileInput = isMobile && enableInput ? ( //enableInput functionality on mobile
    <div className={style.mobileInput}>
      <input
        type="text"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        value={editorInput}
        onChange={(event) => setEditorInput(event.target.value)}
        ref={mobileInputRef}
      />
    </div>
  ) : null

  const currentLine = !processCurrentLine ? (
    <div style={{ flex: 1, flexDirection: "row" }}>
      <span style={{ color: themeStyle.themePromptColor, verticalAlign: "top" }}>{prompt}</span>
      <div className={style.lineText}>
        <TextareaAutosize autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          value={editorInput}
          className={style.textbox}
          style={{ backgroundColor: themeStyle.themeBGColor, width: "80%", color: "white", border: "none", outline: "none", resize: "none" }}
          minRows={1}
          maxRows={10}
          onChange={(event) => setEditorInput(event.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') setProcessCurrentLine(true)
          }}
        />
        {/* {consoleFocused && caret ? (  //if caret isn't true, caret won't be displayed
          <span className={style.caret}>
            <span className={style.caretAfter} style={{ background: themeStyle.themeColor }} />
          </span>
        ) : null} */}
      </div>
    </div>
  ) : (
      <>
        <div className={style.lineText}>
          {consoleFocused && caret ? ( //if caret isn't true, caret won't be displayed
            <span className={style.caret}>
              <span className={style.caretAfter} style={{ background: themeStyle.themeColor }} />
            </span>
          ) : null}
        </div>
      </>
    );

  // useEditorInput(
  //   consoleFocused,
  //   editorInput,
  //   setEditorInput,
  //   setProcessCurrentLine,
  //   enableInput, // enableInput from useCurrentLine()
  //   blockInput
  // )

  useBufferedContent(
    prompt,
    processCurrentLine,
    setProcessCurrentLine,
    editorInput,
    setEditorInput,
    commandPassThrough
  )

  updateBlocking(
    blockInput,
    setProcessCurrentLine
  )

  // navigator.clipboard.writeText(this.state.textToCopy)

  return currentLine
};

export const useScrollToBottom = (changesToWatch: any, wrapperRef: any) => {
  React.useEffect(
    () => {
      // eslint-disable-next-line no-param-reassign
      wrapperRef.current.scrollTop = wrapperRef.current.scrollHeight;
    },
    [changesToWatch]
  );
};
