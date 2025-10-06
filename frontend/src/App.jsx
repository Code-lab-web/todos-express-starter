import Home from "./components/Home"
import UserInfo from "./components/UserInfo"
import UserSettings from "./components/UserSettings"
export const App = () => {

  return (
    <main>
      <h1>Welcome to the Special Garden Group!</h1>
      <Home/>
      <UserInfo/>
      <UserSettings/>
    </main>
  );
};
