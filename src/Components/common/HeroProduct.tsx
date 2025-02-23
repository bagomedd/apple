export function HeroProduct({ product }: any) {
    return (


        <div className={"innovation-block " + product} >

            <a className="innovation-container" href="##">
                <div className="information">
                    <div className="hero-text"> iPhone 16 </div>
                    <div className="additional-text"> Hello, Apple Intelligence. </div>
                    <div className="button-block">
                        <button className={"btn " + product + "-learn-more"}> Learn more </button>
                        <button className={"btn " + product + "-buy"}> Buy </button>
                    </div>
                </div>

            </a >
        </div >
    );
};
