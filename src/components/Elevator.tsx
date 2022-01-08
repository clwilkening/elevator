import React, { useCallback, useEffect, useState } from 'react';
import _ from '../helpers/lodash-helpers';
import Keypad from './Keypad';
import Shaft from './Shaft';

const NUM_FLOORS: number = 10;
const PAUSE_ON_FLOOR_DELAY: number = 3000;
const BETWEEN_FLOOR_DELAY: number = 1000;

const Elevator = () => {
  const [floorQueue, setFloorQueue] = useState<number[]>([]);
  const [currentFloor, setCurrentFloor] = useState<number>(1);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const getDirection = useCallback(() => (currentFloor < floorQueue[0] ? 'up' : 'down'), [currentFloor, floorQueue]);

  const handleNextFloor = (num: number) => {
    setTimeout(() => {
      setCurrentFloor(num);
    }, BETWEEN_FLOOR_DELAY);
  };

  // Switch floors
  useEffect(() => {
    let direction: string = getDirection();
    if (_.isEmpty(floorQueue) || !isMoving) return;
    const nextFloor: number = floorQueue[0];
    const lastFloor: number = floorQueue[floorQueue.length - 1];

    if (currentFloor === nextFloor && currentFloor === lastFloor) {
      // NOTE: need to add delay when pausing on floors
      if (currentFloor === 1) {
        console.log('  reset', { currentFloor }, { nextFloor }, { lastFloor });

        setFloorQueue([]);
        setIsMoving(false);
        return;
      }

      setFloorQueue([1]);
      return;
    }
    if (direction === 'up') {
      if (currentFloor < nextFloor && currentFloor + 1 !== nextFloor) {
        handleNextFloor(currentFloor + 1);
        return;
      }
      if (currentFloor + 1 === nextFloor) {
        // don't remove the last floor yet
        if (floorQueue.length > 1) {
          setFloorQueue(prev => prev.filter(p => p !== nextFloor));
        }
        handleNextFloor(nextFloor);
        return;
      }
    }
    if (direction === 'down') {
      if (currentFloor > nextFloor && currentFloor - 1 !== nextFloor) {
        handleNextFloor(currentFloor - 1);
        return;
      }
      if (currentFloor - 1 === nextFloor) {
        // don't remove the last floor yet
        if (floorQueue.length > 1) {
          setFloorQueue(prev => prev.filter(p => p !== nextFloor));
        }
        handleNextFloor(nextFloor);
        return;
      }
    }
  }, [currentFloor, floorQueue, getDirection, isMoving]);

  const setMoving = (val: boolean) => {
    setTimeout(() => {
      setIsMoving(val);
    }, BETWEEN_FLOOR_DELAY);
  };

  // Begin moving the elevator car
  useEffect(() => {
    if (!_.isEmpty(floorQueue) && !isMoving) {
      setMoving(true);
    }
    if (_.isEmpty(floorQueue) && isMoving) {
      setMoving(false);
    }
  }, [floorQueue, isMoving]);

  // Adds a floor to the queue
  const onFloorClick = (floor: number) => {
    // prevent selecting the current floor
    if (floor === currentFloor || floorQueue.includes(floor)) return;
    if (!floorQueue[0]) {
      return setFloorQueue([floor]);
    }

    let direction: string = getDirection();

    // TODO: make this more DRY
    setFloorQueue(prev => {
      const nextFloors = prev;
      const lastFloor: number = nextFloors[nextFloors.length - 1];

      if (direction === 'up') {
        // adds to beginning
        if (floor < nextFloors[0] && floor > currentFloor) {
          return [floor, ...nextFloors];
        }
        if ((floor > lastFloor && floor > currentFloor) || floor < currentFloor) {
          // adds to end
          return [...nextFloors, floor];
        }
        // floor is between next and last
        if (floor > nextFloors[0] && floor < lastFloor) {
          let indexForFloor: number = -1;
          let newFloors = nextFloors.map((fl, i) => {
            if (indexForFloor > -1) return fl;
            if (floor < fl && indexForFloor === -1) {
              indexForFloor = i;
            }
            return fl;
          });

          return [...newFloors.slice(0, indexForFloor), floor, ...newFloors.slice(indexForFloor)];
        }
      } else {
        // adds to beginning
        if (floor > nextFloors[0] && floor < currentFloor) {
          return [floor, ...nextFloors];
        }
        // adds to end
        if ((floor < lastFloor && floor < currentFloor) || floor > currentFloor) {
          return [...nextFloors, floor];
        }
        // floor is between next and last
        if (floor < nextFloors[0] && floor > lastFloor) {
          let indexForFloor: number = -1;
          // TODO: Fix the order of new floors when going down
          let newFloors = nextFloors.map((fl, i) => {
            if (indexForFloor > -1) return fl;
            if (floor > fl && indexForFloor === -1) {
              indexForFloor = i;
            }
            return fl;
          });

          return [...newFloors.slice(0, indexForFloor), floor, ...newFloors.slice(indexForFloor)];
        }
      }
      // NOTE: we should not reach here, but state must be returned from fn
      return prev;
    });
  };

  /**
   * This could be defined as a constant, but doing it this way as if
   * NUM_FLOORS could vary from an API
   */
  const floors: Array<number> = _.range(1, NUM_FLOORS + 1);
  return (
    <main className="d-flex flex-column min-w-[300px]">
      {/* {floorQueue.join(', ')} */}
      <Shaft floors={floors} currentFloor={currentFloor} floorQueue={floorQueue} />
      <Keypad floors={floors} onFloorClick={onFloorClick} floorQueue={floorQueue} currentFloor={currentFloor} />
    </main>
  );
};

export default Elevator;
