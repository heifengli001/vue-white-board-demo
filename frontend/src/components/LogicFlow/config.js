const styleConfig = {
  style: {
    rect: {
      rx: 5,
      ry: 5,
      strokeWidth: 2
    },
    circle: {
      fill: '#f5f5f5'
    }
  }
}

const silentConfig = {
  isSilentMode: true,
  stopScrollGraph: false,
  stopMoveGraph: false,
  stopZoomGraph: false,
  adjustEdge: false,
  adjustEdgeStartAndEnd: false,
  adjustNodePosition: false,
  hideAnchors: true,
  nodeSelectedOutline: true,
  nodeTextEdit: false,
  edgeTextEdit: false,
  nodeTextDraggable: false,
  edgeTextDraggable: false,
}

const editConfig = {
  isSilentMode: false,

}

export { silentConfig, editConfig, styleConfig }
