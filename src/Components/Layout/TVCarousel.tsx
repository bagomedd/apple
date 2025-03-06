import { TVCarouselElement } from "../common/TVCarouselElement";
import { useState, useEffect, useRef, } from "react";
// import { floor } from "Math";

import * as TVCarouselJson from "../JSON/TVCarousel.json";

export function TVCarousel() {

    const JSON_RECIEVED_INFO = TVCarouselJson.tvCarouselInfo;
    const CAROUSEL_MARGIN_LEFT = 12;
    const ELEMENTS_COUNT = 10;
    const MID_INDEX = Math.floor((ELEMENTS_COUNT - 1) / 2);

    const CAROUSEL_WIDTH = useRef<number>(0);
    const ELEMENT_WIDTH = useRef<number>(0);
    const BLOCK_WIDTH = useRef<number>(0);

    const [choosenElement, setChoosenElement] = useState(MID_INDEX);
    const [offset, setOffset] = useState(0);

    const carousel = useRef<HTMLDivElement | null>(null);
    const carouselStyles = useRef<CSSStyleDeclaration | null>(null);
    //
    const carouselElements = useRef<Array<HTMLDivElement>>([]);
    // const pushCarouselElements = (el: HTMLDivElement) => carouselElements.current.push(el);
    const pushCarouselElements = (el: HTMLDivElement) => { carouselElements.current.push(el) };

    const carouselElementsStyles = useRef<Array<CSSStyleDeclaration>>([]);
    // 
    const filters = useRef<Array<HTMLDivElement>>([]);
    const pushFilters = (el: HTMLDivElement) => { filters.current.push(el) };
    const filtersStyles = useRef<Array<CSSStyleDeclaration>>([]);
    //
    const buttonLeft = useRef<HTMLButtonElement | null>(null);
    const buttonLeftStyles = useRef<CSSStyleDeclaration | null>(null);
    const buttonRight = useRef<HTMLButtonElement | null>(null);
    const buttonRightStyles = useRef<CSSStyleDeclaration | null>(null);
    //
    const switchers = useRef<Array<HTMLButtonElement>>([]);
    const pushSwitchers = (el: HTMLButtonElement) => { switchers.current.push(el) };

    const switchersStyles = useRef<Array<CSSStyleDeclaration>>([]);
    //
    const tvCarouselWindow = useRef<HTMLDivElement | null>(null);
    //
    const elementsOffsets = useRef<Array<number>>(new Array(ELEMENTS_COUNT).fill(0));
    // ELEMENTS OFFSETS, INITITALLY ARRAY OF 0
    const indexL = useRef<number>(0);
    const indexR = useRef<number>(ELEMENTS_COUNT);
    // THE LEAST LEFT AND RIGHT INDEXES
    const moveDir = useRef<String>('n')
    //  MOVE DIRECTION, 'r' IS RIGHT, 'l' IS LEFT

    function calcIndexLL(_choosenElement: number) {
        let localIndexLL = _choosenElement - MID_INDEX;
        if (localIndexLL > 0) {
            localIndexLL = localIndexLL % ELEMENTS_COUNT
        }
        else {
            localIndexLL = (localIndexLL + ELEMENTS_COUNT) % ELEMENTS_COUNT
        }
        // choosenElement - 4 - ELEMENTS_COUNT || choosenElement - 4 || choosenElement - 4 + ELEMENTS_COUNT
        // indexLL - ELEMENTS_COUNT * X
        // -indexLL + ELEMENTS_COUNT * X
        return localIndexLL;
    }
    function calcIndexRR(_choosenElement: number) {
        let localIndexRR = _choosenElement + Math.floor(ELEMENTS_COUNT / 2)
        if (localIndexRR > 0) {
            localIndexRR %= ELEMENTS_COUNT
        }
        else {
            localIndexRR = (localIndexRR + ELEMENTS_COUNT) % ELEMENTS_COUNT
        }
        // choosenElement - 4 - ELEMENTS_COUNT || choosenElement - 4 || choosenElement - 4 + ELEMENTS_COUNT
        // indexLL - ELEMENTS_COUNT * X
        // -indexLL + ELEMENTS_COUNT * X
        return localIndexRR;
    }

    function calcChoosenELement(_choosenElement: number, _moveDir: String) {
        if (_moveDir == 'l') {
            if (_choosenElement - 1 >= 0) {
                // -1
                // setChoosenElement(choosenElement - 1);
                return (_choosenElement);
            }
            else {
                return (_choosenElement + ELEMENTS_COUNT);
            }
        }
        else if (_moveDir == 'r') {
            if (_choosenElement + 1 < ELEMENTS_COUNT) {
                // +1
                return (_choosenElement);
            }
            else {
                return (_choosenElement - ELEMENTS_COUNT);
            }
        }
    }
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

                    carouselElementsStyles.current![i] = (carouselElements.current![i] as HTMLElement).style;

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
            ELEMENT_WIDTH.current = carouselElements.current[i].getBoundingClientRect().width;
            BLOCK_WIDTH.current = ELEMENT_WIDTH.current + CAROUSEL_MARGIN_LEFT;
            CAROUSEL_WIDTH.current = BLOCK_WIDTH.current * ELEMENTS_COUNT;

            tvCarouselWindow.current!.style.width = ELEMENT_WIDTH.current + "px";
            setOffset(-BLOCK_WIDTH.current * MID_INDEX);
            // FIX
        }


        buttonLeftStyles.current!.width = BLOCK_WIDTH.current + "px";
        buttonLeftStyles.current!.marginLeft = -2 * BLOCK_WIDTH.current + "px";

        buttonRightStyles.current!.width = BLOCK_WIDTH.current + "px";
        buttonRightStyles.current!.marginLeft = 2 * BLOCK_WIDTH.current + "px";

        carouselStyles.current!.transition = "margin-left 1s";
        // ASSIGNEMENT CAROUSELELEMENTS WIDTH AND FINLTERS OPACITY AND TRANSITION


    }, [])
    // STARTING VALUES SETTING
    useEffect(() => {
        carouselStyles.current!.marginLeft = offset + "px";
    }, [offset])
    // MOVING CAROUSEL SCRIPT

    useEffect(() => {
        calcIndexR();
        calcIndexL();

        filtersStyles.current![indexL.current].filter = "opacity(70%)";
        filtersStyles.current![choosenElement].filter = "opacity(0%)";
        filtersStyles.current![indexR.current].filter = "opacity(70%)";

        switchersStyles.current![indexL.current].backgroundColor = "var(--gray-c1)";
        switchersStyles.current![choosenElement].backgroundColor = "var(--gray-c2)";
        switchersStyles.current![indexR.current].backgroundColor = "var(--gray-c1)";

        if (moveDir.current == 'r') {
            let prevChoosenElement = calcChoosenELement(choosenElement - 1, moveDir.current!);
            let indexLL = calcIndexLL(Number(prevChoosenElement));
            elementsOffsets.current[indexLL] += CAROUSEL_WIDTH.current;
            carouselElementsStyles.current![indexLL].transform = "translate(" + elementsOffsets.current[indexLL] + "px,0px)";
        }
        if (moveDir.current == 'l') {
            let prevChoosenElement = calcChoosenELement(choosenElement + 1, moveDir.current!);
            let indexRR = calcIndexRR(Number(prevChoosenElement));
            elementsOffsets.current[indexRR] -= CAROUSEL_WIDTH.current;
            carouselElementsStyles.current![indexRR].transform = 'translate(' + elementsOffsets.current[indexRR] + 'px,0px)';
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

        setOffset(prevOffset => prevOffset + BLOCK_WIDTH.current);

        moveDir.current = 'l';
        if (choosenElement - 1 >= 0) {
            // setChoosenElement(choosenElement - 1);

            setChoosenElement(prevChoosenElement => prevChoosenElement - 1)
        }
        else {
            setChoosenElement(prevChoosenElement => prevChoosenElement - 1 + ELEMENTS_COUNT);
        }
    }
    function handleRightArrowClick() {
        // setOffset(offset - BLOCK_WIDTH);
        setOffset(prevOffset => prevOffset - BLOCK_WIDTH.current);

        moveDir.current = 'r';
        if (choosenElement + 1 < ELEMENTS_COUNT) {
            // +1
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
                <div className="tv-carousel-window" ref={tvCarouselWindow}>

                    <div className="tv-carousel-row" ref={carousel}>
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
