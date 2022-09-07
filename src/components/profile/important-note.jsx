import { Fragment } from "react";

export default function ImportantNote({notes, filter}){

    const title = filter === 1
    ? "Muy Importantes" : filter === 2
    ? "Importantes" : filter === 3
    ? "Medio Importantes" : "Sin Importancia";

    return(
        <Fragment>
            <div className="">
                <h3>
                    {title}
                </h3>
                <br/>
                <p>
                    {notes.filter(v => v.important === filter).length}
                </p>
            </div>
        </Fragment>
    );
}