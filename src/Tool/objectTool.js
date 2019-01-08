import BaseTool from './baseTool'

class ObjectTool extends BaseTool{
    /**
     * 在属性都为Container类 的实例对象中通过value查找chinese
     * @param{[key:string] : Container} object 一个属性为Container类的实例对象
     * @param{String | Number} value 要找的目标对象
     * */
    findChieseByValueInContainer(object, value){
        const keys = Object.keys(object);
        for(let item of keys){
            if(object[item].value == value){
                return object[item].chinese;
            }
        }
        return "";
    }

}
export default new ObjectTool();
