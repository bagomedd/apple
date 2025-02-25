
interface TVCarouselElementInterface {
    id: number;
    imageUrl?: string;
    carouselElementsRef?: any;
    filtersRef?: any;
}
export function TVCarouselElement({ id, imageUrl, carouselElementsRef, filtersRef }: TVCarouselElementInterface) {


    return (
        <div ref={carouselElementsRef} id={"tv-carousel-element-" + id} className="tv-carousel-element">
            <div className="information">
                <button className="btn stream-now"> Stream Now </button>
                <b className="bold-description"> Thriller .</b>
                <span className="description"> The world's most dangerous secret lies between them. </span>
            </div>
            {/* <div id={"tv-carousel-image-" + String(id)} className="image"> </div> */}
            <div className="image" style={{ backgroundImage: `url(` + imageUrl + `)` }} > </div>
            <div ref={filtersRef} id={"tv-carousel-filter-"} className="tv-carousel-filter"> </div>
        </div >
    );
}