import { Dimensions, StyleSheet } from "react-native";

// Colors
import { Colors } from "@/constants/Colors";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

const gap = 20;

const styles = StyleSheet.create({
	divider: {
		flex: 1,
		borderBottomWidth: 1,
		borderColor: Colors.light.inputBorder,
	},
	spacer: {
		height: WINDOW_HEIGHT * 0.04,
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "center",
	},
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: gap,
	},
	demoTitle: {
		borderWidth: 1,
		paddingHorizontal: 16,
		borderRadius: 16,
		textAlign: "center",
		color: "#000",
		paddingVertical: 4,
	},
});

export default styles;
