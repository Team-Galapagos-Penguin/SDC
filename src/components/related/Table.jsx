import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import getProduct from '../shared/productAPI.js';

// center table within modal
const TableContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Table({ target }) {
  const [features, setFeatures] = useState({});

  // get product data from redux store
  const product = useSelector((state) => state.product.productData);

  useEffect(() => {
    const obj = {};

    // push current product features into obj
    product.features.forEach((f) => {
      if (obj[f.feature] === undefined) obj[f.feature] = ['', ''];
      obj[f.feature][0] = f.value === null ? '✓' : f.value;
    });

    // push target characteristics into obj
    target.features.forEach((f) => {
      if (obj[f.feature] === undefined) obj[f.feature] = ['', ''];
      obj[f.feature][1] = f.value === null ? '✓' : f.value;
    });
    setFeatures(obj);
  }, []);

  return (
    <TableContainer>
      <table>
        <thead>
          <tr>
            <th>{product.name}</th>
            <th>Characteristics</th>
            <th>{target.name}</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(features).map((feature) => (
            <tr key={feature}>
              <td>{features[feature][0]}</td>
              <td>{feature}</td>
              <td>{features[feature][1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableContainer>
  );
}
