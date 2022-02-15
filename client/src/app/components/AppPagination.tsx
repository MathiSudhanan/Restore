import { Box, Typography, Pagination } from "@mui/material";
import React from "react";
import { MetaData } from "../models/pagination";

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}

const AppPagination = ({ metaData, onPageChange }: Props) => {
  const { currentPage, totalCount, totalPage, pageSize } = metaData;
  return (
    <Box display='flex' justifyContent='space-between' alignContent='center'>
      <Typography>
        {(currentPage - 1) * pageSize + 1}-
        {currentPage * pageSize > totalCount
          ? totalCount
          : currentPage * pageSize}{" "}
        of {totalCount} items
      </Typography>
      <Pagination
        count={totalPage}
        color='secondary'
        size='large'
        page={currentPage}
        onChange={(event, page) => {
          onPageChange(page);
        }}
      />
    </Box>
  );
};

export default AppPagination;
