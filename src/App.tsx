import { createSignal } from "solid-js";
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";
import * as rM from "@dev.hiconic/gm_resource-model";


const r = rM.Resource.create();
r.name = "test";

const App = () => {
  const [page, setPage] = createSignal(1);

  return (
    <div>
      <h1>{r.name}</h1>
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