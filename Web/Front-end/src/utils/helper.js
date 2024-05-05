function filterData(searchText, feedItems){
    const data = feedItems.filter((item)=>{
        return item.title.toLowerCase().includes(searchText.toLowerCase());
    })
    return data;
}

export default filterData;