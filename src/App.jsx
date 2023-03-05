import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Navigate } from "react-router-dom";

function App() {
  const [img, setImg] = useState(null);
  useEffect(() => {
    console.log(img);
  });
  return (
    <div className="App">
      <h1 className="mb-10">
        Identify your plant and know about diseases in it
      </h1>
      {img && (
        <div>
          <img
            className="mx-auto"
            src={URL.createObjectURL(img)}
            alt="not fount"
          />
        </div>
      )}
      <form
        method="GET"
        className="card flex flex-col gap-14 items-center"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.append(
            "image",
            document.getElementById("addImage").files[0]
          );
          axios
            .post("http://localhost:3000/images", { formData })
            .then((res) => console.log(res.data))
            .catch((e) => console.log(e));
          Navigate("/result");
        }}
      >
        <input
          className="bg-slate-700"
          type="file"
          name="addImage"
          id="addImage"
          accept=".jpeg, .jpg"
          onChange={(e) => {
            setImg(e.target.files[0]);
          }}
        />
        <button type="submit">upload image</button>
      </form>
    </div>
  );
}

export default App;
