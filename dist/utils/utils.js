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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBTSxpQkFBaUIsR0FBMEM7SUFDL0QsSUFBSSxFQUFFLGNBQWM7SUFDcEIsRUFBRSxFQUFFLGNBQWM7SUFDbEIsVUFBVSxFQUFFLG1CQUFtQjtJQUMvQixHQUFHLEVBQUUsbUJBQW1CO0lBQ3hCLENBQUMsRUFBRSxVQUFVO0lBQ2IsS0FBSyxFQUFFLFlBQVk7SUFDbkIsR0FBRyxFQUFFLFlBQVk7SUFDakIsTUFBTSxFQUFFLGVBQWU7SUFDdkIsZUFBZSxFQUFFLGVBQWU7SUFDaEMsWUFBWSxFQUFFLGVBQWU7SUFDN0IsRUFBRSxFQUFFLFdBQVc7SUFDZixNQUFNLEVBQUUsV0FBVztJQUNuQixHQUFHLEVBQUUsWUFBWTtJQUNqQixJQUFJLEVBQUUsYUFBYTtJQUNuQixJQUFJLEVBQUUsaUJBQWlCO0lBQ3ZCLE1BQU0sRUFBRSxZQUFZO0lBQ3BCLEVBQUUsRUFBRSxXQUFXO0lBQ2YsSUFBSSxFQUFFLGlCQUFpQjtJQUN2QixJQUFJLEVBQUUsYUFBYTtJQUNuQixVQUFVLEVBQUUsV0FBVztJQUN2QixFQUFFLEVBQUUsV0FBVztJQUNmLElBQUksRUFBRSxhQUFhO0lBQ25CLElBQUksRUFBRSxhQUFhO0lBQ25CLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsSUFBSSxFQUFFLGFBQWE7SUFDbkIsYUFBYSxFQUFFLGFBQWE7SUFDNUIsR0FBRyxFQUFFLGVBQWU7SUFDcEIsRUFBRSxFQUFFLGVBQWU7SUFDbkIsTUFBTSxFQUFFLGVBQWU7SUFDdkIsRUFBRSxFQUFFLGFBQWE7SUFDakIsSUFBSSxFQUFFLGFBQWE7SUFDbkIsSUFBSSxFQUFFLGFBQWE7SUFDbkIsSUFBSSxFQUFFLFlBQVk7SUFDbEIsSUFBSSxFQUFFLGFBQWE7SUFDbkIsRUFBRSxFQUFFLFdBQVc7SUFDZixVQUFVLEVBQUUsV0FBVztJQUN2QixHQUFHLEVBQUUsVUFBVTtJQUNmLElBQUksRUFBRSxhQUFhO0lBQ25CLEdBQUcsRUFBRSxhQUFhO0NBQ25CLENBQUE7QUFFRCxTQUFnQixpQkFBaUIsQ0FBQyxTQUFpQjs7SUFDakQsU0FBUyxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUNuQyxhQUFPLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxtQ0FBSSxVQUFVLFNBQVMsRUFBRSxDQUFBO0FBQzlELENBQUM7QUFIRCw4Q0FHQztBQUVELFNBQWdCLGlCQUFpQixDQUFDLEtBQWE7SUFDN0MsS0FBSyxHQUFHLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUMzQixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUE7SUFDdkUsSUFBSSxTQUFpQixDQUFBO0lBQ3JCLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtRQUNqQixTQUFTLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ3RCO1NBQU07UUFDTCxTQUFTLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0tBQ3JEO0lBQ0QsT0FBTyxTQUFTLENBQUE7QUFDbEIsQ0FBQztBQVZELDhDQVVDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2NvcGVzQnlGZW5jZU5hbWU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgdW5kZWZpbmVkIH0gPSB7XG4gIGJhc2g6IFwic291cmNlLnNoZWxsXCIsXG4gIHNoOiBcInNvdXJjZS5zaGVsbFwiLFxuICBwb3dlcnNoZWxsOiBcInNvdXJjZS5wb3dlcnNoZWxsXCIsXG4gIHBzMTogXCJzb3VyY2UucG93ZXJzaGVsbFwiLFxuICBjOiBcInNvdXJjZS5jXCIsXG4gIFwiYysrXCI6IFwic291cmNlLmNwcFwiLFxuICBjcHA6IFwic291cmNlLmNwcFwiLFxuICBjb2ZmZWU6IFwic291cmNlLmNvZmZlZVwiLFxuICBcImNvZmZlZS1zY3JpcHRcIjogXCJzb3VyY2UuY29mZmVlXCIsXG4gIGNvZmZlZXNjcmlwdDogXCJzb3VyY2UuY29mZmVlXCIsXG4gIGNzOiBcInNvdXJjZS5jc1wiLFxuICBjc2hhcnA6IFwic291cmNlLmNzXCIsXG4gIGNzczogXCJzb3VyY2UuY3NzXCIsXG4gIHNhc3M6IFwic291cmNlLnNhc3NcIixcbiAgc2NzczogXCJzb3VyY2UuY3NzLnNjc3NcIixcbiAgZXJsYW5nOiBcInNvdXJjZS5lcmxcIixcbiAgZ286IFwic291cmNlLmdvXCIsXG4gIGh0bWw6IFwidGV4dC5odG1sLmJhc2ljXCIsXG4gIGphdmE6IFwic291cmNlLmphdmFcIixcbiAgamF2YXNjcmlwdDogXCJzb3VyY2UuanNcIixcbiAganM6IFwic291cmNlLmpzXCIsXG4gIGpzb246IFwic291cmNlLmpzb25cIixcbiAgbGVzczogXCJzb3VyY2UubGVzc1wiLFxuICBtdXN0YWNoZTogXCJ0ZXh0Lmh0bWwubXVzdGFjaGVcIixcbiAgb2JqYzogXCJzb3VyY2Uub2JqY1wiLFxuICBcIm9iamVjdGl2ZS1jXCI6IFwic291cmNlLm9iamNcIixcbiAgcGhwOiBcInRleHQuaHRtbC5waHBcIixcbiAgcHk6IFwic291cmNlLnB5dGhvblwiLFxuICBweXRob246IFwic291cmNlLnB5dGhvblwiLFxuICByYjogXCJzb3VyY2UucnVieVwiLFxuICBydWJ5OiBcInNvdXJjZS5ydWJ5XCIsXG4gIHJ1c3Q6IFwic291cmNlLnJ1c3RcIixcbiAgdGV4dDogXCJ0ZXh0LnBsYWluXCIsXG4gIHRvbWw6IFwic291cmNlLnRvbWxcIixcbiAgdHM6IFwic291cmNlLnRzXCIsXG4gIHR5cGVzY3JpcHQ6IFwic291cmNlLnRzXCIsXG4gIHhtbDogXCJ0ZXh0LnhtbFwiLFxuICB5YW1sOiBcInNvdXJjZS55YW1sXCIsXG4gIHltbDogXCJzb3VyY2UueWFtbFwiLFxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2NvcGVGb3JGZW5jZU5hbWUoZmVuY2VOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICBmZW5jZU5hbWUgPSBmZW5jZU5hbWUudG9Mb3dlckNhc2UoKVxuICByZXR1cm4gc2NvcGVzQnlGZW5jZU5hbWVbZmVuY2VOYW1lXSA/PyBgc291cmNlLiR7ZmVuY2VOYW1lfWBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZlbmNlTmFtZUZvclNjb3BlKHNjb3BlOiBzdHJpbmcpOiBzdHJpbmcge1xuICBzY29wZSA9IHNjb3BlLnRvTG93ZXJDYXNlKClcbiAgY29uc3QgcmVzdWx0ID0gT2JqZWN0LmtleXMoc2NvcGVzQnlGZW5jZU5hbWUpLmZpbHRlcigocykgPT4gcyA9PSBzY29wZSlcbiAgbGV0IHJlc3VsdE91dDogc3RyaW5nXG4gIGlmIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgcmVzdWx0T3V0ID0gcmVzdWx0WzBdXG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0T3V0ID0gc2NvcGUuc3Vic3RyKHNjb3BlLmxhc3RJbmRleE9mKFwiLlwiKSArIDEpXG4gIH1cbiAgcmV0dXJuIHJlc3VsdE91dFxufVxuIl19