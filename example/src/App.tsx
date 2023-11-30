import React from 'react';
import { View, Text } from 'react-native';
import Draggable from '@ngenux/react-native-draggable-view';

const App = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Draggable
        edgeSpacing={0}
        childrenWidth={100}
        childrenHeight={50}
        viewStyle={{ backgroundColor: 'blue' }}
        shouldStartDrag={true}
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
