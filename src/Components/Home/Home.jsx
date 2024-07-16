
import CustomerTable from "../CustomerTable/CustomerTable";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

export default function Home() {
    return <>
        <div className="d-flex flex-column min-vh-100">
            <Navbar/>
            <CustomerTable/>
            <Footer/>
        </div>
   
    </>
}
