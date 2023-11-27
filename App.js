import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Dashboard - route
import Dashboard from "./components/dashboard";

//1st interface - route
import ConvertXmlToJsonPage from "./components/pages/convertXmlToJson";
import BrowsePage from "./components/pages/browsePage";

//2nd interface - route
import PreDefineStylesPage from "./components/pages/selectPreDefineStyles";

//3rd interface - route
import DisplayResultPage from "./components/pages/displayResult";

//4th interface - route
import DownloadCodePage from "./components/pages/downloadCode";

function App() {
  return (
    <div>
      <Router>
        <section>
          <Switch>
            
            <Route path="/" component={Dashboard} exact />
            <Route path="/browse" component={BrowsePage} />
            <Route path="/displayResult/:id" component={DisplayResultPage} />
            <Route path="/downloadCode" component={DownloadCodePage} />
            <Route path="/convertXmltoJson" component={ConvertXmlToJsonPage} />
            <Route path="/preDefineStyles" component={PreDefineStylesPage} />
          </Switch>
        </section>
      </Router>
    </div>
  );
}

export default App;
