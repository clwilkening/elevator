import React from 'react';
import _ from '../helpers/lodash-helpers';
import Display from './Display';

const Keypad = props => {
  const renderButtons = () => {
    const { floors }: { floors: Array<number> } = props;

    const getButtonClass = (floor: number): string => {
      const defaults: string = 'h-[44px] w-[44px] rounded-full flex items-center justify-center justify-self-center transition';

      if (props.floorQueue.includes(floor)) {
        return `${defaults} bg-stone-100 text-black transition`;
      }
      return `${defaults} bg-stone-400 text-black transition hover:bg-stone-500`;
    };

    return floors.map(fl => {
      return (
        <button className={getButtonClass(fl)} onClick={() => props.onFloorClick(fl)} key={`fl-${fl}`}>
          {fl}
        </button>
      );
    });
  };

  return (
    <>
      <Display currentFloor={props.currentFloor} />
      <section className="grid gap-4 grid-cols-3 pb-4 pt-4 bg-zinc-600">{renderButtons()}</section>
    </>
  );
};

export default Keypad;
