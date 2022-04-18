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
  const { error, setError } = useContext(TransactionsContext);

  return (
    <section className="main-h-screen">
      <section className="gradient-bg-welcome">
        {error && (
          <Error description={error.descriptionError} title={error.title} />
        )}

        <Navbar />
        <button
          onClick={() => setError({ title: "new", descriptionError: "error" })}
        >
          click
        </button>
        <Welcome />
      </section>
      <Services />
      <Transactions />
      <Footer />
    </section>
  );
};

export default App;
