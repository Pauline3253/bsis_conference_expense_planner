import React from 'react';
import './SummaryModal.css';

interface Props {
  rooms: Record<string, number>;
  addons: Record<string, number>;
  meals: Record<string, number>;
  onClose: () => void;
}

const SummaryModal: React.FC<Props> = ({ rooms, addons, meals, onClose }) => {
  const roomPrices: Record<string, number> = {
    'Auditorium Hall': 5500,
    'Conference Room': 1500,
    'Presentation Room': 3500,
    'Large Meeting Room': 1000,
    'Small Meeting Room': 800,
  };

  const addonPrices: Record<string, number> = {
    'Speakers': 35,
    'Microphones': 45,
    'Whiteboards': 80,
    'Projectors': 200,
    'Signage': 80,
  };

  const mealPrices: Record<string, number> = {
    'Breakfast': 50,
    'Lunch': 60,
    'High Tea': 25,
    'Dinner': 70,
  };

  const allItems: { name: string; unitCost: number; quantity: number }[] = [];

  Object.entries(rooms).forEach(([name, qty]) => {
    if (qty > 0) allItems.push({ name, unitCost: roomPrices[name], quantity: qty });
  });

  Object.entries(addons).forEach(([name, qty]) => {
    if (qty > 0) allItems.push({ name, unitCost: addonPrices[name], quantity: qty });
  });

  Object.entries(meals).forEach(([name, qty]) => {
    if (qty > 0) allItems.push({ name, unitCost: mealPrices[name], quantity: qty });
  });

  const totalCost = allItems.reduce((sum, item) => sum + item.unitCost * item.quantity, 0);

  return (
    <div className="summary-modal-overlay">
      <div className="summary-modal">
        <button className="close-button" onClick={onClose}>×</button>

        <h2 style={{ textAlign: 'center' }}>TOTAL COST FOR THE EVENT</h2>
        <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
          ${totalCost.toLocaleString()}
        </h3>

        <table className="summary-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Unit Cost</th>
              <th>Quantity</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {allItems.map((item, index) => (
              <tr key={`${item.name}-${index}`}>
                <td>{item.name}</td>
                <td>${item.unitCost.toLocaleString()}</td>
                <td>{item.quantity}</td>
                <td>${(item.unitCost * item.quantity).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SummaryModal;
