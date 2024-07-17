
import CustomerTable from "../CustomerTable/CustomerTable";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";


export default function Home() {
    return <>
        <div className="d-flex flex-column min-vh-100">
            <Navbar/>
            <CustomerTable/>
            <Footer/>
        </div>
   
    </>
}
