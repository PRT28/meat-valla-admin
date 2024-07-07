import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from '../components/Chart/Chart';
import Deposits from '../components/Deposits/Deposits';
import Orders from '../components/OrdersSmall/OrdersSmall';
import { collection, query, getDocs, where, limit  } from "firebase/firestore";
import { db } from '../utils/firebase';


export default function Home() {

  const [data, setData] = React.useState([]);

    const getData = async () => {

      var start = new Date();
      start.setUTCHours(0,0,0,0);

      var end = new Date();
      end.setUTCHours(23,59,59,999);

      const q = query(collection(db, "orders"), where("data", ">=", start.toISOString() ), where("data", "<=", end.toISOString()), limit(5));

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
          
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart data={data} />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits data={data} />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders data={data} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
  );
}