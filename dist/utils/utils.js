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
    fenceName = fenceName.toLowerCase();
    let result = `source.${fenceName}`;
    if (scopesByFenceName[fenceName] != null) {
        result = scopesByFenceName[fenceName];
    }
    return result;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBTSxpQkFBaUIsR0FBRztJQUN4QixJQUFJLEVBQUUsY0FBYztJQUNwQixFQUFFLEVBQUUsY0FBYztJQUNsQixVQUFVLEVBQUUsbUJBQW1CO0lBQy9CLEdBQUcsRUFBRSxtQkFBbUI7SUFDeEIsQ0FBQyxFQUFFLFVBQVU7SUFDYixLQUFLLEVBQUUsWUFBWTtJQUNuQixHQUFHLEVBQUUsWUFBWTtJQUNqQixNQUFNLEVBQUUsZUFBZTtJQUN2QixlQUFlLEVBQUUsZUFBZTtJQUNoQyxZQUFZLEVBQUUsZUFBZTtJQUM3QixFQUFFLEVBQUUsV0FBVztJQUNmLE1BQU0sRUFBRSxXQUFXO0lBQ25CLEdBQUcsRUFBRSxZQUFZO0lBQ2pCLElBQUksRUFBRSxhQUFhO0lBQ25CLElBQUksRUFBRSxpQkFBaUI7SUFDdkIsTUFBTSxFQUFFLFlBQVk7SUFDcEIsRUFBRSxFQUFFLFdBQVc7SUFDZixJQUFJLEVBQUUsaUJBQWlCO0lBQ3ZCLElBQUksRUFBRSxhQUFhO0lBQ25CLFVBQVUsRUFBRSxXQUFXO0lBQ3ZCLEVBQUUsRUFBRSxXQUFXO0lBQ2YsSUFBSSxFQUFFLGFBQWE7SUFDbkIsSUFBSSxFQUFFLGFBQWE7SUFDbkIsUUFBUSxFQUFFLG9CQUFvQjtJQUM5QixJQUFJLEVBQUUsYUFBYTtJQUNuQixhQUFhLEVBQUUsYUFBYTtJQUM1QixHQUFHLEVBQUUsZUFBZTtJQUNwQixFQUFFLEVBQUUsZUFBZTtJQUNuQixNQUFNLEVBQUUsZUFBZTtJQUN2QixFQUFFLEVBQUUsYUFBYTtJQUNqQixJQUFJLEVBQUUsYUFBYTtJQUNuQixJQUFJLEVBQUUsYUFBYTtJQUNuQixJQUFJLEVBQUUsWUFBWTtJQUNsQixJQUFJLEVBQUUsYUFBYTtJQUNuQixFQUFFLEVBQUUsV0FBVztJQUNmLFVBQVUsRUFBRSxXQUFXO0lBQ3ZCLEdBQUcsRUFBRSxVQUFVO0lBQ2YsSUFBSSxFQUFFLGFBQWE7SUFDbkIsR0FBRyxFQUFFLGFBQWE7Q0FDbkIsQ0FBQTtBQUVELFNBQWdCLGlCQUFpQixDQUFDLFNBQWlCO0lBQ2pELFNBQVMsR0FBRyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDbkMsSUFBSSxNQUFNLEdBQUcsVUFBVSxTQUFTLEVBQUUsQ0FBQTtJQUNsQyxJQUFJLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksRUFBRTtRQUN4QyxNQUFNLEdBQUcsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUE7S0FDdEM7SUFDRCxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUM7QUFQRCw4Q0FPQztBQUVELFNBQWdCLGlCQUFpQixDQUFDLEtBQWE7SUFDN0MsS0FBSyxHQUFHLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUMzQixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUE7SUFDdkUsSUFBSSxTQUFpQixDQUFBO0lBQ3JCLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtRQUNqQixTQUFTLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ3RCO1NBQU07UUFDTCxTQUFTLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0tBQ3JEO0lBQ0QsT0FBTyxTQUFTLENBQUE7QUFDbEIsQ0FBQztBQVZELDhDQVVDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2NvcGVzQnlGZW5jZU5hbWUgPSB7XG4gIGJhc2g6IFwic291cmNlLnNoZWxsXCIsXG4gIHNoOiBcInNvdXJjZS5zaGVsbFwiLFxuICBwb3dlcnNoZWxsOiBcInNvdXJjZS5wb3dlcnNoZWxsXCIsXG4gIHBzMTogXCJzb3VyY2UucG93ZXJzaGVsbFwiLFxuICBjOiBcInNvdXJjZS5jXCIsXG4gIFwiYysrXCI6IFwic291cmNlLmNwcFwiLFxuICBjcHA6IFwic291cmNlLmNwcFwiLFxuICBjb2ZmZWU6IFwic291cmNlLmNvZmZlZVwiLFxuICBcImNvZmZlZS1zY3JpcHRcIjogXCJzb3VyY2UuY29mZmVlXCIsXG4gIGNvZmZlZXNjcmlwdDogXCJzb3VyY2UuY29mZmVlXCIsXG4gIGNzOiBcInNvdXJjZS5jc1wiLFxuICBjc2hhcnA6IFwic291cmNlLmNzXCIsXG4gIGNzczogXCJzb3VyY2UuY3NzXCIsXG4gIHNhc3M6IFwic291cmNlLnNhc3NcIixcbiAgc2NzczogXCJzb3VyY2UuY3NzLnNjc3NcIixcbiAgZXJsYW5nOiBcInNvdXJjZS5lcmxcIixcbiAgZ286IFwic291cmNlLmdvXCIsXG4gIGh0bWw6IFwidGV4dC5odG1sLmJhc2ljXCIsXG4gIGphdmE6IFwic291cmNlLmphdmFcIixcbiAgamF2YXNjcmlwdDogXCJzb3VyY2UuanNcIixcbiAganM6IFwic291cmNlLmpzXCIsXG4gIGpzb246IFwic291cmNlLmpzb25cIixcbiAgbGVzczogXCJzb3VyY2UubGVzc1wiLFxuICBtdXN0YWNoZTogXCJ0ZXh0Lmh0bWwubXVzdGFjaGVcIixcbiAgb2JqYzogXCJzb3VyY2Uub2JqY1wiLFxuICBcIm9iamVjdGl2ZS1jXCI6IFwic291cmNlLm9iamNcIixcbiAgcGhwOiBcInRleHQuaHRtbC5waHBcIixcbiAgcHk6IFwic291cmNlLnB5dGhvblwiLFxuICBweXRob246IFwic291cmNlLnB5dGhvblwiLFxuICByYjogXCJzb3VyY2UucnVieVwiLFxuICBydWJ5OiBcInNvdXJjZS5ydWJ5XCIsXG4gIHJ1c3Q6IFwic291cmNlLnJ1c3RcIixcbiAgdGV4dDogXCJ0ZXh0LnBsYWluXCIsXG4gIHRvbWw6IFwic291cmNlLnRvbWxcIixcbiAgdHM6IFwic291cmNlLnRzXCIsXG4gIHR5cGVzY3JpcHQ6IFwic291cmNlLnRzXCIsXG4gIHhtbDogXCJ0ZXh0LnhtbFwiLFxuICB5YW1sOiBcInNvdXJjZS55YW1sXCIsXG4gIHltbDogXCJzb3VyY2UueWFtbFwiLFxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2NvcGVGb3JGZW5jZU5hbWUoZmVuY2VOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICBmZW5jZU5hbWUgPSBmZW5jZU5hbWUudG9Mb3dlckNhc2UoKVxuICBsZXQgcmVzdWx0ID0gYHNvdXJjZS4ke2ZlbmNlTmFtZX1gXG4gIGlmIChzY29wZXNCeUZlbmNlTmFtZVtmZW5jZU5hbWVdICE9IG51bGwpIHtcbiAgICByZXN1bHQgPSBzY29wZXNCeUZlbmNlTmFtZVtmZW5jZU5hbWVdXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmVuY2VOYW1lRm9yU2NvcGUoc2NvcGU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHNjb3BlID0gc2NvcGUudG9Mb3dlckNhc2UoKVxuICBjb25zdCByZXN1bHQgPSBPYmplY3Qua2V5cyhzY29wZXNCeUZlbmNlTmFtZSkuZmlsdGVyKChzKSA9PiBzID09IHNjb3BlKVxuICBsZXQgcmVzdWx0T3V0OiBzdHJpbmdcbiAgaWYgKHJlc3VsdC5sZW5ndGgpIHtcbiAgICByZXN1bHRPdXQgPSByZXN1bHRbMF1cbiAgfSBlbHNlIHtcbiAgICByZXN1bHRPdXQgPSBzY29wZS5zdWJzdHIoc2NvcGUubGFzdEluZGV4T2YoXCIuXCIpICsgMSlcbiAgfVxuICByZXR1cm4gcmVzdWx0T3V0XG59XG4iXX0=