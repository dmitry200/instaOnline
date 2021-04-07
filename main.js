const puppeteer = require('puppeteer');
const Chance = require("chance");


(async () => {
  const browser = await puppeteer.launch({ 
        headless: false,
        // devtools: true,
        args: [
            '--proxy-server=127.0.0.1:8888',
            '--proxy-bypass-list=<-loopback>'
          ],
    });
//   console.log(browser.pages.toString());  
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/accounts/emailsignup/');

  var generator = new Chance(Math.random);
  var name = generator.name().split(" ");
  var LastName = name[1];
  var FirstName = name[0];
  name = name.join("") + generator.string({length: 7, pool: "abcdertygh1234567890"});

  
  var email = name +"@outlook.com"
  var pass = generator.string({length: 10, pool: "qwertyuiopASDfghjklzxcvbnmQWERTYHJUI1234567890"});


  await page.waitForTimeout(3000);
  // await page.waitForNavigation();

   await page.type('input[name="emailOrPhone"]', email, {
        delay: 2,
      });
    await page.type('input[name="fullName"]', LastName, {
        delay: 2,
    });
    await page.type('input[name="username"]', name, {
        delay: 2,
    });
    await page.type('input[name="password"]', pass, {
        delay: 10,
    });

    (await page.$('button[type="submit"]')).tap();
    await page.waitForTimeout(3000);

    // await Promise.all([
    //   (await page.$('button[type="submit"]')).tap(),
    //   // page.waitForNavigation(),
    //   page.waitForTimeout(3000)
    // ]);

    var sMonth = generator.integer({ min: 2, max: 11 }).toString();
    var sYear = generator.integer({ min: 21, max: 30 }).toString();
    
    await page.evaluate( () => {
      document.querySelector('select[title="Месяц:"] > option:nth-child(10)').selected = true;
      element = document.querySelector('select[title="Месяц:"]');
      var event = new Event('change', { bubbles: true });
      event.simulated=true;
      element.dispatchEvent(event);
    });

    await page.evaluate( () => {
        // document.querySelector('select[title="Год:"] > option:nth-child('+generator.integer({ min: 21, max: 30 }).toString()+')').selected = true;
        document.querySelector('select[title="Год:"] > option:nth-child(23)').selected = true;
        element = document.querySelector('select[title="Год:"]');
        var event = new Event('change', { bubbles: true });
        event.simulated=true;
        element.dispatchEvent(event);
    });

    await page.waitForTimeout(3000);
    (await page.$$('button'))[1].tap();
    // console.log(button);

})();