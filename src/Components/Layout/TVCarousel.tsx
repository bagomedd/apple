import { TVCarouselElement } from "../common/TVCarouselElement";
import { useState, useEffect, useRef } from "react";
import * as TVCarouselJson from "./TVCarousel.json";

export function TVCarousel() {
    const JSON_RECIEVED_INFO = TVCarouselJson.tvCarouselInfo;
    const CAROUSEL_MARGIN_LEFT = 12;
    const ELEMENT_WIDTH = 1250;
    const ELEMENTS_COUNT = 10;

    const [choosenElement, setChoosenElement] = useState(1);
    const [offset, setOffset] = useState(-ELEMENT_WIDTH);
    // DECLARING USEREFS
    const carousel = useRef<HTMLDivElement | null>(null);
    const carouselStyles = useRef<CSSStyleDeclaration | null>(null);
    //
    const carouselElements = useRef<Array<HTMLDivElement>>([]);
    const pushCarouselElements = (el: HTMLElement) => carouselElements.current.push(el);
    const carouselElementsStyles = useRef<Array<CSSStyleDeclaration>>([]);
    // 
    const filters = useRef<Array<HTMLDivElement>>([]);
    const pushFilters = (el: HTMLElement) => filters.current.push(el);
    const filtersStyles = useRef<Array<CSSStyleDeclaration>>([]);
    // 
    let id = -2;
    let json_info = JSON_RECIEVED_INFO.map(function (imageUrl) {
        id += 1;
        return ([id, imageUrl.imageUrl, "carouselElements", "filters"])
    })


    useEffect(() => {
        console.log("useEffect [] is called");

        if (carousel.current) {
            carouselStyles.current = carousel.current!.style;
        }
        else {
            console.log("Carousel and CarouselStyles is null!");
        }
        if (carouselElements.current) {
            for (let i = 0; i < ELEMENTS_COUNT; i++) {
                if (carouselElements.current[i]) {

                    carouselElementsStyles.current![i] = (carouselElements.current![i] as HTMLElement).style
                }
                else { console.log("CarouselELements" + i + " is null!") }
            }
        }
        if (filters.current) {
            for (let i = 0; i < ELEMENTS_COUNT; i++) {
                if (filters.current![i]) {
                    filtersStyles.current![i] = (filters.current![i] as HTMLElement).style
                }
                else {
                    console.log("Filters[" + i + "] is null!");
                }
            }
        }

        // ASSIGNING  USEREFS



        for (let i = 0; i < ELEMENTS_COUNT; i++) {
            if (i != choosenElement + 1) {
                filtersStyles.current![i].filter = "opacity(70%)";
            }
            else {
                filtersStyles.current![i].filter = "opacity(0%)"
            }
            carouselStyles.current! = (carousel.current! as HTMLElement).style;
            carouselElementsStyles.current![i].minWidth = ELEMENT_WIDTH + "px";
            carouselElementsStyles.current![i].maxWidth = ELEMENT_WIDTH + "px";
        }
        carouselStyles.current!.transition = "margin-left 1s";
        // ASSIGNEMENT CAROUSELELEMENTS WIDTH AND FINLTERS OPACITY AND TRANSITION
    }, [])
    useEffect(() => {
        carouselStyles.current!.marginLeft = offset - CAROUSEL_MARGIN_LEFT + "px";
    }, [offset])
    // MOVING CAROUSEL SCRIPT

    useEffect(() => {
        if (0 < choosenElement && choosenElement < ELEMENTS_COUNT) {
            let filterStyles = (filters.current![(choosenElement + 1)] as HTMLElement).style;
            filterStyles.filter = "opacity(70%)";
            filterStyles = (filters.current![(choosenElement - 1)] as HTMLElement).style;
            filterStyles.filter = "opacity(70%)";
            filterStyles = (filters.current![(choosenElement)] as HTMLElement).style;
            filterStyles.filter = "opacity(0%)";
        }
    }, [choosenElement])
    // CHANGING FILTERS OPACITY WHEN MOVING

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

    return (
        <div className="tv-carousel">
            <div className="tv-carousel-container">
                <div className="tv-carousel-window">
                    <div className="tv-carousel-row" ref={carousel}>

                        {/* Можно ли использовать htmlELement для htmlDivElement??*/}
                        {
                            json_info.map(function (elementInfo) {
                                let id = elementInfo[0] as number;

                                return (
                                    <TVCarouselElement
                                        key={id}
                                        id={id}
                                        imageUrl={elementInfo[1] as string}
                                        carouselElementsRef={pushCarouselElements}
                                        filtersRef={pushFilters}
                                    />);
                            })}

                    </div>
                </div>
            </div>
            <button onClick={handleLeftArrowClick}> left </button>
            <button onClick={handleRightArrowClick}> right </button>

        </div>
    );
}
{/*                        <TVCarouselElement
                            carouselElementsRef={carouselElements}
                            filtersRef={filters}
                            id={-1}
                            imageUrl="/public/hero_tv_ted_lasso.jpg" />
                        <TVCarouselElement
                            carouselElementsRef={carouselElements}
                            filtersRef={filters}
                            id={0}
                            imageUrl="/public/hero_tv_the_gorge.jpg" />
                        <TVCarouselElement
                            carouselElementsRef={carouselElements}
                            filtersRef={filters}
                            id={1}
                            imageUrl="/public/hero_tv_severance.jpg" />
                        <TVCarouselElement
                            carouselElementsRef={carouselElements}
                            filtersRef={filters}
                            id={2}
                            imageUrl="/public/hero_tv_surface.jpg" />
                        <TVCarouselElement
                            carouselElementsRef={carouselElements}
                            filtersRef={filters}
                            id={3}
                            imageUrl="/public/hero_tv_onside.jpg" />
                        <TVCarouselElement
                            carouselElementsRef={carouselElements}
                            filtersRef={filters}
                            id={4}
                            imageUrl="/public/hero_tv_season_pass.jpg" />
                        <TVCarouselElement
                            carouselElementsRef={carouselElements}
                            filtersRef={filters}
                            id={5}
                            imageUrl="/public/hero_tv_prime_target.jpg" />
                        <TVCarouselElement
                            carouselElementsRef={carouselElements}
                            filtersRef={filters}
                            id={6}
                            imageUrl="/public/hero_tv_mythic_quest.jpg" />
                        <TVCarouselElement
                            carouselElementsRef={carouselElements}
                            filtersRef={filters}
                            id={7}
                            imageUrl="/public/hero_tv_silo.jpg" />
                        <TVCarouselElement
                            carouselElementsRef={carouselElements}
                            filtersRef={filters}
                            id={8}
                            imageUrl="/public/hero_tv_shrinking.jpg" />
                        <TVCarouselElement
                            carouselElementsRef={carouselElements}
                            filtersRef={filters}
                            id={9}
                            imageUrl="/public/hero_tv_ted_lasso.jpg" />
                        <TVCarouselElement
                            carouselElementsRef={carouselElements}
                            filtersRef={filters}
                            id={10}
                            imageUrl="/public/hero_tv_the_gorge.jpg" /> */}