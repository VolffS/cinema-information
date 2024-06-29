import "./App.scss"
import {Header} from "./components/header/header.tsx";
import {MainContent} from "./components/main-content/main-content.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorRouter from "./components/error/error-router.tsx";
import {MovieList} from "./components/movie-list/movie-list.tsx";
import {MovieDescription} from "./components/movie-description/movie-description.tsx";
import {store} from "./store/store.ts";
import {Provider} from "react-redux";
import {FavoriteMovieList} from "./components/favorite-movie-list/favorite-movie-list.tsx";

export const App = () => {

    const router = createBrowserRouter([
        {
            path: "",
            element: <Header/>,
            errorElement: <ErrorRouter/>,
            children: [
                {
                    path: "",
                    element: <MainContent Children={MovieList}/>,
                },{
                    path: "/favoriteMovie",
                    element: <MainContent Children={FavoriteMovieList}/>,
                },
                {
                    path: "movie/:movieId",
                    element: <MainContent Children={MovieDescription}/>,
                }
            ]
        }
    ])

    return (
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    )

}
