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

// id: number | undefined,
// editName: string,
// editPhone: string,
// editNotes: string
