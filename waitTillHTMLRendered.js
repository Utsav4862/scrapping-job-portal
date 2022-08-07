async function waitTillHTMLRendered(page, timeout = 30000) {
    const checkDurationMsecs = 1000;
    const maxChecks = timeout / checkDurationMsecs;
    let lastHTMLSize = 0;
    let checkCounts = 1;
    let countStableSizeIterations = 0;
    const minStableSizeIterations = 3;
  
    while (checkCounts++ <= maxChecks) {
      let html = await page.content();
      let currentHTMLSize = html.length;
  
      let bodyHTMLSize = await page.evaluate(
        () => document.body.innerHTML.length
      );
  
      if (lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize)
        countStableSizeIterations++;
      else countStableSizeIterations = 0; 
  
      if (countStableSizeIterations >= minStableSizeIterations) {
        break;
      }
  
      lastHTMLSize = currentHTMLSize;
      await page.waitForTimeout(checkDurationMsecs);
    }
};

module.exports = {waitTillHTMLRendered}
  