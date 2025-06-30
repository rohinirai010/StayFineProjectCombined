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
} from "reactflow";
import "reactflow/dist/style.css";
import { User, ChevronRight, Lock, Unlock, Maximize } from "lucide-react";
import { CustomControls } from "./NetworksPageReusableComponents";
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

// Custom Node Component for sponsor tree nodes
const CustomSponsorNode = ({ data, id }) => {
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
                Count:{" "}
                <span className="text-purple-600 font-semibold">
                  {node.count}
                </span>
              </div>
            </div>
          </div>

          {/* Collapse indicator */}
          {node.children && node.children.length > 0 && node.collapsed && (
            <div className="mt-3 text-center">
              <div className="text-sm text-gray-800 bg-gray-100 px-3 py-1 rounded-full border-2 cursor-pointer hover:bg-gray-200">
                ... {node.totalChildrenCount || node.children.length} more
              </div>
            </div>
          )}
        </div>

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

// More indicator node component
const MoreIndicatorNode = ({ data }) => {
  const { count, onShowMore } = data;

  return (
    <div className="relative">
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

      <div className="flex flex-col items-center">
        <div
          onClick={onShowMore}
          className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-110 border-4 border-white shadow-md"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </div>
        <div className="text-center mt-2">
          <div className="text-sm text-gray-600 font-medium">{count} more</div>
        </div>
      </div>

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

// Enhanced positioning algorithm to prevent overlaps
const calculateSponsorNodePositions = (
  node,
  level = 0,
  x = 0,
  positions = new Map(),
  maxNodesPerLevel = 4,
  visibilityState = new Map(),
  usedPositions = new Set()
) => {
  if (!node) return positions;

  const levelSpacing = 280; // Increased vertical spacing
  const y = level * levelSpacing;

  // Ensure no position conflicts
  let finalX = x;
  let attempts = 0;
  const minDistance = 200; // Minimum horizontal distance between nodes

  while (attempts < 50) {
    let hasConflict = false;
    for (const [existingNodeId, existingPos] of positions) {
      if (
        Math.abs(existingPos.y - y) < 100 &&
        Math.abs(existingPos.x - finalX) < minDistance
      ) {
        hasConflict = true;
        break;
      }
    }

    if (!hasConflict) break;

    finalX =
      x + (attempts % 2 === 0 ? 1 : -1) * Math.ceil(attempts / 2) * minDistance;
    attempts++;
  }

  positions.set(node.id, { x: finalX, y, level });

  if (!node.collapsed && node.children && node.children.length > 0) {
    const visibleChildren = [];
    const hiddenChildren = [];

    // Determine which children are visible based on pagination
    const levelKey = `${node.id}-level-${level + 1}`;
    const showAll = visibilityState.get(levelKey) || false;

    if (showAll || node.children.length <= maxNodesPerLevel) {
      visibleChildren.push(...node.children);
    } else {
      visibleChildren.push(...node.children.slice(0, maxNodesPerLevel - 1));
      hiddenChildren.push(...node.children.slice(maxNodesPerLevel - 1));
    }

    // Calculate positions for visible children with better spacing
    const childCount =
      visibleChildren.length + (hiddenChildren.length > 0 ? 1 : 0);
    const baseSpacing = Math.max(250, 300 + childCount * 50); // Dynamic spacing based on child count
    const totalWidth = (childCount - 1) * baseSpacing;
    const startX = finalX - totalWidth / 2;

    visibleChildren.forEach((child, index) => {
      const childX = startX + index * baseSpacing;
      calculateSponsorNodePositions(
        child,
        level + 1,
        childX,
        positions,
        maxNodesPerLevel,
        visibilityState,
        usedPositions
      );
    });

    // Add "more" indicator if there are hidden children
    if (hiddenChildren.length > 0) {
      const moreX = startX + visibleChildren.length * baseSpacing;
      positions.set(`more-${levelKey}`, {
        x: moreX,
        y: (level + 1) * levelSpacing,
        level: level + 1,
        isMoreIndicator: true,
        hiddenCount: hiddenChildren.length,
        parentId: node.id,
      });
    }
  }

  return positions;
};

// Convert sponsor tree data to ReactFlow elements with pagination
const convertSponsorTreeToReactFlowElements = (
  treeData,
  onToggleCollapse,
  onShowMore,
  visibilityState,
  maxNodesPerLevel = 4
) => {
  const nodes = [];
  const edges = [];
  let nodeId = 0;

  // Calculate positions for all nodes
  const positions = calculateSponsorNodePositions(
    treeData,
    0,
    0,
    new Map(),
    maxNodesPerLevel,
    visibilityState,
    new Set()
  );

  const traverse = (node, parentId = null, level = 0) => {
    if (!node) return null;

    const currentId = `sponsor-node-${nodeId++}`;
    const position = positions.get(node.id);

    if (!position) return null;

    // Create sponsor node
    nodes.push({
      id: currentId,
      type: "sponsorNode",
      position: { x: position.x, y: position.y },
      data: { node, onToggleCollapse },
      draggable: true,
      zIndex: 1,
    });

    // Create edge from parent
    if (parentId) {
      edges.push({
        id: `sponsor-edge-${parentId}-${currentId}`,
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
    if (!node.collapsed && node.children) {
      const levelKey = `${node.id}-level-${level + 1}`;
      const showAll = visibilityState.get(levelKey) || false;

      let visibleChildren = [];
      let hiddenChildren = [];

      if (showAll || node.children.length <= maxNodesPerLevel) {
        visibleChildren = node.children;
      } else {
        visibleChildren = node.children.slice(0, maxNodesPerLevel - 1);
        hiddenChildren = node.children.slice(maxNodesPerLevel - 1);
      }

      // Process visible children
      visibleChildren.forEach((child) => {
        traverse(child, currentId, level + 1);
      });

      // Add "more" indicator if there are hidden children
      if (hiddenChildren.length > 0) {
        const morePosition = positions.get(`more-${levelKey}`);
        if (morePosition) {
          const moreId = `more-${nodeId++}`;

          nodes.push({
            id: moreId,
            type: "moreIndicator",
            position: { x: morePosition.x, y: morePosition.y },
            data: {
              count: hiddenChildren.length,
              onShowMore: () => onShowMore(levelKey),
              parentId: node.id,
            },
            draggable: false,
            zIndex: 1,
          });

          edges.push({
            id: `more-edge-${currentId}-${moreId}`,
            source: currentId,
            target: moreId,
            type: "smoothstep",
            style: {
              stroke: "#9CA3AF",
              strokeWidth: 2,
              strokeDasharray: "5,5",
            },
            markerEnd: {
              type: "arrowclosed",
              color: "#9CA3AF",
            },
          });
        }
      }
    }

    return currentId;
  };

  traverse(treeData);
  return { nodes, edges };
};

// Main SponsorTree component
export const SponsorTree = () => {
  const containerRef = useRef(null);
  const portalContainerRef = useRef(null);
  const [isLocked, setIsLocked] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [visibilityState, setVisibilityState] = useState(new Map());

  // Enhanced sample sponsor tree data with complete info
  const [treeData, setTreeData] = useState({
    id: "INF00123",
    name: "Root User",
    count: 16,
    personalUnit: 150,
    groupUnit: 2500,
    left: 7,
    right: 9,
    totalLeftCarry: 100,
    totalRightCarry: 200,
    level: 1,
    collapsed: false,
    active: true, 
    totalChildrenCount: 6,
    children: [
      {
        id: "INF75481323",
        name: "John Smith",
        count: 1,
        personalUnit: 120,
        groupUnit: 800,
        left: 7,
        right: 1,
        totalLeftCarry: 100,
        totalRightCarry: 200,
        level: 2,
        collapsed: false,
        active: true, 
        children: [
          {
            id: "INF3874705",
            name: "Alice Johnson",
            count: 0,
            personalUnit: 90,
            groupUnit: 300,
            left: 0,
            right: 0,
            totalLeftCarry: 50,
            totalRightCarry: 75,
            level: 3,
            collapsed: false,
            active: false, 
            children: [],
          },
        ],
      },
      {
        id: "INF18536507",
        name: "Sarah Davis",
        count: 5,
        personalUnit: 110,
        groupUnit: 1200,
        left: 3,
        right: 2,
        totalLeftCarry: 150,
        totalRightCarry: 180,
        level: 2,
        collapsed: false,
        children: [
          {
            id: "INF9165071",
            name: "Mike Brown",
            count: 3,
            personalUnit: 95,
            groupUnit: 600,
            left: 1,
            right: 2,
            totalLeftCarry: 80,
            totalRightCarry: 120,
            level: 3,
            collapsed: false,
            active: false, 
            children: [
              {
                id: "INF47794583",
                name: "Emma White",
                count: 0,
                personalUnit: 80,
                groupUnit: 250,
                left: 0,
                right: 0,
                totalLeftCarry: 40,
                totalRightCarry: 60,
                level: 4,
                collapsed: false,
                active: true, 
                children: [],
              },
              {
                id: "INF47794588",
                name: "Tom Green",
                count: 0,
                personalUnit: 85,
                groupUnit: 280,
                left: 0,
                right: 0,
                totalLeftCarry: 45,
                totalRightCarry: 65,
                level: 4,
                collapsed: false,
                active: true, 
                children: [],
              },
            ],
          },
          {
            id: "INF477945072",
            name: "Lisa Brown",
            count: 2,
            personalUnit: 75,
            groupUnit: 220,
            left: 1,
            right: 1,
            totalLeftCarry: 35,
            totalRightCarry: 55,
            level: 3,
            collapsed: false,
            active: false, 
            children: [],
          },
        ],
      },
      {
        id: "INF42341484",
        name: "Kevin Wilson",
        count: 5,
        personalUnit: 100,
        groupUnit: 900,
        left: 2,
        right: 3,
        totalLeftCarry: 120,
        totalRightCarry: 160,
        level: 2,
        collapsed: false,
        active: false, 
        children: [
          {
            id: "INF52392885",
            name: "Jennifer Lee",
            count: 1,
            personalUnit: 90,
            groupUnit: 220,
            left: 0,
            right: 1,
            totalLeftCarry: 30,
            totalRightCarry: 50,
            level: 3,
            collapsed: false,
            active: true, 
            children: [
              {
                id: "INF52392742",
                name: "David Kim",
                count: 0,
                personalUnit: 70,
                groupUnit: 180,
                left: 0,
                right: 0,
                totalLeftCarry: 25,
                totalRightCarry: 35,
                level: 4,
                collapsed: false,
                active: true, 
                children: [],
              },
            ],
          },
          {
            id: "INF52392886",
            name: "Mark Taylor",
            count: 2,
            personalUnit: 95,
            groupUnit: 240,
            left: 1,
            right: 1,
            totalLeftCarry: 40,
            totalRightCarry: 60,
            level: 3,
            collapsed: false,
            active: false, 
            children: [
              {
                id: "INF52392743",
                name: "Anna Davis",
                count: 0,
                personalUnit: 85,
                groupUnit: 200,
                left: 0,
                right: 0,
                totalLeftCarry: 20,
                totalRightCarry: 30,
                level: 4,
                collapsed: false,
                active: false, 
                children: [],
              },
            ],
          },
          {
            id: "INF52392887",
            name: "Rachel White",
            count: 1,
            personalUnit: 88,
            groupUnit: 210,
            left: 0,
            right: 1,
            totalLeftCarry: 25,
            totalRightCarry: 45,
            level: 3,
            collapsed: false,
            active: true, 
            children: [],
          },
        ],
      },
      {
        id: "INF99999001",
        name: "Michael Johnson",
        count: 2,
        personalUnit: 85,
        groupUnit: 400,
        left: 1,
        right: 1,
        totalLeftCarry: 60,
        totalRightCarry: 80,
        level: 2,
        collapsed: false,
        active: true, 
        children: [],
      },
      {
        id: "INF99999002",
        name: "Patricia Miller",
        count: 1,
        personalUnit: 95,
        groupUnit: 350,
        left: 0,
        right: 1,
        totalLeftCarry: 40,
        totalRightCarry: 70,
        level: 2,
        collapsed: false,
        active: true, 
        children: [],
      },
      {
        id: "INF99999003",
        name: "Robert Anderson",
        count: 0,
        personalUnit: 75,
        groupUnit: 200,
        left: 0,
        right: 0,
        totalLeftCarry: 30,
        totalRightCarry: 50,
        level: 2,
        collapsed: false,
        active: false, 
        children: [],
      },
    ],
  });

  const nodeTypes = useMemo(
    () => ({
      sponsorNode: CustomSponsorNode,
      moreIndicator: MoreIndicatorNode,
    }),
    []
  );

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

  const handleShowMore = useCallback((levelKey) => {
    setVisibilityState((prev) => {
      const newState = new Map(prev);
      newState.set(levelKey, true);
      return newState;
    });
  }, []);

  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () =>
      convertSponsorTreeToReactFlowElements(
        treeData,
        handleToggleCollapse,
        handleShowMore,
        visibilityState,
        4 // Max nodes per level before showing "more"
      ),
    [treeData, handleToggleCollapse, handleShowMore, visibilityState]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes and edges when treeData or visibilityState changes
  React.useEffect(() => {
    const { nodes: newNodes, edges: newEdges } =
      convertSponsorTreeToReactFlowElements(
        treeData,
        handleToggleCollapse,
        handleShowMore,
        visibilityState,
        4
      );

    const updatedNodes = newNodes.map((node) => ({
      ...node,
      draggable: node.type === "sponsorNode" ? !isLocked : false,
    }));

    setNodes(updatedNodes);
    setEdges(newEdges);
  }, [
    treeData,
    handleToggleCollapse,
    handleShowMore,
    visibilityState,
    setNodes,
    setEdges,
    isLocked,
  ]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleToggleLock = useCallback(() => {
    setIsLocked((prev) => !prev);
  }, []);

  const handleFullscreen = useCallback(() => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
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

export default SponsorTree;
