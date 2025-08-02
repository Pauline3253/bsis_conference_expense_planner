import React from 'react';
import './SummarySection.css';

interface Props {
  rooms: Record<string, number>;
  addons: Record<string, number>;
  meals: Record<string, number>;
}

const prices: Record<string, number> = {
  
  'Auditorium Hall': 5500,
  'Conference Room': 1500,
  'Presentation Room': 3500,
  'Large Meeting Room': 1000,
  'Small Meeting Room': 800,
  
  'Speakers': 35,
  'Microphones': 45,
  'Whiteboards': 80,
  'Projectors': 200,
  'Signage': 80,
  
  'Breakfast': 50,
  'Lunch': 60,
  'High Tea': 25,
  'Dinner': 70
};

const SummarySection: React.FC<Props> = ({ rooms, addons, meals }) => {
  const rows: { name: string; quantity: number; unitCost: number }[] = [];

  const collect = (category: Record<string, number>) => {
    Object.entries(category).forEach(([name, quantity]) => {
      if (quantity > 0) {
        const unitCost = prices[name] || 0;
        rows.push({ name, quantity, unitCost });
      }
    });
  };

  collect(rooms);
  collect(addons);
  collect(meals);

  const total = rows.reduce((sum, item) => sum + item.quantity * item.unitCost, 0);

  return (
    <div className="summary-section">
      <h2>TOTAL COST FOR THE EVENT</h2>
      <h3>${total.toLocaleString()}</h3>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Unit Cost</th>
            <th>Quantity</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ name, quantity, unitCost }) => (
            <tr key={name}>
              <td>{name}</td>
              <td>${unitCost}</td>
              <td>{quantity}</td>
              <td>${(unitCost * quantity).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SummarySection;
