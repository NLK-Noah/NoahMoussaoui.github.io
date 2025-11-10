async function loadGitHubStats() {
  const totalEl = document.getElementById("total");
  const lineCtx = document.getElementById("chartLine")?.getContext("2d");
  const pieCtx = document.getElementById("chartPie")?.getContext("2d");
  const radarCtx = document.getElementById("chartRadar")?.getContext("2d");
  const heatmapContainer = document.getElementById("chartHeatmap");

  try {
    console.log("📡 Récupération des stats GitHub...");
    const response = await fetch("https://git-stats-m8dx.onrender.com/github/stats");
    const data = await response.json();
    console.log("✅ Données reçues :", data);

    const total = data.contributionsCollection.contributionCalendar.totalContributions;
    totalEl.textContent = `Total : ${total} contributions`;

    // Toutes les journées
    const days = data.contributionsCollection.contributionCalendar.weeks.flatMap(w => w.contributionDays);

    // === 📆 Groupement mensuel ===
    const monthlyStats = {};
    days.forEach(d => {
      const month = d.date.slice(0, 7);
      monthlyStats[month] = (monthlyStats[month] || 0) + d.contributionCount;
    });

    const sortedMonths = Object.keys(monthlyStats).sort();
    const monthlyValues = sortedMonths.map(m => monthlyStats[m]);

    // === 📈 LINE CHART ===
    if (lineCtx) {
      new Chart(lineCtx, {
        type: "line",
        data: {
          labels: sortedMonths,
          datasets: [{
            label: "Contributions mensuelles",
            data: monthlyValues,
            borderColor: "#00bfff",
            backgroundColor: "rgba(0,191,255,0.2)",
            borderWidth: 2,
            tension: 0.3,
            fill: true
          }]
        },
        options: {
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { color: "white" }, grid: { color: "#222" } },
            y: { beginAtZero: true, ticks: { color: "white" }, grid: { color: "#222" } }
          }
        }
      });
    }

    // === 🥧 PIE CHART ===
    if (pieCtx) {
      const lastMonths = sortedMonths.slice(-6);
      new Chart(pieCtx, {
        type: "doughnut",
        data: {
          labels: lastMonths,
          datasets: [{
            data: lastMonths.map(m => monthlyStats[m]),
            backgroundColor: ["#00bfff", "#1e90ff", "#4682b4", "#5f9ea0", "#87cefa", "#b0e0e6"],
          }]
        },
        options: {
          plugins: {
            legend: { labels: { color: "white" } },
            title: { display: true, text: "Répartition sur 6 derniers mois", color: "white" }
          }
        }
      });
    }

    // === 🌐 RADAR CHART ===
    if (radarCtx) {
      const recentDays = days.slice(-7);
      new Chart(radarCtx, {
        type: "radar",
        data: {
          labels: recentDays.map(d => d.date),
          datasets: [{
            label: "Activité des 7 derniers jours",
            data: recentDays.map(d => d.contributionCount),
            backgroundColor: "rgba(0,191,255,0.3)",
            borderColor: "#00bfff",
            borderWidth: 2
          }]
        },
        options: {
          scales: {
            r: {
              grid: { color: "#333" },
              pointLabels: { color: "white" },
              ticks: { color: "white" }
            }
          }
        }
      });
    }

    // === 🔥 HEATMAP ===
    if (heatmapContainer) {
      const heatmapData = {};
      days.forEach(d => {
        heatmapData[Math.floor(new Date(d.date).getTime() / 1000)] = d.contributionCount;
      });

      // ✅ CalHeatmap doit être initialisé correctement :
      const cal = new CalHeatmap();
      cal.paint({
        data: {
          source: Object.entries(heatmapData).map(([date, value]) => ({
            date: new Date(date * 1000),
            value
          })),
          x: "date",
          y: "value"
        },
        date: { start: new Date("2024-11-01"), locale: "fr" },
        range: 6,
        scale: {
          color: {
            range: ["#001f3f", "#00bfff", "#7fdbff"],
            interpolate: "cubehelix"
          }
        },
        domain: { type: "month", label: { text: "MMM", textAlign: "start" } },
        subDomain: { type: "day", radius: 3, width: 15, height: 15 },
      }, [heatmapContainer]);
    }

  } catch (error) {
    console.error("❌ Erreur :", error);
    totalEl.textContent = "Erreur lors du chargement des statistiques GitHub.";
  }
}

document.addEventListener("DOMContentLoaded", loadGitHubStats);
