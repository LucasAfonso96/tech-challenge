import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TableComponent from "./TableComponent";

const tableData = [
  {
    account_name: "Personal Loan Account",
    amount: "890.86",
    credit_card_cvv: "248",
    credit_card_issuer: "maestro",
    credit_card_number: "6370-9605-9936-9733",
    currency_name: "Pataca",
    transaction_description: "payment transaction at Greenfelder",
    transaction_type: "withdrawal",
  },
];

test("renders table with data and filters correctly", () => {
  render(<TableComponent tableData={tableData} />);

  const tableRows = screen.getAllByRole("row");
  expect(tableRows).toHaveLength(2); 

  const searchInput = screen.getByLabelText("Search by Account Name");
  fireEvent.change(searchInput, { target: { value: "Personal Loan" } });

  const filteredRows = screen.getAllByRole("row");
  expect(filteredRows).toHaveLength(2);

  fireEvent.change(searchInput, { target: { value: "" } });

  const clearedRows = screen.getAllByRole("row");
  expect(clearedRows).toHaveLength(2);
});

test("renders table with data", () => {
    render(<TableComponent tableData={tableData} />);
  
    expect(screen.getByText("Account Name")).toBeInTheDocument();
    expect(screen.getByText("Amount")).toBeInTheDocument();
    expect(screen.getByText("Currency Name")).toBeInTheDocument();
    expect(screen.getByText("Transaction Type")).toBeInTheDocument();
    expect(screen.getByText("Transaction Description")).toBeInTheDocument();
    expect(screen.getByText("Credit Card Number")).toBeInTheDocument();
    expect(screen.getByText("Credit Card Issuer")).toBeInTheDocument();
    expect(screen.getByText("Credit Card Cvv")).toBeInTheDocument();
  
    expect(screen.getByText("Personal Loan Account")).toBeInTheDocument();
    expect(screen.getByText("890.86")).toBeInTheDocument();
    expect(screen.getByText("Pataca")).toBeInTheDocument();
    expect(screen.getByText("withdrawal")).toBeInTheDocument();
    expect(screen.getByText("payment transaction at Greenfelder")).toBeInTheDocument();
    expect(screen.getByText("6370-9605-9936-9733")).toBeInTheDocument();
    expect(screen.getByText("maestro")).toBeInTheDocument();
    expect(screen.getByText("248")).toBeInTheDocument();
  });

