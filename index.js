const express = require("express");
const { getClubs, getKlassmen, getSchedule } = require("./data");
const app = express();
const port = 3000;

const routes = {
	club: {
		name: "Teams",
		url: "/api/club",
	},
	klassmen: {
		name: "Klassmen",
		url: "/api/klassmen",
	},
	schedule: {
		name: "Schedule",
		url: "/api/schedule",
	},
};

app.get("/", (req, res) => {
	res.send(`
    <div>
      <h1>List Routes</h1>
        <ul>
          ${Object.keys(routes)
					.map((key) => `<li><a href="${routes[key].url}">${routes[key].name}</a></li>`)
					.join("")}
      </ul>
    </div>
  `);
});

app.get("/api/club", async (req, res) => {
	const clubs = await getClubs();
	res.json(clubs);
});

app.get("/api/klassmen", async (req, res) => {
	const klassmen = await getKlassmen();
	res.json(klassmen);
});

app.get("/api/schedule", async (req, res) => {
	const schedule = await getSchedule();
	res.json(schedule);
});

if (process.env.NODE_ENV !== "production") {
	app.listen(port, () => {
		console.log(`Server berjalan di http://localhost:${port}`);
	});
}

module.exports = app;
