// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import { ChakraProvider } from "@chakra-ui/react";
// import { BrowserRouter } from "react-router-dom";
// import theme from "./theme";
// import ChatProvider from "./Context/ChatProvider";

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <ChatProvider>
//     <BrowserRouter>
//       <ChakraProvider theme={theme}>
//         <App />
//       </ChakraProvider>
//     </BrowserRouter>
//   </ChatProvider>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";  // Ensure BrowserRouter is imported
import theme from "./theme";
import ChatProvider from "./Context/ChatProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>  {/* Wrap the entire app with BrowserRouter */}
      <ChatProvider>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </ChatProvider>
    </BrowserRouter>
);
