import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuth.page";
import EditorPage from "./pages/editor.page";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/sessionControl";


export const UserContext = createContext();

function App() {
  const [appData, setAppData] = useState({});

  useEffect(() => {
    let access_token = lookInSession("user");

    access_token
      ? setAppData(JSON.parse(access_token))
      : setAppData({ access_token: null });
  }, []);

  return (
    <UserContext.Provider value={{ appData, setAppData }}>
      <Routes>
        <Route path="/editor" element={<EditorPage />}/>
        <Route path="/" element={<Navbar />}>
          <Route
            path="signin"
            element={<UserAuthForm formType="signin" />}
          ></Route>
          <Route
            path="signup"
            element={<UserAuthForm formType="signup" />}
          ></Route>
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
