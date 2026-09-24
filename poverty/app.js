const countryData = [
  { code: "NZL", value: 2.17 },
  { code: "SVK", value: 1.31 },
  { code: "CZE", value: 0.97 },
  { code: "RDC+", label: "Restos du Cœur +", value: 0.62, tone: "rdc" },
  { code: "BEL", value: 0.57 },
  { code: "FRA", value: 0.49, tone: "france" },
  { code: "AUS", value: 0.48 },
  { code: "ENG", value: 0.46 },
  { code: "RDC", label: "Restos du Cœur (RDC)", value: 0.42, tone: "rdc" },
  { code: "SWE", value: 0.33 },
  { code: "GER", value: 0.31 },
  { code: "IRL", value: 0.26 },
  { code: "AUT", value: 0.22 },
  { code: "USA", value: 0.19 },
  { code: "ITA", value: 0.16 },
  { code: "CAN", value: 0.11 },
  { code: "DEN", value: 0.10 },
  { code: "NOR", value: 0.06 },
  { code: "FIN", value: 0.06 },
  { code: "ESP", value: 0.06 },
  { code: "SWI", value: 0.04 },
  { code: "KOR", value: 0.02 },
  { code: "JAP", value: 0.00 }
];

const trendData = {
  france: [
    [2009, .188], [2010, .203], [2011, .210], [2012, .241], [2013, .256],
    [2014, .247], [2015, .240], [2016, .278], [2017, .320], [2018, .303],
    [2019, .325], [2020, .322], [2021, .320], [2022, .409], [2023, .462],
    [2024, .457], [2025, .477]
  ],
  england: [
    [2007, .311], [2008, .262], [2009, .206], [2010, .184], [2011, .186],
    [2012, .200], [2013, .213], [2014, .230], [2015, .255], [2016, .277],
    [2017, .290], [2018, .302], [2019, .318], [2020, .342], [2021, .345],
    [2022, .357], [2023, .394], [2024, .443]
  ]
};

const ageData = [
  ["0–9", .10090, .21893, .24069], ["10–18", .10994, .18037, .14609],
  ["19–24", .06929, .09782, .09693], ["25–29", .05724, .06004, .07787],
  ["30–39", .12199, .12727, .15956], ["40–49", .12500, .12373, .13574],
  ["50–59", .13103, .09814, .08106], ["60–69", .12047, .06628, .04427],
  ["70–79", .10090, .02194, .01442], ["80+", .06326, .00553, .00337]
];

const childAgeData = [
  ["0–0", .008782, .017094, .023579], ["1–1", .009017, .023536, .030929],
  ["2–3", .019850, .045182, .053953], ["4–6", .031432, .067425, .071122],
  ["7–9", .033729, .065673, .061079], ["10–12", .036154, .064744, .054220],
  ["13–15", .037479, .060438, .047489], ["16–18", .037179, .055182, .044370]
];

const durationAgeSeries = [
  {
    key: "under25", label: "Moins de 25 ans", color: "#f2a2a2",
    values: [.4435, .2464, .1208, .0627, .0400, .0230, .0154, .0117, .0123, .0242]
  },
  {
    key: "mid", label: "25–64 ans", color: "#bd3535",
    values: [.3858, .1944, .1218, .0710, .0502, .0334, .0249, .0206, .0302, .0677]
  },
  {
    key: "senior", label: "65 ans et plus", color: "#700f0f",
    values: [.3671, .1472, .1294, .0664, .0601, .0348, .0341, .0251, .0441, .0916]
  }
];

const durationStatusSeries = [
  {
    key: "food", label: "Précarité alimentaire", color: "#d41d43",
    values: [.391365, .197489, .122140, .069741, .049654, .032266, .024405, .019829, .029004, .064109]
  },
  {
    key: "homelessness", label: "Sans-abrisme", color: "#9698d9",
    values: [.352904, .236184, .136407, .081849, .056623, .036654, .028065, .017693, .016027, .037592]
  }
];

