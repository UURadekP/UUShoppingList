import React from "react";
import ShoppingListPage from './pages/shoppingListPage'
import ListsPage from "./pages/ListsPage";
import { BrowserRouter, Routes, Route, } from "react-router-dom";

const App = ({}) => {


  return (<>


    <BrowserRouter>
    <Routes>
    <Route path="list/:id" element={<ShoppingListPage/>} />
    <Route path="lists" element={<ListsPage/>} />
    </Routes>
    </BrowserRouter>

    
            

  


    </>

  );
}

export default App;
