import { TVCarouselElement } from "../common/TVCarouselElement";
import { useState, useEffect } from "react";

export function TVCarousel() {
    const CAROUSEL_MARGIN_LEFT = 12;
    const ELEMENT_WIDTH = 1250;

    const [choosenElement, setChoosenElement] = useState(1);
    const [offset, setOffset] = useState(-ELEMENT_WIDTH);


    useEffect(() => {
        console.log("useEffect [] is called");
        const carouselElements = document.getElementsByClassName('tv-carousel-element');
        // возвращает HTMLCollectionOf<Element>
        const carousel = (document.getElementsByClassName("tv-carousel-row")).item(0) as HTMLElement;
        //getElementById() возвращает HTMLElement
        const filters = document.getElementsByClassName("tv-carousel-filter");
        for (let i = 0; i < carouselElements.length; i++) {
            let carouselElementsStyles = (carouselElements.item(i) as HTMLElement).style;
            let filterStyles = (filters.item(i) as HTMLElement).style;

            // Конвертация Element в HTMLElement
            if (i != choosenElement + 1) {
                filterStyles.filter = "opacity(70%)";
            }
            else {
                filterStyles.filter = "opacity(0%)"
            }
            let carouselStyles = carousel!.style;
            carouselElementsStyles.minWidth = ELEMENT_WIDTH + "px";
            carouselElementsStyles.maxWidth = ELEMENT_WIDTH + "px";


            //carouselStyles.marginLeft = offset + "px";


            // carouselStyles.marginLeft = -CAROUSEL_MARGIN_LEFT - ELEMENT_WIDTH + "px";
        }
        //HTMLCollectionOf<Element>.item
        //console.log(elements);
        // console.log(typeof (inlineStyles))
        // console.log(inlineStyles);
    }, [])
    useEffect(() => {
        const carousel = (document.getElementsByClassName("tv-carousel-row")).item(0) as HTMLElement;
        let carouselStyles = carousel!.style;

        carouselStyles.marginLeft = offset - CAROUSEL_MARGIN_LEFT + "px";
        carouselStyles.transition = "margin-left 1s";

        console.log("useEffect [offset] is called");
    }, [offset])

    useEffect(() => {
        const filters = document.getElementsByClassName("tv-carousel-filter");
        // ПОФИКСИТЬ < 11
        if (0 < choosenElement && choosenElement < 11) {
            let filterStyles = (filters.item(choosenElement + 1) as HTMLElement).style;
            filterStyles.filter = "opacity(70%)";
            filterStyles = (filters.item(choosenElement - 1) as HTMLElement).style;
            filterStyles.filter = "opacity(70%)";
            filterStyles = (filters.item(choosenElement) as HTMLElement).style;
            filterStyles.filter = "opacity(0%)";
        }
    }, [choosenElement])

    function handleLeftArrowClick() {
        console.log("left handler is called");
        setOffset(offset + ELEMENT_WIDTH + CAROUSEL_MARGIN_LEFT);
        setChoosenElement(choosenElement - 1);
    }
    function handleRightArrowClick() {
        console.log("right handler is called");
        setOffset(offset - ELEMENT_WIDTH - CAROUSEL_MARGIN_LEFT);
        setChoosenElement(choosenElement + 1);
    }

    // Здесь useEffect вызывается два раза из-за
    // strictMode, это не влияет на код, но с этим
    // нужно разобраться

    return (
        <div className="tv-carousel">
            <div className="tv-carousel-container">
                <div className="tv-carousel-window">
                    <div className="tv-carousel-row">

                        <TVCarouselElement
                            id={-1}
                            imageUrl="/public/hero_tv_ted_lasso.jpg" />
                        <TVCarouselElement
                            id={0}
                            imageUrl="/public/hero_tv_the_gorge.jpg" />
                        <TVCarouselElement
                            id={1}
                            imageUrl="/public/hero_tv_severance.jpg" />
                        <TVCarouselElement
                            id={2}
                            imageUrl="/public/hero_tv_surface.jpg" />
                        <TVCarouselElement
                            id={3}
                            imageUrl="/public/hero_tv_onside.jpg" />
                        <TVCarouselElement
                            id={4}
                            imageUrl="/public/hero_tv_season_pass.jpg" />
                        <TVCarouselElement
                            id={5}
                            imageUrl="/public/hero_tv_prime_target.jpg" />
                        <TVCarouselElement
                            id={6}
                            imageUrl="/public/hero_tv_mythic_quest.jpg" />
                        <TVCarouselElement
                            id={7}
                            imageUrl="/public/hero_tv_silo.jpg" />
                        <TVCarouselElement
                            id={8}
                            imageUrl="/public/hero_tv_shrinking.jpg" />
                        <TVCarouselElement
                            id={9}
                            imageUrl="/public/hero_tv_ted_lasso.jpg" />
                        <TVCarouselElement
                            id={10}
                            imageUrl="/public/hero_tv_the_gorge.jpg" />

                    </div>
                </div>
            </div>
            <button onClick={handleLeftArrowClick}> left </button>
            <button onClick={handleRightArrowClick}> right </button>

        </div>
    );
}