const mapMetricGroups = [
  {
    id: "poverty",
    label: "Précarité",
    metrics: [
      { key: "housing_strict", label: "Sans-abrisme", unit: "personnes / 1 000 ménages", shortUnit: "/ 1 000 ménages", digits: 2, description: "Personnes accueillies aux RDC en situation de sans-abrisme au sens large, dans les plus de 1 900 centres de distribution des Restos, rapportées au nombre local de ménages." },
      { key: "rdc_total", label: "Précarité alimentaire", unit: "personnes / 1 000 ménages", shortUnit: "/ 1 000 ménages", digits: 1, description: "Ensemble des personnes accueillies dans les plus de 1 900 centres de distribution des Restos, rapporté au nombre local de ménages." }
    ]
  },
  {
    id: "housing",
    label: "Logement et hébergement",
    metrics: [
      { key: "private_rent", label: "Loyer privé", unit: "€ / m²", shortUnit: "€/m²", digits: 1, description: "Loyer moyen du parc privé observé parmi les bénéficiaires d’APL." },
      { key: "social_rent", label: "Loyer social", unit: "€ / m²", shortUnit: "€/m²", digits: 1, description: "Loyer moyen pondéré du parc locatif social." },
      { key: "social_stock", label: "Parc de logements sociaux", unit: "logements / 1 000 ménages", shortUnit: "/ 1 000 ménages", digits: 1, description: "Nombre de logements sociaux rapporté à 1 000 ménages." },
      { key: "social_new", label: "Nouveaux logements sociaux", unit: "mises en service / 1 000 ménages", shortUnit: "/ 1 000 ménages", digits: 2, description: "Nouvelles mises en service dans le parc social rapportées à 1 000 ménages." },
      { key: "social_vacancy", label: "Vacance du parc social", unit: "%", shortUnit: "%", digits: 1, description: "Part des logements sociaux vacants." },
      { key: "social_mobility", label: "Mobilité du parc social", unit: "%", shortUnit: "%", digits: 1, description: "Taux de mobilité annuel dans le parc social." },
      { key: "shelter_capacity", label: "Capacité d’hébergement", unit: "places / 1 000 ménages", shortUnit: "/ 1 000 ménages", digits: 2, description: "Capacité des structures d’hébergement rapportée à 1 000 ménages." },
      { key: "shelters", label: "Structures d’hébergement", unit: "structures / 1 000 ménages", shortUnit: "/ 1 000 ménages", digits: 3, description: "Nombre de structures d’hébergement rapporté à 1 000 ménages." }
    ]
  },
  {
    id: "economy",
    label: "Économie locale",
    metrics: [
      { key: "unemployment", label: "Chômage élargi", unit: "% de la population active", shortUnit: "%", digits: 1, description: "Demandeurs d’emploi des catégories A, B et C rapportés à la population active." },
      { key: "local_income", label: "Revenu fiscal moyen", unit: "k€ / habitant", shortUnit: "k€ / hab.", digits: 1, description: "Revenu fiscal moyen annuel par habitant, en milliers d’euros." },
      { key: "food_price", label: "Indice des prix alimentaires", unit: "indice · Haute-Garonne 2016 = 100", shortUnit: "indice", digits: 1, description: "Indice départemental des prix alimentaires, normalisé à 100 pour la Haute-Garonne en 2016." },
      { key: "low_income_share", label: "Foyers dans la première tranche", unit: "% des foyers fiscaux", shortUnit: "%", digits: 1, description: "Part des foyers fiscaux situés dans la première tranche de revenu fiscal." },
      { key: "firm_stock", label: "Stock d’entreprises", unit: "entreprises / 1 000 ménages", shortUnit: "/ 1 000 ménages", digits: 1, description: "Nombre total d’entreprises rapporté à 1 000 ménages." },
      { key: "firm_creations", label: "Créations d’entreprises", unit: "créations / 1 000 ménages", shortUnit: "/ 1 000 ménages", digits: 1, description: "Créations annuelles d’entreprises rapportées à 1 000 ménages." },
      { key: "sole_trader_creations", label: "Créations d’entreprises individuelles", unit: "créations / 1 000 ménages", shortUnit: "/ 1 000 ménages", digits: 1, description: "Créations annuelles d’entreprises individuelles rapportées à 1 000 ménages." }
    ]
  },
  {
    id: "network",
    label: "Réseau des RDC",
    metrics: [
      { key: "rdc_centers", label: "Centres des RDC", unit: "centres / 1 000 ménages", shortUnit: "/ 1 000 ménages", digits: 3, description: "Nombre de centres de distribution des Restos rapporté à 1 000 ménages." },
      { key: "households_served", label: "Ménages servis par les RDC", unit: "ménages servis / 1 000 ménages", shortUnit: "/ 1 000 ménages", digits: 1, description: "Ménages servis dans les plus de 1 900 centres de distribution des Restos, rapportés au nombre local de ménages." }
    ]
  },
  {
    id: "territory",
    label: "Profil du territoire",
    metrics: [
      { key: "urban_share", label: "Population urbaine", unit: "%", shortUnit: "%", digits: 1, description: "Part de la population vivant dans une commune classée urbaine." },
      { key: "priority_area_share", label: "Communes avec quartier prioritaire", unit: "% de la population", shortUnit: "%", digits: 1, description: "Part de la population vivant dans une commune qui comprend au moins un quartier prioritaire de la politique de la ville." },
      { key: "tourist_share", label: "Communes touristiques", unit: "% de la population", shortUnit: "%", digits: 1, description: "Part de la population vivant dans une commune classée touristique." },
      { key: "mountain_share", label: "Communes de montagne", unit: "% de la population", shortUnit: "%", digits: 1, description: "Part de la population vivant dans une commune classée en zone de montagne." },
      { key: "active_household_share", label: "Foyers fiscaux actifs", unit: "% des foyers", shortUnit: "%", digits: 1, description: "Part des foyers fiscaux comprenant des revenus d’activité." },
      { key: "retired_household_share", label: "Foyers fiscaux retraités", unit: "% des foyers", shortUnit: "%", digits: 1, description: "Part des foyers fiscaux comprenant des pensions de retraite." },
      { key: "average_temperature", label: "Température moyenne", unit: "°C", shortUnit: "°C", digits: 1, description: "Température moyenne départementale durant la campagne." },
      { key: "rainfall", label: "Précipitations", unit: "mm mensuels moyens", shortUnit: "mm", digits: 1, description: "Volume mensuel moyen de précipitations au niveau départemental durant la campagne." },
      { key: "population_thousands", label: "Population", unit: "milliers d’habitants", shortUnit: "milliers", digits: 1, description: "Population du bassin, exprimée en milliers d’habitants." },
      { key: "commune_count", label: "Nombre de communes", unit: "communes", shortUnit: "communes", digits: 0, description: "Nombre de communes composant le bassin de vie augmenté." }
    ]
  }
];

const mapMetrics = new Map(mapMetricGroups.flatMap((group) => group.metrics.map((metric) => [metric.key, metric])));
const mapPalette = ["#f7e6d7", "#f3b58d", "#ed756f", "#b63a70", "#3a1748"];

const effectLabels = [
  "Loyers privés", "Loyers sociaux", "Annonces de locations", "Logements sociaux",
  "Hébergement d’urgence", "Prix alimentaires", "Taux de chômage", "Revenus locaux",
  "Nombre d’entreprises", "Création indép.", "Création d’entreprises"
];

const effectData = {
  entry: [
    [.417956, .041255, .794807, true], [-.060613, -.436116, .314746, false],
    [.070924, -.083665, .225659, false], [-.341214, -.569462, -.112983, true],
    [-.013183, -.028145, .001739, false], [.090809, -1.014611, 1.196050, false],
    [.938651, .575065, 1.302415, true], [-.807998, -1.425272, -.190880, true],
    [-.972382, -1.668596, -.276213, true], [.115260, .013141, .217232, true],
    [-.012005, -.075875, .052019, false]
  ],
  exit: [
    [.136973, .033973, .239821, true], [-.107666, -.282358, .067222, false],
    [.029217, -.009155, .067394, false], [-.039403, -.149966, .071260, false],
    [-.002055, -.005890, .001584, false], [.027966, -.250570, .306490, false],
    [-.124107, -.227804, -.020152, true], [-.041011, -.209074, .126845, false],
    [.037795, -.175311, .251076, false], [.013492, -.023760, .050898, false],
    [-.019210, -.043091, .004849, false]
  ]
};

const tooltip = document.querySelector("#tooltip");
const countryChart = document.querySelector("#country-chart");
const focusCodes = new Set(["NZL", "SVK", "CZE", "RDC+", "BEL", "FRA", "AUS", "ENG", "RDC", "GER", "USA"]);
let mapMetricKey = "housing_strict";
let bvaMap;
let bvaLayer;
let bvaFeatures = [];
let departmentFeatures = [];
let bvaMeta = { metrics: {} };
let bvaScale;
let bvaBounds;
let selectedBasinLayer = null;

