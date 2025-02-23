export function TVCarouselElement({ id }: any) {
    return (
        <div id={"tv-carousel-element-" + String(id)} className="tv-carousel-element">
            <div className="information">
                <button className="btn stream-now"> stream now </button>
                <b className="bold-description"> Thriller .</b>
                <span className="description"> The world's most dangerous secret lies between them </span>
            </div>
            <div id={"tv-carousel-image-" + String(id)} className="image"> </div>
        </div >
    );
}