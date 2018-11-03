# React Music Player

This is a simple music player UI for [react-player](https://www.npmjs.com/package/react-player).

## Styling
Colors, font size, etc can be changed in [src/style/Player.css](src/style/Player.css).
You can change the layout in [src/style/Layout.css](src/style/Layout.css) if you know what you're doing.

## Components
All components, except Player, are stateless functional presentational components.

### [Player](src/components/Player.js)
Player is a stateful container for [MediaContoller](src/components/MediaController.js) and ReactPlayer. It handles user events dispatched from the MediaController, and media events dispatched from the ReactPlayer. It also manages the seek requests by the user via its [canonical ref approach](https://www.npmjs.com/package/react-player#instance-methods). 

#### Props:
* tracks: A list of well-shaped, valid [tracks](src/playlist.js). The component don't sanitize the input, and its behavior is undefined if e.g. a negative `durationMilliseconds`, or a non-string `mediaUrl` is provided.

### [MediaController](src/components/MediaController.js)
MediaController is a stateless functional presentational component. It presents a UI for user inputs (via MediaButtons and Seeker) and shows artwork, artist name, and the current time. It needs to be connected to the ReactPlayer. 

### [MediaButtons](src/components/MediaButtons.js)
MediaButtons is a stateless functional presentational component. The events and props should be handled by a stateful parent (e.g. to show play vs. pause, enable fast forward button, ...):

#### Props:
* isNextEnabled: Enable or disable NEXT button
* isPlaying: If true, the middle button will show PAUSE icon, otherwise it shows PLAY icon
* isPrevEnabled: Enable or disable PREV button
* onNextClick: Dispatched if NEXT button clicked
* onPlayClick: Dispatched if PLAY/PAUSE button clicked
* onPrevClick: Dispatched if PREV button clicked

### [Seeker](src/components/Seeker.js)
Seeker is a stateless functional presentational component. It shows a progress bar that responds to the `percent` prop and dispatches an onSeekClick event with the corresponding percentage value of the position user clicked on.

#### Props:
* percent: A number, between 0.0 and 1.0. The component will show a progress bar corresponding to this number.
* onSeekClick: Dispatched when the user clicks on the control. Dispatched with the corresponding percent value as an argument.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Dependencies
* [styled-components](https://github.com/styled-components/styled-components): For in-line styled components
* [classnames](https://github.com/JedWatson/classnames): For composing multiple class names
* [prop-types](https://www.npmjs.com/package/prop-types): For type-checking props
* [react-player](https://www.npmjs.com/package/react-player): For playing media

## Dev dependencies
* [jsverify](https://github.com/jsverify/jsverify): For painless property-based testing (see [Helpers.test.js](src/Helpers.test.js))

## TODO
Writing tests for components

# React docs
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
