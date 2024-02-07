import { DataGrid, GridColDef } from '@mui/x-data-grid';

export interface TableProps {
  columns: GridColDef[];
  data: any[];
  rowIdKey?: string;
  pageSizeOptions?: number[];
  pageSize?: number;
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  rowIdKey,
  pageSizeOptions = [5, 10, 20, 50],
  pageSize,
}) => {
  return (
    <DataGrid
      rows={data}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: pageSize ?? pageSizeOptions[0],
          },
        },
      }}
      pageSizeOptions={pageSizeOptions}
      getRowId={(row) => (rowIdKey ? row[rowIdKey] : row.id)}
    />
  );
};

export default Table;
