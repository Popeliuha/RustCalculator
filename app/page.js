'use client'
import React, { useState } from 'react';
import styles  from './styles.css';
import { data } from './data.js'; 

const Home = () => {
  const [pairs, setPairs] = useState([{ quantity: 0, resource: '' }]);
  const [gunType, setGunType] = useState('');
  const [result, setResult] = useState(null);

  const renderTable = (data) => {
    const guns = Object.keys(data);
    const items = Object.keys(data[guns[0]]);

    return (
      <table className={styles.table}>
        <thead>
          <tr> 
            <th>Gun</th>
              {items.map((item, index) =>  (
              <th key ={`header-${index}`}>{item}</th>))}
          </tr>
        </thead>
        <tbody>
          {guns.map((gun, gunIndex) => (
            <tr key={`gun-${gunIndex}`}>
              <td>{gun}</td>
              {items.map((item, itemIndex) => (
                <td key={`data-${gunIndex}-${itemIndex}`}>{data[gun][item]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  };

  const handleInput= (index, field, value) =>{
    let updatedPairs = [...pairs];
    updatedPairs [index][field] = value;
    setPairs(updatedPairs);
  };

  const handleNewPair = (index) =>{
    if(pairs[index].quantity && pairs[index].resource){
      setPairs([...pairs, {quantity: 0, resource:''}]);
    } else {
      alert('Please fill out both quantity and resource');
    }
  }

  const calculateResults = () => {
    if (!gunType) {
      alert('Please enter a valid gun type.');
      return;
    }

    let totalResources = 0;

    pairs.forEach((pair) => {
      pair.quantity = parseInt(pair.quantity, 10); 
      const { resource, quantity } = pair;
      if (data[gunType] && data[gunType][resource] && !isNaN(quantity)) {
        const gunPower = getSimpleGunPower(gunType, resource);
        console.log(`Gun power for ${gunType} and ${resource} is ${gunPower}`);
        totalResources += calculatePowerOfQuantity(quantity, gunPower);
      } else {
        alert(`Invalid input for resource: ${resource} or quantity: ${quantity}`);
      }
    });

    setResult(`You need ${totalResources} ${gunType} to raid the specified walls`);
  };

  const getSimpleGunPower = (gunType, resource) => {
    return Math.ceil(data['HP'][resource] / data[gunType][resource]) ;
  };

  const calculatePowerOfQuantity = (quantity, gunPower) => {
    return quantity * gunPower;
  };

  const gunOptions = Object.keys(data).filter((key) => key !== 'HP');
  const resourceOptions = Object.keys(data[Object.keys(data)[0]]);
  return (
    <div>
    <div>
      <h5>Damage table</h5>
      {renderTable(data)}
    </div>
    <div>
      <h5>Enter your gun type:</h5>
     <select 
     value = {gunType}
     onChange={(e) => setGunType(e.target.value)}
     required
     >
      <option value = "" disabled> Select a gun type</option>
      {gunOptions.map((gun, index) =>(
        <option key = {`gun-option-${index}`} value = {gun}>
          {gun}
        </option>
      ))}
      </select>
    </div>
    <div>
      <h5>What does enemies house have?</h5>
     <form>
      {pairs.map((pair, index) => (
        <div key = {index}>
          <input
              type='number'
              placeholder='Quantity'
              value={pair.quantity}
              onChange={(e) => handleInput(index, 'quantity', e.target.value)}
            />
            <select 
            value = {pair.resource}
            onChange={(e) => handleInput(index, 'resource', e.target.value)}
            >
              <option value="" disabled>
                Select a resource
              </option>
              {resourceOptions.map((resource, resIndex) => (
                <option key = {`resource-option-${resIndex}`} value = {resource}>
                  {resource}
                </option>
              ))}
              </select>
            {index === pairs.length -1 && (
              <button type = 'button' onClick ={()=>handleNewPair(index)}>Add more</button>
            )}
        </div>
      ))}
     </form>
     <button type="button" onClick={calculateResults}>
          Calculate Total
        </button>
        {result && (
          <div>
            <h3>Result:</h3>
            <p>{result}</p>
          </div>
        )}
    </div>
    </div>
  );
};

export default Home;
