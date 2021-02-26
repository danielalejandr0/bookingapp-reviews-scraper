 
const pup = require('puppeteer'); 


let scrape = async (url) => {

    try {
        const browser = await pup.launch({ 
            headless: true,
            
        });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 });
         const result = await page.evaluate(async () => {
            let listLength = (await document.querySelectorAll('#reviews-section')[0].childElementCount - 1); 
            let reviewAuthors = [];
             for (let i = 1; i < listLength; i++) {
                let reviewAuthor = document.querySelectorAll('#reviews-section')[0].children[i].children[0].children[0].children[0].children[1].firstChild.innerText;
                let reviewText = document.querySelectorAll('#reviews-section')[0].children[i].children[0].children[0].children[1].innerText;
                let review = new Object();
                review.author = reviewAuthor;
                review.text = reviewText;
                reviewAuthors.push(review);
            }
            return reviewAuthors; 
        })
        return result;
    } 
    catch (error) {
        console.log(error)
    }; 
}; 

module.exports = {
    scrape
}
 
