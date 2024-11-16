const axios = require("axios");
const cheerio = require("cheerio");

async function getDetailSchedule(url) {
	try {
		const response = await axios.get(url);
		const html = response.data;
		const $ = cheerio.load(html);

		return {
			team1: {
				nama: $("div.item-row:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1)").text().trim(),
				logo: $("div.item-row:nth-child(1) > div:nth-child(1) > div:nth-child(1) > img:nth-child(2)").attr("src"),
				totalMenang: $("div.box--match-column:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > span:nth-child(2)").text().trim(),
				menangKandang: $("div.item-row:nth-child(3) > div:nth-child(1) > div:nth-child(1) > span:nth-child(2)").text().trim(),
				menangTandang: $("div.item-row:nth-child(4) > div:nth-child(1) > div:nth-child(1) > span:nth-child(2)").text().trim(),
				gol: $("div.item-row:nth-child(5) > div:nth-child(1) > div:nth-child(1) > span:nth-child(2)").text().trim(),
			},
			team2: {
				nama: $("div.item-row:nth-child(1) > div:nth-child(3) > div:nth-child(1) > span:nth-child(1)").text().trim(),
				logo: $("div.item-row:nth-child(1) > div:nth-child(3) > div:nth-child(1) > img:nth-child(2)").attr("src"),
				totalMenang: $("div.box--match-column:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > span:nth-child(2)").text().trim(),
				menangKandang: $("div.item-row:nth-child(3) > div:nth-child(3) > div:nth-child(1) > span:nth-child(2)").text().trim(),
				menangTandang: $("div.item-row:nth-child(4) > div:nth-child(3) > div:nth-child(1) > span:nth-child(2)").text().trim(),
				gol: $("div.item-row:nth-child(5) > div:nth-child(3) > div:nth-child(1) > span:nth-child(2)").text().trim(),
			},
			draw: $("div.item-row-item--separate:nth-child(1) > div:nth-child(1) > span:nth-child(2)").text().trim(),
			date: $(".team-date").text().trim(),
			time: $(".team-centerblock").text().trim(),
		};
	} catch (err) {
		return err;
	}
}

module.exports = {
	getDetailSchedule,
};
