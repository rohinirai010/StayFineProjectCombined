import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  createContext,
  useContext,
} from "react";
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  Maximize,
  Plus,
  Minus,
  User,
  RotateCcw,
  Lock,
  Unlock,
} from "lucide-react";
import { createPortal } from "react-dom";

// Create context for info card portal
const InfoCardContext = createContext();

// Info Card Component that renders via portal
const InfoCard = ({ node, position, isVisible }) => {
  const portalContainer = useContext(InfoCardContext);

  if (!isVisible || !node || !portalContainer) return null;

  return createPortal(
    <div
      className="fixed bg-white rounded-xl shadow-2xl border-2 border-gray-100 p-2 w-46 max-w-[46vw] backdrop-blur-sm pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
        zIndex: 10000,
        transform: "translate(-50%, 0)",
      }}
    >
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-6 h-6 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
          <User className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="font-bold text-[12px] text-gray-800">{node.name}</div>
          <div className="text-[11px] text-gray-700 font-medium">{node.id}</div>
        </div>
      </div>

      <div className="space-y-1 text-[11px]">
        <div className="flex justify-between items-center px-2 py-1 bg-gray-50 rounded-lg">
          <span className="text-gray-700 font-medium">Status</span>
          <span
            className={`font-bold ${
              node.active ? "text-green-600" : "text-red-600"
            }`}
          >
            {node.active ? "Active" : "Inactive"}
          </span>
        </div>
        <div className="flex justify-between items-center px-2 py-1 bg-purple-50 rounded-lg">
          <span className="text-gray-700 font-medium">Personal Unit</span>
          <span className="font-bold text-purple-600">{node.personalUnit}</span>
        </div>
        <div className="flex justify-between items-center px-2 py-1 bg-blue-50 rounded-lg">
          <span className="text-gray-700 font-medium">Group Unit</span>
          <span className="font-bold text-blue-600">{node.groupUnit}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex justify-between items-center px-2 py-1 bg-gray-100 rounded-lg">
            <span className="text-gray-600">Left</span>
            <span className="font-bold text-gray-800">{node.left}</span>
          </div>
          <div className="flex justify-between items-center px-2 py-1 bg-gray-100 rounded-lg">
            <span className="text-gray-600">Right</span>
            <span className="font-bold text-gray-800">{node.right}</span>
          </div>
        </div>
        <div className="flex justify-between items-center px-2 py-1 bg-green-50 rounded-lg">
          <span className="text-gray-700 font-medium">Total Left Carry</span>
          <span className="font-bold text-green-600">
            {node.totalLeftCarry}
          </span>
        </div>
        <div className="flex justify-between items-center px-2 py-1 bg-orange-50 rounded-lg">
          <span className="text-gray-700 font-medium">Total Right Carry</span>
          <span className="font-bold text-orange-600">
            {node.totalRightCarry}
          </span>
        </div>
      </div>

      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-white border-l-2 border-t-2 border-gray-100 rotate-45"></div>
    </div>,
    portalContainer
  );
};

