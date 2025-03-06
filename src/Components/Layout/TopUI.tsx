//@ts-ignore
import { HeaderMenu } from "@components/common/HeaderMenu";
//@ts-ignore
import { Apple, Search, Shop } from "@svg/Svg.tsx";
// import { useRef, useEffect } from "react";
import { Link } from "react-router";
export function TopUI() {

    return (
        <header className="hero-header">
            <div className="top-ui">
                <div className="navigation-panel">
                    <div className="navigation-block">
                        <Apple className="svg" />
                    </div>
                    <div className="navigation-block"> Store </div>
                    <div className="navigation-block"> Mac </div>
                    <div className="navigation-block"> iPad</div>
                    <div className="navigation-block"> iPhone </div>
                    <div className="navigation-block"> Watch </div>
                    <div className="navigation-block"> Vision </div>
                    <div className="navigation-block"> AirPods</div>
                    <div className="navigation-block"> TV & Home </div>
                    <div className="navigation-block"> Entertaiment </div>
                    <div className="navigation-block"> Accessories </div>
                    <div className="navigation-block"> Support </div>
                    <div className="navigation-block">
                        <Search className="svg" />
                    </div>
                    <Link to="/register" className="navigation-block">
                        <Shop className="svg" />
                    </Link>
                </div>
            </div>
        </header >

    );
}
/*ts 2339 */

