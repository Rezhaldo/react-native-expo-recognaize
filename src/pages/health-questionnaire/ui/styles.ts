import { Dimensions, StyleSheet } from "react-native";

// Colors

const { width: WINDOW_WIDTH } = Dimensions.get("window");

const gap = 20;

const styles = StyleSheet.create({
	pickerWrapper: {
		marginTop: 8,
		borderRadius: 8,
		backgroundColor: "#fff",
	},

	optionButton: {
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 10,
		backgroundColor: "#fff",
		marginTop: 12,
	},

	optionActive: {
		backgroundColor: "#00678c",
	},

	optionText: {
		color: "#00678c",
	},

	optionTextActive: {
		color: "#fff",
		fontWeight: "600",
	},

	checkboxContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 8,
	},
});

export default styles;
