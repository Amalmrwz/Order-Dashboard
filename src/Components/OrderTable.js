import React, { useState, useEffect } from "react";

import Papa from "papaparse";

import styled from "styled-components";

function OrderTable() {
  const [rows, setRows] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [filteredArray, setFilteredArray] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch("/SeedData.csv");
      const reader = response.body.getReader();
      const result = await reader.read(); // raw array
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value); // the csv text
      const results = Papa.parse(csv, { header: true }); // object with { data, errors, meta }
      const rows = results.data; // array of objects
      setRows(rows);
      if (searchTerm === "" && searchDate === "") {
        setFilteredArray(rows);
      } else if (searchTerm !== "" && searchDate === "") {
        const filter = rows.filter(
          (item) => item.deliveryPincode === searchTerm
        );
        setFilteredArray(filter);
      } else if (searchTerm === "" && searchDate !== "") {
        const filter = rows.filter((item) => item.orderDate === searchDate);
        setFilteredArray(filter);
      } else if (searchTerm !== "" && searchDate !== "") {
        const filter = rows.filter(
          (item) =>
            item.orderDate === searchDate && item.deliveryPincode === searchTerm
        );
        setFilteredArray(filter);
      }
    }
    getData();
  }, [searchTerm, searchDate]);

  const [pinOrder, setPinOrder] = useState("ASC");
  const [dateOrder, setDateOrder] = useState("ASC");

  const sorting = (col) => {
    console.log(col);
    if (col === "deliveryPincode") {
      if (pinOrder === "ASC") {
        const sort = [...filteredArray].sort(
          (a, b) => parseInt(a.deliveryPincode) - parseInt(b.deliveryPincode)
        );
        setPinOrder("DSC");
        setFilteredArray(sort);
      } else {
        const sort = [...filteredArray].sort(
          (a, b) => parseInt(b.deliveryPincode) - parseInt(a.deliveryPincode)
        );
        setPinOrder("ASC");
        setFilteredArray(sort);
      }

      console.log(filteredArray);
    } else {
      console.log("Button2");
      if (dateOrder === "ASC") {
        const sort = [...filteredArray].sort(
          (a, b) => Date.parse(a.orderDate) - Date.parse(b.orderDate)
        );
        setDateOrder("DSC");
        setFilteredArray(sort);
      } else {
        const sort = [...filteredArray].sort(
          (a, b) => Date.parse(b.orderDate) - Date.parse(a.orderDate)
        );
        setDateOrder("ASC");
        setFilteredArray(sort);
      }
    }
  };

  return (
    <div>
      <SearchBar>
        Pincode : &nbsp;&nbsp;
        <input
          id="pincode-search"
          placeholder="Search Pincode"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        Date : &nbsp;&nbsp;
        <input
          id="date-search"
          placeholder="Search Date"
          onChange={(event) => setSearchDate(event.target.value)}
        />
      </SearchBar>
      <MainTable>
        <table>
          <tr>
            <th>Order ID</th>
            <th>Customer ID</th>
            <th>
              <button onClick={() => sorting("deliveryPincode")}>
                Pincode
              </button>
            </th>
            <th>
              <button onClick={() => sorting("orderDate")}>Order Date</button>
            </th>
            <th>Items</th>
          </tr>
          {filteredArray.map((val, key) => (
            <tr key={key}>
              <td>{val.orderId}</td>
              <td>{val.customerId}</td>
              <td>{parseInt(val.deliveryPincode)}</td>

              <td>{val.orderDate}</td>

              <td>{String(val.items).replace(/;/g, "\n,\n")}</td>
            </tr>
          ))}
        </table>
      </MainTable>
    </div>
  );
}

export default OrderTable;

const MainTable = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const SearchBar = styled.div`
  display: flex;
  width: 80vw; ;
`;
