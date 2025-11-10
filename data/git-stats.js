async function loadGitHubStats() {
  const totalEl = document.getElementById("totalContrib");
  const ctx = document.getElementById("gitChart").getContext("2d");
  const container = document.getElementById("gitStatsContainer");

  try {
    const response = await fetch("https://git-stats-m8dx.onrender.com/github/stats");
    const data = await response.json();

    // === Extraction des données GitHub ===
    const total = data.contributionsCollection.contributionCalendar.totalContributions;
    const weeks = data.contributionsCollection.contributionCalendar.weeks;

    // Toutes les journées depuis le début
    const days = weeks.flatMap(week => week.contributionDays);

    // Regrouper par mois pour le graphique
    const monthlyStats = {};
    days.forEach(d => {
      const month = d.date.slice(0, 7); // ex: "2025-11"
      monthlyStats[month] = (monthlyStats[month] || 0) + d.contributionCount;
    });

    // Transformer en tableau trié chronologiquement
    const sortedMonths = Object.keys(monthlyStats).sort();
    const monthlyValues = sortedMonths.map(m => monthlyStats[m]);

    // === Met à jour le total dans la page ===
    totalEl.textContent = total.toLocaleString("fr-FR");

    // === Graphique Chart.js ===
    new Chart(ctx, {
      type: "line",
      data: {
        labels: sortedMonths,
        datasets: [{
          label: "Contributions par mois",
          data: monthlyValues,
          borderColor: "#00bfff",
          backgroundColor: "rgba(0, 191, 255, 0.25)",
          borderWidth: 3,
          tension: 0.3,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
        }]
      },
      options: {
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: "Évolution totale des contributions GitHub (depuis nov. 2024)",
            color: "#00bfff",
            font: { size: 18 }
          }
        },
        scales: {
          x: {
            ticks: { color: "white" },
            grid: { color: "rgba(255,255,255,0.1)" }
          },
          y: {
            beginAtZero: true,
            ticks: { color: "white" },
            grid: { color: "rgba(255,255,255,0.1)" }
          }
        }
      }
    });
  } catch (error) {
    console.error(error);
    container.innerHTML = "<p>❌ Erreur lors du chargement des statistiques GitHub.</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadGitHubStats);
