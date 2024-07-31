const input = document.getElementById("inputTerm")
const saveBtn = document.getElementById("saveBtn")
const warning = document.getElementById("warning")
const ul = document.getElementById("ulEl")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")

let savedLinks = []

if (leadsFromLocalStorage) {
	savedLinks = leadsFromLocalStorage
	myLinks(savedLinks)
}


saveBtn.addEventListener("click", () => {
	if (input.value !== "") {
		savedLinks.push(input.value)
    input.value = ""
    localStorage.setItem("savedLinks", JSON.stringify(savedLinks))
		myLinks(savedLinks)
		warning.textContent = ""
	} else {
		warning.textContent = "Please enter a link"
	}
})

function myLinks(links) {
	let linkLists = ""
	for (let i = 0; i < links.length; i++) {
		linkLists += `
            <li>
                <a target='_blank' href='${links[i]}'>
                    ${links[i]}
                </a>
            </li>
        `
	}
	ul.innerHTML = linkLists
}

//tab button 
const tabs = [{url: "https://www.linkedin.com/in/per-harald-borgen/"}]

tabBtn.addEventListener("click", function () {
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		console.log(tabs)
		// since only one tab should be active and in the current window at once
		// the return variable should only have one entry
		let activeTab = tabs[0]
		let activeTabId = activeTab.id // or do whatever you need
	})

	savedLinks.push(tabs[0].url)
	localStorage.setItem("savedLinks", JSON.stringify(savedLinks))
	myLinks(savedLinks)
})

// delete button
deleteBtn.addEventListener("dblclick",  ()=> {
	localStorage.clear()
	savedLinks = []
	myLinks(savedLinks)
})



