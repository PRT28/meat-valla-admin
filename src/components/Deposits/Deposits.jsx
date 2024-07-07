import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from '../Title/Title';


export default function Deposits({data}) {
  const date = new Date();

  const [sum, setSum] = React.useState(0);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  React.useEffect(() => {
    let temp = 0;
    for (let i = 0; i < data.length; ++i) {
      temp += data[i].amount;
    };
    setSum(temp);
  }, [data]);


  return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4">
        Rs. {sum}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {`${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`}
      </Typography>
    </React.Fragment>
  );
}