function fr(value, digits = 1) {
  return value.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  });
}

function formatCountry(value) {
  if (value === 0) return "0";
  return value.toLocaleString("fr-FR", {
    minimumFractionDigits: value < .1 ? 2 : 1,
    maximumFractionDigits: 2
  });
}

function showTooltip(target, html) {
  const box = target.getBoundingClientRect();
  tooltip.innerHTML = html;
  tooltip.classList.toggle("is-age-tooltip", target.classList.contains("pyramid-row"));
  tooltip.classList.add("is-visible");
  const width = tooltip.offsetWidth || 220;
  const x = Math.min(window.innerWidth - width / 2 - 10, Math.max(width / 2 + 10, box.left + box.width / 2));
  const y = box.top < 120 ? box.bottom + tooltip.offsetHeight + 18 : box.top;
  tooltip.style.left = `${x}px`;
  tooltip.style.top = `${y}px`;
}

function hideTooltip() {
  tooltip.classList.remove("is-visible");
}

function bindTooltip(target, html) {
  target.addEventListener("pointerenter", () => showTooltip(target, html));
  target.addEventListener("pointerleave", hideTooltip);
  target.addEventListener("focus", () => showTooltip(target, html));
  target.addEventListener("blur", hideTooltip);
}

function renderCountries(mode = "focus") {
  const data = mode === "all" ? countryData : countryData.filter((item) => focusCodes.has(item.code));
  countryChart.innerHTML = "";
  data.forEach((item) => {
    const label = item.label || item.code;
    const row = document.createElement("button");
    row.type = "button";
    row.className = "country-row";
    row.setAttribute("role", "listitem");
    row.dataset.tone = item.tone || "neutral";
    row.style.setProperty("--value", item.value);
    row.setAttribute("aria-label", `${label} : ${formatCountry(item.value)} pour 100 habitants`);
    row.innerHTML = `
      <span class="country-code">${label}</span>
      <span class="bar-track" aria-hidden="true"><span class="bar"></span></span>
      <span class="country-value">${formatCountry(item.value)}</span>
    `;
    const noun = item.value > 1 ? "personnes" : "personne";
    bindTooltip(row, `<strong>${label}</strong><br>${formatCountry(item.value)} ${noun} pour 100 habitants`);
    countryChart.appendChild(row);
  });
}

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    renderCountries(button.dataset.filter);
  });
});

function renderTrend() {
  const host = document.querySelector("#trend-chart");
  const activeSeries = [...document.querySelectorAll(".series-toggle.is-active")].map((button) => button.dataset.series);
  const width = 680;
  const hostRect = host.getBoundingClientRect();
  const height = Math.max(340, Math.round(width * hostRect.height / Math.max(hostRect.width, 1)));
  const margin = { top: 15, right: 18, bottom: 38, left: 45 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const x = (year) => margin.left + ((year - 2007) / (2025 - 2007)) * innerWidth;
  const y = (value) => margin.top + (1 - value / .5) * innerHeight;
  const xTicks = [2007, 2010, 2013, 2016, 2019, 2022, 2025];
  const yTicks = [0, .1, .2, .3, .4, .5];
  const pieces = [`<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Comparaison internationale : évolution du taux de sans-abrisme en France et en Angleterre">`];

  yTicks.forEach((tick) => {
    pieces.push(`<line class="trend-gridline" x1="${margin.left}" y1="${y(tick)}" x2="${width - margin.right}" y2="${y(tick)}"></line>`);
    pieces.push(`<text class="trend-axis-label" x="${margin.left - 9}" y="${y(tick) + 4}" text-anchor="end">${fr(tick, 1)}</text>`);
  });
  xTicks.forEach((tick) => {
    pieces.push(`<text class="trend-axis-label" x="${x(tick)}" y="${height - 9}" text-anchor="middle">${tick}</text>`);
  });

  activeSeries.forEach((series) => {
    const points = trendData[series];
    const path = points.map(([year, value], index) => `${index ? "L" : "M"}${x(year).toFixed(2)},${y(value).toFixed(2)}`).join(" ");
    pieces.push(`<path class="trend-line ${series}" d="${path}"></path>`);
    points.forEach(([year, value]) => {
      pieces.push(`<circle class="trend-point ${series}" cx="${x(year)}" cy="${y(value)}" r="4.5" tabindex="0" data-series-name="${series}" data-year="${year}" data-value="${value}" aria-label="${series === "france" ? "France, données des Restos du Cœur" : "Angleterre"}, ${year}, environ ${fr(value, 2)} personne sans abri pour 100 habitants"></circle>`);
    });
  });
  pieces.push("</svg>");
  host.innerHTML = pieces.join("");
  host.querySelectorAll(".trend-point").forEach((point) => {
    const label = point.dataset.seriesName === "france" ? "France · RDC" : "Angleterre";
    bindTooltip(point, `<strong>${label} · ${point.dataset.year}</strong><br>≈ ${fr(Number(point.dataset.value), 2)} personne sans abri pour 100 habitants`);
  });
}

document.querySelectorAll(".series-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const activeCount = document.querySelectorAll(".series-toggle.is-active").length;
    if (button.classList.contains("is-active") && activeCount === 1) return;
    button.classList.toggle("is-active");
    button.setAttribute("aria-pressed", String(button.classList.contains("is-active")));
    renderTrend();
  });
});

let trendResizeFrame = 0;
window.addEventListener("resize", () => {
  cancelAnimationFrame(trendResizeFrame);
  trendResizeFrame = requestAnimationFrame(renderTrend);
});

