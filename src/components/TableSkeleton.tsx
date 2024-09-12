import { TableRow, TableCell, Skeleton } from "@mui/material";

export const renderSkeletonRows = () => {
  return Array.from({ length: 5 }).map((_, index) => (
    <TableRow key={index}>
      <TableCell>
        <Skeleton variant="text" width={100} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width={200} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width={60} />
      </TableCell>
      <TableCell>
        <Skeleton variant="rectangular" width={30} height={30} />
      </TableCell>
    </TableRow>
  ));
};
