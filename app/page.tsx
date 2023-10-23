import { Pagination } from "./components";

export default function Home() {
  return (
    <main>
      <h1>Home page</h1>
      <Pagination totalItem={100} itemPerPage={10} currentPage={5} />
    </main>
  );
}