function renderAgePyramid(hostSelector, data, maximum, ticks, dividerIndexes = []) {
  const host = document.querySelector(hostSelector);
  host.replaceChildren();
  data.forEach(([label, france, rdc, housing], index) => {
    const row = document.createElement("button");
    row.type = "button";
    row.className = `pyramid-row${dividerIndexes.includes(index) ? " has-divider" : ""}`;
    row.setAttribute("role", "listitem");
    row.setAttribute("aria-label", `${label} ans : France ${fr(france * 100, 1)} %, personnes accueillies aux RDC ${fr(rdc * 100, 1)} %, insécurité résidentielle stricte ${fr(housing * 100, 1)} %`);
    row.style.setProperty("--france-width", `${(france / maximum) * 50}%`);
    row.style.setProperty("--rdc-width", `${(rdc / maximum) * 50}%`);
    row.style.setProperty("--housing-width", `${(housing / maximum) * 50}%`);
    row.innerHTML = `
      <span class="pyramid-label">${label}</span>
      <span class="pyramid-plot" aria-hidden="true">
        <i class="pyramid-bar pyramid-france pyramid-left"></i>
        <i class="pyramid-bar pyramid-france pyramid-right"></i>
        <i class="pyramid-bar pyramid-rdc"></i>
        <i class="pyramid-bar pyramid-housing"></i>
      </span>
    `;
    bindTooltip(row, `<strong>${label} ans</strong><br>France : ${fr(france * 100, 1)}&nbsp;%<br>Personnes accueillies aux RDC : ${fr(rdc * 100, 1)}&nbsp;%<br>Insécurité résidentielle stricte : ${fr(housing * 100, 1)}&nbsp;%`);
    host.appendChild(row);
  });

  const axis = document.createElement("div");
  axis.className = "pyramid-axis-row";
  axis.setAttribute("aria-hidden", "true");
  axis.innerHTML = `<span></span><span class="pyramid-axis">${ticks.map((tick) => {
    const position = 50 + (tick / maximum) * 50;
    return `<i style="--x:${position}%">${Math.round(Math.abs(tick) * 100)} %</i>`;
  }).join("")}</span>`;
  host.appendChild(axis);
}

function renderAge() {
  renderAgePyramid("#age-pyramid-main", ageData, .25, [-.2, -.1, 0, .1, .2]);
  renderAgePyramid("#age-pyramid-children", childAgeData, .08, [-.04, 0, .04]);
}

function renderDurationChart(hostSelector, series, maximum = .46) {
  const host = document.querySelector(hostSelector);
  host.replaceChildren();
  const ticks = [0, .1, .2, .3, .4];
  const axis = document.createElement("div");
  axis.className = "duration-y-axis";
  axis.setAttribute("aria-hidden", "true");
  axis.innerHTML = ticks.map((tick) => `<span style="--y:${(tick / maximum) * 100}%">${Math.round(tick * 100)} %</span>`).join("");

  const plot = document.createElement("div");
  plot.className = "duration-plot";
  plot.innerHTML = `<div class="duration-gridlines" aria-hidden="true">${ticks.map((tick) => `<i style="--y:${(tick / maximum) * 100}%"></i>`).join("")}</div>`;
  const groups = document.createElement("div");
  groups.className = "duration-groups";
  const labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];

  labels.forEach((label, index) => {
    const group = document.createElement("button");
    group.type = "button";
    group.className = "duration-group";
    group.setAttribute("role", "listitem");
    const values = series.map((item) => item.values[index]);
    const readable = series.map((item, seriesIndex) => `${item.label} ${fr(values[seriesIndex] * 100, 1)} %`).join(", ");
    group.setAttribute("aria-label", `${label} campagne${label === "1" ? "" : "s"} : ${readable}`);
    group.innerHTML = `
      <span class="duration-bars" aria-hidden="true">
        ${series.map((item, seriesIndex) => `<i class="duration-column" style="--p:${(values[seriesIndex] / maximum) * 100}%;--c:${item.color}"></i>`).join("")}
      </span>
      <span class="duration-x-label">${label}</span>
    `;
    bindTooltip(group, `<strong>${label} campagne${label === "1" ? "" : "s"}</strong><br>${series.map((item, seriesIndex) => `${item.label} : ${fr(values[seriesIndex] * 100, 1)} %`).join("<br>")}`);
    groups.appendChild(group);
  });
  plot.appendChild(groups);
  host.append(axis, plot);
}

function renderDuration() {
  renderDurationChart("#duration-age-chart", durationAgeSeries);
  renderDurationChart("#duration-status-chart", durationStatusSeries);
}

document.querySelectorAll("[data-tooltip]").forEach((target) => bindTooltip(target, target.dataset.tooltip));

function metricClass(feature, key = mapMetricKey) {
  const value = feature?.properties?.[key];
  return Number.isInteger(value) && value >= 0 ? value : null;
}

function formatMetricBoundary(metric, value) {
  if (!Number.isFinite(value)) return "Non disponible";
  return value.toLocaleString("fr-FR", {
    minimumFractionDigits: metric.digits,
    maximumFractionDigits: metric.digits
  });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[character]);
}

function getMapScale(key) {
  const source = bvaMeta?.metrics?.[key] || {};
  const thresholds = Array.isArray(source.thresholds) ? source.thresholds.filter(Number.isFinite) : [];
  const classCount = Number.isInteger(source.classCount) && source.classCount > 0
    ? source.classCount
    : thresholds.length + 1;
  return { thresholds, classCount };
}

function classRangeLabel(metric, key, index, includeUnit = true) {
  if (!Number.isInteger(index) || index < 0) return "Non disponible";
  const { thresholds, classCount } = getMapScale(key);
  let label;
  if (!thresholds.length) {
    label = `Classe ${index + 1}`;
  } else if (index === 0) {
    label = thresholds[0] === 0 ? "Aucun" : `≤ ${formatMetricBoundary(metric, thresholds[0])}`;
  } else if (index >= classCount - 1) {
    label = `> ${formatMetricBoundary(metric, thresholds.at(-1))}`;
  } else {
    label = `${formatMetricBoundary(metric, thresholds[index - 1])} – ${formatMetricBoundary(metric, thresholds[index])}`;
  }
  return includeUnit && label !== "Aucun" ? `${label} ${metric.shortUnit}` : label;
}

function mapClassColor(index) {
  if (index < 0) return "#cbd1dc";
  const classCount = bvaScale.classCount;
  const paletteIndex = classCount === 1 ? 2 : Math.round(index * (mapPalette.length - 1) / (classCount - 1));
  return mapPalette[paletteIndex];
}

function basinStyle(feature) {
  const fillColor = mapClassColor(metricClass(feature) ?? -1);
  return {
    pane: "basins",
    color: fillColor,
    opacity: 1,
    weight: 1.2,
    lineCap: "round",
    lineJoin: "round",
    fillColor,
    fillOpacity: 1
  };
}

