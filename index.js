const puppeteer = require("puppeteer");
const { MessageEmbed, WebhookClient } = require("discord.js");
const url = "https://eastwestfitness.com/product/hex-dumbbells-kg-per-pair/";
const { webhookId, webhookToken } = require("./config.json");
const webhookClient = new WebhookClient({
  url: `https://discord.com/api/webhooks/${webhookId}/${webhookToken}`,
});

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.select("#pa_hex-dumbbells-kg-per-pair", "8-kg");
  const addButton = await page.$eval(
    "button[type='submit'",
    (el) => el.classList
  );
  if (addButton[4] === "wc-variation-is-unavailable") {
    webhookClient.send({
      content: "8-kg dumbbell out of stock",
      username: "Bot",
    });
  } else {
    const embed = new MessageEmbed()
      .setTitle("East West Fitness")
      .setColor("#0099ff")
      .url(url);
    webhookClient.send({
      content: "8-kg dumbbell available - BUY NOW",
      username: "Bot",
      embeds: [embed],
    });
  }
  await browser.close();
})();
