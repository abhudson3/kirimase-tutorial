"use client";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import { useMemo, useState } from "react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // Theme
interface Props {
  gridData: any;
}

export default function GridExample({ gridData }: Props) {
  const columnDefinitions = [
    { field: "firstName", headerName: "First Name" },
    { field: "lastName", headerName: "Last Name" },
    { field: "phone", headerName: "Phone" },
    { field: "linkedIn", headerName: "LinkedIn" },
    { field: "email", headerName: "Email" },
    { field: "resumeUrl", headerName: "Resume Url" },
    { field: "university", headerName: "University" },
  ];

  const [rowData, setRowData] = useState(gridData);
  console.log(rowData);
  const [colDefs, setColDefs] = useState(columnDefinitions);
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
      editable: true,
    }),
    []
  );
  return (
    <div className={"mx-auto sm:w-full md:w-full"}>
      <div className="ag-theme-alpine mx-auto my-4" style={{ height: 500 }}>
        View Candidates
        <AgGridReact
          rowData={rowData}
          pagination={true}
          defaultColDef={defaultColDef}
          columnDefs={colDefs}
          paginationAutoPageSize={true}
        />
      </div>
    </div>
  );
}
