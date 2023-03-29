import "./App.css";
import { Switch, Route } from "react-router-dom";
import Cult from "./Components/cult/Cult";
import CultPacks from "./Components/cultPacks/CultPacks";
import PackCheckout from "./Components/packCheckout/PackCheckout";
import { LandingPage } from "./Components/Landing_Page_Sec/LandingPage/LandingPage";
// import Store from "./Components/store/Store";
//import { Logout } from "./Components/Logout"; 
import { Navbar } from "./Components/Navbar/Navbar";
import { Navbarmember } from "./Components/Navbar/Navbarmember";
import { Navbaremployee } from "./Components/Navbar/Navbaremployee";
import { Footer } from "./Components/Footer/Footer";
import { HrxWorkout } from "./Components/HrxWorkout";
import { ClassBooking } from "./Components/ClassBooking";
import { AddClasses } from "./Components/AddClasses";
import { ProductPage } from "./Components/store/StoreProductPage";
import { Analytics } from "./Components/Analytics";
import { Trail } from "./Components/Trail";
import Store from "./Components/store/Store";
import { CartPage } from "./Components/Cart/CartPage";
import { CheckIn } from "./Components/CheckIn";
import { CheckOut } from "./Components/CheckOut";
import { FinalCartPage } from "./Components/Cart/FinalCartPage";
import Thanks from "./Components/Thanks";
import ViewClasses from "./Components/ViewClasses";
import MemberPage from "./Components/MemberPage";
import Employee from "./Components/Employee";
import AddEmployeePage from "./Components/AddEmployeePage";
import ActivitiesPage from "./Components/ActivitiesPage";
import LogHoursPage from "./Components/LogHoursPage";
// import { PrivateRoute } from "./Components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/thanks" exact>
          <Thanks />
        </Route>
        <Route path="/hrx" exact>
          <Navbar />
          <HrxWorkout />
          <Footer />
        </Route>
        <Route path="/classbooking" exact>
          <Navbarmember />
          <ClassBooking />
        </Route>
        <Route path="/cult" exact>
          <Cult />
        </Route>
        <Route path="/cultPacks" exact>
          <CultPacks />
        </Route>
        <Route path="/packcheckout" exact>
          <PackCheckout />
        </Route>
        <Route path="/cultstore">
          <Store />
        </Route>
        <Route path="/productpage/:id">
          <ProductPage></ProductPage>
        </Route>
        <Route path="/cart">
          <FinalCartPage></FinalCartPage>
        </Route>
        <Route path="/landing/:id">
          <CartPage></CartPage>
        </Route>
        <Route path="/Member">
          <Navbarmember />
          <MemberPage></MemberPage>
        </Route>
        <Route path="/loghours">
          <Navbarmember />
          <LogHoursPage></LogHoursPage>
        </Route>
        <Route path="/Employee">
          <Navbaremployee />
          <Employee></Employee>
        </Route>
        <Route path="/AddEmployeePage">
          <Navbaremployee />
          <AddEmployeePage></AddEmployeePage>
        </Route>
        <Route path="/ActivitiesPage">
        <Navbarmember />
          <ActivitiesPage></ActivitiesPage>
        </Route>
        <Route path="/AddClasses">
        <Navbaremployee />
          <AddClasses></AddClasses>
        </Route>
        <Route path="/CheckIn">
        <Navbaremployee />
          <CheckIn></CheckIn>
        </Route>
        <Route path="/CheckOut">
        <Navbaremployee />
          <CheckOut></CheckOut>
        </Route>
        <Route path="/Analytics">
        <Navbaremployee />
          <Analytics></Analytics>
        </Route>
        <Route path="/Trail">
        <Navbaremployee />
          <Trail></Trail>
        </Route>
        <Route path="/ViewClasses">
        <Navbar />
          <ViewClasses></ViewClasses>
        </Route>
        {/* <Route path="/Logout">
        <Navbaremployee />
          <Logout></Logout>
        </Route> */}
        <Route>Page Not Found</Route>
      </Switch>
    </div>
  );
}

export default App;
