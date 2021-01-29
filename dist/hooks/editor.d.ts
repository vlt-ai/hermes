export declare const useEditorInput: (consoleFocused: boolean, editorInput: string, setEditorInput: any, setProcessCurrentLine: any, enableInput: boolean, blockInput: boolean) => void;
export declare const useBufferedContent: (prompt: string, processCurrentLine: any, setProcessCurrentLine: any, currentText: any, setCurrentText: any, commandPassThrough: any) => void;
export declare const updateBlocking: (blockInput: boolean, setProcessCurrentLine: any) => void;
export declare const useCurrentLine: (caret: boolean, consoleFocused: boolean, prompt: string, enableInput: boolean, commandPassThrough: any, blockInput: boolean) => JSX.Element;
export declare const useScrollToBottom: (changesToWatch: any, wrapperRef: any) => void;
