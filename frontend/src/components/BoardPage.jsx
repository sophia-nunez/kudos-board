import { useLoaderData } from "react-router";
import Card from "./Card";
import "../styles/main.css";
import "../styles/BoardPage.css";

const BoardPage = () => {
  let data = useLoaderData();

  return (
    <main>
      <h2>Board Name: {data.id}</h2>
      <section className="card-list">
        <Card />
      </section>
    </main>
  );
};

export default BoardPage;
