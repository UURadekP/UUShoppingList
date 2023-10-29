import React from "react";
import ShoppingListPage from './pages/shoppingListPage'
import { BrowserRouter, Routes, Route, } from "react-router-dom";

const App = ({}) => {


  return (<>


    <BrowserRouter>
    <Routes>
    <Route path="list/:id" element={<ShoppingListPage/>} />
    </Routes>
    </BrowserRouter>

    
            

  


    </>

  );
}

export default App;
