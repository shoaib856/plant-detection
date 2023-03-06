import { useEffect, useState } from "react";
import "./App.css";
import swal from "sweetalert";

function App() {
  const [img, setImg] = useState(null);
  const [result, setResult] = useState(null);
  const [resultImg, setResultImg] = useState(null);

  useEffect(() => {
    result !== null &&
      swal({
        title: "The model's result",
        icon: resultImg || URL.createObjectURL(img),
        text: `
          plant name : ${result.plant}
          disease : ${result.disease}
          confd : ${result.confd}
        `,
      });
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
        encType="multipart/form-data"
        className="card flex flex-col gap-14 items-center"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.append("image", document.getElementById("image").files[0]);
          fetch("http://localhost:3001/modelv1", {
            method: "POST",
            body: formData,
          })
            .then((res) => res.json())
            .then((data) => {
              fetch(
                "http://192.168.0.101: 3001/modelv2image/" + data["image"],
                { method: "GET" }
              )
                .then((res) => res.blob())
                .then((blob) => setResultImg(URL.createObjectURL(blob)));
              setResult(data);
            })
            .catch((e) => console.log(e));
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
    </div>
  );
}

export default App;
