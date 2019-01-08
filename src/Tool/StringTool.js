import BaseTool from "./baseTool";
import MathTool from "./MathTool";

class StringTool extends BaseTool {
    allLetters = "QWERTYUIOPASDFGHJKLZXCVBNM";
    allNumber = "1234567890";

    randomString (length) {
        const allChar = this.allLetters + this.allNumber;
        let result = "";
        for (let i = 0; i < length; i++) {
            result += allChar[MathTool.randomNumber(0, allChar.length - 1)];
        }
        return result;
    }
}

export default new StringTool();
