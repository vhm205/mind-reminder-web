// import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

import "./styles/index.css";
import "./styles/loader.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// const component =
//   import.meta.env.VITE_ENV === "development" ? (
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   ) : (
//     <React.StrictMode>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </React.StrictMode>
//   );

const theme = extendTheme({
  components: {
    Button: {
      variants: {
        primary: {
          color: "white",
          bg: "brand.primary",
          _hover: {
            opacity: 0.8,
          },
        },
        google: {
          color: "google.100",
          border: "1px",
          _hover: {
            opacity: 0.8,
          },
        },
      },
    }, // end button
    Checkbox: {
      variants: {
        primary: {
          bg: "brand.primary",
        },
      },
    }, // end checkbox
  },
  colors: {
    brand: {
      primary: "#7FACAC",
      secondary: "#6A6965",
      third: "#FFF4E2",
    },
    tw: {
      "red.500": "rgb(239 68 68)",
    },
    google: {
      100: "#bd2c00",
    },
  },
});

const component = (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ChakraProvider>
);

ReactDOM.createRoot(document.getElementById("root")!).render(component);
