import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import {
  Navbar,
  Footer,
  Loader,
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
