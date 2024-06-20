import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { fetchUsers as getUsers, deleteAccount } from "../api";
interface Column {
  id: "phone" | "username" | "firstname" | "lastActive" | "actions";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "phone", label: "Phone number", minWidth: 170 },
 
  { id: "username", label: "Username", minWidth: 100 },
  { id: "firstname", label: "First name", minWidth: 170 },
  { id: "actions", label: "Actions", minWidth: 170 },
];



// const rows = [
//   createData("+254797168636", "kariukiamschel9@gmail.com", "Amschel Kariuki", "Admin"),
//   createData("+254797168636", "kariukiamschel9@gmail.com", "Amschel Kariuki", "Admin"),
//   createData("+254797168636", "kariukiamschel9@gmail.com", "Amschel Kariuki", "Admin"),
//   createData("+254797168636", "kariukiamschel9@gmail.com", "Amschel Kariuki", "Admin"),
//   createData("+254797168636", "kariukiamschel9@gmail.com", "Amschel Kariuki", "Admin"),
//   createData("+254797168636", "kariukiamschel9@gmail.com", "Amschel Kariuki", "Admin"),
//   createData("+254797168636", "kariukiamschel9@gmail.com", "Amschel Kariuki", "Admin"),
//   createData("+254797168636", "kariukiamschel9@gmail.com", "Amschel Kariuki", "Admin"),
//   // Add more dummy data here as needed
// ];

function Users() {

const [rows, setRows]=React.useState<Array<any>>([])
async function fetchUsers() {
  try{
const response= await getUsers();
console.log(JSON.stringify(response.data))
setRows(response.data)
  }
  catch(e){

  }
}


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  React.useEffect(()=>{
    fetchUsers();

  },[])

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "100px" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row?.phone}>
                  {columns.map((column) => {
                    if (column.id === "actions") {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Button
                            variant="contained"
                            sx={{ marginInline: "5px", height: "30px", background: "yellow", color: "black" }}
                          >
                            Suspend Account
                          </Button>
                          <Button
                            variant="contained"
                            sx={{ marginInline: "5px", height: "30px", background: "red", color: "black" }}
                            onClick={async ()=>{
                           const response=  await  deleteAccount(row._id);
                           if(response.status===201){
                            alert(`User deleted, please refresh`)
                           }
                           else{
                            alert(`Unable to delete user`)
                           }
                            }}
                          >
                            Delete Account
                          </Button>
                        </TableCell>
                      );
                    } else {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number" ? column.format(value) : value}
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default Users;
