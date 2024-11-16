const axios = require("axios");
const cheerio = require("cheerio");
const { getDetailSchedule } = require("./function");

async function getClubs() {
	try {
		const response = await axios.get("https://www.transfermarkt.co.id/bri-liga-1-indonesia/startseite/wettbewerb/IN1L");
		const html = response.data;
		const $ = cheerio.load(html);
		const data = [];
		$("table.items tbody tr").each((index, element) => {
			const logo = $(element).find("td:nth-child(1) img").attr("src");
			const namaKlub = $(element).find("td:nth-child(2) a").first().text().trim();
			const squad = $(element).find("td:nth-child(3) a").text().trim();
			const umur = $(element).find("td:nth-child(4)").text().trim();
			const pemainAsing = $(element).find("td:nth-child(5)").text().trim();
			const hargaPasaran = $(element).find("td:nth-child(6)").text().trim();
			const totalHargaPasaran = $(element).find("td:nth-child(7) a").text().trim();

			if (logo && namaKlub && squad && umur && pemainAsing && hargaPasaran && totalHargaPasaran) {
				data.push({
					logo: logo ? logo : null,
					namaKlub,
					squad: parseInt(squad) || 0,
					umur: parseFloat(umur.replace(",", ".")) || 0,
					pemainAsing: parseInt(pemainAsing) || 0,
					hargaPasaran,
					totalHargaPasaran,
				});
			}
		});

		return data;
	} catch (error) {
		return error;
	}
}

async function getKlassmen() {
	try {
		const response = await axios.get("https://www.bola.net/klasemen/indonesia.html");
		const html = response.data;
		const $ = cheerio.load(html);
		const klassmen = [];
		$(".main-table tbody tr").each((index, element) => {
			const posisi = $(element).find(".team-row-pos").text().trim();
			const namaTim = $(element).find(".clubBox-name").text().trim();
			const logo = $(element).find(".clubBox-logo img").attr("src");
			const main = $(element).find("td").eq(0).text().trim();
			const poin = $(element).find("td").eq(1).text().trim();
			const menang = $(element).find("td").eq(2).text().trim();
			const seri = $(element).find("td").eq(3).text().trim();
			const kalah = $(element).find("td").eq(4).text().trim();
			const goal = $(element).find("td").eq(5).text().trim();
			const selisihGoal = $(element).find("td").eq(6).text().trim();
			klassmen.push({
				posisi,
				namaTim,
				logo,
				main,
				poin,
				menang,
				seri,
				kalah,
				goal,
				selisihGoal,
			});
		});

		return klassmen;
	} catch (error) {
		console.error("Error:", error.message);
		return { error: error.message };
	}
}

async function getSchedule() {
	try {
		const response = await axios.get("https://www.bola.net/jadwal-pertandingan/indonesia.html");
		const html = response.data;
		const $ = cheerio.load(html);
		const schedule = [];
		const promises = $(".main-table.main-table--jadwal tbody tr")
			.map(async (i, element) => {
				const url = $(element).find(".table_link").attr("href");
				const datas = await getDetailSchedule(url);
				schedule.push({
					link: url,
					datas,
				});
			})
			.get();
		await Promise.all(promises);
		return schedule;
	} catch (err) {
		return err;
	}
}

module.exports = {
	getClubs,
	getKlassmen,
	getSchedule,
};
