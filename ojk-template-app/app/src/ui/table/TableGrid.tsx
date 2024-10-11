import {
  DataGrid,
  GridColDef,
  GridColumnResizeParams,
  GridFilterInitialState,
  GridFilterModel,
  GridSortModel,
  GridSortingInitialState,
  GridRowSelectionModel,
  GridColumnVisibilityModel,
  GridRowIdGetter,
} from "@mui/x-data-grid";
import { FC, useCallback, useEffect, useState } from "react";
import { ruRU } from "@mui/x-data-grid/locales";
import { colors } from "@mui/material";
import { GridApiCommunity } from "@mui/x-data-grid/internals";

const projectId = "recall_service";

const styles = {
  root: {
    "& .MuiDataGrid-columnHeader": {
      transition: "all 0.3s",
    },
    "& .MuiDataGrid-cell": {
      display: "flex",
      alignItems: "center",
      position: "relative",
      backgroundColor: "white",
      transition: "all 0.3s",
    },
    "& .MuiDataGrid-footerContainer, & .MuiDataGrid-columnHeader, & .MuiDataGrid-filler":
      {
        backgroundColor: colors.grey[100],
      },
    "& .MuiDataGrid-cell:not(:last-child)::after": {
      content: "''",
      display: "block",
      position: "absolute",
      right: "0",
      top: "50%",
      transform: "translateY(-50%)",
      height: "30px",
      width: "1px",
      opacity: "0.15",
      backgroundColor: "black",
    },
    "& .MuiDataGrid-virtualScroller": {
      scrollbarWidth: "thin",
      overflow: "auto !important",
    },

    "& .MuiDataGrid-main": {
      overflow: "auto",
    },
    "& .MuiDataGrid-scrollbar, & .MuiDataGrid-filler": {
      display: "none",
    },
  },
};

interface IProps {
  id: string;
  columns: GridColDef[];
  isLoading: boolean;
  rows?: readonly any[] | undefined;
  checkboxSelection?: boolean;
  onCheckboxSelectChange?: (model: GridRowSelectionModel) => void;
  apiRef?: React.MutableRefObject<GridApiCommunity>;
  handleProcessRowUpdate?: ((newRow: any, oldRow: any) => any) | undefined;
  getRowId?: GridRowIdGetter<any> | undefined;
  maxHeight?: string;
}

const getTableDataFromLocalStorage = (id: string) => {
  let tables: any = {};
  const tableData = localStorage.getItem(projectId);

  if (tableData) tables = JSON.parse(tableData);
  if (!tables[id]) tables[id] = {};
  if (!tables[id].colWidth) tables[id].colWidth = {};
  if (!tables[id].filter) tables[id].filter = {};
  if (!tables[id].sorting) tables[id].sorting = [];
  if (!tables[id].page) tables[id].page = {};
  return tables;
};

const setKeyValuePairsForFileConfig = (columns: GridColDef[], id: string) => {
  try {
    const tables = getTableDataFromLocalStorage(id);
    const table = tables[id];

    table.config = columns.map((column, index) => ({
      label: column.headerName,
      value: column.field,
      position: index + 1,
    }));
    localStorage.setItem(projectId, JSON.stringify(tables));
  } catch (error) {
    console.error(
      "Ошибка сохранения конфига dataGrid в localStorage \n",
      error
    );
  }
};

const getInitialSorting = (id: string): GridSortingInitialState | undefined => {
  let tables = localStorage[projectId];

  if (tables) {
    tables = JSON.parse(tables);
    if (
      tables.hasOwnProperty(id) &&
      tables[id].hasOwnProperty("sorting") &&
      tables[id].sorting.length > 0
    ) {
      return { sortModel: tables[id].sorting };
    }
  }
  return undefined;
};

