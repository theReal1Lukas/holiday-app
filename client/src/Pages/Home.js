import { useContext, useState } from "react";
import { CountriesContext } from "../Context/Countries_context";
import { Container, Row } from "react-bootstrap";
import SingleCountryCard from "../Components/Home Components/SingleCountryCard";
import CountriesCard from "../Components/Home Components/CountriesCard";
import SearchInput from "../Components/Home Components/SearchInput";
import Loader from "../Components/Loader";

export default function Home() {
  const data = useContext(CountriesContext);

  const [search, setSearch] = useState("");

  const splitSearch = search.split(" ");

  let searchEachWordToUpperCase = splitSearch.map(
    (word) => word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase()
  );

  const resultOfSingleCountry =
    data &&
    data.find(
      (single) =>
        searchEachWordToUpperCase.join(" ") === single.name.common && single
    );

  return (
    <>
      {!data ? (
        <Loader />
      ) : (
        <Container style={{ paddingTop: "100px" }}>
          <Row>
            <div
              className="jumbotron"
              style={{
                display: "flex",
                flexDirection: "column",
                height: "60vh",
                background: "black",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              <h1 style={{ marginTop: "100px", marginBottom: "0" }}>
                Select or search country to see holidays
              </h1>
              <SearchInput
                style={{ marginTop: "0" }}
                search={search}
                setSearch={setSearch}
              />
            </div>
          </Row>
          <Row>
            {resultOfSingleCountry ? (
              <SingleCountryCard singleCountry={resultOfSingleCountry} />
            ) : (
              data &&
              data.map((d, index) => <CountriesCard d={d} key={index} />)
            )}
          </Row>
        </Container>
      )}
    </>
  );
}
