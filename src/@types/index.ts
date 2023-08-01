export interface CusProps {
  id?: number;
  callerName: string;
  phoneNumber: string;
  callNotes: string;
  status: boolean;
}

export interface EditProps {
  id?: IDProps;
  editName: string;
  editPhone: string;
  editNotes: string;
}

export interface CustomerState {
  cusLists: CusProps[];
  editMode: boolean;
  errorMessage: string;
}

export interface IDProps {
  id?: number | undefined;
}

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
      info: string;
      warn: string;
    };
    tonalOffset: number;
  }

  interface ThemeOptions {
    status?: {
      danger?: string;
      info?: string;
      warn?: string;
    };
    tonalOffset?: number;
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    ochre: Palette["primary"];
  }

  interface PaletteOptions {
    ochre?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/styles" {
  interface PaletteColor {
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    ochre: true;
  }
}
