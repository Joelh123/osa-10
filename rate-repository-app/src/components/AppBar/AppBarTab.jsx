import { Pressable } from "react-native";
import Text from "../Text";
import { Link } from "react-router-native";

const AppBarTab = ({ path, style, text, onPress }) => {
	return (
		<>
			{onPress ? (
				<Pressable onPress={onPress ?? null}>
					<Text fontSize="big" color="textSecondary" style={style}>
						{text}
					</Text>
				</Pressable>
			) : (
				<Link to={path}>
					<Text fontSize="big" color="textSecondary" style={style}>
						{text}
					</Text>
				</Link>
			)}
		</>
	);
};

export default AppBarTab;
