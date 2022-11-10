// JavaScript Document

      const query = document.querySelector("#query");
      const main = document.querySelector("main");

      // Find all text nodes in the main element.
      const treeWalker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
      const allTextNodes = [];
      let currentNode = treeWalker.nextNode();
      while (currentNode) {
        allTextNodes.push(currentNode);
        currentNode = treeWalker.nextNode();
      }

      query.addEventListener("input", () => {
        CSS.highlights.clear();

        const str = query.value.trim().toLowerCase();
        if (!str) {
          return;
        }

        const ranges = allTextNodes
          .map((el) => {
            return { el, text: el.textContent.toLowerCase() };
          })
          .filter(({ text }) => text.includes(str))
          .map(({ text, el }) => {
            // Find all instances of str in el.textContent
            const indices = [];
            let startPos = 0;
            while (startPos < text.length) {
              const index = text.indexOf(str, startPos);
              if (index === -1) break;
              indices.push(index);
              startPos = index + str.length;
            }

            return indices.map((index) => {
              const range = new Range();
              range.setStart(el, index);
              range.setEnd(el, index + str.length);
              return range;
            });
          });

        const highlight = new Highlight(...ranges.flat());
        CSS.highlights.set("search-result-highlight", highlight);
      });
    