function highlightBasin(layer, locked = false) {
  layer.setStyle({
    color: locked ? "#0b1020" : "#ffffff",
    weight: locked ? 2.1 : 1.45,
    fillOpacity: 1
  });
  layer.bringToFront();
}

function restoreBasinStyle(layer) {
  layer.setStyle(basinStyle(layer.feature));
  if (layer === selectedBasinLayer) highlightBasin(layer, true);
}

function renderBasinDetail(feature = null) {
  const contextRows = [
    ["#map-context-housing", "housing_strict"],
    ["#map-context-rent", "private_rent"],
    ["#map-context-unemployment", "unemployment"]
  ];
  contextRows.forEach(([selector, key]) => {
    const contextMetric = mapMetrics.get(key);
    document.querySelector(selector).textContent = feature
      ? classRangeLabel(contextMetric, key, metricClass(feature, key), true)
      : "Sélectionnez un bassin";
  });
}

function tooltipFor(feature) {
  const metric = mapMetrics.get(mapMetricKey);
  return `<strong>${escapeHtml(feature.properties.bva_name)}</strong><br>${escapeHtml(metric.label)} : ${escapeHtml(classRangeLabel(metric, mapMetricKey, metricClass(feature), true))}`;
}

function renderMapLegend() {
  const host = document.querySelector("#map-legend");
  const metric = mapMetrics.get(mapMetricKey);
  const { thresholds, classCount } = bvaScale;
  host.replaceChildren();
  for (let index = 0; index < classCount; index += 1) {
    const row = document.createElement("div");
    row.className = "legend-segment";
    const paletteIndex = classCount === 1 ? 2 : Math.round(index * (mapPalette.length - 1) / (classCount - 1));
    row.style.setProperty("--c", mapPalette[paletteIndex]);
    const label = classRangeLabel(metric, mapMetricKey, index, true);
    row.innerHTML = `<i aria-hidden="true"></i><span>${escapeHtml(label)}</span>`;
    host.appendChild(row);
  }
  const missing = document.createElement("div");
  missing.className = "legend-segment";
  missing.style.setProperty("--c", "#cbd1dc");
  missing.innerHTML = "<i aria-hidden=\"true\"></i><span>Non disponible</span>";
  host.appendChild(missing);
}

function setMapMetric(key) {
  mapMetricKey = key;
  const metric = mapMetrics.get(key);
  document.querySelector("#map-title").textContent = metric.label;
  document.querySelector("#map-description").textContent = metric.description;
  if (!bvaFeatures.length) return;
  bvaScale = getMapScale(key);
  bvaLayer.eachLayer((layer) => {
    layer.setStyle(basinStyle(layer.feature));
    layer.setTooltipContent(tooltipFor(layer.feature));
  });
  if (selectedBasinLayer) highlightBasin(selectedBasinLayer, true);
  renderMapLegend();
  renderBasinDetail(selectedBasinLayer?.feature || null);
}

function selectBasin(layer, zoom = true) {
  const previous = selectedBasinLayer;
  selectedBasinLayer = layer;
  if (previous && previous !== layer) previous.setStyle(basinStyle(previous.feature));
  highlightBasin(layer, true);
  renderBasinDetail(layer.feature);
  if (zoom) bvaMap.fitBounds(layer.getBounds(), { padding: [42, 42], maxZoom: 8 });
}

function clearBasinSelection(resetView = false) {
  const previous = selectedBasinLayer;
  selectedBasinLayer = null;
  if (previous) previous.setStyle(basinStyle(previous.feature));
  renderBasinDetail();
  if (resetView && bvaBounds) bvaMap.fitBounds(bvaBounds, { padding: [10, 10] });
}

function onEachBasin(feature, layer) {
  layer.bindTooltip(tooltipFor(feature), { sticky: true, direction: "top", opacity: 1 });
  layer.on({
    mouseover: () => {
      highlightBasin(layer, layer === selectedBasinLayer);
      renderBasinDetail(feature);
    },
    mouseout: () => {
      restoreBasinStyle(layer);
      renderBasinDetail(selectedBasinLayer?.feature || null);
    },
    click: (event) => {
      L.DomEvent.stopPropagation(event.originalEvent);
      selectBasin(layer);
    }
  });
}

