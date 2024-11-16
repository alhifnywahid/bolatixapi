const express = require("express");
const { getClubs, getKlassmen, getSchedule } = require("./src/data");
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
     <ul>
      <li>
        <a href="https://github.com/alhifnywahid/bolatixapi.git" style="
        display: inline-block;
        font-size: 13px;
        padding: 5px 10px; 
        background-color: #007bff;
        color: white;
        text-align: center;
        text-decoration: none;
        border-radius: 5px;
        box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
        transition: background-color 0.3s, box-shadow 0.3s;
      " 
      onmouseover="this.style.backgroundColor='#0056b3'; this.style.boxShadow='0 4px 8px rgba(0, 86, 179, 0.3)'" 
      onmouseout="this.style.backgroundColor='#007bff'; this.style.boxShadow='0 4px 8px rgba(0, 123, 255, 0.2)'">
        Source Code
    </a>
      </li>
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
