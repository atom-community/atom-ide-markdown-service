"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fenceNameForScope = exports.scopeForFenceName = void 0;
const scopesByFenceName = {
    bash: "source.shell",
    sh: "source.shell",
    powershell: "source.powershell",
    ps1: "source.powershell",
    c: "source.c",
    "c++": "source.cpp",
    cpp: "source.cpp",
    coffee: "source.coffee",
    "coffee-script": "source.coffee",
    coffeescript: "source.coffee",
    cs: "source.cs",
    csharp: "source.cs",
    css: "source.css",
    sass: "source.sass",
    scss: "source.css.scss",
    erlang: "source.erl",
    go: "source.go",
    html: "text.html.basic",
    java: "source.java",
    javascript: "source.js",
    js: "source.js",
    json: "source.json",
    less: "source.less",
    mustache: "text.html.mustache",
    objc: "source.objc",
    "objective-c": "source.objc",
    php: "text.html.php",
    py: "source.python",
    python: "source.python",
    rb: "source.ruby",
    ruby: "source.ruby",
    rust: "source.rust",
    text: "text.plain",
    toml: "source.toml",
    ts: "source.ts",
    typescript: "source.ts",
    xml: "text.xml",
    yaml: "source.yaml",
    yml: "source.yaml",
};
function scopeForFenceName(fenceName) {
    var _a;
    fenceName = fenceName.toLowerCase();
    return (_a = scopesByFenceName[fenceName]) !== null && _a !== void 0 ? _a : `source.${fenceName}`;
}
exports.scopeForFenceName = scopeForFenceName;
function fenceNameForScope(scope) {
    scope = scope.toLowerCase();
    const result = Object.keys(scopesByFenceName).filter((s) => s == scope);
    let resultOut;
    if (result.length) {
        resultOut = result[0];
    }
    else {
        resultOut = scope.substr(scope.lastIndexOf(".") + 1);
    }
    return resultOut;
}
exports.fenceNameForScope = fenceNameForScope;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBTSxpQkFBaUIsR0FBMEM7SUFDL0QsSUFBSSxFQUFFLGNBQWM7SUFDcEIsRUFBRSxFQUFFLGNBQWM7SUFDbEIsVUFBVSxFQUFFLG1CQUFtQjtJQUMvQixHQUFHLEVBQUUsbUJBQW1CO0lBQ3hCLENBQUMsRUFBRSxVQUFVO0lBQ2IsS0FBSyxFQUFFLFlBQVk7SUFDbkIsR0FBRyxFQUFFLFlBQVk7SUFDakIsTUFBTSxFQUFFLGVBQWU7SUFDdkIsZUFBZSxFQUFFLGVBQWU7SUFDaEMsWUFBWSxFQUFFLGVBQWU7SUFDN0IsRUFBRSxFQUFFLFdBQVc7SUFDZixNQUFNLEVBQUUsV0FBVztJQUNuQixHQUFHLEVBQUUsWUFBWTtJQUNqQixJQUFJLEVBQUUsYUFBYTtJQUNuQixJQUFJLEVBQUUsaUJBQWlCO0lBQ3ZCLE1BQU0sRUFBRSxZQUFZO0lBQ3BCLEVBQUUsRUFBRSxXQUFXO0lBQ2YsSUFBSSxFQUFFLGlCQUFpQjtJQUN2QixJQUFJLEVBQUUsYUFBYTtJQUNuQixVQUFVLEVBQUUsV0FBVztJQUN2QixFQUFFLEVBQUUsV0FBVztJQUNmLElBQUksRUFBRSxhQUFhO0lBQ25CLElBQUksRUFBRSxhQUFhO0lBQ25CLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsSUFBSSxFQUFFLGFBQWE7SUFDbkIsYUFBYSxFQUFFLGFBQWE7SUFDNUIsR0FBRyxFQUFFLGVBQWU7SUFDcEIsRUFBRSxFQUFFLGVBQWU7SUFDbkIsTUFBTSxFQUFFLGVBQWU7SUFDdkIsRUFBRSxFQUFFLGFBQWE7SUFDakIsSUFBSSxFQUFFLGFBQWE7SUFDbkIsSUFBSSxFQUFFLGFBQWE7SUFDbkIsSUFBSSxFQUFFLFlBQVk7SUFDbEIsSUFBSSxFQUFFLGFBQWE7SUFDbkIsRUFBRSxFQUFFLFdBQVc7SUFDZixVQUFVLEVBQUUsV0FBVztJQUN2QixHQUFHLEVBQUUsVUFBVTtJQUNmLElBQUksRUFBRSxhQUFhO0lBQ25CLEdBQUcsRUFBRSxhQUFhO0NBQ25CLENBQUE7QUFFRCxTQUFnQixpQkFBaUIsQ0FBQyxTQUFpQjs7SUFDakQsU0FBUyxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUNuQyxhQUFPLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxtQ0FBSSxVQUFVLFNBQVMsRUFBRSxDQUFBO0FBQzlELENBQUM7QUFIRCw4Q0FHQztBQUVELFNBQWdCLGlCQUFpQixDQUFDLEtBQWE7SUFDN0MsS0FBSyxHQUFHLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUMzQixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUE7SUFDdkUsSUFBSSxTQUFpQixDQUFBO0lBQ3JCLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtRQUNqQixTQUFTLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ3RCO1NBQU07UUFDTCxTQUFTLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0tBQ3JEO0lBQ0QsT0FBTyxTQUFTLENBQUE7QUFDbEIsQ0FBQztBQVZELDhDQVVDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2NvcGVzQnlGZW5jZU5hbWU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgdW5kZWZpbmVkIH0gPSB7XHJcbiAgYmFzaDogXCJzb3VyY2Uuc2hlbGxcIixcclxuICBzaDogXCJzb3VyY2Uuc2hlbGxcIixcclxuICBwb3dlcnNoZWxsOiBcInNvdXJjZS5wb3dlcnNoZWxsXCIsXHJcbiAgcHMxOiBcInNvdXJjZS5wb3dlcnNoZWxsXCIsXHJcbiAgYzogXCJzb3VyY2UuY1wiLFxyXG4gIFwiYysrXCI6IFwic291cmNlLmNwcFwiLFxyXG4gIGNwcDogXCJzb3VyY2UuY3BwXCIsXHJcbiAgY29mZmVlOiBcInNvdXJjZS5jb2ZmZWVcIixcclxuICBcImNvZmZlZS1zY3JpcHRcIjogXCJzb3VyY2UuY29mZmVlXCIsXHJcbiAgY29mZmVlc2NyaXB0OiBcInNvdXJjZS5jb2ZmZWVcIixcclxuICBjczogXCJzb3VyY2UuY3NcIixcclxuICBjc2hhcnA6IFwic291cmNlLmNzXCIsXHJcbiAgY3NzOiBcInNvdXJjZS5jc3NcIixcclxuICBzYXNzOiBcInNvdXJjZS5zYXNzXCIsXHJcbiAgc2NzczogXCJzb3VyY2UuY3NzLnNjc3NcIixcclxuICBlcmxhbmc6IFwic291cmNlLmVybFwiLFxyXG4gIGdvOiBcInNvdXJjZS5nb1wiLFxyXG4gIGh0bWw6IFwidGV4dC5odG1sLmJhc2ljXCIsXHJcbiAgamF2YTogXCJzb3VyY2UuamF2YVwiLFxyXG4gIGphdmFzY3JpcHQ6IFwic291cmNlLmpzXCIsXHJcbiAganM6IFwic291cmNlLmpzXCIsXHJcbiAganNvbjogXCJzb3VyY2UuanNvblwiLFxyXG4gIGxlc3M6IFwic291cmNlLmxlc3NcIixcclxuICBtdXN0YWNoZTogXCJ0ZXh0Lmh0bWwubXVzdGFjaGVcIixcclxuICBvYmpjOiBcInNvdXJjZS5vYmpjXCIsXHJcbiAgXCJvYmplY3RpdmUtY1wiOiBcInNvdXJjZS5vYmpjXCIsXHJcbiAgcGhwOiBcInRleHQuaHRtbC5waHBcIixcclxuICBweTogXCJzb3VyY2UucHl0aG9uXCIsXHJcbiAgcHl0aG9uOiBcInNvdXJjZS5weXRob25cIixcclxuICByYjogXCJzb3VyY2UucnVieVwiLFxyXG4gIHJ1Ynk6IFwic291cmNlLnJ1YnlcIixcclxuICBydXN0OiBcInNvdXJjZS5ydXN0XCIsXHJcbiAgdGV4dDogXCJ0ZXh0LnBsYWluXCIsXHJcbiAgdG9tbDogXCJzb3VyY2UudG9tbFwiLFxyXG4gIHRzOiBcInNvdXJjZS50c1wiLFxyXG4gIHR5cGVzY3JpcHQ6IFwic291cmNlLnRzXCIsXHJcbiAgeG1sOiBcInRleHQueG1sXCIsXHJcbiAgeWFtbDogXCJzb3VyY2UueWFtbFwiLFxyXG4gIHltbDogXCJzb3VyY2UueWFtbFwiLFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2NvcGVGb3JGZW5jZU5hbWUoZmVuY2VOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGZlbmNlTmFtZSA9IGZlbmNlTmFtZS50b0xvd2VyQ2FzZSgpXHJcbiAgcmV0dXJuIHNjb3Blc0J5RmVuY2VOYW1lW2ZlbmNlTmFtZV0gPz8gYHNvdXJjZS4ke2ZlbmNlTmFtZX1gXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmZW5jZU5hbWVGb3JTY29wZShzY29wZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICBzY29wZSA9IHNjb3BlLnRvTG93ZXJDYXNlKClcclxuICBjb25zdCByZXN1bHQgPSBPYmplY3Qua2V5cyhzY29wZXNCeUZlbmNlTmFtZSkuZmlsdGVyKChzKSA9PiBzID09IHNjb3BlKVxyXG4gIGxldCByZXN1bHRPdXQ6IHN0cmluZ1xyXG4gIGlmIChyZXN1bHQubGVuZ3RoKSB7XHJcbiAgICByZXN1bHRPdXQgPSByZXN1bHRbMF1cclxuICB9IGVsc2Uge1xyXG4gICAgcmVzdWx0T3V0ID0gc2NvcGUuc3Vic3RyKHNjb3BlLmxhc3RJbmRleE9mKFwiLlwiKSArIDEpXHJcbiAgfVxyXG4gIHJldHVybiByZXN1bHRPdXRcclxufVxyXG4iXX0=