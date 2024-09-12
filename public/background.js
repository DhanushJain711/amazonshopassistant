/*global chrome*/

console.log("background working");

const amazonProductPagePattern = "https://www.amazon.com/";
const amazonDPPattern = "/dp/";
const className = "a-keyvalue prodDetTable";

function grabAmazonProductInfo(className) {
    console.log("executed script");

    const productTitleContainer = document.body.querySelector('h1#title');
    const productTitle = productTitleContainer.textContent;
    const cleanedProductTitle = productTitle.replace(/\s\s+/g, " ");

    let productInfo = cleanedProductTitle;
    
    const productDescContainer = document.body.querySelector('ul.a-unordered-list.a-vertical.a-spacing-mini');
    if (productDescContainer) {
        const productDesc = productDescContainer.textContent;
        const cleanedProductDesc = productDesc.replace(/\s\s+/g, " ");
        productInfo += cleanedProductDesc
    }
    
    console.log("cleaned product info", productInfo);

    // const productInfoContainer = document.body.querySelector('table.a-keyvalue.prodDetTable');
    // if (productInfoContainer) {
    //     const productInfo = productInfoContainer.textContent;
    //     const cleanedProductInfo = productInfo.replace(/\s\s+/g, " ");
    //     console.log(cleanedProductInfo);
    // }
    return productInfo;
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === "complete" && tab.active) {
        if (
            tab.url?.includes(amazonProductPagePattern) &&
            tab.url?.includes(amazonDPPattern)
        ) {
            chrome.scripting
            .executeScript({
                target: { tabId: tabId },
                func: grabAmazonProductInfo,
                args: [className],
            })
            .then((queryResult) => {
                chrome.storage.local.set({ productInfo: queryResult[0].result });
            });
        }
    }
});