// Custom Node Component for actual nodes
const CustomTreeNode = ({ data, id }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [infoCardPosition, setInfoCardPosition] = useState({ x: 0, y: 0 });
  const nodeRef = useRef(null);
  const { node, onToggleCollapse } = data;

  const handleNodeClick = () => {
    if (node && onToggleCollapse) {
      onToggleCollapse(node.id);
    }
  };

  const handleMouseEnter = () => {
    if (nodeRef.current) {
      const rect = nodeRef.current.getBoundingClientRect();
      setInfoCardPosition({
        x: rect.left + rect.width / 2,
        y: rect.bottom + 10,
      });
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <div className="relative" ref={nodeRef}>
        <Handle
          type="target"
          position={Position.Top}
          style={{
            background: "transparent",
            border: "none",
            width: "1px",
            height: "1px",
          }}
        />

        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="flex flex-col items-center relative z-10"
            style={{ zIndex: 10 }}
          >
         <div
  onClick={handleNodeClick}
  className={`w-16 h-16 bg-gradient-to-br from-purple-300 via-blue-500 to-indigo-600 rounded-full flex items-center justify-center cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-110 border-3 ${
    node.active 
      ? 'border-green-400 shadow-green-300/20' 
      : 'border-red-400 shadow-red-300/50'
  } shadow-lg relative`}
>
  <User className="w-9 h-9 text-white drop-shadow-lg" />
  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 opacity-50 blur-sm"></div>
  
  {/* Double ring effect */}
  <div className={`absolute -inset-2 rounded-full border-2 ${
    node.active 
      ? 'border-green-300 shadow-green-300/10' 
      : 'border-red-300 shadow-red-400/30'
  } shadow-2xl animate-pulse opacity-60`}></div>
  
  <div className={`absolute -inset-3.5 rounded-full border-2 ${
    node.active 
      ? 'border-green-200' 
      : 'border-red-200'
  } opacity-40 animate-pulse`} style={{ animationDelay: '0.5s' }}></div>
  
  {/* Large status indicator */}
  <div className={`absolute -top-2 -right-2 w-6 h-6 ${
    node.active ? 'bg-green-500' : 'bg-red-500'
  } rounded-full border-3 border-white shadow-xl flex items-center justify-center z-10`}>
    <div className={`w-3 h-3 ${
      node.active ? 'bg-green-200' : 'bg-red-200'
    } rounded-full animate-pulse`}></div>
  </div>
  
  
</div>

            <div className="text-center mt-3">
              <div className="font-bold text-[16px] tracking-wide text-gray-800 bg-white px-3 py-1 rounded-full shadow-sm border">
                {node.id}
              </div>
              <div className="text-base text-gray-600 mt-1 font-medium">
                Left:{" "}
                <span className="text-purple-600 font-semibold">
                  {node.left}
                </span>{" "}
                | Right:{" "}
                <span className="text-blue-600 font-semibold">
                  {node.right}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Collapse indicator */}
        {node.children && node.children.length > 0 && node.collapsed && (
          <div className="mt-3 text-center">
            <div className="text-sm text-gray-800 bg-gray-100 px-3 py-1 rounded-full border-2">
              ... {node.childrenCount} more
            </div>
          </div>
        )}

        <Handle
          type="source"
          position={Position.Bottom}
          style={{
            background: "transparent",
            border: "none",
            width: "1px",
            height: "1px",
          }}
        />
      </div>

      {/* Info Card rendered via portal */}
      <InfoCard node={node} position={infoCardPosition} isVisible={isHovered} />
    </>
  );
};

// Custom Plus Circle Node Component
const PlusCircleNode = ({ data }) => {
  const { onAddNode, position, parentId } = data;

  const handleAddClick = (e) => {
    e.stopPropagation();
    // Navigate to /user/register
    window.location.href = "/user/register";
    // Also call the onAddNode if needed
    if (onAddNode) {
      onAddNode(position, parentId);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: "transparent",
          border: "none",
          width: "1px",
          height: "1px",
        }}
      />
      <button
        onClick={handleAddClick}
        className="relative z-10 w-8 h-8 border-3 border-dashed border-purple-400 rounded-full flex items-center justify-center hover:border-purple-600 hover:bg-purple-50 transition-all duration-300 group shadow-lg hover:shadow-xl cursor-pointer"
      >
        <Plus className="w-6 h-6 text-purple-500 group-hover:text-purple-700" />
      </button>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: "transparent",
          border: "none",
          width: "1px",
          height: "1px",
        }}
      />
    </div>
  );
};

