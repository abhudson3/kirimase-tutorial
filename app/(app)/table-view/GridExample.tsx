// "use client";
// import { AgGridReact } from "ag-grid-react"; // React Grid Logic
// import { useMemo, useState } from "react";
// // import CustomTooltip from "./ui/customTooltip";
// import "ag-grid-community/styles/ag-grid.css"; // Core CSS
// import "ag-grid-community/styles/ag-theme-alpine.css"; // Theme
// import "./ui/styles.css"
// interface Props {
//   gridData: any;
//   columnDefinitions: any;
//   admin: boolean;
// }

// export default function GridExample({
//   gridData,
//   columnDefinitions,
//   admin,
// }: Props) {
//   const [rowData, setRowData] = useState(gridData);

//   const [colDefs, setColDefs] = useState(columnDefinitions);
//   const defaultColDef = useMemo(
//     () => ({
//       sortable: true,
//       filter: true,
//       flex:1,
//     //   tooltipComponent: CustomTooltip,
//     }),
//     []
//   );
//   return (
//     <div className={"mx-auto sm:w-full md:w-full " + (admin ? 'lg:w-full h-[80vh]' : 'lg:w-5/6 h-[85vh]')}>
//     <div
//       className="ag-theme-alpine mx-auto my-4"
//       style={{ height: '100%', width: '100%' }}
//     >
//       <AgGridReact
//         rowData={rowData}
//         pagination={true}
//         defaultColDef={defaultColDef}
//         columnDefs={colDefs}
//         paginationAutoPageSize={true}
//         // tooltipShowDelay={100}
//         // tooltipHideDelay={10000}
//         viewportRowModelPageSize={1}
//         viewportRowModelBufferSize={0}
//       />
//     </div>
//     </div>
//   );
// }
