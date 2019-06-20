import { Component } from 'react';
class TabNode extends Component {
    render() {
        const { connectDragSource, connectDropTarget, children } = this.props;

        return connectDragSource(connectDropTarget(children));
    }
}

export default TabNode;
  