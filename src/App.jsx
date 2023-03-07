import { useEffect, useState } from "react";
import "./App.css";
import "sweetalert2/src/sweetalert2.scss";
import Swal from "sweetalert2";

function App() {
  const [img, setImg] = useState(null);
  const [result, setResult] = useState(null);
  const [resultImg, setResultImg] = useState(null);

  useEffect(() => {
    result !== null &&
      Swal.fire({
        title: `<h1 class="bg-slate-800 text-3xl text-gray-200 font-mono font-bold">The Model's Result</h1>`,
        icon: "success",
        imageUrl: resultImg || URL.createObjectURL(img),
        html: `
         <div class= "text-2xl text-slate-400 font-extrabold text-left font-mono ">
         <div><span>Plant Name :</span> <span class="text-slate-800">${
           result.plant ?? ""
         }</span> </div>
         <hr class="my-5">
         <div> 
          <p>Disease     :</p>
          <p class="text-slate-800">
          ${
            Array.isArray(result.diseas)
              ? result.diseas.join(" , ") ?? ""
              : result.diseas ?? ""
          }
          </p> 
         </div>
         <hr class="my-5">
         <div><span>Confd       :</span> <span class="text-slate-800">${
           result.confd !== null ? result.confd + "%" : ""
         } </span></div>
         </div>
        `,
        preConfirm: () => {
          setResult(null);
          setResultImg(null);
        },
      });
  });

  const process = (modelType) => {
    const formData = new FormData();
    formData.append("image", document.getElementById("image").files[0]);
    fetch("http://192.168.0.101:3001/" + modelType, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        modelType == "modelv2" &&
          fetch("http://192.168.0.101:3001/modelv2image/" + data["image"], {
            method: "GET",
          })
            .then((res) => res.blob())
            .then((blob) => setResultImg(URL.createObjectURL(blob)));
        setResult(data);
      })
      .catch((e) => console.log(e));
  };
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
        <button type="button" onClick={() => process("modelv1")}>
          Process model1
        </button>
        <button type="button" onClick={() => process("modelv2")}>
          Process model2
        </button>
      </form>
    </div>
  );
}

export default App;
