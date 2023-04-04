import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
// by default padding is included in total height and width percentages
* {
  box-sizing: border-box;
}

body {
  margin: 0px;
  height: 100vh;
  width: 100vw;
  font-family: "Lato","Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 15px;
  background-color: ${(props) => props.theme.color.background.body};
}

&::-webkit-scrollbar {
  width: 10px;
}

&::-webkit-scrollbar-track {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  width: 5px;
  height: 15px;
}

&::-webkit-scrollbar-thumb {
  background-color: ${(props) => props.theme.color.scrollbar};
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
`
