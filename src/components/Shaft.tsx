import React, { useEffect } from 'react';

const Shaft = props => {
  useEffect(() => {
    const currentFloorElem = document.querySelector('.current');
    if (!currentFloorElem) return;

    const coords = currentFloorElem.getBoundingClientRect();
    const car: HTMLElement | null = document.querySelector('[data-car]');

    if (car) {
      car.style.top = coords.top + 'px';
      car.style.left = coords.left + 'px';
      car.style.right = coords.right + 'px';
      car.style.bottom = coords.bottom + 'px';
    }
  });

  const renderShaft = () => {
    return (
      <>
        {props.floors.map((fl: number) => {
          return (
            <div
              className={`
                h-[50px] border-b border-stone-100 flex items-center justify-center
                ${fl === props.currentFloor ? 'current' : ''}
              `}
              key={`sh-${fl}`}
            >
              {fl}
            </div>
          );
        })}
      </>
    );
  };

  // Note: This duration should be calculated using the delay in Elevator.tsx
  const renderCar = () => (
    <div className="bg-stone-500 h-[50px] w-[50px] fixed flex transition-[top] duration-1000 ease-linear" data-car>
      <div className="border-r border-stone-100 flex-1"></div>
      <div className="border-l border-stone-100 flex-1"></div>
    </div>
  );

  return (
    <section className="bg-[#abc0bb] w-[50px] flex flex-col-reverse mx-auto">
      {renderShaft()}
      {renderCar()}
    </section>
  );
};

export default Shaft;
