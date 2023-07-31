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
    };
  }

  interface ThemeOptions {
    status?: {
      danger?: string;
      info?: string;
    };
  }
}
