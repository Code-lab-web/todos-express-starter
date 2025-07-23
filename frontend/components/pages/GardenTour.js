import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ImageCollage from "../components/ImageCollage";
import CustomizedAccordions from "../components/Accordian";
import Paper from "@mui/material/Paper"
import BottomNavigation from "@mui/material/BottomNavigation"

const Tour = () => <Container sx={{ width: 900 }}>hello</Container>;
const Tour = () => (
  <><Container sx={{ width: 900 }}>
        <Typography variant="h3" component="h1" marginTop={3}>
            Explore gardens
            <Box marginTop={3} sx={{ display: "flex" }}>
                <img src="Flower 3.png" alt="" width={325} />
                <ImageCollage />
            </Box>
            <Box>
                <Typography variant="h4" component="h1" marginTop={3}>
                    Explore the World Gardens in Stockholm
                </Typography>
                <Typography variant="body1" component="p" marginTop={3}>
                    About this garden tour (Lourem 40)
                </Typography>
            </Box>
        </Box>
    </Container><Box>
            <Box marginBottom={10}></Box>
            <Box>
                <Box marginBottom={10}></Box>
                <Typography variant="h6" component="h4" marginTop={3} marginBottom={2}>
                    Frequently Asked Questions
                </Typography>
                <CustomizedAccordions />
            </Box>
            <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation showLabels />
            </Paper>
            export default GardenTour;export default Tour;</></>