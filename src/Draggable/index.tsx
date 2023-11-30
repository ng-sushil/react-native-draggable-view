import React, { Component } from 'react';
import { Dimensions, PanResponder, View } from 'react-native';
import type { ViewStyle,PanResponderInstance } from 'react-native';

interface DraggableViewProps {
  edgeSpacing?: number;
  childrenWidth?: number;
  childrenHeight?: number;
  shouldStartDrag?: boolean;
  viewStyle?: ViewStyle;
  initialOffsetX?: number;
  initialOffsetY?: number;
}

interface DraggableViewState {
  isDragging: boolean;
  offsetX: number;
  offsetY: number;
  previousOffsetX: number;
  previousOffsetY: number;
  tempW: number;
  tempH: number;
}

const { width, height } = Dimensions.get('window');

class DraggableView extends Component<DraggableViewProps, DraggableViewState> {
  private defaultEdgeSpacing: number;
  private defaultChildrenWidth: number;
  private defaultChildrenHeight: number;
  private panResponder: PanResponderInstance;

  constructor(props: DraggableViewProps) {
    super(props);
    const initialOffsetX = 0;
    const initialOffsetY = 0;
    this.defaultEdgeSpacing = this.props.edgeSpacing || 10;
    this.defaultChildrenWidth = this.props.childrenWidth || 180;
    this.defaultChildrenHeight = this.props.childrenHeight || 148;

    this.state = {
      isDragging: false,
      offsetX: initialOffsetX,
      offsetY: initialOffsetY,
      previousOffsetX: initialOffsetX,
      previousOffsetY: initialOffsetY,
      tempW: width,
      tempH: height,
    };

    this.handleSizeChange = this.handleSizeChange.bind(this);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (_, gestureState) => {
        if (this.props.shouldStartDrag) {
          return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
        }
        return false;
      },
      onMoveShouldSetPanResponder: (_, gestureState) => {
        if (this.props.shouldStartDrag) {
          return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
        }
        return false;
      },
      onPanResponderGrant: () => {
        this.setState({ isDragging: true });
      },
      onPanResponderMove: (_, gestureState) => {
        if (this.state.isDragging) {
          const { previousOffsetX, previousOffsetY, tempW, tempH } = this.state;
          const newOffsetX = previousOffsetX + gestureState.dx;
          const newOffsetY = previousOffsetY + gestureState.dy;

          const maxX = tempW - this.defaultChildrenWidth - this.defaultEdgeSpacing;
          const maxY = tempH - this.defaultChildrenHeight - this.defaultEdgeSpacing;

          const boundedOffsetX = Math.max(this.defaultEdgeSpacing, Math.min(newOffsetX, maxX));
          const boundedOffsetY = Math.max(this.defaultEdgeSpacing, Math.min(newOffsetY, maxY));

          this.setState({
            offsetX: boundedOffsetX,
            offsetY: boundedOffsetY,
          });
        }
      },
      onPanResponderRelease: () => {
        this.setState((prevState) => ({
          isDragging: false,
          previousOffsetX: prevState.offsetX,
          previousOffsetY: prevState.offsetY,
        }));
      },
      onPanResponderTerminate: () => {
        this.setState({ isDragging: false });
      },
    });
  }

  handleSizeChange(e: any) {
    const { width, height } = e.window;
    const { offsetX, offsetY, tempW, tempH } = this.state;

    const widthRatio = tempW ? width / tempW : 0;
    const heightRatio = tempH ? height / tempH : 0;

    const newOffsetX = offsetX * widthRatio;
    const newOffsetY = offsetY * heightRatio;

    const maxX = width - this.defaultChildrenWidth - this.defaultEdgeSpacing;
    const maxY = height - this.defaultChildrenHeight - this.defaultEdgeSpacing;

    const boundedOffsetX = !isNaN(newOffsetX)
      ? Math.max(this.defaultEdgeSpacing, Math.min(newOffsetX, maxX))
      : this.defaultEdgeSpacing;
    const boundedOffsetY = !isNaN(newOffsetY)
      ? Math.max(this.defaultEdgeSpacing, Math.min(newOffsetY, maxY))
      : this.defaultEdgeSpacing;

    this.setState({
      tempW: width,
      tempH: height,
      offsetX: boundedOffsetX,
      offsetY: boundedOffsetY,
      previousOffsetX: boundedOffsetX,
      previousOffsetY: boundedOffsetY,
    });
  }

  componentDidUpdate(prevProps: DraggableViewProps) {
    Dimensions.addEventListener('change', this.handleSizeChange);

    if (prevProps.shouldStartDrag !== this.props.shouldStartDrag) {
      const tempX = 0;
      const tempY = 0;

      this.setState({
        offsetX: tempX,
        offsetY: tempY,
        previousOffsetX: tempX,
        previousOffsetY: tempY,
      });
    }
  }

  resetPosition = () => {
    const { initialOffsetX, initialOffsetY } = this.props;

    this.setState({
      isDragging: false,
      offsetX: initialOffsetX || 0,
      offsetY: initialOffsetY || 0,
      previousOffsetX: 0,
      previousOffsetY: 0,
    });
  };

  render() {
    const { offsetX, offsetY } = this.state;
    const { viewStyle, shouldStartDrag, childrenWidth, childrenHeight } = this.props;

    const safeChildrenWidth = childrenWidth || 180;
    const safeChildrenHeight = childrenHeight || 148;

    const maxX = this.state.tempW - safeChildrenWidth;
    const maxY = this.state.tempH - safeChildrenHeight;

    const boundedOffsetX = Math.max(0, Math.min(offsetX, maxX));
    const boundedOffsetY = Math.max(0, Math.min(offsetY, maxY));

    return (
      <View
        {...this.panResponder.panHandlers}
        style={{
          position: 'absolute',
          top: boundedOffsetY,
          left: boundedOffsetX,
          ...(shouldStartDrag && { zIndex: 9999 }),
          ...viewStyle,
        }}
      >
        {this.props.children}
      </View>
    );
  }
}

export default DraggableView;
