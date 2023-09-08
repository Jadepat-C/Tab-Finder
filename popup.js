// Listen for when the popup is loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get a reference to the search box
    const searchBox = document.getElementById("search_box");
    searchBox.focus();

    // Listen for changes in the search box
    searchBox.addEventListener("input", function() {
        // Get the user's input from the search box
        const query = searchBox.value.toLowerCase();

        // Use chrome.windows.getCurrent to get information about the current window
        chrome.windows.getCurrent({ populate: true }, function(currentWindow) {
            // Filter tabs based on the query within the current window
            const matchingTabs = currentWindow.tabs.filter(tab => {
                return tab.title.toLowerCase().includes(query) ||
                       tab.url.toLowerCase().includes(query);
            });

            // Clear the previous output
            output.innerHTML = "";

            // Display the matchingTabs array in the popup
            matchingTabs.forEach(tab => {
                const hrElement = document.createElement("hr");
                hrElement.classList.add("full-size");
                output.appendChild(hrElement);

                const iconElement = document.createElement("img");
                iconElement.src = tab.favIconUrl;
                iconElement.classList.add("tab-icon");

                const titleElement = document.createElement("div");
                titleElement.textContent = tab.title;
                

                const tabElement = document.createElement("div");
                tabElement.appendChild(iconElement);
                tabElement.appendChild(titleElement);
                tabElement.classList.add("btn", "text-align-left", "full-size", "d-flex", "flex-row");
                
                output.appendChild(tabElement);

                tabElement.addEventListener("click", function(){
                    // Use chrome.tabs.update to switch to the corresponding tab
                    chrome.tabs.update(tab.id, { active: true });
                });

                // Add a mouseover event listener to highlight on hover
                tabElement.addEventListener("mouseover", function() {
                    tabElement.classList.add("bg-secondary", "text-white", "cursor-pointer");
                });

                // Add a mouseout event listener to remove the highlight
                tabElement.addEventListener("mouseout", function() {
                    tabElement.classList.remove("bg-secondary", "text-white", "cursor-pointer");
                });
            });
        });
    });
});
