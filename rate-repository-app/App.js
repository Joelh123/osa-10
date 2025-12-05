import { NativeRouter } from "react-router-native";

import Main from "./src/components/Main";
import { StatusBar } from "react-native";

const App = () => {
	return (
		<>
			<NativeRouter>
				<Main />
			</NativeRouter>
			<StatusBar />
		</>
	);
};

export default App;
