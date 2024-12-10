import React, { useState, useEffect } from 'react';

const FinancialInstrumentList = ({ type }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/financial/${type}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.hits.hits || []); // Adjust based on JSON structure
        setLoading(false);
      });
  }, [type]);

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {data.map((item, index) => (
        <li key={index}>{item._source.symbol} - {item._source.name}</li>
      ))}
    </ul>
  );
};

export default FinancialInstrumentList;
