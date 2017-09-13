import { create } from 'jss';
import preset from 'jss-preset-default';
import { green, red } from 'material-ui/colors';
import { createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/createPalette';
import { SheetsRegistry } from 'react-jss';

export const jss = create(preset());

export const sheetsRegistry = new SheetsRegistry();

export const theme = createMuiTheme({
  palette: createPalette({
    primary: green,
    secondary: red,
    type: 'light',
  }),
});
