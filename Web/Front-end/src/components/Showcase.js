import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
//showcase
const SearchShimmer = ()=>{
    return(
        <div className="mx-10 my-8">
        <p><Skeleton className="p-2 w-6/12 rounded-sm border-2 mr-8"/></p>
        </div>
    );
}


const Singleshimmer = ()=>{
    return(
        <>
        <div className="w-[240] m-2 p-2">
            <p><Skeleton width={240} height={200}  /></p>
            <p><Skeleton /></p>
            <p><Skeleton /></p>
            <p><Skeleton /></p>
        </div>
        </>
    );
}

export const reviewShimmer = () => {
    return(
        <>
        <div className='flex flex-wrap m-2 p-2'>
            {Array(4).fill("").map((e, index) => {
                return <Singleshimmer key={index}/>
            })}
        </div>
        </>
    );
}

const Shimmer = () =>{
    return (
        <>
        <SearchShimmer />
        <div className='flex flex-wrap m-2 p-2'>
            {Array(8).fill("").map((e, index) => {
                    return <Singleshimmer key={index}/>
            })}
        </div>
        </>
    );
}

export default Shimmer;
