// import { useEffect } from "react";
// import { Dimensions } from "react-native";
// import { useSharedValue } from "react-native-reanimated";

// type SpawnEdge = "top" | "bottom" | "left" | "right";

// type PlaneConfig = {
//   startX: number;
//   startY: number;
//   endX: number;
//   endY: number;
//   rotation: number;
// };

// function getRandomEdge(): SpawnEdge {
//   const edges: SpawnEdge[] = ["top", "bottom", "left", "right"];
//   return edges[Math.floor(Math.random() * edges.length)];
// }


// const WINDOW_HEIGHT = Dimensions.get('window').height;
// const WINDOW_WIDTH = Dimensions.get("window").width;

// function getSpawnPosition(edge: SpawnEdge): PlaneConfig {
//   switch (edge) {
//     case "top":
//       return {
//         startX: Math.random() * WINDOW_WIDTH,
//         startY: -80,
//         endX: Math.random() * WINDOW_WIDTH,
//         endY: WINDOW_HEIGHT + 80,
//         rotation: 180,
//       };
//     case "bottom":
//       return {
//         startX: Math.random() * WINDOW_WIDTH,
//         startY: WINDOW_HEIGHT + 80,
//         endX: Math.random() * WINDOW_WIDTH,
//         endY: -80,
//         rotation: 0,
//       };
//     case "left":
//       return {
//         startX: -80,
//         startY: Math.random() * WINDOW_HEIGHT,
//         endX: WINDOW_WIDTH + 80,
//         endY: Math.random() * WINDOW_HEIGHT,
//         rotation: 90,
//       };
//     case "right":
//       return {
//         startX: WINDOW_WIDTH + 80,
//         startY: Math.random() * WINDOW_HEIGHT,
//         endX: -80,
//         endY: Math.random() * WINDOW_HEIGHT,
//         rotation: -90,
//       };
//   }
// }


// function PlaneItem({
//   config,
//   isTarget,
//   seed,
// }: {
//   config: PlaneConfig;
//   isTarget: boolean;
//   seed: boolean;
// }) {
//   const translateX = useSharedValue(config.startX);
//   const translateY = useSharedValue(config.startY);
//   const rotate = useSharedValue(config.rotation);

//   useEffect(() => {
//     translateX.value = withRepeat(
//       withTiming(config.endX, {
//         duration: 3000 + Math.random() * 2000,
//       }),
//       -1,
//       false
//     );

//     translateY.value = withRepeat(
//       withTiming(config.endY, {
//         duration: 3000 + Math.random() * 2000,
//       }),
//       -1,
//       false
//     );
//   }, []);

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [
//       { translateX: translateX.value },
//       { translateY: translateY.value },
//       { rotate: `${rotate.value}deg` },
//     ],
//   }));

//   const PlaneIcon = isTarget
//     ? seed
//       ? BluePlaneIcon
//       : OrangePlaneIcon
//     : seed
//     ? OrangePlaneIcon
//     : BluePlaneIcon;

//   return (
//     <Animated.View
//       style={[styles.plane, animatedStyle, isTarget && styles.targetPlane]}
//     >
//       <PlaneIcon width={48} height={48} />
//     </Animated.View>
//   );
// }
