# @ngenux/react-native-draggable-view
## _The Simple Draggable Component_

`@ngenux/react-native-draggable-view` is a React Native component that allows for easy and intuitive drag capabilities within your mobile application. This package provides a `Draggable` component that can be wrapped around any React Native `View` or component to make it draggable within its parent container.

## Installation:
To install `@ngenux/react-native-draggable-view`, run the following command in your project directory:
```bash
npm install @ngenux/react-native-draggable-view
```

## Usage
Import the `Draggable` component from `@ngenux/react-native-draggable-view` and wrap it around the element you want to make draggable.

## Props
- `edgeSpacing`: The spacing from the edge of the screen when the element is dragged (default: 10).
- `childrenWidth`: The width of the child component (default: 150).
- `childrenHeight`: The height of the child component (default: 100).
- `shouldStartDrag`: A function that determines if dragging should start based on the gesture state.
- `initialOffsetX`: The initial X offset for the draggable element (default: 0).
- `initialOffsetY`: The initial Y offset for the draggable element (default: 0).
- `orientation`: String representing the current orientation of the view.
- `width`: The width of the draggable area (default: 360).
- `height`: The height of the draggable area (default: 750).
- `viewStyle`: Additional styles for the draggable view.

## Methods
- `resetPosition()`: Resets the draggable view to its initial position.

## Tips
To ensure the component functions correctly after orientation changes, provide the `orientation`, `width`, and `height` props. These will help the `Draggable` component adjust its position and boundaries in response to changes in the device's orientation.

## Example
```jsx
import React, { useRef } from 'react';
import { View, Text } from 'react-native';
import Draggable from '@ngenux/react-native-draggable-view';

const App = () => {
  const draggableRef = useRef();

  const handlePositionReset = () => {
    draggableRef.current.resetPosition();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Draggable
        edgeSpacing={10}
        childrenWidth={150}
        childrenHeight={100}
        shouldStartDrag={true}
        initialOffsetX={0}
        initialOffsetY={0}
        orientation="landscape"
        width={360}
        height={750}
        ref={ref => (draggableRef.current = ref)}
      >
        <View
          style={{
            width: 150,
            height: 100,
            backgroundColor: 'blue',
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
