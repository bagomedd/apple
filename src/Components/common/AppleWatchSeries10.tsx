export function AppleWatchSeries10({ data }: any) {
    return (
        <div data-unit-id={"data-" + data} className="hero-product">
            <div className="information">
                <div className="hero-text"> Apple Watch </div>
                <div className="description"> Thinstant classic. </div>
                <div className="button-container">
                    <button className="btn learn-more"> Learn more </button>
                    <button className="btn buy"> Buy </button>
                </div>
            </div>
            <div className="image"></div>
        </div>
    );
}