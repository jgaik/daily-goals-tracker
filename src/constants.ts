export const SHEET_ID = '1-ZrxZS5n-ZhD8gFgQqOoMbv8NjrOEbUvYIu02yEGYBo';

export enum SheetName {
  Completion = 'Completion',
  Comments = 'Comments',
}

export enum Route {
  Home = '/',
  About = '/about',
  Links = '/links',
}

export enum View {
  Native = 'native',
  AgGrid = 'ag-grid',
}

export const ViewOptions = [
  {
    key: View.Native,
    label: 'Native',
  },
  {
    key: View.AgGrid,
    label: 'AgGrid',
  },
] as const;

export enum LocalStorageKey {
  UseDarkMode = 'use-dark-mode',
}
