import { useEffect, useState } from "react";
import "./App.css";
import "sweetalert2/src/sweetalert2.scss";
import Swal from "sweetalert2";
import "bootstrap";
import { ButtonGroup, Form } from "react-bootstrap";
import Btn from "./components/button";
function App() {
  const [img, setImg] = useState(null);
  const [result, setResult] = useState(null);
  const [resultImg, setResultImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const showResult = () => {
    Swal.fire({
      showClass: "bg-gray-300",
      title: `<h1 class="text-4xl text-blue-900 font-sans font-bold">The Model's Result</h1>`,
      icon: "success",
      imageUrl: URL.createObjectURL(resultImg || img),
      confirmButtonText: "Done",
      customClass: {
        confirmButton:
          "!bg-blue-500 !text-white hover:!bg-blue-800 focus:!bg-blue-800",
      },
      html: `
       <div class= "text-2xl text-blue-400 font-extrabold text-left font-mono ">
       <div><span>Plant Name: </span> <span class="text-blue-600">${
         result.plant ?? ""
       }</span> </div>
       <hr class="my-3 h-1 block bg-sky-600 opacity-90">
       <div> 
        <p>Diseases: </p>
        <ul class="text-blue-600">
        ${
          Array.isArray(result.diseas)?
          [...result.diseas]
            .map((ele, i) => {
              return `<li>${i + 1}) ${ele}</li>`;
            })
            .join("") ?? ""
          : `<li>1) ${result.diseas}</li>` ?? ""
        }
        </ul> 
       </div>
       <hr class="my-3 h-1 block bg-sky-600 opacity-90">
       <div><span>Confd:</span> <span class="text-blue-600">${
         result.confd !== null ? result.confd + "%" : ""
       } </span></div>
       </div>
      `,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        setResult(null);
        setResultImg(null);
        setLoading(false);
      },
    });
  };

  const showError = (error) => {
    Swal.fire({
      title: `<h1 class="font-mono font-bold text-red-600">${error}</h1>`,
      icon: "error",
      customClass: {
        confirmButton:
          "!bg-blue-500 !text-white hover:!bg-blue-800 focus:!bg-blue-800",
      },
    });
  };

  const process = async (modelType) => {
    if (document.getElementById("image").files[0] === undefined)
      showError("Please, Choose Some Image");
    else {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", document.getElementById("image").files[0]);
      fetch("http://localhost:3001/" + modelType, {
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
              .then((blob) => setResultImg(blob))
              .catch((e) => showError(e));
          setResult(data);
        })
        .catch((e) => showError(e));
    }
  };

  useEffect(() => {
    result !== null && showResult();
  });

  return (
    <div className="App font-mono flex flex-col gap-12 py-12 bg-slate-800 place-items-center justify-center min-h-screen">
      <h1 className=" text-5xl font-bold text-blue-500 ">
        Identify Your Plant
      </h1>
      {img && (
        <div className="max-w-lg">
          <img
            className="mx-auto"
            src={URL.createObjectURL(img)}
            alt="not fount"
          />
        </div>
      )}
      <Form
        className="flex flex-col gap-14 items-center"
      >
        <Form.Control
          type="file"
          className="bg-blue-500 text-white focus:bg-blue-800 hover:bg-blue-800 disabled:bg-slate-900"
          name="image"
          id="image"
          accept=".jpeg, .jpg"
          onChange={(e) => setImg(e.target.files[0])}
          disabled={loading}
        />
        <ButtonGroup>
          <Btn isLoading={loading} model={process} modelType={"modelv1"} />
          <Btn isLoading={loading} model={process} modelType={"modelv2"} />
        </ButtonGroup>
      </Form>
    </div>
  );
}

export default App;
