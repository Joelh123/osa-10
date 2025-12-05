import { Text, Pressable } from "react-native";
import { Link } from "react-router-native";

const AppBarTab = ({ path, style, text }) => {
	return (
		<Pressable>
			<Link to={path}>
				<Text style={style}>{text}</Text>
			</Link>
		</Pressable>
	);
};

export default AppBarTab;
