import "./styles.css";
import React, { Fragment, useState } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const App = () => {
  const [inputQuery, setInputQuery] = useState("");
  const [numParaQues, setNumParaQues] = useState(5);
  const [paraphrasedQueries, setParaphrasedQueries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getQueries = async () => {
    try {
      const body = {
        input_text: inputQuery,
        max_questions: parseInt(numParaQues),
      };

      const response = await fetch("http://0.0.0.0:3000/paraphrase-qg", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body)
      });

      await response.json().then( data => {
        setIsLoading(false)
        // console.log("LOG 1: ", data);
        setParaphrasedQueries(data);
      });

    } catch (error) {
      console.log("LOG 2: ", error);
    }
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // console.log(inputQuery);
    // console.log(numParaQues);

    if (!inputQuery) {
      window.alert("Please Enter valid Query!");
    } else if (numParaQues < 1) {
      window.alert("Please Enter Number of Paraphrased Queries to Generate!");
    } else {
      getQueries();
    }
  };

  return (
    <Fragment>
      <div className="App card m-5">
        <div className="card-header">
          <h1> QUERY PARAPHRASE GENERATOR </h1>
        </div>
        <div className="card-body">
          <form onSubmit={onSubmitForm}>
            <fieldset>
              <div className="m-3">
                <label> ENTER SEED QUERY BELOW </label>
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(event) => setInputQuery(event.target.value)}
                  className="form-control"
                />
              </div>

              <div className="m-3">
                <label>ENTER NUMBER OF PARAPHRASES QUERIES TO GENERATE</label>
                <input
                  type="number"
                  value={numParaQues}
                  onChange={(event) => setNumParaQues(event.target.value)}
                  className="form-control"
                  min="1"
                  max="50"
                />
              </div>
            </fieldset>

            {!isLoading && (
              <button type="submit" className="btn btn-primary">
                GENERATE
              </button>
            )}

            <div className="my-5">
              {isLoading && <Loader type="Rings" color="#0000FF" />}
              {isLoading && (
                <p> Generating Paraphrased Queries... Please wait! </p>
              )}
            </div>
          </form>
        </div>

        <div className="card-footer">
          <ul className="list-group list-group-flush">
            {/* <li className="list-group-item">An item</li> */}
            {paraphrasedQueries.map((query) => (
              <li className="list-group-item" key={query}>
                {" "}
                {query.split(" ").slice(1).join(" ")}{" "}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default App;
