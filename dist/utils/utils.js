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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBTSxpQkFBaUIsR0FBMEM7SUFDL0QsSUFBSSxFQUFFLGNBQWM7SUFDcEIsRUFBRSxFQUFFLGNBQWM7SUFDbEIsVUFBVSxFQUFFLG1CQUFtQjtJQUMvQixHQUFHLEVBQUUsbUJBQW1CO0lBQ3hCLENBQUMsRUFBRSxVQUFVO0lBQ2IsS0FBSyxFQUFFLFlBQVk7SUFDbkIsR0FBRyxFQUFFLFlBQVk7SUFDakIsTUFBTSxFQUFFLGVBQWU7SUFDdkIsZUFBZSxFQUFFLGVBQWU7SUFDaEMsWUFBWSxFQUFFLGVBQWU7SUFDN0IsRUFBRSxFQUFFLFdBQVc7SUFDZixNQUFNLEVBQUUsV0FBVztJQUNuQixHQUFHLEVBQUUsWUFBWTtJQUNqQixJQUFJLEVBQUUsYUFBYTtJQUNuQixJQUFJLEVBQUUsaUJBQWlCO0lBQ3ZCLE1BQU0sRUFBRSxZQUFZO0lBQ3BCLEVBQUUsRUFBRSxXQUFXO0lBQ2YsSUFBSSxFQUFFLGlCQUFpQjtJQUN2QixJQUFJLEVBQUUsYUFBYTtJQUNuQixVQUFVLEVBQUUsV0FBVztJQUN2QixFQUFFLEVBQUUsV0FBVztJQUNmLElBQUksRUFBRSxhQUFhO0lBQ25CLElBQUksRUFBRSxhQUFhO0lBQ25CLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsSUFBSSxFQUFFLGFBQWE7SUFDbkIsYUFBYSxFQUFFLGFBQWE7SUFDNUIsR0FBRyxFQUFFLGVBQWU7SUFDcEIsRUFBRSxFQUFFLGVBQWU7SUFDbkIsTUFBTSxFQUFFLGVBQWU7SUFDdkIsRUFBRSxFQUFFLGFBQWE7SUFDakIsSUFBSSxFQUFFLGFBQWE7SUFDbkIsSUFBSSxFQUFFLGFBQWE7SUFDbkIsSUFBSSxFQUFFLFlBQVk7SUFDbEIsSUFBSSxFQUFFLGFBQWE7SUFDbkIsRUFBRSxFQUFFLFdBQVc7SUFDZixVQUFVLEVBQUUsV0FBVztJQUN2QixHQUFHLEVBQUUsVUFBVTtJQUNmLElBQUksRUFBRSxhQUFhO0lBQ25CLEdBQUcsRUFBRSxhQUFhO0NBQ25CLENBQUE7QUFFRCxTQUFnQixpQkFBaUIsQ0FBQyxTQUFpQjs7SUFDakQsU0FBUyxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUNuQyxPQUFPLE1BQUEsaUJBQWlCLENBQUMsU0FBUyxDQUFDLG1DQUFJLFVBQVUsU0FBUyxFQUFFLENBQUE7QUFDOUQsQ0FBQztBQUhELDhDQUdDO0FBRUQsU0FBZ0IsaUJBQWlCLENBQUMsS0FBYTtJQUM3QyxLQUFLLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQzNCLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQTtJQUN2RSxJQUFJLFNBQWlCLENBQUE7SUFDckIsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO1FBQ2pCLFNBQVMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDdEI7U0FBTTtRQUNMLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7S0FDckQ7SUFDRCxPQUFPLFNBQVMsQ0FBQTtBQUNsQixDQUFDO0FBVkQsOENBVUMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzY29wZXNCeUZlbmNlTmFtZTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCB1bmRlZmluZWQgfSA9IHtcbiAgYmFzaDogXCJzb3VyY2Uuc2hlbGxcIixcbiAgc2g6IFwic291cmNlLnNoZWxsXCIsXG4gIHBvd2Vyc2hlbGw6IFwic291cmNlLnBvd2Vyc2hlbGxcIixcbiAgcHMxOiBcInNvdXJjZS5wb3dlcnNoZWxsXCIsXG4gIGM6IFwic291cmNlLmNcIixcbiAgXCJjKytcIjogXCJzb3VyY2UuY3BwXCIsXG4gIGNwcDogXCJzb3VyY2UuY3BwXCIsXG4gIGNvZmZlZTogXCJzb3VyY2UuY29mZmVlXCIsXG4gIFwiY29mZmVlLXNjcmlwdFwiOiBcInNvdXJjZS5jb2ZmZWVcIixcbiAgY29mZmVlc2NyaXB0OiBcInNvdXJjZS5jb2ZmZWVcIixcbiAgY3M6IFwic291cmNlLmNzXCIsXG4gIGNzaGFycDogXCJzb3VyY2UuY3NcIixcbiAgY3NzOiBcInNvdXJjZS5jc3NcIixcbiAgc2FzczogXCJzb3VyY2Uuc2Fzc1wiLFxuICBzY3NzOiBcInNvdXJjZS5jc3Muc2Nzc1wiLFxuICBlcmxhbmc6IFwic291cmNlLmVybFwiLFxuICBnbzogXCJzb3VyY2UuZ29cIixcbiAgaHRtbDogXCJ0ZXh0Lmh0bWwuYmFzaWNcIixcbiAgamF2YTogXCJzb3VyY2UuamF2YVwiLFxuICBqYXZhc2NyaXB0OiBcInNvdXJjZS5qc1wiLFxuICBqczogXCJzb3VyY2UuanNcIixcbiAganNvbjogXCJzb3VyY2UuanNvblwiLFxuICBsZXNzOiBcInNvdXJjZS5sZXNzXCIsXG4gIG11c3RhY2hlOiBcInRleHQuaHRtbC5tdXN0YWNoZVwiLFxuICBvYmpjOiBcInNvdXJjZS5vYmpjXCIsXG4gIFwib2JqZWN0aXZlLWNcIjogXCJzb3VyY2Uub2JqY1wiLFxuICBwaHA6IFwidGV4dC5odG1sLnBocFwiLFxuICBweTogXCJzb3VyY2UucHl0aG9uXCIsXG4gIHB5dGhvbjogXCJzb3VyY2UucHl0aG9uXCIsXG4gIHJiOiBcInNvdXJjZS5ydWJ5XCIsXG4gIHJ1Ynk6IFwic291cmNlLnJ1YnlcIixcbiAgcnVzdDogXCJzb3VyY2UucnVzdFwiLFxuICB0ZXh0OiBcInRleHQucGxhaW5cIixcbiAgdG9tbDogXCJzb3VyY2UudG9tbFwiLFxuICB0czogXCJzb3VyY2UudHNcIixcbiAgdHlwZXNjcmlwdDogXCJzb3VyY2UudHNcIixcbiAgeG1sOiBcInRleHQueG1sXCIsXG4gIHlhbWw6IFwic291cmNlLnlhbWxcIixcbiAgeW1sOiBcInNvdXJjZS55YW1sXCIsXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzY29wZUZvckZlbmNlTmFtZShmZW5jZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGZlbmNlTmFtZSA9IGZlbmNlTmFtZS50b0xvd2VyQ2FzZSgpXG4gIHJldHVybiBzY29wZXNCeUZlbmNlTmFtZVtmZW5jZU5hbWVdID8/IGBzb3VyY2UuJHtmZW5jZU5hbWV9YFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmVuY2VOYW1lRm9yU2NvcGUoc2NvcGU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHNjb3BlID0gc2NvcGUudG9Mb3dlckNhc2UoKVxuICBjb25zdCByZXN1bHQgPSBPYmplY3Qua2V5cyhzY29wZXNCeUZlbmNlTmFtZSkuZmlsdGVyKChzKSA9PiBzID09IHNjb3BlKVxuICBsZXQgcmVzdWx0T3V0OiBzdHJpbmdcbiAgaWYgKHJlc3VsdC5sZW5ndGgpIHtcbiAgICByZXN1bHRPdXQgPSByZXN1bHRbMF1cbiAgfSBlbHNlIHtcbiAgICByZXN1bHRPdXQgPSBzY29wZS5zdWJzdHIoc2NvcGUubGFzdEluZGV4T2YoXCIuXCIpICsgMSlcbiAgfVxuICByZXR1cm4gcmVzdWx0T3V0XG59XG4iXX0=