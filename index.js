const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
        slowMo:100,
        args: ['--start-maximized'],
        userDataDir: './tmp'
    });
    const page = await browser.newPage();
    await page.goto('https://www.mindspace.me/');

    // Finding Links in given website URL
    const links = await page.evaluate(()=>{
        const anchors = document.querySelectorAll('body a');
        const herfs = Array.from(anchors).map(a=>a.href);
        return herfs;
    });

    // Removing Duplicate Links in link array
    for (let i = 0; i < links.length; i++) {
        let index = links.indexOf (links [i]); 
        if (index !== i) { 
            links.splice (i, 1);
            i--;
        };
    }
  
    // loop through the array of URLs and taking screenshorts
    for (let i = 0; i < links.length; i++) {
        const link = links[i];
        await page.goto(link);
        await page.screenshot({
            path: i+'.png',
            fullPage: true
        });
    };
    
    console.log(links);
    await browser.close();
})();