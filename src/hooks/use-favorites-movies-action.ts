
import {useDispatch} from "react-redux";
import {useMemo} from "react";
import {bindActionCreators} from "@reduxjs/toolkit";
import {actions} from "../store/favorites-movies-slice.ts";

const rootAction = {
    ...actions
}

export const useFavoritesMoviesAction = () => {
    const dispatch = useDispatch();
    return useMemo(() => bindActionCreators(rootAction, dispatch), [dispatch])
}