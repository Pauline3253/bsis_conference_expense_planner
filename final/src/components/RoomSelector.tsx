import React from 'react';
import './RoomSelector.css';

import adImg from '../assets/ad.jpg';
import ConhImg from '../assets/Conh.webp';
import prImg from '../assets/pr.webp';
import lmrImg from '../assets/lmr.jpg';
import smrImg from '../assets/smr.jpg';

interface Props {
  rooms: Record<string, number>;
  setRooms: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

const RoomSelector: React.FC<Props> = ({ rooms, setRooms }) => {
  const roomOptions = [
    {
      name: 'Auditorium Hall',
      capacity: 200,
      price: 5500,
      img: adImg,
    },
    {
      name: 'Conference Room',
      capacity: 15,
      price: 1500,
      img: ConhImg,
    },
    {
      name: 'Presentation Room',
      capacity: 50,
      price: 3500,
      img: prImg,
    },
    {
      name: 'Large Meeting Room',
      capacity: 50,
      price: 1000,
      img: lmrImg,
    },
    {
      name: 'Small Meeting Room',
      capacity: 5,
      price: 800,
      img: smrImg,
    },
  ];

  const handleChange = (name: string, delta: number) => {
    setRooms((prev) => {
      const qty = Math.max(0, (prev[name] || 0) + delta);
      return { ...prev, [name]: qty };
    });
  };

  const subtotal = roomOptions.reduce(
    (total, { name, price }) => total + (rooms[name] || 0) * price,
    0
  );

  return (
    <div className="room-selector">
      <h2>Venue Room Selection</h2>
      <div className="room-grid">
        {roomOptions.map(({ name, capacity, price, img }) => (
          <div key={name} className="room-card">
            <img src={img} alt={name} />
            <h3>{name}</h3>
            <p>Capacity: {capacity} </p>
            <p>Price: ${price.toLocaleString()} </p>
            <div className="room-controls">
              <button onClick={() => handleChange(name, -1)}>-</button>
              <span>{rooms[name] || 0}</span>
              <button onClick={() => handleChange(name, 1)}>+</button>
            </div>
            <p className="room-total">
              Total: ${((rooms[name] || 0) * price).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="room-subtotal">
        <h3>Subtotal for Rooms: ${subtotal.toLocaleString()}</h3>
      </div>
    </div>
  );
};

export default RoomSelector;
