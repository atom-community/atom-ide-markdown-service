"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenizeEditor = exports.highlightCodeFragments = void 0;
const atom_1 = require("atom");
const utils_1 = require("./utils");
async function highlightCodeFragments(domFragment, grammar) {
    const defaultLanguage = utils_1.fenceNameForScope(grammar || "text.plain");
    const fontFamily = atom.config.get("editor.fontFamily");
    const fontSize = atom.config.get("editor.fontSize");
    if (fontFamily !== null) {
        domFragment.querySelectorAll("code").forEach((codeElement) => {
            codeElement.style.fontFamily = fontFamily;
            codeElement.style.fontSize = `${fontSize}`;
        });
    }
    const elements = [].slice.call(domFragment.querySelectorAll("pre"));
    const promises = elements.map(async (preElement) => {
        var _a, _b, _c, _d, _e, _f;
        const codeBlock = (_a = preElement.firstElementChild) !== null && _a !== void 0 ? _a : preElement;
        const fenceName = (_c = (_b = codeBlock
            .getAttribute("class")) === null || _b === void 0 ? void 0 : _b.replace(/^lang-/, "").replace(/^language-/, "")) !== null && _c !== void 0 ? _c : defaultLanguage;
        preElement.classList.add("editor-colors", `lang-${fenceName}`);
        const editor = new atom_1.TextEditor({
            readonly: true,
            keyboardInputEnabled: false,
            softWrapped: true,
            softWrapAtPreferredLineLength: true,
            preferredLineLength: 80,
        });
        const editorElement = editor.getElement();
        editorElement.setUpdatedSynchronously(true);
        preElement.innerHTML = "";
        (_d = preElement.parentNode) === null || _d === void 0 ? void 0 : _d.insertBefore(editorElement, preElement);
        editor.setText((_f = (_e = codeBlock.textContent) === null || _e === void 0 ? void 0 : _e.replace(/\r?\n$/, "")) !== null && _f !== void 0 ? _f : "");
        atom.grammars.assignLanguageMode(editor.getBuffer(), utils_1.scopeForFenceName(fenceName));
        editor.setVisible(true);
        return await tokenizeEditor(editorElement, preElement);
    });
    return await Promise.all(promises);
}
exports.highlightCodeFragments = highlightCodeFragments;
function tokenizeEditor(editorElement, preElement) {
    const p = new Promise((resolve, reject) => {
        const done = () => {
            editorElement.querySelectorAll(".line:not(.dummy)").forEach((line) => {
                var _a, _b;
                const line2 = document.createElement("div");
                line2.className = "line";
                line2.innerHTML = (_b = (_a = line.firstElementChild) === null || _a === void 0 ? void 0 : _a.innerHTML) !== null && _b !== void 0 ? _b : "";
                preElement.appendChild(line2);
            });
            editorElement.remove();
            resolve();
        };
        const editor = editorElement.getModel();
        const languageMode = editor.getBuffer().getLanguageMode();
        if ("fullyTokenized" in languageMode || "tree" in languageMode) {
            editor.component
                .getNextUpdatePromise()
                .then(() => {
                done();
            })
                .catch(reject);
        }
        else {
            editor.onDidTokenize(() => {
                done();
            });
        }
    });
    return p;
}
exports.tokenizeEditor = tokenizeEditor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3JlbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSwrQkFBb0Q7QUFDcEQsbUNBQThEO0FBVXZELEtBQUssVUFBVSxzQkFBc0IsQ0FBQyxXQUF3QixFQUFFLE9BQWU7SUFDcEYsTUFBTSxlQUFlLEdBQUcseUJBQWlCLENBQUMsT0FBTyxJQUFJLFlBQVksQ0FBQyxDQUFBO0lBRWxFLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUE7SUFDdkQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUNuRCxJQUFJLFVBQVUsS0FBSyxJQUFJLEVBQUU7UUFDdkIsV0FBVyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQzNELFdBQVcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQTtZQUN6QyxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxHQUFHLFFBQVEsRUFBRSxDQUFBO1FBQzVDLENBQUMsQ0FBQyxDQUFBO0tBQ0g7SUFFRCxNQUFNLFFBQVEsR0FBcUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFDckYsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUU7O1FBQ2pELE1BQU0sU0FBUyxHQUFHLE1BQUEsVUFBVSxDQUFDLGlCQUFpQixtQ0FBSSxVQUFVLENBQUE7UUFDNUQsTUFBTSxTQUFTLEdBQ2IsTUFBQSxNQUFBLFNBQVM7YUFDTixZQUFZLENBQUMsT0FBTyxDQUFDLDBDQUNwQixPQUFP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QUMsQ0FBQTtJQUNGLE9BQU8sQ0FBQyxDQUFBO0FBQ1YsQ0FBQztBQTVCRCx3Q0E0QkMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGVzZSBmdW5jdGlvbnMgYXJlIGRlcHJlY2F0ZWQgYmVjYXVzZSB0aGV5IGVkaXQgdGhlIG1hcmtkb3duIG91dHB1dC4gV2UgaW5zdGVhZCB1c2UgYSBgaGlnaGxpZ2h0YCBob29rIHRvIHRva2VuaXplIGFuZCBoaWdobGlnaHQgdGhlIGNvZGVcblxuaW1wb3J0IHsgVGV4dEVkaXRvciwgVGV4dEVkaXRvckVsZW1lbnQgfSBmcm9tIFwiYXRvbVwiXG5pbXBvcnQgeyBzY29wZUZvckZlbmNlTmFtZSwgZmVuY2VOYW1lRm9yU2NvcGUgfSBmcm9tIFwiLi91dGlsc1wiXG5cbi8qKlxuICogaXRlcmF0ZXMgb3ZlciB0aGUgY29udGVudCBvZiB0aGUgSFRNTCBmcmFnbWVudCBhbmQgcmVwbGFjZXMgYW55IGNvZGUgc2VjdGlvblxuICogZm91bmQgd2l0aCBhbiBBdG9tIFRleHRFZGl0b3IgZWxlbWVudCB0aGF0IGlzIHVzZWQgZm9yIHN5bnRheCBoaWdobGlnaHRpbmcgdGhlIGNvZGVcbiAqXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZG9tRnJhZ21lbnQgdGhlIEhUTUwgZnJhZ21lbnQgdG8gYmUgYW5hbHl6ZWQgYW5kXG4gKiBAcGFyYW0gIHtTdHJpbmd9IGdyYW1tYXIgdGhlIGRlZmF1bHQgZ3JhbW1hciB0byBiZSB1c2VkIGlmIHRoZSBjb2RlIHNlY3Rpb24gZG9lc24ndCBoYXZlIGEgc3BlY2lmaWMgZ3JhbW1hciBzZXRcbiAqIEByZXR1cm4gIGEgcHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIHdoZW4gdGhlIGZyYWdtZW50IGlzIHJlYWR5XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBoaWdobGlnaHRDb2RlRnJhZ21lbnRzKGRvbUZyYWdtZW50OiBIVE1MRWxlbWVudCwgZ3JhbW1hcjogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgY29uc3QgZGVmYXVsdExhbmd1YWdlID0gZmVuY2VOYW1lRm9yU2NvcGUoZ3JhbW1hciB8fCBcInRleHQucGxhaW5cIilcbiAgLy8gc2V0IGVkaXRvciBmb250IGZhbWlseVxuICBjb25zdCBmb250RmFtaWx5ID0gYXRvbS5jb25maWcuZ2V0KFwiZWRpdG9yLmZvbnRGYW1pbHlcIilcbiAgY29uc3QgZm9udFNpemUgPSBhdG9tLmNvbmZpZy5nZXQoXCJlZGl0b3IuZm9udFNpemVcIilcbiAgaWYgKGZvbnRGYW1pbHkgIT09IG51bGwpIHtcbiAgICBkb21GcmFnbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiY29kZVwiKS5mb3JFYWNoKChjb2RlRWxlbWVudCkgPT4ge1xuICAgICAgY29kZUVsZW1lbnQuc3R5bGUuZm9udEZhbWlseSA9IGZvbnRGYW1pbHlcbiAgICAgIGNvZGVFbGVtZW50LnN0eWxlLmZvbnRTaXplID0gYCR7Zm9udFNpemV9YFxuICAgIH0pXG4gIH1cblxuICBjb25zdCBlbGVtZW50czogSFRNTFByZUVsZW1lbnRbXSA9IFtdLnNsaWNlLmNhbGwoZG9tRnJhZ21lbnQucXVlcnlTZWxlY3RvckFsbChcInByZVwiKSlcbiAgY29uc3QgcHJvbWlzZXMgPSBlbGVtZW50cy5tYXAoYXN5bmMgKHByZUVsZW1lbnQpID0+IHtcbiAgICBjb25zdCBjb2RlQmxvY2sgPSBwcmVFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkID8/IHByZUVsZW1lbnRcbiAgICBjb25zdCBmZW5jZU5hbWUgPVxuICAgICAgY29kZUJsb2NrXG4gICAgICAgIC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKVxuICAgICAgICA/LnJlcGxhY2UoL15sYW5nLS8sIFwiXCIpXG4gICAgICAgIC5yZXBsYWNlKC9ebGFuZ3VhZ2UtLywgXCJcIikgPz8gZGVmYXVsdExhbmd1YWdlXG4gICAgcHJlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZWRpdG9yLWNvbG9yc1wiLCBgbGFuZy0ke2ZlbmNlTmFtZX1gKVxuXG4gICAgY29uc3QgZWRpdG9yID0gbmV3IFRleHRFZGl0b3Ioe1xuICAgICAgcmVhZG9ubHk6IHRydWUsXG4gICAgICBrZXlib2FyZElucHV0RW5hYmxlZDogZmFsc2UsXG4gICAgICBzb2Z0V3JhcHBlZDogdHJ1ZSxcbiAgICAgIHNvZnRXcmFwQXRQcmVmZXJyZWRMaW5lTGVuZ3RoOiB0cnVlLFxuICAgICAgcHJlZmVycmVkTGluZUxlbmd0aDogODAsXG4gICAgfSlcbiAgICBjb25zdCBlZGl0b3JFbGVtZW50ID0gZWRpdG9yLmdldEVsZW1lbnQoKVxuICAgIGVkaXRvckVsZW1lbnQuc2V0VXBkYXRlZFN5bmNocm9ub3VzbHkodHJ1ZSlcblxuICAgIHByZUVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIlxuICAgIHByZUVsZW1lbnQucGFyZW50Tm9kZT8uaW5zZXJ0QmVmb3JlKGVkaXRvckVsZW1lbnQsIHByZUVsZW1lbnQpXG5cbiAgICBlZGl0b3Iuc2V0VGV4dChjb2RlQmxvY2sudGV4dENvbnRlbnQ/LnJlcGxhY2UoL1xccj9cXG4kLywgXCJcIikgPz8gXCJcIilcblxuICAgIGF0b20uZ3JhbW1hcnMuYXNzaWduTGFuZ3VhZ2VNb2RlKGVkaXRvci5nZXRCdWZmZXIoKSwgc2NvcGVGb3JGZW5jZU5hbWUoZmVuY2VOYW1lKSlcbiAgICBlZGl0b3Iuc2V0VmlzaWJsZSh0cnVlKVxuICAgIHJldHVybiBhd2FpdCB0b2tlbml6ZUVkaXRvcihlZGl0b3JFbGVtZW50LCBwcmVFbGVtZW50KVxuICB9KVxuXG4gIHJldHVybiBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcylcbn1cblxuLyoqXG4gKiB0YWtlcyBhbiBBdG9tIFRleHRFZGl0b3IgZWxlbWVudCwgdG9rZW5pemUgdGhlIGNvbnRlbnQgYW5kIG1vdmUgdGhlIHJlc3VsdGluZyBsaW5lcyB0byB0aGUgcHJlIGVsZW1lbnQgZ2l2ZW5cbiAqIEBwYXJhbSAgZWRpdG9yRWxlbWVudCB0aGUgSFRNTCBlbGVtZW50IGNvbnRhaW5pbmcgdGhlIEF0b20gVGV4dEVkaXRvclxuICogQHBhcmFtICBwcmVFbGVtZW50ICAgIHRoZSBIVE1MIHByZSBlbGVtZW50IHRoYXQgc2hvdWxkIGhvc3QgdGhlIHJlc3VsdGluZyBsaW5lc1xuICogQHJldHVybiBhIHByb21pc2UgdGhhdCBpcyB0cmlnZ2VyZWQgYXMgc29vbiBhcyB0b2tlbml6YXRpb24gYW5kIG1vdmluZyB0aGUgY29udGVudCBpcyBkb25lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b2tlbml6ZUVkaXRvcihlZGl0b3JFbGVtZW50OiBUZXh0RWRpdG9yRWxlbWVudCwgcHJlRWxlbWVudDogSFRNTFByZUVsZW1lbnQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgcCA9IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBkb25lID0gKCkgPT4ge1xuICAgICAgZWRpdG9yRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmxpbmU6bm90KC5kdW1teSlcIikuZm9yRWFjaCgobGluZSkgPT4ge1xuICAgICAgICBjb25zdCBsaW5lMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgbGluZTIuY2xhc3NOYW1lID0gXCJsaW5lXCJcbiAgICAgICAgbGluZTIuaW5uZXJIVE1MID0gbGluZS5maXJzdEVsZW1lbnRDaGlsZD8uaW5uZXJIVE1MID8/IFwiXCJcbiAgICAgICAgcHJlRWxlbWVudC5hcHBlbmRDaGlsZChsaW5lMilcbiAgICAgIH0pXG4gICAgICBlZGl0b3JFbGVtZW50LnJlbW92ZSgpXG4gICAgICByZXNvbHZlKClcbiAgICB9XG4gICAgY29uc3QgZWRpdG9yID0gZWRpdG9yRWxlbWVudC5nZXRNb2RlbCgpXG4gICAgY29uc3QgbGFuZ3VhZ2VNb2RlID0gZWRpdG9yLmdldEJ1ZmZlcigpLmdldExhbmd1YWdlTW9kZSgpXG4gICAgaWYgKFwiZnVsbHlUb2tlbml6ZWRcIiBpbiBsYW5ndWFnZU1vZGUgfHwgXCJ0cmVlXCIgaW4gbGFuZ3VhZ2VNb2RlKSB7XG4gICAgICBlZGl0b3IuY29tcG9uZW50XG4gICAgICAgIC5nZXROZXh0VXBkYXRlUHJvbWlzZSgpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBkb25lKClcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKHJlamVjdClcbiAgICB9IGVsc2Uge1xuICAgICAgZWRpdG9yLm9uRGlkVG9rZW5pemUoKCkgPT4ge1xuICAgICAgICBkb25lKClcbiAgICAgIH0pXG4gICAgfVxuICB9KVxuICByZXR1cm4gcFxufVxuIl19