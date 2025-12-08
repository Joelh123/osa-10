import { Pressable } from "react-native";
import Text from "../Text";
import { Link } from "react-router-native";

const AppBarTab = ({ path, style, text }) => {
	return (
		<Pressable>
			<Link to={path}>
				<Text fontSize="big" color="textSecondary" style={style}>
					{text}
				</Text>
			</Link>
		</Pressable>
	);
};

export default AppBarTab;