// Custom Controls Component
export const CustomControls = ({ isLocked, onToggleLock, onFullscreen }) => {
  const { zoomIn, zoomOut, fitView, getZoom } = useReactFlow();
  const [currentZoom, setCurrentZoom] = useState(50);

  const handleZoomIn = () => {
    zoomIn();
    // Update zoom display
    setTimeout(() => {
      const zoom = getZoom();
      setCurrentZoom(Math.round(zoom * 100));
    }, 100);
  };

  const handleZoomOut = () => {
    zoomOut();
    // Update zoom display
    setTimeout(() => {
      const zoom = getZoom();
      setCurrentZoom(Math.round(zoom * 100));
    }, 100);
  };

  const handleFitView = () => {
    fitView();
    setTimeout(() => {
      const zoom = getZoom();
      setCurrentZoom(Math.round(zoom * 100));
    }, 100);
  };

  return (
    <div className="absolute top-4 right-4 flex flex-col space-y-2 z-50">
      <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-200 shadow-lg p-1">
        <button
          onClick={handleZoomOut}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4 text-gray-600" />
        </button>

        <span className="text-sm font-medium px-2 py-1 min-w-[60px] text-center">
          {currentZoom}%
        </span>

        <button
          onClick={handleZoomIn}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          title="Zoom In"
        >
          <Plus className="w-4 h-4 text-gray-600" />
        </button>

        <div className="w-px h-6 bg-gray-300"></div>

        <button
          onClick={handleFitView}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          title="Fit View"
        >
          <RotateCcw className="w-4 h-4 text-gray-600" />
        </button>

        <button
          onClick={onToggleLock}
          className={`p-2 rounded-md transition-colors ${
            isLocked
              ? "bg-red-100 hover:bg-red-200 text-red-600"
              : "hover:bg-gray-100 text-gray-600"
          }`}
          title={
            isLocked ? "Unlock (Enable Dragging)" : "Lock (Disable Dragging)"
          }
        >
          {isLocked ? (
            <Lock className="w-4 h-4" />
          ) : (
            <Unlock className="w-4 h-4" />
          )}
        </button>

        <button
          onClick={onFullscreen}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          title="Toggle Fullscreen"
        >
          <Maximize className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

// Improved positioning algorithm with better spacing
const calculateNodePositions = (
  node,
  level = 0,
  leftBound = 0,
  rightBound = 1900,
  positions = new Map()
) => {
  if (!node) return positions;

  // Calculate minimum spacing needed per level
  const baseSpacing = Math.max(300, Math.pow(2, Math.max(0, 5 - level)) * 100);
  const levelSpacing = 250; // Increased vertical spacing

  // Calculate the center position
  const x = (leftBound + rightBound) / 2;
  const y = level * levelSpacing;

  positions.set(node.id, { x, y, level });

  if (!node.collapsed && node.children) {
    const leftChild = node.children[0];
    const rightChild = node.children[1];

    // Calculate child bounds with improved spacing
    const centerX = x;
    const halfSpacing = baseSpacing / 2;

    if (leftChild) {
      calculateNodePositions(
        leftChild,
        level + 1,
        leftBound,
        centerX,
        positions
      );
    }
    if (rightChild) {
      calculateNodePositions(
        rightChild,
        level + 1,
        centerX,
        rightBound,
        positions
      );
    }
  }

  return positions;
};

// Helper function to convert tree data to ReactFlow nodes and edges
const convertToReactFlowElements = (treeData, onAddNode, onToggleCollapse) => {
  const nodes = [];
  const edges = [];
  let nodeId = 0;

  // Calculate positions for all nodes with improved spacing
  const positions = calculateNodePositions(treeData);

  const traverse = (node, parentId = null) => {
    if (!node) return null;

    const currentId = `node-${nodeId++}`;
    const position = positions.get(node.id);

    if (!position) return null;

    // Create actual node
    nodes.push({
      id: currentId,
      type: "customNode",
      position: { x: position.x, y: position.y },
      data: {
        node,
        onToggleCollapse,
      },
      draggable: true,
      zIndex: 1,
    });

    // Create edge from parent
    if (parentId) {
      edges.push({
        id: `edge-${parentId}-${currentId}`,
        source: parentId,
        target: currentId,
        type: "smoothstep",
        style: {
          stroke: "#8B5CF6",
          strokeWidth: 3,
          strokeDasharray: "0",
        },
        markerEnd: {
          type: "arrowclosed",
          color: "#8B5CF6",
        },
      });
    }

    // Process children if not collapsed
    if (!node.collapsed) {
      if (node.children) {
        const leftChild = node.children[0];
        const rightChild = node.children[1];

        // Calculate improved child positions
        const childSpacing = Math.max(
          100,
          Math.pow(2, Math.max(0, 4 - position.level)) * 40
        );
        const childY = position.y + 250;

        // Handle left child
        if (leftChild) {
          traverse(leftChild, currentId);
        } else {
          // Create plus circle for missing left child
          const plusNodeId = `plus-${nodeId++}`;
          const leftX = position.x - childSpacing;

          nodes.push({
            id: plusNodeId,
            type: "plusNode",
            position: { x: leftX, y: childY },
            data: {
              onAddNode,
              position: "left",
              parentId: node.id,
            },
            draggable: false,
          });

          edges.push({
            id: `edge-${currentId}-${plusNodeId}`,
            source: currentId,
            target: plusNodeId,
            type: "smoothstep",
            style: {
              stroke: "#C084FC",
              strokeWidth: 2,
              strokeDasharray: "5,5",
            },
            markerEnd: {
              type: "arrowclosed",
              color: "#C084FC",
            },
          });
        }

        // Handle right child
        if (rightChild) {
          traverse(rightChild, currentId);
        } else {
          // Create plus circle for missing right child
          const plusNodeId = `plus-${nodeId++}`;
          const rightX = position.x + childSpacing;

          nodes.push({
            id: plusNodeId,
            type: "plusNode",
            position: { x: rightX, y: childY },
            data: {
              onAddNode,
              position: "right",
              parentId: node.id,
            },
            draggable: false,
          });

          edges.push({
            id: `edge-${currentId}-${plusNodeId}`,
            source: currentId,
            target: plusNodeId,
            type: "smoothstep",
            style: {
              stroke: "#C084FC",
              strokeWidth: 2,
              strokeDasharray: "5,5",
            },
            markerEnd: {
              type: "arrowclosed",
              color: "#C084FC",
            },
          });
        }
      } else {
        // No children array exists, create both plus circles
        const childSpacing = Math.max(
          100,
          Math.pow(2, Math.max(0, 4 - position.level)) * 40
        );
        const childY = position.y + 250;

        const positions = [
          { pos: "left", x: position.x - childSpacing },
          { pos: "right", x: position.x + childSpacing },
        ];

        positions.forEach(({ pos, x }) => {
          const plusNodeId = `plus-${nodeId++}`;

          nodes.push({
            id: plusNodeId,
            type: "plusNode",
            position: { x, y: childY },
            data: {
              onAddNode,
              position: pos,
              parentId: node.id,
            },
            draggable: false,
          });

          edges.push({
            id: `edge-${currentId}-${plusNodeId}`,
            source: currentId,
            target: plusNodeId,
            type: "smoothstep",
            style: {
              stroke: "#C084FC",
              strokeWidth: 2,
              strokeDasharray: "5,5",
            },
            markerEnd: {
              type: "arrowclosed",
              color: "#C084FC",
            },
          });
        });
      }
    }

    return currentId;
  };

  traverse(treeData);
  return { nodes, edges };
};

// Main component
export const GenealogyTree = () => {
  const containerRef = useRef(null);
  const portalContainerRef = useRef(null);
  const [isLocked, setIsLocked] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [treeData, setTreeData] = useState({
    id: "INF00123",
    name: "Brent Hall",
    left: 9,
    right: 14,
    personalUnit: 150,
    groupUnit: 0,
    totalLeftCarry: 0,
    totalRightCarry: 350,
    active: true, 
    collapsed: false,
    childrenCount: 2,
    children: [
      {
        id: "INF75681323",
        name: "John Smith",
        left: 7,
        right: 1,
        personalUnit: 120,
        groupUnit: 50,
        totalLeftCarry: 100,
        totalRightCarry: 200,
        active: false, 
        collapsed: false,
        childrenCount: 2,
        children: [
          {
            id: "LANGLANG1",
            name: "Lang Lang",
            left: 6,
            right: 0,
            personalUnit: 80,
            groupUnit: 30,
            totalLeftCarry: 50,
            totalRightCarry: 100,
            active: true,
            collapsed: false,
            children: [
              {
                id: "SAM123",
                name: "Sam Wilson",
                left: 5,
                right: 0,
                personalUnit: 60,
                groupUnit: 20,
                totalLeftCarry: 25,
                totalRightCarry: 75,
                active: false, 
                collapsed: false,
                children: [null, null],
              },
              null,
            ],
          },
          {
            id: "INF3874705",
            name: "Mike Johnson",
            left: 0,
            right: 0,
            personalUnit: 90,
            groupUnit: 40,
            totalLeftCarry: 60,
            totalRightCarry: 120,
            active: true, 
            collapsed: false,
            children: [null, null],
          },
        ],
      },
      {
        id: "INF18536507",
        name: "Sarah Davis",
        left: 4,
        right: 9,
        personalUnit: 110,
        groupUnit: 60,
        totalLeftCarry: 80,
        totalRightCarry: 180,
        active: true, 
        collapsed: false,
        childrenCount: 4,
        children: [
          {
            id: "INF9165071",
            name: "Alex Brown",
            left: 3,
            right: 0,
            personalUnit: 70,
            groupUnit: 25,
            totalLeftCarry: 40,
            totalRightCarry: 90,
            active: false, 
            collapsed: false,
            children: [
              {
                id: "INF98459470",
                name: "Emma White",
                left: 2,
                right: 0,
                personalUnit: 50,
                groupUnit: 15,
                totalLeftCarry: 20,
                totalRightCarry: 60,
                active: true,
                collapsed: false,
                children: [null, null],
              },
              null,
            ],
          },
          {
            id: "INF42341484",
            name: "David Wilson",
            left: 3,
            right: 5,
            personalUnit: 95,
            groupUnit: 45,
            totalLeftCarry: 70,
            totalRightCarry: 140,
            active: true, 
            collapsed: false,
            children: [
              {
                id: "INF55326858",
                name: "Lisa Garcia",
                left: 1,
                right: 1,
                personalUnit: 65,
                groupUnit: 20,
                totalLeftCarry: 30,
                totalRightCarry: 80,
                active: false, 
                collapsed: false,
                children: [null, null],
              },
              {
                id: "INF52392884",
                name: "Tom Martinez",
                left: 0,
                right: 4,
                personalUnit: 75,
                groupUnit: 35,
                totalLeftCarry: 50,
                totalRightCarry: 110,
                active: true, 
                collapsed: false,
                children: [null, null],
              },
            ],
          },
        ],
      },
    ],
  });

  const nodeTypes = useMemo(
    () => ({
      customNode: CustomTreeNode,
      plusNode: PlusCircleNode,
    }),
    []
  );

  const handleAddNode = useCallback((position, parentNodeId) => {
    console.log(
      "Adding node at position:",
      position,
      "for parent:",
      parentNodeId
    );
  }, []);

  const handleToggleCollapse = useCallback((nodeId) => {
    const toggleNodeCollapse = (node) => {
      if (!node) return node;

      if (node.id === nodeId) {
        return { ...node, collapsed: !node.collapsed };
      }

      if (node.children) {
        return {
          ...node,
          children: node.children.map((child) =>
            child ? toggleNodeCollapse(child) : child
          ),
        };
      }
      return node;
    };

    setTreeData((prevData) => toggleNodeCollapse(prevData));
  }, []);

  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () =>
      convertToReactFlowElements(treeData, handleAddNode, handleToggleCollapse),
    [treeData, handleAddNode, handleToggleCollapse]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes and edges when treeData changes
  React.useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = convertToReactFlowElements(
      treeData,
      handleAddNode,
      handleToggleCollapse
    );

    // Update draggable property based on lock state
    const updatedNodes = newNodes.map((node) => ({
      ...node,
      draggable: node.type === "customNode" ? !isLocked : false,
    }));

    setNodes(updatedNodes);
    setEdges(newEdges);
  }, [
    treeData,
    handleAddNode,
    handleToggleCollapse,
    setNodes,
    setEdges,
    isLocked,
  ]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleToggleLock = useCallback(() => {
    setIsLocked((prev) => {
      const newLocked = !prev;
      // Update node draggable state
      setNodes((nodes) =>
        nodes.map((node) => ({
          ...node,
          draggable: node.type === "customNode" ? !newLocked : false,
        }))
      );
      return newLocked;
    });
  }, [setNodes]);

  const handleFullscreen = useCallback(() => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      // Enter fullscreen
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.mozRequestFullScreen) {
        containerRef.current.mozRequestFullScreen();
      } else if (containerRef.current.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen();
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }, [isFullscreen]);

  // Listen for fullscreen changes
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  return (
    <InfoCardContext.Provider value={portalContainerRef.current}>
      <div
        ref={containerRef}
        className={`bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg flex flex-col border border-gray-200 ${
          isFullscreen ? "h-screen w-screen" : "h-[600px]"
        }`}
      >
        <div className="flex-1 rounded-xl bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 overflow-hidden relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            minZoom={0.1}
            maxZoom={4}
            nodesDraggable={!isLocked}
            nodesConnectable={false}
            elementsSelectable={!isLocked}
          >
            <CustomControls
              isLocked={isLocked}
              onToggleLock={handleToggleLock}
              onFullscreen={handleFullscreen}
            />
            <Background color="#e2e8f0" gap={20} size={4} />
          </ReactFlow>
        </div>

        {/* Portal container for info cards */}
        <div ref={portalContainerRef} />
      </div>
    </InfoCardContext.Provider>
  );
};
