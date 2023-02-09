import React, { useState, useEffect } from 'react';
import SalesDataInterface from './sales';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

const ListPage: React.FC = () => {
  const [salesData, setSalesdata] = useState<SalesDataInterface[]>([]);
  const [newBrand, setNewBrand] = useState<SalesDataInterface>({
    brand: '',
    transactionType:'Trading',
    totalOrders: 0,
    totalOrderValue: 0,
    grossMarginPercentage: 0

  });

  const handleAddBrand = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const arr:any = new Array();
    arr.push(newBrand);
    const response = await fetch('http://localhost:3001/api/v1/brand_sales_daily', {
      method: 'POST',
      body: JSON.stringify({"data": arr}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response);

    const addedBrand = await response.json();
    setSalesdata([...salesData, addedBrand]);
  };

  const handleNewBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewBrand({ ...newBrand, [event.target.name]: event.target.value });
  };

  const handleNewBrandChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewBrand({ ...newBrand, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3001/api/v1/brand_sales_daily');
      const data = await response.json();
      setSalesdata(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      
      <form onSubmit={handleAddBrand}>
        <input
          type="text"
          name="brand"
          value={newBrand.brand}
          onChange={handleNewBrandChange}
          placeholder="Brand Name"
        />
        <select name="transactionType" value={newBrand.transactionType}
          onChange={handleNewBrandChangeSelect} defaultValue = "Trading">
          <option value="Trading">Trading</option>
          <option value="Facilitation">Facilitation </option>
        </select>
        <input
          type="number"
          name="totalOrders"
          value={newBrand.totalOrders}
          onChange={handleNewBrandChange}
          placeholder="Total Orders"
        />
        <input
          type="number"
          name="totalOrderValue"
          value={newBrand.totalOrderValue}
          onChange={handleNewBrandChange}
          placeholder="Total Orders Value"
        />
        <input
          type="number"
          name="grossMarginPercentage"
          value={newBrand.grossMarginPercentage}
          onChange={handleNewBrandChange}
          placeholder="Gross Margin Percentage"
        />
        <button type="submit">Add Brand</button>
      </form>
        
      <TableContainer>
        <Table variant='simple'>
          <TableCaption>Brand Daily Sales Data</TableCaption>
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Brand</Th>
              <Th>Transaction Type</Th>
              <Th>Total Orders</Th>
              <Th>Total Orders Value</Th>
              <Th>GrossMarginPercentage</Th>
              <Th>Created AT</Th>
              <Th>Updated At</Th>
            </Tr>
          </Thead>
          <Tbody>
            {salesData.map((data)=>(
              <Tr>
              <Td>{data.date}</Td>
              <Td>{data.brand}</Td>
              <Td>{data.transactionType}</Td>
              <Td>{data.totalOrders}</Td>
              <Td>{data.totalOrderValue}</Td>
              <Td>{data.grossMarginPercentage}</Td>
              <Td>{data.createdAt}</Td>
              <Td>{data.updatedAt}</Td>
            </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ListPage;