const getInitialFilters = (id: string): GridFilterInitialState | undefined => {
  let tables = localStorage[projectId];

  if (tables) {
    tables = JSON.parse(tables);
    if (
      tables.hasOwnProperty(id) &&
      tables[id].hasOwnProperty("filter") &&
      tables[id].filter.hasOwnProperty("items") &&
      tables[id].filter.items.length > 0
    ) {
      return { filterModel: tables[id].filter };
    }
  }
  return undefined;
};

const TableGrid: FC<IProps> = ({
  id,
  columns,
  isLoading,
  rows,
  checkboxSelection = false,
  onCheckboxSelectChange,
  apiRef,
  handleProcessRowUpdate,
  getRowId = (row) => {
    if (row.id) return row.id;
    if (row.Id) return row.Id;
  },
  maxHeight,
}) => {
  const [cols, setCols] = useState(columns);

  useEffect(() => {
    setKeyValuePairsForFileConfig(cols, id);
  }, [cols]);

  const tableRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      const tableData: any = JSON.parse(
        String(localStorage.getItem(projectId))
      );

      const colWidth = Math.floor(node.clientWidth / columns.length);
      setCols((cols) =>
        cols.map((col) => {
          return { ...col, width: colWidth };
        })
      );

      if (tableData && tableData[id] && tableData[id].colWidth) {
        const colWidth = tableData[id].colWidth;

        setCols((cols) => {
          cols = cols.map((col) => {
            if (colWidth[col.field]) col.width = colWidth[col.field];
            return col;
          });
          return cols;
        });
      }
    }
  }, []);

  const onColumnWidthChange = (params: GridColumnResizeParams) => {
    const field = params.colDef.field;
    const colWidth = params.colDef.computedWidth;
    const tables = getTableDataFromLocalStorage(id);
    tables[id].colWidth[field] = colWidth;
    localStorage.setItem(projectId, JSON.stringify(tables));
  };

  const sorting = getInitialSorting(id);
  const onSortModelChange = (model: GridSortModel) => {
    //Достаём данные из localStorage и обновляем их
    const tables = getTableDataFromLocalStorage(id);
    tables[id].sorting = model;
    localStorage.setItem(projectId, JSON.stringify(tables));
  };

  const filter = getInitialFilters(id);
  const onFilterModelChange = (model: GridFilterModel) => {
    //Достаём данные из localStorage и обновляем их
    const tables = getTableDataFromLocalStorage(id);
    tables[id].filter = model;
    localStorage.setItem(projectId, JSON.stringify(tables));
  };

  const onColumnVisibilityModelChange = (model: GridColumnVisibilityModel) => {
    if ("__check__" in model && !model.__check__) {
      return setcolumnVisibilityModel({ ...model, __check__: true });
    } else return setcolumnVisibilityModel(model);
  };

  const [columnVisibilityModel, setcolumnVisibilityModel] =
    useState<GridColumnVisibilityModel>({});

  return (
    <DataGrid
      apiRef={apiRef}
      editMode="row"
      processRowUpdate={handleProcessRowUpdate}
      onProcessRowUpdateError={(error) => {
        console.error(error);
      }}
      getRowHeight={() => "auto"}
      getRowId={getRowId}
      ref={tableRef}
      sx={{
        ...styles.root,
        "& .MuiDataGrid-virtualScrollerContent": { maxHeight },
      }}
      loading={isLoading}
      rows={rows ?? []}
      autoHeight
      columns={cols}
      initialState={{
        sorting,
        filter,
      }}
      hideFooter
      disableRowSelectionOnClick
      localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
      onColumnResize={onColumnWidthChange}
      onSortModelChange={onSortModelChange}
      onFilterModelChange={onFilterModelChange}
      checkboxSelection={checkboxSelection}
      onRowSelectionModelChange={(ids) => {
        if (onCheckboxSelectChange) onCheckboxSelectChange(ids);
      }}
      columnVisibilityModel={columnVisibilityModel}
      onColumnVisibilityModelChange={onColumnVisibilityModelChange}
      slotProps={
        {
          // panel: { placement: "top-start" },
        }
      }
    />
  );
};
export default TableGrid;
