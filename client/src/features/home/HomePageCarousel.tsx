import { Paper, Box, Typography } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";

interface Props {}

const HomePageCarousel = (props: Props) => {
  var items = [
    {
      name: "Random Name #1",
      description: "Wait for the festival deals!",
      imgSrc: "/images/hero1.jpg",
    },
    {
      name: "Random Name #2",
      description: "Clearance Sale - upto 50% discounts",
      imgSrc: "/images/hero2.jpg",
    },
    {
      name: "Random Name #3",
      description: "Top Deals - on Boots",
      imgSrc: "/images/hero3.jpg",
    },
  ];

  return (
    <Carousel
      navButtonsProps={{
        // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
        style: {
          // backgroundColor: "cornflowerblue",
          borderRadius: 0,
        },
      }}
      navButtonsWrapperProps={{
        // Move the buttons to the bottom. Unsetting top here to override default style.
        style: {
          bottom: "0",
          top: "unset",
        },
      }}
    >
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};

function Item(props: any) {
  return (
    <>
      <Paper>
        <img
          src={props.item.imgSrc}
          alt='hero'
          style={{ display: "block", width: "100%", height: 400 }}
        />
      </Paper>
      <Box display='flex' justifyContent='center' sx={{ p: 4 }}>
        <Typography variant='h4' gutterBottom textAlign='center'>
          {props.item.description}
        </Typography>
      </Box>
    </>
  );
}

export default HomePageCarousel;
