import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import Loading from "../../app/layout/Loading";
import { Order } from "../../app/models/order";
import { Button } from "@mui/material";
import { formatCurrency } from "../../app/util/util";
import OrderDetails from "./OrderDetails";

const Orders = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedOrderNumber, setSelectedOrderNumber] = useState(0);

  useEffect(() => {
    setLoading(true);
    agent.Orders.list()
      .then((orders) => setOrders(orders))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading message='Loading Orders...' />;

  if (selectedOrderNumber > 0)
    return (
      <OrderDetails
        order={orders?.find((o) => o.id === selectedOrderNumber)!}
        setSelectedOrder={setSelectedOrderNumber}
      />
    );

  return (
    <TableContainer component={Paper}>
      <Table /*sx={{ minWidth: 650 }}*/ aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Order Number</TableCell>
            <TableCell align='right'>Total</TableCell>
            <TableCell align='right'>Order Date</TableCell>
            <TableCell align='right'>Order State</TableCell>
            <TableCell align='right'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((order) => (
            <TableRow
              key={order.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component='th' scope='row' style={{ width: 75 }}>
                {order.id}
              </TableCell>
              <TableCell align='right' style={{ width: 75 }}>
                {formatCurrency(order.total, true)}
              </TableCell>
              <TableCell align='right' style={{ width: 75 }}>
                {order.orderDate.split("T")[0]}
              </TableCell>
              <TableCell align='right' style={{ width: 75 }}>
                {order.orderStatus}
              </TableCell>
              <TableCell align='right' style={{ width: 75 }}>
                <Button onClick={() => setSelectedOrderNumber(order.id)}>
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Orders;
