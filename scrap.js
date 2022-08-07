const puppeteer = require("puppeteer");

const xlsx = require("xlsx");
const {getPageData} = require('./getPageData')
const {waitTillHTMLRendered} = require('./waitTillHTMLRendered')


async function scrap(job, loc){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto("https://www.naukri.com/", {
    waitUntil: "networkidle2",
  });

  await page.waitForXPath(
    '(//*[@id="root"]/div[2]/div[3]/div/div/div[1]/div/div/div/input)'
  );
  const [searchBox] = await page.$x(
    '(//*[@id="root"]/div[2]/div[3]/div/div/div[1]/div/div/div/input)'
  );

  await searchBox.click();

  await page.keyboard.type(job);
  await page.click("#expereinceDD");
  await page.waitForXPath(
    '(//*[@id="root"]/div[2]/div[3]/div/div/div[3]/div/div/div)'
  );

  const [exp] = await page.$x(
    '(//*[@id="sa-dd-scrollexpereinceDD"]/div[1]/ul/li[2]/div)'
  );
  await exp.click();

  await page.waitForXPath(
    '(//*[@id="root"]/div[2]/div[3]/div/div/div[5]/div/div/div/input)'
  );
  const [location] = await page.$x(
    '(//*[@id="root"]/div[2]/div[3]/div/div/div[5]/div/div/div/input)'
  );

  await location.click();

    
  await page.keyboard.type(loc);

  await page.click(".qsbSubmit");

  await waitTillHTMLRendered(page);


  let details = await page.$$(".jobTuple");

  let ar = await getPageData(details)

  await console.log(ar); 

  let wb = xlsx.utils.book_new();
  let data = xlsx.utils.json_to_sheet(ar);
  xlsx.utils.book_append_sheet(wb, data);
  xlsx.writeFile(wb, job+".xlsx");
};

module.exports = {scrap};



