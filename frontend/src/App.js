import React, { useState } from 'react';
import FinancialInstrumentList from './components/FinancialInstrumentList';

function App() {
  const [type, setType] = useState('exchange');

  return (
    <div>
      <h1>Financial Instruments</h1>
      <select onChange={(e) => setType(e.target.value)}>
        <option value="exchange">Exchange</option>
        <option value="metadata">Metadata</option>
        <option value="candle">Candle</option>
      </select>
      <FinancialInstrumentList type={type} />
    </div>
  );
}

export default App;
