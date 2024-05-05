import { HOME_CONTENT } from "../utils/config";
import { MoreInfo } from "../utils/moreInfo";
import { FORESTFIRE_CONTENT } from "../utils/config";
import { EARTHQUAKE_CONTENT } from "../utils/config";

const HomeContent = () => {
    return(
        <div className="p-6 text-white">
            <h1 className="text-7xl slide-in p-5">Disaster Predictor</h1>
            <div className="w-1/3 p-6 flex">
            <p className="text-xl p-2 slide-in">
                {HOME_CONTENT}
            </p>
            </div>
            <MoreInfo imageSrc = "https://img.wallpapic.com/i1967-343-627/medium/creative-digital-art-waves-sea-wallpaper.jpg" />
        </div>
    );
}
export const ForestFireContent = () => {
    return(
        <div className="p-6 text-white">
            <h1 className="text-7xl slide-in p-5">ForestFire Predictor</h1>
            <div className="w-1/3 p-6 flex">
            <p className="text-xl p-2 slide-in">
                {FORESTFIRE_CONTENT}
            </p>
            </div>
            <MoreInfo  imageSrc = "https://w0.peakpx.com/wallpaper/54/856/HD-wallpaper-forest-fire-mountains-forest-smoke-fire.jpg" />
        </div>
    );
}

export const EarthQuakeContent = () => {
    return(
        <div className="p-6 text-white">
            <h1 className="text-7xl slide-in p-5">EarthQuake Predictor</h1>
            <div className="w-1/3 p-6 flex">
            <p className="text-xl p-2 slide-in">
                {EARTHQUAKE_CONTENT}
            </p>
            </div>
            <MoreInfo  imageSrc = "https://images.unsplash.com/photo-1688315137965-5a5835540558?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        </div>
    );
}

export default HomeContent;