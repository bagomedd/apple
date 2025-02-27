import { TVCarouselElement } from "../common/TVCarouselElement";
import { useState, useEffect, useRef } from "react";
// import { floor } from "Math";

import * as TVCarouselJson from "./TVCarousel.json";

export function TVCarousel() {
    const JSON_RECIEVED_INFO = TVCarouselJson.tvCarouselInfo;
    const CAROUSEL_MARGIN_LEFT = 12;
    const ELEMENT_WIDTH = 1250;
    const ELEMENTS_COUNT = 10;
    const BLOCK_WIDTH = ELEMENT_WIDTH + CAROUSEL_MARGIN_LEFT;
    const CAROUSEL_WIDTH = BLOCK_WIDTH * ELEMENTS_COUNT;
    // px 
    const [choosenElement, setChoosenElement] = useState(4);
    const [offset, setOffset] = useState(
        -BLOCK_WIDTH * Math.floor((ELEMENTS_COUNT - 1) / 2)
        // STARTING OFFSET
    );

    // DECLARING USEREFS
    const carousel = useRef<HTMLDivElement | null>(null);
    const carouselStyles = useRef<CSSStyleDeclaration | null>(null);
    //
    const carouselElements = useRef<Array<HTMLDivElement>>([]);
    const pushCarouselElements = (el: HTMLDivElement) => carouselElements.current.push(el);
    const carouselElementsStyles = useRef<Array<CSSStyleDeclaration>>([]);
    // 
    const filters = useRef<Array<HTMLDivElement>>([]);
    const pushFilters = (el: HTMLDivElement) => filters.current.push(el);

    const filtersStyles = useRef<Array<CSSStyleDeclaration>>([]);
    const elementsOffsets = useRef<Array<number>>(new Array(ELEMENTS_COUNT).fill(0));
    // ELEMENTS OFFSETS, INITITALLY ARRAY OF 0
    const indexLL = useRef<number>(0);
    const indexRR = useRef<number>(ELEMENTS_COUNT);
    // THE MOST LEFT AND RIGHT INDEXES
    const indexL = useRef<number>(0);
    const indexR = useRef<number>(ELEMENTS_COUNT);
    // THE LEAST LEFT AND RIGHT INDEXES

    const moveDir = useRef<String>('n')
    //  MOVE DIRECTION, 'r' IS RIGHT, 'l' IS LEFT

    function calcIndexLL() {
        let _indexLL = choosenElement - Math.floor((ELEMENTS_COUNT - 1) / 2)
        if (_indexLL > 0) {
            _indexLL = _indexLL % ELEMENTS_COUNT
        }
        else {
            _indexLL = (_indexLL + ELEMENTS_COUNT) % ELEMENTS_COUNT
        }
        // choosenElement - 4 - ELEMENTS_COUNT || choosenElement - 4 || choosenElement - 4 + ELEMENTS_COUNT
        // indexLL - ELEMENTS_COUNT * X
        // -indexLL + ELEMENTS_COUNT * X
        indexLL.current = _indexLL;
    }
    function calcIndexRR() {
        let _indexRR = choosenElement + Math.floor(ELEMENTS_COUNT / 2)
        if (_indexRR > 0) {
            _indexRR %= ELEMENTS_COUNT
        }
        else {
            _indexRR = (_indexRR + ELEMENTS_COUNT) % ELEMENTS_COUNT
        }
        // choosenElement - 4 - ELEMENTS_COUNT || choosenElement - 4 || choosenElement - 4 + ELEMENTS_COUNT
        // indexLL - ELEMENTS_COUNT * X
        // -indexLL + ELEMENTS_COUNT * X
        indexRR.current = _indexRR;
    }
    function calcIndexL() {
        let _indexLL = choosenElement - 1
        if (_indexLL > 0) {
            _indexLL = _indexLL % ELEMENTS_COUNT
        }
        else {
            _indexLL = (_indexLL + ELEMENTS_COUNT) % ELEMENTS_COUNT
        }
        // choosenElement - 4 - ELEMENTS_COUNT || choosenElement - 4 || choosenElement - 4 + ELEMENTS_COUNT
        // indexLL - ELEMENTS_COUNT * X
        // -indexLL + ELEMENTS_COUNT * X
        indexL.current = _indexLL;
    }
    function calcIndexR() {
        let _indexRR = choosenElement + 1
        if (_indexRR > 0) {
            _indexRR %= ELEMENTS_COUNT
        }
        else {
            _indexRR = (_indexRR + ELEMENTS_COUNT) % ELEMENTS_COUNT
        }
        // choosenElement - 4 - ELEMENTS_COUNT || choosenElement - 4 || choosenElement - 4 + ELEMENTS_COUNT
        // indexLL - ELEMENTS_COUNT * X
        // -indexLL + ELEMENTS_COUNT * X
        indexR.current = _indexRR;
    }
    // THE MOST LEFT AND THE MOST RIGHT INDEXES

    let id = -2;
    let json_info = JSON_RECIEVED_INFO.map(function (imageUrl) {
        id += 1;
        return ([id, imageUrl.imageUrl, "carouselElements", "filters"])
    })


    useEffect(() => {
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
            carouselElementsStyles.current![i].minWidth = ELEMENT_WIDTH + "px";
            carouselElementsStyles.current![i].maxWidth = ELEMENT_WIDTH + "px";
        }

        carouselStyles.current!.transition = "margin-left 1s";

        // ASSIGNEMENT CAROUSELELEMENTS WIDTH AND FINLTERS OPACITY AND TRANSITION


    }, [])
    useEffect(() => {
        carouselStyles.current!.marginLeft = offset + "px";
    }, [offset])
    // MOVING CAROUSEL SCRIPT

    useEffect(() => {

        // if (0 < choosenElement && choosenElement < ELEMENTS_COUNT) {
        //     let filterStyles = (filters.current![(choosenElement + 1)] as HTMLElement).style;
        //     filterStyles.filter = "opacity(70%)";
        //     filterStyles = (filters.current![(choosenElement - 1)] as HTMLElement).style;
        //     filterStyles.filter = "opacity(70%)";
        //     filterStyles = (filters.current![(choosenElement)] as HTMLElement).style;
        //     filterStyles.filter = "opacity(0%)";
        // }    
        calcIndexR();
        calcIndexL();

        filtersStyles.current![indexL.current].filter = "opacity(70%)";
        // console.log(indexL.current, 'IL');
        filtersStyles.current![indexR.current].filter = "opacity(70%)";
        // console.log(indexR.current, 'IR');
        filtersStyles.current![choosenElement].filter = "opacity(0%)";
        // console.log(choosenElement, "CE");


        if (moveDir.current == 'r') {
            elementsOffsets.current[indexLL.current] += CAROUSEL_WIDTH;
            // console.log(elementsOffsets.current[indexLL.current]);
            carouselElementsStyles.current![indexLL.current].transform = 'translate(' + elementsOffsets.current[indexLL.current] + 'px,0px)';
        }
        if (moveDir.current == 'l') {
            elementsOffsets.current[indexRR.current] -= CAROUSEL_WIDTH;
            carouselElementsStyles.current![indexRR.current].transform = 'translate(' + elementsOffsets.current[indexRR.current] + 'px,0px)';
            // console.log(elementsOffsets.current[indexLL.current]);
        }

    }, [choosenElement])
    // CHANGING FILTERS OPACITY WHEN MOVING

    function handleLeftArrowClick() {
        setOffset(offset + BLOCK_WIDTH);
        calcIndexRR();

        moveDir.current = 'l';

        if (choosenElement - 1 >= 0) {
            setChoosenElement(choosenElement - 1);
        }
        else {
            setChoosenElement(choosenElement - 1 + ELEMENTS_COUNT);
        }

    }
    function handleRightArrowClick() {
        setOffset(offset - BLOCK_WIDTH);
        calcIndexLL();

        moveDir.current = 'r';

        if (choosenElement + 1 < ELEMENTS_COUNT) {
            setChoosenElement(choosenElement + 1);
        }
        else {
            setChoosenElement(choosenElement + 1 - ELEMENTS_COUNT);
        }
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
