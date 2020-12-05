var cacheData = {};
const setData = (key, value) => {
    cacheData[key] = value;
}
const getData = (key) => {
    return cacheData[key];
}
const getLocale = (key) =>{
    var AllLocales=cacheData['AllLocales'];
   // console.log("key and value of Locale >>"+key+" : "+AllLocales[key]);
    return AllLocales[key];
}
export default {
    setData, getData, getLocale
}