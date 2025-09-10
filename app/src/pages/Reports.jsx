import { Card, CardContent, Typography, LinearProgress, Chip} from "@mui/material"

export default function Reports() {

  // const stopLightOverview = ({ OPSCAP, SYSCAP }) => {
  //   const getStopLight = (value) => {
  //     if (value > 75) return 
  //   }
  // }

  return (
    <>
    <div>
      <Card
      sx={{
        minWidth: 200,
        textAlign: "center",

      }}>
        <CardContent>
          
          <Typography variant ="h6">Systems Health</Typography> <br />
          <Typography> OPSCAPS</Typography> 
          <Typography>80%</Typography>
          
          <Typography>SYSCAPS</Typography>
          <Typography>72%</Typography>
          
        </CardContent>
      </Card>

        <p className="date-time">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
          aspernatur laudantium soluta nobis. In minima, adipisci velit vero
          illo dolor nobis pariatur sequi maiores provident repellat obcaecati
          laudantium? Accusamus, eligendi?
        </p>
        </div>
    </>
  );
}
