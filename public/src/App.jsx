import Button from "@mui/material/Button";
import { Provider } from "react-redux";
import { store } from "./app/store";
import QuestionsPage from "./pages/QuestionsPage";

function App() {
    return (
        <Provider store={store}>
            <QuestionsPage />
        </Provider>
    );
}

export default App;
