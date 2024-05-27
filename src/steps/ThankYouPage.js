import React from 'react';
import { Table } from 'reactstrap';

const ThankYouPage = ({ formData }) => {
  const getDisplayValue = value => {
    if (value && typeof value === 'object' && value.label) {
      return value.label;
    }
    return value;
  };

  return (
    <div className="thank-you-page p-4">
      <h2 className='success-message'>Data added successfully</h2>
      <Table bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(formData).map(key => (
            <tr key={key}>
              <th>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
              <td>{getDisplayValue(formData[key])}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ThankYouPage;
