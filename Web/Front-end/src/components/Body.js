import DisastersCarousel from "./Carousel";
import HomeContent from "./HomeContent";
import Dcard from "./Dinfo";


const Body = () => {


    /*useEffect(()=>{
        getData();
    },[]);

    async function getData(){
        const data = await fetch("http://localhost:3000");
        const json = data.json();
        console.log(json);
    }*/

    return(
        <div className="bg-cover bg-center bg-fixed" style={{backgroundImage: "url('https://www.houseopedia.com/wp-content/uploads/2019/06/Protecting-Your-Home-from-Natural-Disaster.jpeg')"}}>
            <div className="bg-black bg-opacity-50 absolute inset-0"></div>
                <div className = "relative z-5">
                    <HomeContent />
                    <h1 className="bg-gray-900">This is body</h1>
                    <DisastersCarousel />
                    <Dcard />
                    <h1>This is body</h1>
                </div>
        </div> 
    );
}

export default Body;

