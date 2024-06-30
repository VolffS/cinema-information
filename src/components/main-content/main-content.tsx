import "./main-content.scss"

export const MainContent = ({Children}: { Children: () => JSX.Element }) => {
    return (
        <main className="main__content">
            <Children/>
        </main>
    )
}