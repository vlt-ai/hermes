## Make Changes and Test Quickly

Clone Package
```
git clone https://github.com/vlt-ai/volt-terminal.git
```
Install yalc which is a local npm package manager
```
yarn global add yalc
```
Build the terminal project and publish it locally to yalc.
```
yarn build && yalc publish
```
Replace the installed version with the locally built package in ragnarok.
```
yalc add volt-terminal
```
Install dependencies to ragnarok.
```
yarn install
```
Update the terminal package locally and instantly see changes anywhere package was added.
```
yarn build && yalc push
```

## Installation
You MUST login to npm with the vlt-ai scope in order to install this package
```
npm login --scope=@vlt-ai --registry=https://npm.pkg.github.com
```
Install package with NPM or YARN and add it to your development dependencies:
```
npm install @vlt-ai/volt-terminal@1.0.2
```
OR
```
yarn add @vlt-ai/volt-terminal@1.0.2
```

## Usage
```
import { ReactTerminal } from "@vlt-ai/volt-terminal";

function MyComponent(props) {
  // define custom text here
  const custom = (command: string) => {}

  return (
    <ReactTerminal
      commandPassThrough={custom}
    />
  );
}
```

Also make sure to wrap the main mountpoint around the `TerminalContextProvider`. This retains the state even when the component is unmounted and then mounted back:
```
import { TerminalContextProvider } from "@vlt-ai/volt-terminal";

ReactDOM.render(
  <TerminalContextProvider>
    <App/>
  </TerminalContextProvider>,
  rootElement
);
```

## Creating custom themes
The component comes with few in-built themes: light, dark and dracula. You can create a custom themes by passing `themes` parameter in props, as follows:

```
<ReactTerminal
  commands={commands}
  themes={{
    myCustomTheme: {
      themeBGColor: "#272B36",
      themeToolbarColor: "#DBDBDB",
      themeColor: "#FFFEFC",
      themePromptColor: "#a917a8"
    }
  }}
  theme="myCustomTheme"
/>
```

## Props
| name | description | default |
|--|--|--|
| theme | Theme of the terminal | "light" |
| themes | Themes object to supply custom themes | null |
| showControlButtons | Whether to show the control buttons at the top of the terminal | true |
| prompt | Terminal prompt | >>>
| commandPassThrough | propagates input text to any custom function you would like
| blockInput | blocks user from typing in the terminal in case you run asynchronous tasks
| isLoading | replaces terminal screen with a loading bar in case you're dependent on some external factor whilst using the terminal
| welcomeMessage | A welcome message to show at the start, before the prompt begins | null
| enableInput	| Allows a user to type into the terminal	| true
| caret	| Determines whether or not the caret highlight is shown at the end of the typed text | true
