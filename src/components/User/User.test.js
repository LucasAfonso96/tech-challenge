import React from "react";
import { render, screen } from "@testing-library/react";
import User from "./User";

const clientData = {
  client_id: "irZP2T8dsRl1kpCnAAAB",
  first_name: "Otilia",
  job: "Forward Accounts Strategist",
  job_descriptor: "Regional",
};

test("renders user information", () => {
  render(<User client={clientData} />);

  const clientId = screen.getByText(clientData.client_id);
  const firstName = screen.getByText(clientData.first_name);
  const job = screen.getByText(clientData.job);
  const jobDescriptor = screen.getByText(clientData.job_descriptor);

  expect(clientId).toBeInTheDocument();
  expect(firstName).toBeInTheDocument();
  expect(job).toBeInTheDocument();
  expect(jobDescriptor).toBeInTheDocument();
});

test("renders user information with correct typography variant", () => {
    render(<User client={clientData} />);
  
    const firstName = screen.getByText(clientData.first_name);
    const job = screen.getByText(clientData.job);
    const jobDescriptor = screen.getByText(clientData.job_descriptor);
  
    expect(firstName).toHaveClass("MuiTypography-h5");
    expect(job).toHaveClass("MuiTypography-body2");
    expect(jobDescriptor).toHaveClass("MuiTypography-body1");
});

test("renders correct client ID", () => {
    render(<User client={clientData} />);
  
    const clientId = screen.getByText(clientData.client_id);
  
    expect(clientId).toHaveTextContent(`${clientData.client_id}`);
  });
  
test("renders user information with correct CSS class names", () => {
    render(<User client={clientData} />);
  
    const userContainer = screen.getByTestId("user-container");
    const userId = screen.getByTestId("user-id");
    const userInfo = screen.getByTestId("user-info");
  
    expect(userContainer).toHaveClass("user-container");
    expect(userId).toHaveClass("user-id");
    expect(userInfo).toHaveClass("user-info");
  });
  
test("renders user information with correct client ID value", () => {
    render(<User client={clientData} />);
  
    const clientId = screen.getByTestId("user-id");
  
    expect(clientId).toHaveTextContent(clientData.client_id);
  });
  
test("renders user information with correct first name value", () => {
    render(<User client={clientData} />);
  
    const firstName = screen.getByText(clientData.first_name);
  
    expect(firstName).toBeInTheDocument();
  });
  
test("renders user information with correct job value", () => {
    render(<User client={clientData} />);
  
    const job = screen.getByText(clientData.job);
  
    expect(job).toBeInTheDocument();
  });
  
test("renders user information with correct job descriptor value", () => {
    render(<User client={clientData} />);
  
    const jobDescriptor = screen.getByText(clientData.job_descriptor);
  
    expect(jobDescriptor).toBeInTheDocument();
  });