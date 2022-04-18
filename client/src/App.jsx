import { useContext } from "react";

import { TransactionsContext } from "./context/TransactionsContext";

import {
  Navbar,
  Footer,
  Services,
  Transactions,
  Welcome,
  Error,
} from "./Components/Index";

const App = () => {
  const { error } = useContext(TransactionsContext);

  return (
    <section className="main-h-screen">
      <section className="gradient-bg-welcome">
        {error && <Error />}
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
