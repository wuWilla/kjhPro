
class UrlTool{
    getAllParams(){
       return window.location.search.splice(1);
    }
    getUrlParamByKey(key){
        const allParams = this.getAllParams();
        const paramsList = allParams.split('&');
        const currentParames = paramsList.find(e => e.split("=")[0] === key);
        return currentParames ? currentParames.split("=")[1] : null;
    }
}
export default new UrlTool();
