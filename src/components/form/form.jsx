import { Fragment } from "react";

// Css
import "./form.css";

export default function Form({ state, error, funcSend, title, placeholders, btnName }){

    const [data, setData] = state,
          importants = [ 1, 2, 3, 4 ],
          classError = error => error !== "" ? "input_error" : "form_input",
          selectError = error => error !== "" ? "select_error" : "select_form",
          changeInput = e => setData({...data, [e.target.name]: e.target.value});
    
    return(
        <Fragment>
            <form className="form_data">
                <h1>{ title }</h1>

                {
                    Object.keys(data).map((v, i) =>
                    v === "id" || v === "token"
                    ? <div style={{display: "none"}} key={i}></div>
                    :i === 2 && v === "important"
                    ? <div key={i}>
                        <select
                            value={data.important}
                            lang={"hola"}
                            onChange={changeInput}
                            name="important"
                            className={selectError(error[v])}
                         >
                            <option>Seleccione Nivel de Importancia</option>
                            {
                                importants.map((v, i) =>
                                <option value={v} key={i}>
                                    {
                                    v === 1
                                    ? "Muy Importante"
                                    : v === 2
                                    ? "Importante"
                                    : v === 3
                                    ? "Medio Importante"
                                    : "Sin Importancia"
                                    }
                                </option>
                                )
                            }
                        </select>
                        <p>{ error[v] }</p>
                     </div>

                    :<div key={i}>
                        <input
                            className={classError(error[v])}
                            name={v}
                            type={v === "email"
                            ? v : v.indexOf("password") !== -1
                            ? v : v.indexOf("secondPassword") !== -1
                            ? "password" : "text"
                            }
                            placeholder={placeholders[i]}
                            onChange={changeInput}
                            value={data[v]}
                        />
                        <p>{ error[v] }</p>
                    </div>
                    )
                }

                <button onClick={funcSend}>{ btnName }</button>
            </form>
        </Fragment>
    );
}