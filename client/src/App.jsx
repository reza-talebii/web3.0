import {
  Navbar,
  Footer,
  Services,
  Transactions,
  Welcome,
} from "./Components/Index";

const App = () => {
  return (
    <section className="main-h-screen">
      <section className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </section>
      <Services />
      <Transactions />
      <Footer />
    </section>
  );
};

export default App;
