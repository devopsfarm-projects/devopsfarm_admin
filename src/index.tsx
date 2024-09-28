import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/authContext';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement); // Make sure TypeScript knows the element won't be null

root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);






// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App'; 

// ReactDOM.render(<App />, document.getElementById('root'));





// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { AuthProvider } from './context/AuthContext';

// const rootElement = document.getElementById('root') as HTMLElement;

// if (rootElement) {
//   const root = ReactDOM.createRoot(rootElement);
//   root.render(
//     <React.StrictMode>
//       <AuthProvider>
//         <App />
//       </AuthProvider>
//     </React.StrictMode>
//   );
// } else {
//   console.error("Failed to find the root element.");
// }


// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
