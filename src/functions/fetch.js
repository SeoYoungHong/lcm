export const fetchdata = async(query) => {
    //혈당에서는 혈당에 대한 정보만 뜨게함
    const data =await API.graphql({query: query})
        .then(data => setfetcheddata(data))
        .catch(err=>console.log(err))
    console.log("datafetch success")
}