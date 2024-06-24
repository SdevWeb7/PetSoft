import BackgroundHeading from "./components/BackgroundHeading.jsx";
import Footer from "./components/Footer.jsx";
import Sidebar from "./components/Sidebar.jsx";
import ItemList from "./components/ItemList.jsx";
import Header from "./components/Header.jsx";



function App() {

  return <>

      <BackgroundHeading />

      <main>
         <Header>

         </Header>

         <ItemList />


         <Sidebar />

      </main>


      <Footer />
    </>;
}

export default App;
