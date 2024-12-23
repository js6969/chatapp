// import './App.css';
// import { Route } from 'react-router-dom';
// import Homepage from "./Pages/Homepage";
// import Chatpage from "./Pages/Chatspage";

// function App() {
//   return (
//     <div className="App">
//        <Route path="/" component={Homepage} exact />
//        <Route path="/chats" component={Chatpage} />
//     </div>
//   );
// }

// export default App;

import './App.css';
import { Routes, Route } from 'react-router-dom';  // Import Routes and Route from react-router-dom
import Homepage from "./Pages/Homepage";
import Chatpage from "./Pages/Chatspage";

function App() {
  return (
    <div className="App">
      <Routes> {/* Wrap your routes with Routes */}
        <Route path="/" element={<Homepage />} exact /> {/* Use element prop for component */}
        <Route path="/chats" element={<Chatpage />} /> {/* Same here */}
      </Routes>
    </div>
  );
}

export default App;

