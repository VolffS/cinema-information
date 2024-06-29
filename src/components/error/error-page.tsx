import './error-router.scss'
import {ErrorQuery} from "../../type/error-query.ts";
export const ErrorPage = ({error}:{error: ErrorQuery}) => {
    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Кина не будет</p>
            <p>
                <i>{error.data.message || error.status }</i>
            </p>
        </div>
    );
}