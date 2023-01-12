/* eslint-disable react/jsx-max-depth */
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

export const StepCheckInfoTable = ({
  rows,
}: {
  rows: string[][]
}) => {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              ココアス
            </TableCell>
            <TableCell>
              大黒さん
            </TableCell>
            <TableCell>
              相違
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(([kokoas, daikoku]) => {
            return (
              <TableRow key={kokoas}>
                <TableCell>
                  {kokoas}
                </TableCell>
                <TableCell>
                  {daikoku}
                </TableCell>
                <TableCell>
                  {kokoas === daikoku ? <CheckCircleIcon color={'success'} /> : <CancelRoundedIcon color={'error'} />}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};