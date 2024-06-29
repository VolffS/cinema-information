import './header.scss';
import gitSvg from '../../assets/github.svg';
import {Outlet} from "react-router";
import {Link} from "react-router-dom";

export const Header = () => {
    return (
        <>
            <header>
                <nav className="navigation">
                    <h2 className="navigation__heading">Кино Информация</h2>
                    <div className="navigation__link-inside">
                        <Link className="navigation__link" to={``}> Главная </Link>
                        <Link className="navigation__link" to={`/favoriteMovie`}> Избранные фильмы </Link>
                    </div>

                    <div className="navigation__link-outside">
                        <a
                            href="https://github.com/VolffS"
                            className="navigation__link"
                        >
                            <img
                                src={gitSvg}
                                alt=""
                                className="navigation__link__img"
                            />
                            <p className="navigation__link__description">Github</p>
                        </a>
                    </div>
                </nav>
            </header>
            <Outlet/>
        </>
    );
}
