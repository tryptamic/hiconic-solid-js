import { createSignal } from "solid-js";
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";

const App = () => {
  const [page, setPage] = createSignal(1);

  return (
    <div>
      <nav>
        <button onClick={() => setPage(1)}>Page One</button>
        <button onClick={() => setPage(2)}>Page Two</button>
      </nav>
      <main>
        {page() === 1 ? <PageOne /> : <PageTwo />}
      </main>
    </div>
  );
};

export default App;