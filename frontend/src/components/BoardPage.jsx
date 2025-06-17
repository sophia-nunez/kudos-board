import { useLoaderData } from "react-router";

const BoardPage = () => {
  let data = useLoaderData();

  return (
    <main>
      <h2>Board Name: {data.id}</h2>
    </main>
  );
};

export default BoardPage;
