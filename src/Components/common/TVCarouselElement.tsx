
interface TVCarouselElementInterface {
    id: number;
    imageUrl?: string;
}
export function TVCarouselElement({ id, imageUrl }: TVCarouselElementInterface) {


    return (
        <div id={"tv-carousel-element-" + id} className="tv-carousel-element">
            <div className="information">
                <button className="btn stream-now"> Stream Now </button>
                <b className="bold-description"> Thriller .</b>
                <span className="description"> The world's most dangerous secret lies between them. </span>
            </div>
            {/* <div id={"tv-carousel-image-" + String(id)} className="image"> </div> */}
            <div className="image" style={{ backgroundImage: `url(` + imageUrl + `)` }} > </div>
            <div id={"tv-carousel-filter-"} className="tv-carousel-filter"> </div>
        </div >
    );
}