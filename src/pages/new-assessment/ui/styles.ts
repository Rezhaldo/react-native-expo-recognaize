import { Dimensions, StyleSheet } from "react-native";

// Colors
import { Colors } from "@/constants/Colors";

const { width: WINDOW_WIDTH } = Dimensions.get("window");

const gap = 20;

const styles = StyleSheet.create({
	contentContainer: {
		gap: gap,
	},
	textCenter: {
		textAlign: "center",
	},
	formContainer: {
		gap: gap,
	},
	headerContainer: {
		gap: gap,
	},
	logoContainer: {
		alignItems: "center",
	},
	checkboxSection: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	checkboxContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	bottomSection: {
		alignItems: "center",
	},
	dividerContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	divider: {
		flex: 1,
		borderBottomWidth: 1,
		borderColor: Colors.light.inputBorder,
	},
	backgroundImage: {
		width: WINDOW_WIDTH,
		position: "absolute",
		left: 0,
		top: 0,
		right: 0,
	},
	imageContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 20,
	},
	guessContainer: {
		borderColor: Colors.light.inputBorder,
	},
	//new
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		justifyContent: "center",
	},
	logo: {
		width: 88,
		height: 72,
	},
	textGroup: {
		flexDirection: "column",
		lineHeight: 20,
	},
	nameLine: {
		fontWeight: "800",
		color: "#3A3A3A",
	},
	subtitle: {
		color: "#3A3A3A",
		fontSize: 14,
		opacity: 0.8,
	},
	title: {
		fontSize: 28,
		fontWeight: "800",
		fontFamily: "PlusJakartaSans-Bold",
		color: "#3A3A3A",
	},
	blue: {
		color: "#002D7C",
		fontWeight: "800",
		fontSize: 28,
	},
	homeContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		gap: 16,
		marginTop: 8,
	},
});

export default styles;
