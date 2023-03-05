import { useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const [img, setImg] = useState(null);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="App">
      {result ? (
        <>
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
            encType="multipart/form-data"
            className="card flex flex-col gap-14 items-center"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData();
              formData.append(
                "image",
                document.getElementById("image").files[0]
              );
              fetch("http://localhost:3001/modelv1", {
                method: "POST",
                body: formData,
              })
                .then((res) => res.json())
                .then((data) => setResult(data))
                .catch((e) => console.log(e));
              navigate({ pathname: "/result" });
            }}
          >
            <input
              className="bg-slate-700"
              type="file"
              name="image"
              id="image"
              accept=".jpeg, .jpg"
              onChange={(e) => {
                setImg(e.target.files[0]);
              }}
            />
            <button type="submit">upload image</button>
          </form>
        </>
      ) : (
        console.log(result)
      )}
    </div>
  );
}

export default App;