function normalizeSearch(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function searchBasin() {
  const query = normalizeSearch(document.querySelector("#map-search").value);
  if (!query || !bvaLayer) return;
  let exact = null;
  let partial = null;
  bvaLayer.eachLayer((layer) => {
    const name = normalizeSearch(layer.feature.properties.bva_name);
    if (!exact && (name === query || normalizeSearch(layer.feature.properties.bva_code) === query)) exact = layer;
    if (!partial && name.includes(query)) partial = layer;
  });
  const match = exact || partial;
  if (match) {
    document.querySelector("#map-search").value = match.feature.properties.bva_name;
    selectBasin(match);
  }
}

function wrappedCanvasLines(context, text, maxWidth, maxLines = Infinity) {
  const words = String(text).trim().split(/\s+/);
  const lines = [];
  let line = "";
  words.forEach((word) => {
    const candidate = line ? `${line} ${word}` : word;
    if (line && context.measureText(candidate).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  });
  if (line) lines.push(line);
  if (lines.length <= maxLines) return lines;
  const visible = lines.slice(0, maxLines);
  let last = `${visible.at(-1)}…`;
  while (last.length > 1 && context.measureText(last).width > maxWidth) last = `${last.slice(0, -2)}…`;
  visible[visible.length - 1] = last;
  return visible;
}

function drawWrappedCanvasText(context, text, x, y, maxWidth, lineHeight, maxLines = Infinity) {
  const lines = wrappedCanvasLines(context, text, maxWidth, maxLines);
  lines.forEach((line, index) => context.fillText(line, x, y + index * lineHeight));
  return y + lines.length * lineHeight;
}

function mapExportSlug(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "france";
}

function traceFeatureForExport(context, feature, offsetX, offsetY, scale, project) {
  const geometry = feature?.geometry;
  if (!geometry || !["Polygon", "MultiPolygon"].includes(geometry.type)) return false;
  const polygons = geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;
  let traced = false;
  polygons.forEach((polygon) => polygon.forEach((ring) => {
    ring.forEach(([longitude, latitude], index) => {
      const point = project([longitude, latitude]);
      const x = offsetX + point.x * scale;
      const y = offsetY + point.y * scale;
      if (index === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
      traced = true;
    });
    context.closePath();
  }));
  return traced;
}

function drawFeatureForExport(context, feature, offsetX, offsetY, scale, style, project) {
  context.beginPath();
  if (!traceFeatureForExport(context, feature, offsetX, offsetY, scale, project)) return;
  if (style.fill) {
    context.fillStyle = style.fill;
    context.fill("evenodd");
  }
  if (style.stroke) {
    context.strokeStyle = style.stroke;
    context.lineWidth = style.lineWidth;
    context.lineJoin = "round";
    context.lineCap = "round";
    context.stroke();
  }
}

function downloadCanvas(canvas, filename) {
  const save = (href, revoke = null) => {
    const link = document.createElement("a");
    link.href = href;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    if (revoke) window.setTimeout(revoke, 30000);
  };
  return new Promise((resolve, reject) => {
    if (!canvas.toBlob) {
      try {
        save(canvas.toDataURL("image/png"));
        resolve({ bytes: null });
      } catch (error) {
        reject(error);
      }
      return;
    }
    canvas.toBlob((blob) => {
      if (!blob) {
        try {
          save(canvas.toDataURL("image/png"));
          resolve({ bytes: null });
        } catch (error) {
          reject(error);
        }
        return;
      }
      const url = URL.createObjectURL(blob);
      save(url, () => URL.revokeObjectURL(url));
      resolve({ bytes: blob.size });
    }, "image/png");
  });
}

async function downloadMapAsPng() {
  const button = document.querySelector("#map-download");
  const status = document.querySelector("#map-download-status");
  if (!bvaMap || !bvaLayer || !bvaFeatures.length || button.disabled) return;
  const defaultLabel = "Télécharger en PNG";
  button.disabled = true;
  button.textContent = "Préparation…";
  status.textContent = "Préparation de la carte PNG.";
  try {
    if (document.fonts?.ready) await document.fonts.ready;
    bvaMap.stop();
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

    const mapHost = document.querySelector("#bva-map");
    const mapRect = mapHost.getBoundingClientRect();
    if (!mapRect.width || !mapRect.height) throw new Error("Carte invisible");

    const width = 1440;
    const headerHeight = 160;
    const footerHeight = 64;
    const legendWidth = 400;
    const mapWidth = width - legendWidth;
    const mapScale = mapWidth / mapRect.width;
    const mapZoom = bvaMap.getZoom();
    const pixelOrigin = bvaMap.getPixelOrigin();
    const paneOffset = bvaMap.layerPointToContainerPoint(L.point(0, 0));
    const project = ([longitude, latitude]) => bvaMap.project(L.latLng(latitude, longitude), mapZoom)
      .subtract(pixelOrigin)
      .add(paneOffset);
    const bodyHeight = Math.max(760, Math.round(mapRect.height * mapScale));
    const height = headerHeight + bodyHeight + footerHeight;
    const pixelRatio = 2;
    const canvas = document.createElement("canvas");
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    const context = canvas.getContext("2d");
    context.scale(pixelRatio, pixelRatio);
    context.textBaseline = "top";

    context.fillStyle = "#10162b";
    context.fillRect(0, 0, width, headerHeight);
    context.fillStyle = "#ef2d68";
    context.font = "800 15px Inter, Arial, sans-serif";
    context.fillText("NOTE DE SYNTHÈSE · CARTE INTERACTIVE", 46, 30);
    context.fillStyle = "#ffffff";
    context.font = "600 42px Georgia, serif";
    context.fillText(mapMetrics.get(mapMetricKey).label, 46, 58);
    context.fillStyle = "#b7c0d4";
    context.font = "500 18px Inter, Arial, sans-serif";
    context.fillText("Bassins de vie augmentés · Hiver 2022–2023", 48, 116);

    const mapY = headerHeight;
    context.save();
    context.beginPath();
    context.rect(0, mapY, mapWidth, bodyHeight);
    context.clip();
    const mapBackground = context.createRadialGradient(mapWidth * .45, mapY + bodyHeight * .45, 30, mapWidth * .45, mapY + bodyHeight * .45, Math.max(mapWidth, bodyHeight) * .7);
    mapBackground.addColorStop(0, "#ffffff");
    mapBackground.addColorStop(1, "#dbe2ee");
    context.fillStyle = mapBackground;
    context.fillRect(0, mapY, mapWidth, bodyHeight);
    bvaFeatures.forEach((feature) => {
      const fill = mapClassColor(metricClass(feature) ?? -1);
      drawFeatureForExport(context, feature, 0, mapY, mapScale, {
        fill,
        stroke: fill,
        lineWidth: Math.max(1.25, 1.05 * mapScale)
      }, project);
    });
    departmentFeatures.forEach((feature) => drawFeatureForExport(context, feature, 0, mapY, mapScale, {
      stroke: "rgba(11,16,32,.62)",
      lineWidth: Math.max(1.15, .85 * mapScale)
    }, project));
    if (selectedBasinLayer?.feature) drawFeatureForExport(context, selectedBasinLayer.feature, 0, mapY, mapScale, {
      stroke: "#0b1020",
      lineWidth: Math.max(3, 2.1 * mapScale)
    }, project);
    context.restore();

    const sideX = mapWidth;
    const sidePadding = 36;
    const textWidth = legendWidth - sidePadding * 2;
    context.fillStyle = "#161e38";
    context.fillRect(sideX, mapY, legendWidth, bodyHeight);
    context.fillStyle = "#ef2d68";
    context.font = "800 14px Inter, Arial, sans-serif";
    context.fillText("LÉGENDE", sideX + sidePadding, mapY + 34);
    context.fillStyle = "#ffffff";
    context.font = "600 29px Georgia, serif";
    let cursorY = drawWrappedCanvasText(context, mapMetrics.get(mapMetricKey).label, sideX + sidePadding, mapY + 59, textWidth, 35, 2) + 10;
    context.fillStyle = "#c0c9dc";
    context.font = "400 17px Inter, Arial, sans-serif";
    cursorY = drawWrappedCanvasText(context, mapMetrics.get(mapMetricKey).description, sideX + sidePadding, cursorY, textWidth, 25, 6) + 24;

    const { classCount } = bvaScale;
    for (let index = 0; index < classCount; index += 1) {
      const color = mapClassColor(index);
      context.fillStyle = color;
      context.fillRect(sideX + sidePadding, cursorY + 2, 38, 22);
      context.strokeStyle = "rgba(255,255,255,.35)";
      context.lineWidth = 1;
      context.strokeRect(sideX + sidePadding, cursorY + 2, 38, 22);
      context.fillStyle = "#e5e9f3";
      context.font = "500 16px Inter, Arial, sans-serif";
      context.fillText(classRangeLabel(mapMetrics.get(mapMetricKey), mapMetricKey, index, true), sideX + sidePadding + 54, cursorY + 3);
      cursorY += 39;
    }
    context.fillStyle = "#cbd1dc";
    context.fillRect(sideX + sidePadding, cursorY + 2, 38, 22);
    context.strokeStyle = "rgba(255,255,255,.35)";
    context.strokeRect(sideX + sidePadding, cursorY + 2, 38, 22);
    context.fillStyle = "#e5e9f3";
    context.font = "500 16px Inter, Arial, sans-serif";
    context.fillText("Non disponible", sideX + sidePadding + 54, cursorY + 3);
    cursorY += 58;

    if (selectedBasinLayer?.feature?.properties?.bva_name) {
      context.fillStyle = "#ef2d68";
      context.font = "800 13px Inter, Arial, sans-serif";
      context.fillText("BASSIN SÉLECTIONNÉ", sideX + sidePadding, cursorY);
      context.fillStyle = "#ffffff";
      context.font = "600 21px Georgia, serif";
      drawWrappedCanvasText(context, selectedBasinLayer.feature.properties.bva_name, sideX + sidePadding, cursorY + 25, textWidth, 27, 3);
    }

    const footerY = headerHeight + bodyHeight;
    context.fillStyle = "#10162b";
    context.fillRect(0, footerY, width, footerHeight);
    context.fillStyle = "#b7c0d4";
    context.font = "500 14px Inter, Arial, sans-serif";
    context.fillText("Source : Restos du Cœur · IGN ADMIN EXPRESS 2024 · GHWW", 46, footerY + 23);
    context.textAlign = "right";
    context.fillText("L’extrême pauvreté dans les pays riches", width - 40, footerY + 23);
    context.textAlign = "left";

    const areaSlug = mapExportSlug(selectedBasinLayer?.feature?.properties?.bva_name || "france");
    const filename = `carte-${mapMetricKey.replaceAll("_", "-")}-${areaSlug}-2022-2023.png`;
    const exportInfo = await downloadCanvas(canvas, filename);
    const sizeLabel = exportInfo.bytes ? `, ${Math.round(exportInfo.bytes / 1024)} ko` : "";
    status.textContent = `Carte PNG générée : ${filename}, ${canvas.width} × ${canvas.height} pixels${sizeLabel}.`;
  } catch (error) {
    console.error("Échec du téléchargement de la carte", error);
    status.textContent = "Le téléchargement de la carte a échoué. Réessayez.";
    button.textContent = "Réessayer";
    window.setTimeout(() => { button.textContent = defaultLabel; }, 1800);
    return;
  } finally {
    button.disabled = false;
  }
  button.textContent = "PNG téléchargé";
  window.setTimeout(() => { button.textContent = defaultLabel; }, 1400);
}

function prepareMapControls() {
  const themeSelect = document.querySelector("#map-theme");
  const variableSelect = document.querySelector("#map-variable");
  mapMetricGroups.forEach((group) => themeSelect.add(new Option(group.label, group.id)));

  const populateVariables = (groupId, preferredKey = null) => {
    const group = mapMetricGroups.find((item) => item.id === groupId) || mapMetricGroups[0];
    variableSelect.replaceChildren();
    group.metrics.forEach((metric) => variableSelect.add(new Option(metric.label, metric.key)));
    const nextKey = group.metrics.some((metric) => metric.key === preferredKey) ? preferredKey : group.metrics[0].key;
    variableSelect.value = nextKey;
    setMapMetric(nextKey);
  };

  themeSelect.value = "poverty";
  populateVariables("poverty", mapMetricKey);
  themeSelect.addEventListener("change", () => populateVariables(themeSelect.value));
  variableSelect.addEventListener("change", () => setMapMetric(variableSelect.value));
  document.querySelector("#map-search").addEventListener("change", searchBasin);
  document.querySelector("#map-search").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchBasin();
    }
  });
  document.querySelector("#map-reset").addEventListener("click", () => {
    document.querySelector("#map-search").value = "";
    clearBasinSelection(true);
  });
  document.querySelector("#map-download").addEventListener("click", downloadMapAsPng);
}

