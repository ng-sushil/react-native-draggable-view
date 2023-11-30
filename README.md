# @ngenux/react-native-draggable-view
## _The Simple Draggable Component_

`@ngenux/react-native-draggable-view` is a React Native component that allows for easy and intuitive drag capabilities within your mobile application. This package provides a `Draggable` component that can be wrapped around any React Native `View` or component to make it draggable within its parent container.

## Installation:
To install `@ngenux/react-native-draggable-view`, run the following command in your project directory:
```bash
npm install @ngenux/react-native-draggable-view
```
# Usage:
Import the `Draggable` component from `@ngenux/react-native-draggable-view` and wrap it around the element you want to make draggable.

# Props:
- `edgeSpacing`: The spacing from the edge of the screen when the element is dragged (default: 10).
- `childrenWidth`: The width of the child component (default: 180).
- `childrenHeight`: The height of the child component (default: 148).
- `shouldStartDrag`: A function that determines if dragging should start based on the gesture state.
- `initialOffsetX`: The initial X offset for the draggable element.
- `initialOffsetY`: The initial Y offset for the draggable element.
- `viewStyle`: Additional styles for the draggable view.

# Methods:
- `resetPosition()`: Resets the draggable view to its initial position.
# Example:
```js
import React,{useRef} from 'react';
import { View, Text } from 'react-native';
import Draggable from '@ngenux/react-native-draggable-view';
const App = () => {
 const draggableRef = useRef();
 const handlePositionReset =()=>{
     draggableRef.current.resetPosition();
 }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Draggable
        edgeSpacing={0}
        childrenWidth={100}
        childrenHeight={50}
        shouldStartDrag={true}
        ref={ref => (draggableRef.current = ref)}
      >
        <View
          style={{
            width: 100,
            height: 50,
            backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Drag Me!</Text>
        </View>
      </Draggable>
    </View>
  );
};
export default App;
```
---
## License
MIT

## Author


Developed by [ng-sushil](https://github.com/ng-sushil) of [@ngenux](https://www.ngenux.com/)
