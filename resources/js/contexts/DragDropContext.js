import React from 'react';

const DragDropContext = React.createContext({
    draggedItem: null,
    setDraggedItem: () => {},
});

export default DragDropContext;