async function initializeBvaMap() {
  prepareMapControls();
  const loading = document.querySelector(".map-loading");
  try {
    const [basins, metadata, departments] = await Promise.all([
      fetch("assets/bva-atlas-classes.geojson").then((response) => {
        if (!response.ok) throw new Error("Bassins indisponibles");
        return response.json();
      }),
      fetch("assets/bva-atlas-meta.json").then((response) => {
        if (!response.ok) throw new Error("Métadonnées cartographiques indisponibles");
        return response.json();
      }),
      fetch("assets/departements.geojson").then((response) => {
        if (!response.ok) throw new Error("Départements indisponibles");
        return response.json();
      })
    ]);
    bvaMeta = metadata;
    bvaFeatures = basins.features;
    departmentFeatures = departments.features;
    bvaScale = getMapScale(mapMetricKey);
    bvaMap = L.map("bva-map", {
      zoomControl: false,
      attributionControl: false,
      minZoom: 5,
      maxZoom: 10,
      preferCanvas: true,
      zoomSnap: .25
    });
    bvaMap.createPane("basins").style.zIndex = 410;
    const departmentPane = bvaMap.createPane("departments");
    departmentPane.style.zIndex = 420;
    departmentPane.style.pointerEvents = "none";
    const renderer = L.canvas({ padding: .35 });
    bvaLayer = L.geoJSON(basins, { renderer, style: basinStyle, onEachFeature: onEachBasin }).addTo(bvaMap);
    L.geoJSON(departments, {
      renderer,
      pane: "departments",
      interactive: false,
      style: { color: "rgba(11,16,32,.58)", weight: .85, fillOpacity: 0 }
    }).addTo(bvaMap);
    L.control.zoom({ position: "bottomright" }).addTo(bvaMap);
    L.control.attribution({ position: "bottomleft", prefix: false })
      .addAttribution("IGN ADMIN EXPRESS 2024 · données GHWW")
      .addTo(bvaMap);
    bvaBounds = bvaLayer.getBounds();
    bvaMap.fitBounds(bvaBounds, { padding: [10, 10] });
    bvaMap.setMaxBounds(bvaBounds.pad(.2));
    bvaMap.on("click", () => clearBasinSelection(false));

    const options = document.querySelector("#bva-options");
    bvaFeatures
      .slice()
      .sort((a, b) => a.properties.bva_name.localeCompare(b.properties.bva_name, "fr"))
      .forEach((feature) => {
        const option = document.createElement("option");
        option.value = feature.properties.bva_name;
        options.appendChild(option);
      });
    renderMapLegend();
    renderBasinDetail();
    loading.remove();
    document.querySelector("#map-download").disabled = false;
  } catch (error) {
    loading.textContent = "La carte n’a pas pu être chargée. Les autres résultats restent disponibles.";
  }
}

