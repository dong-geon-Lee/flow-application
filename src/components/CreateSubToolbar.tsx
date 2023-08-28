// function createSubToolbar(props: EditToolbarProps | any) {
//   const { setSubRows, setSubrowModesModel, columns } = props;

//   if (subColumnEditMode) {
//     columns?.forEach((c: any) => {
//       if (c.field === "code") {
//         c.editable = true;
//       }
//     });
//   }

//   const handleSubClick = () => {
//     setSubColumnEditMode(true);
//     const id = randomId();

//     setSubRows((oldRows: any) => [
//       ...oldRows,
//       {
//         id,
//         code: "",
//         codeName: "",
//         isDeleted: false,
//         groupCode: "",
//         createUserId: "",
//         isNew: true,
//         mode: "create",
//       },
//     ]);

//     setSubrowModesModel((oldModel: any) => ({
//       ...oldModel,
//       [id]: { mode: GridRowModes.Edit, fieldToFocus: "code" },
//     }));
//   };

//   return (
//     <GridToolbarContainer>
//       <Button
//         color="primary"
//         startIcon={<AddIcon />}
//         onClick={handleSubClick}
//         disabled={columnEditMode}
//       >
//         등록하기
//       </Button>
//     </GridToolbarContainer>
//   );
// }
export {};
