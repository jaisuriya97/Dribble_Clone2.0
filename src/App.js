import './App.css';
import {NextUIProvider} from "@nextui-org/react";
import NavBar from './components/navbar.jsx';
import Hero from './components/hero.jsx';
import Product from './components/product.jsx';
import Footer from './components/footer.jsx';
function App() {
  return (
    <div className="App">
      <NextUIProvider>
      <main className="dark text-foreground bg-background">
        <NavBar />  
        <Hero />
        <Product />
        <Footer />
      </main>
      </NextUIProvider>
    </div>
  );
}

export default App;
