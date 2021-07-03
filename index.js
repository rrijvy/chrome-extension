(function () {
  let saveButton = document.getElementById("btn");
  let colorBlock = document.querySelectorAll(".color_block");
  let selectedColor;

  colorBlock.forEach((block) => {
    block.addEventListener("click", () => {
      colorBlock.forEach((block) => {
        let isClassExist = block.classList.contains("color_block_shadow");
        if (isClassExist) {
          block.classList.remove("color_block_shadow");
        }
      });

      block.classList.add("color_block_shadow");
      selectedColor = block.style.backgroundColor;
    });
  });

  // When the button is clicked, inject setPageBackgroundColor into current page
  saveButton.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (selectedColor) {
      chrome.storage.sync.set({ color: selectedColor });
    }

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageBackgroundColor,
    });
  });

  function setPageBackgroundColor() {
    // all document related code goes here ...


    chrome.storage.sync.get("color", ({ color }) => {
      document.body.style.backgroundColor = color;
    });
  }
})();
