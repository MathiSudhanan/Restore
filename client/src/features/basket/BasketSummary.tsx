import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { Basket } from "../../app/models/basket";
import { convertPrice, formatCurrency } from "../../app/util/util";
interface Props {
  basket: Basket;
}
export default function BasketSummary({ basket }: Props) {
  const subtotal =
    basket?.items.reduce(
      (sum, st) => sum + convertPrice(st.price) * st.quantity,
      0
    ) ?? 0;
  const deliveryFee = subtotal > 100 ? 0 : 5;

  return (
    <>
      <TableContainer component={Paper} variant={"outlined"}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align='right'>
                {formatCurrency(subtotal, false)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Delivery fee*</TableCell>
              <TableCell align='right'>
                {formatCurrency(deliveryFee, false)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align='right'>
                {formatCurrency(subtotal + deliveryFee, false)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span style={{ fontStyle: "italic" }}>
                  *Orders over $100 qualify for free delivery
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
