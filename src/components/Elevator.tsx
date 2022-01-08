import React, { useState } from 'react';
import Keypad from './Keypad';

const NUM_FLOORS : number = 10;

const Elevator = () => {
  const [floorQueue, setFloorQueue] = useState<number[]>([]);
  // const [floorQueue, setFloorQueue] = useState([]);
  const [currentFloor, setCurrentFloor] = useState<number>(1);

  const onFloorClick = (floor : number) => {
    console.log('---------------')
    console.log('\nclicked', floor)
    // prevent selecting the current floor
    if (floor === currentFloor || floorQueue.includes(floor)) return;
    // let direction : string = '';
    if (!floorQueue[0]) {
      // direction = floor > currentFloor ? 'up' : 'down';
      console.log('return')
      return setFloorQueue([floor]);
    }
    let direction : string = currentFloor < floorQueue[0] ? 'up' : 'down';
    console.log("direction is ", direction)

    // TODO: make this more DRY
    setFloorQueue(prev => {
      console.log('setting new queue')
      const nextFloors = prev;
      const lastFloor : number = nextFloors[nextFloors.length - 1];

      if (direction === 'up') {
        console.log("in the 'up'")
        // adds to beginning
        if (floor < nextFloors[0] && floor > currentFloor) {
          console.log("return")
          return [floor, ...nextFloors]
        }
        if ((floor > lastFloor && floor > currentFloor) || (floor < currentFloor)) {
          console.log("return")
          // adds to end
          return [...nextFloors, floor]
        }
        // floor is between next and last
        if (floor > nextFloors[0] && floor < lastFloor) {
          let indexForFloor : number = -1;
          let newFloors = nextFloors.map((fl, i) => {
            if (indexForFloor > -1) return fl;
            if (floor < fl && indexForFloor === -1) {
              indexForFloor = i;
            }
            return fl;
          })

          console.log("return", indexForFloor)
          return [
            ...newFloors.slice(0, indexForFloor),
            floor,
            ...newFloors.slice(indexForFloor)
          ];
        }
      } else {
        // adds to beginning
        if (floor > nextFloors[0] && floor < currentFloor) {
          return [floor, ...nextFloors]
        }
        // adds to end
        if ((floor < lastFloor && floor < currentFloor) || (floor > currentFloor)) {
          return [...nextFloors, floor]
        }
        // floor is between next and last
        if (floor < nextFloors[0] && floor > lastFloor) {
          let indexForFloor : number = -1;
          let newFloors = nextFloors.map((fl, i) => {
            if (indexForFloor > -1) return fl;
            if (floor > fl && indexForFloor === -1) {
              indexForFloor = i;
            }
            return fl;
          })
    
          return [
            ...newFloors.slice(0, indexForFloor),
            floor,
            ...newFloors.slice(indexForFloor)
          ];
        }
      }
      // NOTE: we should not reach here, but state must be returned from fn
      return prev;
    })
  }

  console.log(floorQueue)
  return (
    <div className="d-flex flex-column min-w-[300px]">
      <div className="bg-slate-300">Shaft</div>
      <Keypad
        numFloors={NUM_FLOORS}
        onFloorClick={onFloorClick}
        floorQueue={floorQueue}
        currentFloor={currentFloor}
      />
    </div>
  );
};

export default Elevator;