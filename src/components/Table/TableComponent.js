import React, { useState } from "react";
import { TextField, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import "./TableComponent.css";

const TableComponent = ({ tableData }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTableData = tableData.filter((data) =>
    data.account_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderTableData = () => {
    if (filteredTableData.length === 0) {
      return <p className="no-data">No data available</p>;
    }
    return (
      <>
        <TextField
          label="Search by Account Name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <Table className="table-container">
          <TableHead>
            <TableRow>
              <TableCell className="th">Account Name</TableCell>
              <TableCell className="th">Amount</TableCell>
              <TableCell className="th">Currency Name</TableCell>
              <TableCell className="th">Transaction Type</TableCell>
              <TableCell className="th">Transaction Description</TableCell>
              <TableCell className="th">Credit Card Number</TableCell>
              <TableCell className="th">Credit Card Issuer</TableCell>
              <TableCell className="th">Credit Card Cvv</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTableData.map((data, index) => (
              <TableRow key={index} className="tb">
                <TableCell className="td">{data.account_name}</TableCell>
                <TableCell className="td">{data.amount}</TableCell>
                <TableCell className="td">{data.currency_name}</TableCell>
                <TableCell className="td">{data.transaction_type}</TableCell>
                <TableCell className="td">{data.transaction_description}</TableCell>
                <TableCell className="td">{data.credit_card_number}</TableCell>
                <TableCell className="td">{data.credit_card_issuer}</TableCell>
                <TableCell className="td">{data.credit_card_cvv}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  };

  return <div className="page-container">{renderTableData()}</div>;
};

export default TableComponent;