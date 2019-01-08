
class PageTitle{
    global = null;
    constructor(){
        this.global = window;
    }
    findTitleElement(){
        const head = this.global.document.querySelector("head");
        let title = head.querySelector("title");
        if(!title) {
           var tempTitle = this.global.document.createElement('title');
           head.append(title);
           title = tempTitle;
        }
        return title;
    }
    updatePageTitle(titleText){
        const titleElement = this.findTitleElement();
        titleElement.innerText = titleText;
    }
}
export default new PageTitle();
