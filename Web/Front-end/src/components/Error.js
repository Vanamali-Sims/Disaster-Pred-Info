import { useRouteError } from "react-router-dom";

const Error = () => {

    const err = useRouteError();
    console.log(err);

    return(
        <div className="bg-white text-black">
            <h1>Oops something is wrong !!</h1>
            <h1>{err.status + err.statusText}</h1>
            <h2>{err.data}</h2>
        </div>
    );
}

export default Error;