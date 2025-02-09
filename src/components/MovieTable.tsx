import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TablePagination,
  CircularProgress,
  Typography,
  Avatar,
} from "@mui/material";
import { useMovies } from "../hooks/useMovies";

const PAGE_SIZE = 5;

export default function MovieTable() {
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, error, isLoading } = useMovies(
    page * PAGE_SIZE,
    PAGE_SIZE,
    searchQuery
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <Typography variant="h4" className="mb-4">
        Movies
      </Typography>

      <TextField
        label="Search..."
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearch}
      />

      <div className="min-h-[500px]">
        <>
          {isLoading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <CircularProgress />
            </div>
          ) : error ? (
            <Typography color="error" align="center">
              Error: {error.message}
            </Typography>
          ) : (
            <>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>Image</b>
                      </TableCell>
                      <TableCell>
                        <b>Title</b>
                      </TableCell>
                      <TableCell>
                        <b>Description</b>
                      </TableCell>
                      <TableCell>
                        <b>Rating</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.items.map((movie) => (
                      <TableRow key={movie.id}>
                        <TableCell>
                          <Avatar
                            src={movie.image_url}
                            alt={movie.title}
                            sx={{ width: 60, height: 60 }}
                          />
                        </TableCell>
                        <TableCell>{movie.title}</TableCell>
                        <TableCell>{movie.description}</TableCell>
                        <TableCell>{movie.rating}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                component="div"
                count={data?.total ?? 0}
                page={page}
                onPageChange={handlePageChange}
                rowsPerPage={PAGE_SIZE}
                rowsPerPageOptions={[PAGE_SIZE]}
              />
            </>
          )}
        </>
      </div>
    </div>
  );
}
