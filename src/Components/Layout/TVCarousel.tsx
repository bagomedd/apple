import { TVCarouselElement } from "../common/TVCarouselElement";
import { useState } from "react";

export function TVCarousel() {




    return (
        <div className="tv-carousel">
            <div className="tv-carousel-row">
                <TVCarouselElement id={-1} />

                <TVCarouselElement id={0} />
                <TVCarouselElement id={1} />
                <TVCarouselElement id={2} />
                <TVCarouselElement id={3} />
                <TVCarouselElement id={4} />
                <TVCarouselElement id={5} />
                <TVCarouselElement id={6} />
                <TVCarouselElement id={7} />
                <TVCarouselElement id={8} />
                <TVCarouselElement id={9} />

                <TVCarouselElement id={10} />
            </div>
        </div>
    );
}