import { Pagination } from "./components";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <main>
      <h1>Home page</h1>
      <Pagination
        totalItem={100}
        itemPerPage={10}
        currentPage={+searchParams.page || 1}
      />
    </main>
  );
}
