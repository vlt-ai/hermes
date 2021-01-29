import * as React from "react"
import { TerminalContext } from "../contexts/TerminalContext"
import { StyleContext } from "../contexts/StyleContext"

export default function Controls(props: any) {

  const { editorInput, setEditorInput } = React.useContext(TerminalContext)
  const style = React.useContext(StyleContext)
  const { showControlButtons, controlButtonLabels, maximize, minimize } = props

  const onPress = (buttonLabel: string) => {
    if (buttonLabel === "maximize") maximize()
    else if (buttonLabel === "minimize") minimize()
    else if (buttonLabel === "close") {
      setEditorInput(editorInput + "cheese")
    }
  }

  const controlButtons = showControlButtons
    ? controlButtonLabels.map((buttonLabel: string) => (
      <a
        onClick={() => onPress(buttonLabel)}
        key={buttonLabel}
        className={`${style.consoleCtrl} ${style[buttonLabel]}`}
      />
    ))
    : null;

  return <div className={style.controls}>{controlButtons}</div>;
}
