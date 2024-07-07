import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { collection, query, getDocs } from "firebase/firestore";
import { db } from '../utils/firebase';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';


export default function Orders() {

  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(null);
  const handleClose = () => setOpen(null);

    const getData = async () => {

      const q = query(collection(db, "orders"));

      const querySnapshot = await getDocs(q);
      const temp = []
      querySnapshot.forEach((doc) => {
        temp.push({...doc.data(), id: doc.id});
      });
      setData(temp);

    }

    React.useEffect(() => {
      getData();
    }, [])

    const statusHandle = status => {
      if (status === 0) {
        return <>
          <Button style={{marginRight: '10px'}} variant="outlined" color="secondary">Out for Delivery</Button>
          <Button style={{marginRight: '10px'}} variant="outlined" color="success">Delivered</Button>
          <Button style={{marginRight: '10px'}} variant="outlined" color="error">Cancel</Button>
        </>
      }
      if (status === 1) {
        return <>
          <Button style={{marginRight: '10px'}} variant="outlined" color="success">Delivered</Button>
          <Button style={{marginRight: '10px'}} variant="outlined" color="error">Cancel</Button>
        </>
      }

      if (status === 1) {
        return <>
          <Button style={{marginRight: '10px'}} variant="outlined" disabled color="success">Delivered</Button>
        </>
      }

    }

    

  return (
    <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          
          <Container maxWidth="x-lg" sx={{ mt: 4, mb: 4 }}>
            <Grid spacing={1}>
                <div style={{width: '100%', background: '#FFF', borderRadius: '12px', padding: '24px'}}>
                    {data.length !== 0 && <Table size="small">
                        <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Ship To</TableCell>
                            <TableCell>Sale Amount</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.id}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.user}</TableCell>
                            <TableCell>{row.address}</TableCell>
                            <TableCell>{row.total}</TableCell>
                            <TableCell align="right">
                                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                    <Button style={{marginRight: '10px'}} onClick={() => setOpen(row.orderDetails)} variant="outlined" color="secondary">Order Details</Button>
                                    {statusHandle(row.status)}
                                </div>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>}
                    {
                        data.length === 0 && <div>No Data</div>
                    }
                </div>
            </Grid>
          </Container>
          {open && <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
            >
            <Box 
            noValidate
            autoComplete="off"
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
            }}>
            <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                Order Details
            </Typography>
            <div>
                <table style={{border: '1px solid black'}}>
                  <tr>
                    <th style={{border: '1px solid black', padding: '12px'}}>Name</th>
                    <th style={{border: '1px solid black', padding: '12px'}}>Oty</th>
                    <th style={{border: '1px solid black', padding: '12px'}}>Price</th>
                  </tr>
                  {
                    open.map(d => <tr>
                      <td style={{border: '1px solid black', padding: '12px'}}>{d.name}</td>
                      <td style={{border: '1px solid black', padding: '12px'}}>{d.qty}</td>
                      <td style={{border: '1px solid black', padding: '12px'}}>{d.price}</td>
                    </tr>)
                  }
                </table>
            </div>
            </Box>
        </Modal>}
        </Box>
  );
}