import React, { Fragment, useEffect, useState } from "react";
import Formulario from "./componest/Formulario";
import Header from "./componest/Header";
import Clima from "./componest/Clima";
import Error from "./componest/Error";

function App() {
  const [busqueda, setbusqueda] = useState({
    pais: "",
    ciudad: "",
  });
  const [consultar, setconsultar] = useState(false);
  const [resultado, setresultado] = useState({});
  const [error, seterror] = useState(false);
  const { pais, ciudad } = busqueda;

  useEffect(() => {
    const consultaApi = async () => {
      if (consultar) {
        const appId = "390f29d683e43d4255c2659bb782b640";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setresultado(resultado);
        setconsultar(false);

        if (resultado.cod === "404") {
          seterror(true);
        } else {
          seterror(false);
        }
      }
    };
    consultaApi();
  }, [ciudad, consultar, pais]);

  let componente;

  if (error) {
    componente = <Error mensaje="No hay resultados" />;
  } else {
    componente = <Clima resultado={resultado} />;
  }

  return (
    <Fragment>
      <Header titulo="Clima react app" />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                setbusqueda={setbusqueda}
                setconsultar={setconsultar}
              />
            </div>
            <div className="col m6 s12">{componente}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
