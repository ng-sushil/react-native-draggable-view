import React, { Component } from 'react';
import type { PanResponderInstance, ViewStyle } from 'react-native';
import { PanResponder, View } from 'react-native';

interface DraggableViewProps {
  edgeSpacing?: number;
  childrenWidth?: number;
  childrenHeight?: number;
  shouldStartDrag?: boolean;
  viewStyle?: ViewStyle;
  initialOffsetX?: number;
  initialOffsetY?: number;
  orientation: string;
  width?: number;
  height?: number;
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
    this.defaultChildrenWidth = this.props.childrenWidth || 150;
    this.defaultChildrenHeight = this.props.childrenHeight || 100;

    this.state = {
      isDragging: false,
      offsetX: initialOffsetX,
      offsetY: initialOffsetY,
      previousOffsetX: initialOffsetX,
      previousOffsetY: initialOffsetY,
      tempW: this.props.width || 360,
      tempH: this.props.height || 750,
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

          const maxX = tempW - this.defaultEdgeSpacing;
          const maxY = tempH - this.defaultEdgeSpacing;

          const boundedOffsetX = this.calculateBoundedOffset(
            newOffsetX,
            maxX,
            this.defaultEdgeSpacing
          );
          const boundedOffsetY = this.calculateBoundedOffset(
            newOffsetY,
            maxY,
            this.defaultEdgeSpacing
          );

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

  handleSizeChange() {
    let width = this.props.width || 360;
    let height = this.props.height || 750;
    const { offsetX, offsetY, tempW, tempH } = this.state;

    const widthRatio = tempW ? width / tempW : 0;
    const heightRatio = tempH ? height / tempH : 0;

    const newOffsetX = offsetX * widthRatio;
    const newOffsetY = offsetY * heightRatio;

    const maxX = width - this.defaultChildrenWidth - this.defaultEdgeSpacing;
    const maxY = height - this.defaultChildrenHeight - this.defaultEdgeSpacing;

    const boundedOffsetX = this.calculateBoundedOffset(
      newOffsetX,
      maxX,
      this.defaultEdgeSpacing
    );
    const boundedOffsetY = this.calculateBoundedOffset(
      newOffsetY,
      maxY,
      this.defaultEdgeSpacing
    );

    this.setState({
      offsetX: boundedOffsetX,
      offsetY: boundedOffsetY,
      previousOffsetX: offsetX,
      previousOffsetY: offsetY,
    });
  }

  componentDidUpdate(prevProps: DraggableViewProps) {
    if (
      prevProps.orientation !== this.props.orientation ||
      prevProps.width !== this.props.width ||
      prevProps.height !== this.props.height
    ) {
      this.handleSizeChange();
    }
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

  calculateBoundedOffset(
    offset: number,
    maxOffset: number,
    edgeSpacing: number
  ) {
    const boundedOffset = Math.max(edgeSpacing, Math.min(offset, maxOffset));
    return boundedOffset;
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
    const {
      viewStyle,
      shouldStartDrag,
      childrenWidth,
      childrenHeight,
      children,
    } = this.props;

    const safeChildrenWidth = childrenWidth || 150;
    const safeChildrenHeight = childrenHeight || 120;

    const maxX = this.state.tempW - safeChildrenWidth - this.defaultEdgeSpacing;
    const maxY =
      this.state.tempH - safeChildrenHeight - this.defaultEdgeSpacing;

    const boundedOffsetX = this.calculateBoundedOffset(
      offsetX,
      maxX,
      this.defaultEdgeSpacing
    );
    const boundedOffsetY = this.calculateBoundedOffset(
      offsetY,
      maxY,
      this.defaultEdgeSpacing
    );

    return (
      <View
        {...this.panResponder.panHandlers}
        style={[
          {
            position: 'absolute',
            top: boundedOffsetY,
            left: boundedOffsetX,
            ...(shouldStartDrag && { zIndex: 9999 }),
            ...viewStyle,
          },
        ]}
      >
        {children}
      </View>
    );
  }
}

export default DraggableView;
