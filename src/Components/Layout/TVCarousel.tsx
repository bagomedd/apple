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
    const MID_INDEX = Math.floor((ELEMENTS_COUNT - 1) / 2);
    // px 
    const [choosenElement, setChoosenElement] = useState(MID_INDEX);
    const [offset, setOffset] = useState(
        -BLOCK_WIDTH * MID_INDEX
        // STARTING OFFSET
    );

    // const [indexRight, setIndexLeft] = useState(0);
    // const [indexLeft, setIndexRight] = useState(0);
    // HZ

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
    //
    const buttonLeft = useRef<HTMLButtonElement | null>(null);
    const buttonLeftStyles = useRef<CSSStyleDeclaration | null>(null);
    const buttonRight = useRef<HTMLButtonElement | null>(null);
    const buttonRightStyles = useRef<CSSStyleDeclaration | null>(null);
    //
    const switchers = useRef<Array<HTMLButtonElement>>([]);
    const pushSwitchers = (el: HTMLButtonElement) => switchers.current.push(el);
    const switchersStyles = useRef<Array<CSSStyleDeclaration>>([]);
    //
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
        let _indexLL = choosenElement - MID_INDEX;
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
    // HZ

    function calcIndexL() {
        let _indexLL = choosenElement - 1
        if (_indexLL > 0) {
            _indexLL = _indexLL % ELEMENTS_COUNT
        }
        else {
            _indexLL = (_indexLL + ELEMENTS_COUNT) % ELEMENTS_COUNT
        }
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


    let id = -1;
    let json_info = JSON_RECIEVED_INFO.map(function (imageUrl) {
        id += 1;
        return ([id, imageUrl.imageUrl])
    })

    // JSON READING 


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
        if (buttonLeft.current && buttonRight.current) {
            buttonLeftStyles.current = buttonLeft.current!.style;
            buttonRightStyles.current = buttonRight.current!.style;
        }
        else {
            console.log("BUTTONS IS NULL");
        }
        if (switchers.current) {
            for (let i = 0; i < ELEMENTS_COUNT; i++) {
                if (switchers.current![i]) {
                    switchersStyles.current![i] = (switchers.current![i] as HTMLElement).style
                }
                else {
                    console.log("Switchers[" + i + "] is null!");
                }
            }

        }

        // ASSIGNING  USEREFS
        for (let i = 0; i < ELEMENTS_COUNT; i++) {
            if (i != choosenElement + 1) {
                filtersStyles.current![i].filter = "opacity(70%)";

                switchersStyles.current![i].background = "var(--gray-c1)";
                // FIX
            }
            else {
                filtersStyles.current![i].filter = "opacity(0%)"
                switchersStyles.current![i].background = "var(--gray-c2)";
                // FIX
            }
            carouselElementsStyles.current![i].minWidth = ELEMENT_WIDTH + "px";
            carouselElementsStyles.current![i].maxWidth = ELEMENT_WIDTH + "px";


        }


        buttonLeftStyles.current!.width = BLOCK_WIDTH + "px";
        buttonLeftStyles.current!.marginLeft = -2 * BLOCK_WIDTH + "px";

        buttonRightStyles.current!.width = BLOCK_WIDTH + "px";
        buttonRightStyles.current!.marginLeft = 2 * BLOCK_WIDTH + "px";

        carouselStyles.current!.transition = "margin-left 1s";
        // ASSIGNEMENT CAROUSELELEMENTS WIDTH AND FINLTERS OPACITY AND TRANSITION


    }, [])
    // STARTING VALUES SETTING
    useEffect(() => {
        carouselStyles.current!.marginLeft = offset + "px";
    }, [offset])
    // MOVING CAROUSEL SCRIPT

    useEffect(() => {
        console.log("useeffect");
        calcIndexR();
        calcIndexL();

        filtersStyles.current![indexL.current].filter = "opacity(70%)";
        filtersStyles.current![choosenElement].filter = "opacity(0%)";
        filtersStyles.current![indexR.current].filter = "opacity(70%)";

        switchersStyles.current![indexL.current].backgroundColor = "var(--gray-c1)";
        switchersStyles.current![choosenElement].backgroundColor = "var(--gray-c2)";
        switchersStyles.current![indexR.current].backgroundColor = "var(--gray-c1)";




        if (moveDir.current == 'r') {
            elementsOffsets.current[indexLL.current] += CAROUSEL_WIDTH;
            carouselElementsStyles.current![indexLL.current].transform = 'translate(' + elementsOffsets.current[indexLL.current] + 'px,0px)';
        }
        if (moveDir.current == 'l') {
            elementsOffsets.current[indexRR.current] -= CAROUSEL_WIDTH;
            carouselElementsStyles.current![indexRR.current].transform = 'translate(' + elementsOffsets.current[indexRR.current] + 'px,0px)';
        }



        // if (moveDir.current == 'r') {
        //     elementsOffsets.current[indexLeft] += CAROUSEL_WIDTH;
        //     carouselElementsStyles.current![indexLeft].transform = 'translate(' + elementsOffsets.current[indexLeft] + 'px,0px)';
        // }
        // if (moveDir.current == 'l') {
        //     elementsOffsets.current[indexRight] -= CAROUSEL_WIDTH;
        //     carouselElementsStyles.current![indexRight].transform = 'translate(' + elementsOffsets.current[indexRight] + 'px,0px)';
        // }
        // HZ


    }, [choosenElement])
    // CHANGING FILTERS OPACITY WHEN MOVING

    function handleLeftArrowClick() {
        // setOffset(offset + BLOCK_WIDTH);
        setOffset(prevOffset => prevOffset + BLOCK_WIDTH);

        calcIndexRR();

        moveDir.current = 'l';

        if (choosenElement - 1 >= 0) {
            // setChoosenElement(choosenElement - 1);
            setChoosenElement(prevChoosenElement => prevChoosenElement - 1);
        }
        else {
            setChoosenElement(prevChoosenElement => prevChoosenElement - 1 + ELEMENTS_COUNT);
        }

    }
    function handleRightArrowClick() {
        console.log('rightarrowclock');
        // setOffset(offset - BLOCK_WIDTH);
        setOffset(prevOffset => prevOffset - BLOCK_WIDTH);

        calcIndexLL();


        moveDir.current = 'r';

        if (choosenElement + 1 < ELEMENTS_COUNT) {
            setChoosenElement(prevChoosenElement => prevChoosenElement + 1);
        }
        else {
            setChoosenElement(prevChoosenElement => prevChoosenElement + 1 - ELEMENTS_COUNT);
        }
    }
    function switchHandler(event: React.MouseEvent<HTMLButtonElement>) {
        let switcherNumber = Number(event.currentTarget.dataset.number);
        if (!switcherNumber) { console.log('SWITCHER NUMBER IS NULL') }

        if (choosenElement < switcherNumber!) {
            let steps = switcherNumber - choosenElement;
            if (steps > 0) {
                let i = 0;
                const interval = setInterval(() => {
                    // setOffset(prevOffset => prevOffset - BLOCK_WIDTH);
                    handleRightArrowClick();
                    i++;
                    if (i >= steps) clearInterval(interval);
                }, 0); // 0 ms, но React всё равно выполнит обновления последовательно
            }

        }
        if (choosenElement > switcherNumber) {
            let steps = choosenElement - switcherNumber;
            if (steps > 0) {
                let i = 0;
                const interval = setInterval(() => {
                    // setOffset(prevOffset => prevOffset - BLOCK_WIDTH);
                    handleLeftArrowClick();
                    i++;
                    if (i >= steps) clearInterval(interval);
                }, 0); // 0 ms, но React всё равно выполнит обновления последовательно
            }

        }
    }



    return (
        <div className="tv-carousel">

            <div className="tv-carousel-container">
                <button className="btn btn-left" ref={buttonLeft} onClick={handleLeftArrowClick}> LL </button>
                <button className="btn btn-right" ref={buttonRight} onClick={handleRightArrowClick}> RR </button>
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
            <div className="switcher-row">
                {json_info.map(function (elementInfo) {
                    let id = elementInfo[0] as number;
                    return (
                        <button
                            key={id}
                            data-number={id}
                            id={"tv-carousel-switcher-" + id}
                            onClick={switchHandler}
                            ref={pushSwitchers}
                            className="switcher" >
                        </button>
                    );
                })}
            </div>
        </div >
    );
}
