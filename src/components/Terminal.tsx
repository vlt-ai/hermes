import * as React from "react";
import PropTypes from "prop-types";
import useClippy from "use-clippy"
import { useWindowSize } from '@react-hook/window-size'
import { isMobile } from "react-device-detect";
import { Rnd } from 'react-rnd'

import { StyleContext } from "../contexts/StyleContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useClickOutsideEvent } from "../hooks/terminal";

import Controls from "./Controls";
import Editor from "./Editor";

export default function Terminal(props: any) {
  const wrapperRef = React.useRef(null);
  const [consoleFocused, setConsoleFocused] = React.useState(!isMobile);
  const style = React.useContext(StyleContext);
  const themeStyles = React.useContext(ThemeContext);

  useClickOutsideEvent(wrapperRef, consoleFocused, setConsoleFocused);

  // get all props destructively
  const {
    draggable,
    commandPassThrough,
    blockInput,
    isLoading,
    caret,
    theme,
    showControlButtons,
    controlButtonLabels,
    prompt,
    commands,
    welcomeMessage,
    errorMessage,
    enableInput
  } = props

  const rnd = React.createRef<Rnd>()
  const size = useWindowSize()

  const minimize = () => {
    if (rnd.current) rnd.current.updateSize({ width: 500, height: 200 })
  }

  const maximize = () => {
    const [width, height] = size
    if (rnd.current) rnd.current.updateSize({ width, height })
  }

  return (
    <>
      {
        draggable ?
          <Rnd
            ref={rnd}
            default={{
              x: 150,
              y: 205,
              width: 500,
              height: 200
            }
            }
            minWidth={500}
            minHeight={200}
            bounds="window"
            cancel=".cancel"
          >
            <div
              ref={wrapperRef}
              id={style.terminalContainer}
              className={`${style[`theme--${theme}`]}`}
            >
              <div className={`${style.terminal}`} style={{ background: themeStyles.themeToolbarColor, color: themeStyles.themeColor }}>
                <Controls
                  minimize={minimize}
                  maximize={maximize}
                  consoleFocused={consoleFocused}
                  showControlButtons={showControlButtons}
                  controlButtonLabels={controlButtonLabels}
                />
                <div className="cancel" style={{ width: "100%", height: "100%" }}>
                  <Editor
                    commandPassThrough={commandPassThrough}
                    blockInput={blockInput}
                    isLoading={isLoading}
                    caret={caret}
                    consoleFocused={consoleFocused}
                    prompt={prompt}
                    commands={commands}
                    welcomeMessage={welcomeMessage}
                    errorMessage={errorMessage}
                    enableInput={enableInput}
                  />
                </div>
              </div>
            </div>
          </Rnd > : <div
            ref={wrapperRef}
            id={style.terminalContainer}
            className={`${style[`theme--${theme}`]}`}
          >
            <div className={`${style.terminal}`} style={{ background: themeStyles.themeToolbarColor, color: themeStyles.themeColor }}>
              <Controls
                minimize={minimize}
                maximize={maximize}
                consoleFocused={consoleFocused}
                showControlButtons={showControlButtons}
                controlButtonLabels={controlButtonLabels}
              />
              <div className="cancel" style={{ width: "100%", height: "100%" }}>
                <Editor
                  commandPassThrough={commandPassThrough}
                  blockInput={blockInput}
                  isLoading={isLoading}
                  caret={caret}
                  consoleFocused={consoleFocused}
                  prompt={prompt}
                  commands={commands}
                  welcomeMessage={welcomeMessage}
                  errorMessage={errorMessage}
                  enableInput={enableInput}
                />
              </div>
            </div>
          </div>
      }
    </>
  );
}

Terminal.propTypes = {
  draggable: PropTypes.bool,
  commandPassThrough: PropTypes.func,
  blockInput: PropTypes.bool,
  isLoading: PropTypes.bool,
  enableInput: PropTypes.bool,  //added both props with their types
  caret: PropTypes.bool,
  theme: PropTypes.string,
  showControlButtons: PropTypes.bool,
  controlButtonLabels: PropTypes.arrayOf(PropTypes.string),
  prompt: PropTypes.string,
  commands: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ])),
  welcomeMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.node]),
  errorMessage: PropTypes.string
};

Terminal.defaultProps = {
  draggable: false,
  commandPassThrough: null,
  blockInput: false,
  isLoading: false,
  enableInput: true,
  caret: true,
  theme: "light",
  showControlButtons: true,
  controlButtonLabels: ["close", "minimize", "maximize"],
  prompt: ">>>",
  commands: {},
  welcomeMessage: "",
  errorMessage: "not found!"
};
