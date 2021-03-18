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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3JlbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSwrQkFBb0Q7QUFDcEQsbUNBQThEO0FBVXZELEtBQUssVUFBVSxzQkFBc0IsQ0FBQyxXQUF3QixFQUFFLE9BQWU7SUFDcEYsTUFBTSxlQUFlLEdBQUcseUJBQWlCLENBQUMsT0FBTyxJQUFJLFlBQVksQ0FBQyxDQUFBO0lBRWxFLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUE7SUFDdkQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUNuRCxJQUFJLFVBQVUsS0FBSyxJQUFJLEVBQUU7UUFDdkIsV0FBVyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQzNELFdBQVcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQTtZQUN6QyxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxHQUFHLFFBQVEsRUFBRSxDQUFBO1FBQzVDLENBQUMsQ0FBQyxDQUFBO0tBQ0g7SUFFRCxNQUFNLFFBQVEsR0FBcUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFDckYsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUU7O1FBQ2pELE1BQU0sU0FBUyxTQUFHLFVBQVUsQ0FBQyxpQkFBaUIsbUNBQUksVUFBVSxDQUFBO1FBQzVELE1BQU0sU0FBUyxlQUNiLFNBQVM7YUFDTixZQUFZLENBQUMsT0FBTyxDQUFDLDBDQUNwQixPQUFPLENBQUMsUUFBUSxFQUFF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Iiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlc2UgZnVuY3Rpb25zIGFyZSBkZXByZWNhdGVkIGJlY2F1c2UgdGhleSBlZGl0IHRoZSBtYXJrZG93biBvdXRwdXQuIFdlIGluc3RlYWQgdXNlIGEgYGhpZ2hsaWdodGAgaG9vayB0byB0b2tlbml6ZSBhbmQgaGlnaGxpZ2h0IHRoZSBjb2RlXHJcblxyXG5pbXBvcnQgeyBUZXh0RWRpdG9yLCBUZXh0RWRpdG9yRWxlbWVudCB9IGZyb20gXCJhdG9tXCJcclxuaW1wb3J0IHsgc2NvcGVGb3JGZW5jZU5hbWUsIGZlbmNlTmFtZUZvclNjb3BlIH0gZnJvbSBcIi4vdXRpbHNcIlxyXG5cclxuLyoqXHJcbiAqIGl0ZXJhdGVzIG92ZXIgdGhlIGNvbnRlbnQgb2YgdGhlIEhUTUwgZnJhZ21lbnQgYW5kIHJlcGxhY2VzIGFueSBjb2RlIHNlY3Rpb25cclxuICogZm91bmQgd2l0aCBhbiBBdG9tIFRleHRFZGl0b3IgZWxlbWVudCB0aGF0IGlzIHVzZWQgZm9yIHN5bnRheCBoaWdobGlnaHRpbmcgdGhlIGNvZGVcclxuICpcclxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGRvbUZyYWdtZW50IHRoZSBIVE1MIGZyYWdtZW50IHRvIGJlIGFuYWx5emVkIGFuZFxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9IGdyYW1tYXIgdGhlIGRlZmF1bHQgZ3JhbW1hciB0byBiZSB1c2VkIGlmIHRoZSBjb2RlIHNlY3Rpb24gZG9lc24ndCBoYXZlIGEgc3BlY2lmaWMgZ3JhbW1hciBzZXRcclxuICogQHJldHVybiAgYSBwcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgd2hlbiB0aGUgZnJhZ21lbnQgaXMgcmVhZHlcclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBoaWdobGlnaHRDb2RlRnJhZ21lbnRzKGRvbUZyYWdtZW50OiBIVE1MRWxlbWVudCwgZ3JhbW1hcjogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcclxuICBjb25zdCBkZWZhdWx0TGFuZ3VhZ2UgPSBmZW5jZU5hbWVGb3JTY29wZShncmFtbWFyIHx8IFwidGV4dC5wbGFpblwiKVxyXG4gIC8vIHNldCBlZGl0b3IgZm9udCBmYW1pbHlcclxuICBjb25zdCBmb250RmFtaWx5ID0gYXRvbS5jb25maWcuZ2V0KFwiZWRpdG9yLmZvbnRGYW1pbHlcIilcclxuICBjb25zdCBmb250U2l6ZSA9IGF0b20uY29uZmlnLmdldChcImVkaXRvci5mb250U2l6ZVwiKVxyXG4gIGlmIChmb250RmFtaWx5ICE9PSBudWxsKSB7XHJcbiAgICBkb21GcmFnbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiY29kZVwiKS5mb3JFYWNoKChjb2RlRWxlbWVudCkgPT4ge1xyXG4gICAgICBjb2RlRWxlbWVudC5zdHlsZS5mb250RmFtaWx5ID0gZm9udEZhbWlseVxyXG4gICAgICBjb2RlRWxlbWVudC5zdHlsZS5mb250U2l6ZSA9IGAke2ZvbnRTaXplfWBcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBjb25zdCBlbGVtZW50czogSFRNTFByZUVsZW1lbnRbXSA9IFtdLnNsaWNlLmNhbGwoZG9tRnJhZ21lbnQucXVlcnlTZWxlY3RvckFsbChcInByZVwiKSlcclxuICBjb25zdCBwcm9taXNlcyA9IGVsZW1lbnRzLm1hcChhc3luYyAocHJlRWxlbWVudCkgPT4ge1xyXG4gICAgY29uc3QgY29kZUJsb2NrID0gcHJlRWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZCA/PyBwcmVFbGVtZW50XHJcbiAgICBjb25zdCBmZW5jZU5hbWUgPVxyXG4gICAgICBjb2RlQmxvY2tcclxuICAgICAgICAuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIilcclxuICAgICAgICA/LnJlcGxhY2UoL15sYW5nLS8sIFwiXCIpXHJcbiAgICAgICAgLnJlcGxhY2UoL15sYW5ndWFnZS0vLCBcIlwiKSA/PyBkZWZhdWx0TGFuZ3VhZ2VcclxuICAgIHByZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImVkaXRvci1jb2xvcnNcIiwgYGxhbmctJHtmZW5jZU5hbWV9YClcclxuXHJcbiAgICBjb25zdCBlZGl0b3IgPSBuZXcgVGV4dEVkaXRvcih7XHJcbiAgICAgIHJlYWRvbmx5OiB0cnVlLFxyXG4gICAgICBrZXlib2FyZElucHV0RW5hYmxlZDogZmFsc2UsXHJcbiAgICAgIHNvZnRXcmFwcGVkOiB0cnVlLFxyXG4gICAgICBzb2Z0V3JhcEF0UHJlZmVycmVkTGluZUxlbmd0aDogdHJ1ZSxcclxuICAgICAgcHJlZmVycmVkTGluZUxlbmd0aDogODAsXHJcbiAgICB9KVxyXG4gICAgY29uc3QgZWRpdG9yRWxlbWVudCA9IGVkaXRvci5nZXRFbGVtZW50KClcclxuICAgIGVkaXRvckVsZW1lbnQuc2V0VXBkYXRlZFN5bmNocm9ub3VzbHkodHJ1ZSlcclxuXHJcbiAgICBwcmVFbGVtZW50LmlubmVySFRNTCA9IFwiXCJcclxuICAgIHByZUVsZW1lbnQucGFyZW50Tm9kZT8uaW5zZXJ0QmVmb3JlKGVkaXRvckVsZW1lbnQsIHByZUVsZW1lbnQpXHJcblxyXG4gICAgZWRpdG9yLnNldFRleHQoY29kZUJsb2NrLnRleHRDb250ZW50Py5yZXBsYWNlKC9cXHI/XFxuJC8sIFwiXCIpID8/IFwiXCIpXHJcblxyXG4gICAgYXRvbS5ncmFtbWFycy5hc3NpZ25MYW5ndWFnZU1vZGUoZWRpdG9yLmdldEJ1ZmZlcigpLCBzY29wZUZvckZlbmNlTmFtZShmZW5jZU5hbWUpKVxyXG4gICAgZWRpdG9yLnNldFZpc2libGUodHJ1ZSlcclxuICAgIHJldHVybiBhd2FpdCB0b2tlbml6ZUVkaXRvcihlZGl0b3JFbGVtZW50LCBwcmVFbGVtZW50KVxyXG4gIH0pXHJcblxyXG4gIHJldHVybiBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcylcclxufVxyXG5cclxuLyoqXHJcbiAqIHRha2VzIGFuIEF0b20gVGV4dEVkaXRvciBlbGVtZW50LCB0b2tlbml6ZSB0aGUgY29udGVudCBhbmQgbW92ZSB0aGUgcmVzdWx0aW5nIGxpbmVzIHRvIHRoZSBwcmUgZWxlbWVudCBnaXZlblxyXG4gKiBAcGFyYW0gIGVkaXRvckVsZW1lbnQgdGhlIEhUTUwgZWxlbWVudCBjb250YWluaW5nIHRoZSBBdG9tIFRleHRFZGl0b3JcclxuICogQHBhcmFtICBwcmVFbGVtZW50ICAgIHRoZSBIVE1MIHByZSBlbGVtZW50IHRoYXQgc2hvdWxkIGhvc3QgdGhlIHJlc3VsdGluZyBsaW5lc1xyXG4gKiBAcmV0dXJuIGEgcHJvbWlzZSB0aGF0IGlzIHRyaWdnZXJlZCBhcyBzb29uIGFzIHRva2VuaXphdGlvbiBhbmQgbW92aW5nIHRoZSBjb250ZW50IGlzIGRvbmVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0b2tlbml6ZUVkaXRvcihlZGl0b3JFbGVtZW50OiBUZXh0RWRpdG9yRWxlbWVudCwgcHJlRWxlbWVudDogSFRNTFByZUVsZW1lbnQpOiBQcm9taXNlPHZvaWQ+IHtcclxuICBjb25zdCBwID0gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgY29uc3QgZG9uZSA9ICgpID0+IHtcclxuICAgICAgZWRpdG9yRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmxpbmU6bm90KC5kdW1teSlcIikuZm9yRWFjaCgobGluZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxpbmUyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgICAgIGxpbmUyLmNsYXNzTmFtZSA9IFwibGluZVwiXHJcbiAgICAgICAgbGluZTIuaW5uZXJIVE1MID0gbGluZS5maXJzdEVsZW1lbnRDaGlsZD8uaW5uZXJIVE1MID8/IFwiXCJcclxuICAgICAgICBwcmVFbGVtZW50LmFwcGVuZENoaWxkKGxpbmUyKVxyXG4gICAgICB9KVxyXG4gICAgICBlZGl0b3JFbGVtZW50LnJlbW92ZSgpXHJcbiAgICAgIHJlc29sdmUoKVxyXG4gICAgfVxyXG4gICAgY29uc3QgZWRpdG9yID0gZWRpdG9yRWxlbWVudC5nZXRNb2RlbCgpXHJcbiAgICBjb25zdCBsYW5ndWFnZU1vZGUgPSBlZGl0b3IuZ2V0QnVmZmVyKCkuZ2V0TGFuZ3VhZ2VNb2RlKClcclxuICAgIGlmIChcImZ1bGx5VG9rZW5pemVkXCIgaW4gbGFuZ3VhZ2VNb2RlIHx8IFwidHJlZVwiIGluIGxhbmd1YWdlTW9kZSkge1xyXG4gICAgICBlZGl0b3IuY29tcG9uZW50XHJcbiAgICAgICAgLmdldE5leHRVcGRhdGVQcm9taXNlKClcclxuICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICBkb25lKClcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChyZWplY3QpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlZGl0b3Iub25EaWRUb2tlbml6ZSgoKSA9PiB7XHJcbiAgICAgICAgZG9uZSgpXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfSlcclxuICByZXR1cm4gcFxyXG59XHJcbiJdfQ==