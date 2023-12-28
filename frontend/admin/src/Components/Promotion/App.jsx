import {useState} from 'react'
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Users from './Users'
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
import Luckyspinner from './luckyspinner';
import Details from './Details';
import Spincrud from './components/SpinnerCrud/Spincrud';
import Popup from './Modal/popup';
import Offer from './components/model2/offer';


function App() {
  const [count,setCount] = useState(0)
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Users/>}></Route>
            <Route path='/create' element={<CreateUser/>}></Route>
            <Route path='/update/:id' element={<UpdateUser/>}></Route>
            <Route path='/lucky' element={<Luckyspinner/>}></Route>
            <Route path='/view/:id' element={<Details/>}></Route>
            <Route path='/spincrud' element={<Spincrud/>}></Route>
            <Route path='/popup' element={<Popup/>}></Route>
            {/* <Route path='/popup2' element={<Model2/>}></Route> */}
            <Route path='/popup2' element={<Offer/>}></Route>

          

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
