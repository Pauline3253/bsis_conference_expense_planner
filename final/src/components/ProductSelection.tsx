import React, { useState, useEffect } from 'react';
import Header from './Header';
import RoomSelector from './RoomSelector';
import AddOnSelector from './AddOnSelector';
import MealSelector from './MealSelector';
import SummarySection from './SummarySection';
import SummaryModal from './SummaryModal';

const ProductSelection: React.FC = () => {
  const [rooms, setRooms] = useState<Record<string, number>>({});
  const [addons, setAddons] = useState<Record<string, number>>({});
  const [meals, setMeals] = useState<Record<string, number>>({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showModal]);

  return (
    <>
      {!showModal && <Header onShowDetails={() => setShowModal(true)} />}

      <main style={{ padding: '20px', maxWidth: '1300px', margin: '0 auto' }}>
        <section id="venue" style={{ scrollMarginTop: '100px' }}>
          <RoomSelector rooms={rooms} setRooms={setRooms} />
        </section>

        <section id="addons" style={{ scrollMarginTop: '100px' }}>
          <AddOnSelector addons={addons} setAddons={setAddons} />
        </section>

        <section id="meals" style={{ scrollMarginTop: '100px' }}>
          <MealSelector meals={meals} setMeals={setMeals} />
        </section>

        <section id="summary" style={{ scrollMarginTop: '100px' }}>
          <SummarySection rooms={rooms} addons={addons} meals={meals} />
        </section>
      </main>

      {showModal && (
        <SummaryModal
          rooms={rooms}
          addons={addons}
          meals={meals}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default ProductSelection;
