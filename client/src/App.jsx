import { EthProvider } from "./contexts/EthContext";
import {Route, Routes} from "react-router-dom";
import NavBar from "./components/navbar/Navbar";
import About from "./components/pages/about/About";
import HomePage from "./components/pages/HomeComponent";
import EthLoaded from "./components/pages/EthLoaded";
import Dashboard from "./components/pages/users/dashboard";
import Details from "./components/pages/users/details";
function App() {
  return (
    <EthProvider>
        <div className="App" style={{overflowX: "hidden", minHeight: "100vh"}}>
            <NavBar/>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css"
                  integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
                  crossOrigin="anonymous"/>
            <link rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"/>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
            <link href="https://fonts.googleapis.com/css2?family=Gideon+Roman&display=swap"
                  rel="stylesheet"/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/dashboard" element={<EthLoaded/>}>
                    <Route exact path="/dashboard" element={<Dashboard/>}/>
                </Route>
                <Route path="/find" element={<EthLoaded/>}>
                    <Route exact path="/find" element={<Dashboard/>}/>
                </Route>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/details" element={<EthLoaded/>}>
                    <Route exact path="/details" element={<Details/>}/>
                </Route>
            </Routes>
        </div>
    </EthProvider>
  );
}
export default App;