test("displays correct column headers", () => {
    render(<TableComponent tableData={tableData} />);
  
    const columnHeaders = [
      "Account Name",
      "Amount",
      "Currency Name",
      "Transaction Type",
      "Transaction Description",
      "Credit Card Number",
      "Credit Card Issuer",
      "Credit Card Cvv",
    ];
  
    columnHeaders.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

test("filters table data correctly based on search input", () => {
    render(<TableComponent tableData={tableData} />);
  
    const searchInput = screen.getByLabelText("Search by Account Name");
  
    fireEvent.change(searchInput, { target: { value: "Loan" } });
    expect(screen.getByText("Personal Loan Account")).toBeInTheDocument();
  
    fireEvent.change(searchInput, { target: { value: "" } });
    expect(screen.getByText("Personal Loan Account")).toBeInTheDocument();
  });
  
test("handles table data with special characters", () => {
    const tableDataWithSpecialChars = [
      {
        account_name: "Personal & Loan <Account>",
        amount: "890.86",
        credit_card_cvv: "248",
        credit_card_issuer: "maestro",
        credit_card_number: "6370-9605-9936-9733",
        currency_name: "Pataca",
        transaction_description: "payment transaction at Greenfelder",
        transaction_type: "withdrawal",
      },
    ];
  
    render(<TableComponent tableData={tableDataWithSpecialChars} />);
  
    expect(screen.getByText("Personal & Loan <Account>")).toBeInTheDocument();
  });

test("handles empty table data", () => {
    render(<TableComponent tableData={[]} />);
  
    expect(screen.queryByLabelText("Search by Account Name")).toBeNull();
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

test("updates table with incoming data", async () => {

    const initialData = [
      {
        account_name: "Account 1",
        amount: "100.00",
        credit_card_cvv: "111",
        credit_card_issuer: "Visa",
        credit_card_number: "1111-2222-3333-4444",
        currency_name: "Dollar",
        transaction_description: "Payment",
        transaction_type: "Credit",
      },
      {
        account_name: "Account 2",
        amount: "200.00",
        credit_card_cvv: "222",
        credit_card_issuer: "Mastercard",
        credit_card_number: "5555-6666-7777-8888",
        currency_name: "Euro",
        transaction_description: "Purchase",
        transaction_type: "Debit",
      },
    ];
  

    render(<TableComponent tableData={initialData} />);
  

    expect(screen.getByText("Account 1")).toBeInTheDocument();
    expect(screen.getByText("100.00")).toBeInTheDocument();
    expect(screen.getByText("111")).toBeInTheDocument();
    expect(screen.getByText("Visa")).toBeInTheDocument();
    expect(screen.getByText("1111-2222-3333-4444")).toBeInTheDocument();
    expect(screen.getByText("Dollar")).toBeInTheDocument();
    expect(screen.getByText("Payment")).toBeInTheDocument();
    expect(screen.getByText("Credit")).toBeInTheDocument();
  
    expect(screen.getByText("Account 2")).toBeInTheDocument();
    expect(screen.getByText("200.00")).toBeInTheDocument();
    expect(screen.getByText("222")).toBeInTheDocument();
    expect(screen.getByText("Mastercard")).toBeInTheDocument();
    expect(screen.getByText("5555-6666-7777-8888")).toBeInTheDocument();
    expect(screen.getByText("Euro")).toBeInTheDocument();
    expect(screen.getByText("Purchase")).toBeInTheDocument();
    expect(screen.getByText("Debit")).toBeInTheDocument();

    const newData = [
      {
        account_name: "Account 3",
        amount: "300.00",
        credit_card_cvv: "333",
        credit_card_issuer: "Amex",
        credit_card_number: "9999-0000-1111-2222",
        currency_name: "Pound",
        transaction_description: "Withdrawal",
        transaction_type: "Debit",
      },
    ];
  

    render(<TableComponent tableData={newData} />);

    await waitFor(() => {
      
      expect(screen.getByText("Account 1")).toBeInTheDocument();
      expect(screen.getByText("100.00")).toBeInTheDocument();
      expect(screen.getByText("111")).toBeInTheDocument();
      expect(screen.getByText("Visa")).toBeInTheDocument();
      expect(screen.getByText("1111-2222-3333-4444")).toBeInTheDocument();
      expect(screen.getByText("Dollar")).toBeInTheDocument();
      expect(screen.getByText("Payment")).toBeInTheDocument();
      expect(screen.getByText("Credit")).toBeInTheDocument();
  
      expect(screen.getByText("Account 2")).toBeInTheDocument();
      expect(screen.getByText("200.00")).toBeInTheDocument();
      expect(screen.getByText("222")).toBeInTheDocument();
      expect(screen.getByText("Mastercard")).toBeInTheDocument();
      expect(screen.getByText("5555-6666-7777-8888")).toBeInTheDocument();
      expect(screen.getByText("Euro")).toBeInTheDocument();
      expect(screen.getByText("Purchase")).toBeInTheDocument();
      expect(screen.getAllByText("Debit")[0]).toBeInTheDocument(); 
  
      expect(screen.getByText("Account 3")).toBeInTheDocument();
      expect(screen.getByText("300.00")).toBeInTheDocument();
      expect(screen.getByText("333")).toBeInTheDocument();
      expect(screen.getByText("Amex")).toBeInTheDocument();
      expect(screen.getByText("9999-0000-1111-2222")).toBeInTheDocument();
      expect(screen.getByText("Pound")).toBeInTheDocument();
      expect(screen.getByText("Withdrawal")).toBeInTheDocument();
      expect(screen.getAllByText("Debit")[1]).toBeInTheDocument(); 
    });
  });
  