function signed(value) {
  if (Math.abs(value) < .05) return "0";
  return `${value > 0 ? "+" : "−"}${fr(Math.abs(value), 1).replace(",0", "")}`;
}

const exitShockCoefficients = {
  unemployment: -.124107,
  rent: .136973,
  housing: -.039403,
  firms: .037795
};

const entryShockCoefficients = {
  unemployment: .938651,
  rent: .417956,
  housing: -.341214,
  firms: -.972382
};

const shockVariableLabels = {
  unemployment: "du chômage",
  rent: "des loyers privés",
  housing: "du stock de logements sociaux",
  firms: "du nombre d’entreprises"
};

const shockEffectIndexes = {
  rent: 0,
  housing: 3,
  unemployment: 6,
  firms: 8
};

function confidenceIntervalText(kind, mode, input) {
  const [, low, high] = effectData[kind][shockEffectIndexes[mode]];
  return `Intervalle de confiance : [${signed(input * low)} % ; ${signed(input * high)} %].`;
}

function initializeShockSimulators() {
  document.querySelectorAll("[data-shock-simulator]").forEach((card) => {
    const kind = card.dataset.shockSimulator;
    const range = card.querySelector("[data-shock-range]");
    const inputValue = card.querySelector("[data-shock-input]");
    const prefix = card.querySelector("[data-shock-prefix]");
    const output = card.querySelector("[data-shock-output]");
    const secondary = card.querySelector("[data-shock-secondary]");
    let mode = "unemployment";

    const update = () => {
      const input = Number(range.value);
      inputValue.textContent = `+${input} %`;
      const outcome = kind === "exit"
        ? "des sorties de la précarité résidentielle"
        : "des entrées dans la précarité résidentielle";
      prefix.textContent = `Une hausse de ${input} % ${shockVariableLabels[mode]} entraîne, toutes choses égales par ailleurs, une variation ${outcome} de`;

      if (kind === "exit") {
        output.textContent = `≈ ${signed(input * exitShockCoefficients[mode])} %`;
      } else {
        output.textContent = `≈ ${signed(input * entryShockCoefficients[mode])} %`;
      }
      secondary.textContent = confidenceIntervalText(kind, mode, input);
    };

    card.querySelectorAll("[data-shock]").forEach((button) => {
      button.addEventListener("click", () => {
        mode = button.dataset.shock;
        card.querySelectorAll("[data-shock]").forEach((item) => {
          const active = item === button;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-checked", String(active));
        });
        update();
      });
    });
    range.addEventListener("input", update);
    update();
  });
}

function effectPercent(value) {
  return Math.max(0, Math.min(100, ((value + 1.5) / 3) * 100));
}

function renderEffects(hostSelector, mode, noteSelector) {
  const host = document.querySelector(hostSelector);
  host.innerHTML = "";
  effectData[mode].forEach(([estimate, low, high, intervalExcludesZero], index) => {
    const row = document.createElement("button");
    row.type = "button";
    row.className = "effect-row";
    row.setAttribute("role", "listitem");
    row.dataset.uncertain = String(mode === "exit" || !intervalExcludesZero);
    row.style.setProperty("--zero", `${effectPercent(0)}%`);
    row.style.setProperty("--low", `${effectPercent(low)}%`);
    row.style.setProperty("--high", `${effectPercent(high)}%`);
    row.style.setProperty("--estimate", `${effectPercent(estimate)}%`);
    row.setAttribute("aria-label", `${effectLabels[index]} : coefficient ${fr(estimate, 2)}, intervalle affiché de ${fr(low, 2)} à ${fr(high, 2)}`);
    row.innerHTML = `
      <span class="effect-label" title="${effectLabels[index]}">${effectLabels[index]}</span>
      <span class="effect-plot" aria-hidden="true"><i class="effect-interval"></i><i class="effect-dot"></i></span>
    `;
    bindTooltip(row, `<strong>${effectLabels[index]}</strong><br>Coefficient : ${fr(estimate, 2)}<br>Intervalle affiché : ${fr(low, 2)} à ${fr(high, 2)}`);
    host.appendChild(row);
  });
  document.querySelector(noteSelector).textContent = mode === "entry"
    ? "Lorsqu’un intervalle ne croise pas zéro, l’effet est statistiquement significatif avec un niveau de confiance supérieur à 90 %."
    : "Même règle de lecture : un intervalle qui ne croise pas zéro indique une significativité supérieure à 90 %. Dans l’ensemble, les effets macroéconomiques sur les sorties sont nettement moins robustes.";
}

const questionMenu = document.querySelector(".question-menu");
if (questionMenu) {
  const questionMenuSummary = questionMenu.querySelector("summary");
  questionMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      questionMenu.removeAttribute("open");
      const target = document.querySelector(link.hash);
      if (target) {
        target.setAttribute("tabindex", "-1");
        requestAnimationFrame(() => target.focus({ preventScroll: true }));
      }
    });
  });
  document.addEventListener("click", (event) => {
    if (questionMenu.open && !questionMenu.contains(event.target)) questionMenu.removeAttribute("open");
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && questionMenu.open) {
      event.preventDefault();
      questionMenu.removeAttribute("open");
      questionMenuSummary.focus();
    }
  });
}

document.querySelectorAll(".language-switch a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.location.hash) link.href = `${link.getAttribute("href").split("#")[0]}${window.location.hash}`;
  });
});

renderCountries();
renderTrend();
renderAge();
renderDuration();
initializeBvaMap();
initializeShockSimulators();
renderEffects("#entry-effects-chart", "entry", "#entry-effects-note");
renderEffects("#effects-chart", "exit", "#effects-note");
