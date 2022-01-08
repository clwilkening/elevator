# Elevator

## View Project

https://vigilant-hopper-ad4962.netlify.app/
## Things I'd Improve

- Make sure commits cannot be made directly to main.
- Refactor the `setFloorQueue` to reduce repetitiveness.
- Use an interface for props so they can be type checked.
- Stop prop drilling, use recoil or redux for state management.
  - This would be better if we were rendering multiple buildings and multiple elevators per building.
- Move constants into a separate file.


## Known Bugs

- Selecting a lower floor after the car has passed the floor does not update the queue properly.
  - for example: If the queue has `[9]` car is on floor `5` and I select `3` then `4`, the result should be `[9,4,3]` instead of `[9,3,4]`
- Selecting multiple floors causes the `useEffect` to run twice per floor, causing issues with the queue. This is happening because I am updating `currentFloor` and `floorQueue` in the same `useEffect`. The use effect re-runs because these update at separate times. The fix would be to update the state to be a merged object like: `state = {currentFloor: 1, floorQueue: []], isMoving: false}`.
  - This is also causing the last floor to be `2` instead of `1`. The suggested fix above should also fix this.
  - This is also causing some floors to be perceived as unselectable.
- The car does not pause for 3 seconds when arriving on a floor.

## Challenges

- Maintaining the floor queue was the most difficult aspect of this. 
- Typescript and Tailwind are fairly new to me. While not particularly difficult, some time was lost looking up references.
- I probably spent more time positioning the car than I should have. I lost time trying to do the animation when simply changing the background color might have sufficed for this challenge. I might have less bugs listed above if I had used background color instead.


---

## Available Scripts

In the project directory, you can run:

### `npm start`

You will need to run `npm ci` or `npm i` first.
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
