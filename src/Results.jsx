import axios from "axios";
function Result() {
  let result = axios.get("");

  return (
    <div>
      <div id="image">
        <img src={result.img} width={"200px"} alt="..." />
      </div>
      <div id="result">
        <label>
          Name:{" "}
          <input
            type="text"
            name="plant-name"
            id="plant-name"
            value={result.name}
            disabled
          />
        </label>
      </div>
    </div>
  );
}

export default Result;
