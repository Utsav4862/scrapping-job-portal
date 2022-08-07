

async function getPageData(details) {
    let det = [];
    for (let data of details) {
      const title = await data.$eval(".title", (title) => title.textContent);
      const comp = await data.$eval(".subTitle", (comp) => comp.textContent);
      const exp = await data.$eval(".experience", (exp) => exp.textContent);
  
      const salary = await data.$eval(".salary", (salary) => salary.textContent);
  
      const loc = await data.$eval(".location", (loc) => loc.textContent);
  
      const des = await data.$eval(".job-description", (des) => des.textContent);
  
      const posted = await data.$eval(".type ", (posted) => posted.textContent);
  
      det.push( {
        title: title,
        company: comp,
        experience: exp,
        salary: salary,
        location: loc,
        description: des,
        posted: posted,
      });
    }
  
    return det;
  }

  module.exports = {getPageData}
  