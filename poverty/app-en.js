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
    key: "under25", label: "Under 25", color: "#f2a2a2",
    values: [.4435, .2464, .1208, .0627, .0400, .0230, .0154, .0117, .0123, .0242]
  },
  {
    key: "mid", label: "Ages 25–64", color: "#bd3535",
    values: [.3858, .1944, .1218, .0710, .0502, .0334, .0249, .0206, .0302, .0677]
  },
  {
    key: "senior", label: "Ages 65 and over", color: "#700f0f",
    values: [.3671, .1472, .1294, .0664, .0601, .0348, .0341, .0251, .0441, .0916]
  }
];

const durationStatusSeries = [
  {
    key: "food", label: "Food insecurity", color: "#d41d43",
    values: [.391365, .197489, .122140, .069741, .049654, .032266, .024405, .019829, .029004, .064109]
  },
  {
    key: "homelessness", label: "Homelessness", color: "#9698d9",
    values: [.352904, .236184, .136407, .081849, .056623, .036654, .028065, .017693, .016027, .037592]
  }
];

const mapMetricGroups = [
  {
    id: "poverty",
    label: "Insecurity",
    metrics: [
      { key: "housing_strict", label: "Homelessness", unit: "people / 1,000 households", shortUnit: "/ 1,000 households", digits: 2, description: "People assisted by RDC who experience homelessness in the broad sense, across more than 1,900 Restos du Cœur distribution centres, relative to the local number of households." },
      { key: "rdc_total", label: "Food insecurity", unit: "people / 1,000 households", shortUnit: "/ 1,000 households", digits: 1, description: "All people assisted across more than 1,900 Restos du Cœur distribution centres, relative to the local number of households." }
    ]
  },
  {
    id: "housing",
    label: "Housing and accommodation",
    metrics: [
      { key: "private_rent", label: "Private rent", unit: "€ / m²", shortUnit: "€/m²", digits: 1, description: "Average private-sector rent observed among housing-benefit recipients." },
      { key: "social_rent", label: "Social rent", unit: "€ / m²", shortUnit: "€/m²", digits: 1, description: "Weighted average rent in the social-housing sector." },
      { key: "social_stock", label: "Social-housing stock", unit: "homes / 1,000 households", shortUnit: "/ 1,000 households", digits: 1, description: "Number of social-housing units per 1,000 households." },
      { key: "social_new", label: "New social housing", unit: "new homes / 1,000 households", shortUnit: "/ 1,000 households", digits: 2, description: "New social-housing units entering service per 1,000 households." },
      { key: "social_vacancy", label: "Social-housing vacancy", unit: "%", shortUnit: "%", digits: 1, description: "Share of social-housing units that are vacant." },
      { key: "social_mobility", label: "Social-housing turnover", unit: "%", shortUnit: "%", digits: 1, description: "Annual turnover rate in the social-housing sector." },
      { key: "shelter_capacity", label: "Accommodation capacity", unit: "beds / 1,000 households", shortUnit: "/ 1,000 households", digits: 2, description: "Capacity of accommodation facilities per 1,000 households." },
      { key: "shelters", label: "Accommodation facilities", unit: "facilities / 1,000 households", shortUnit: "/ 1,000 households", digits: 3, description: "Number of accommodation facilities per 1,000 households." }
    ]
  },
  {
    id: "economy",
    label: "Local economy",
    metrics: [
      { key: "unemployment", label: "Broad unemployment", unit: "% of the labour force", shortUnit: "%", digits: 1, description: "Registered jobseekers in categories A, B, and C relative to the labour force." },
      { key: "local_income", label: "Average taxable income", unit: "€000 / resident", shortUnit: "€000 / resident", digits: 1, description: "Average annual taxable income per resident, in thousands of euros." },
      { key: "food_price", label: "Food price index", unit: "index · Haute-Garonne 2016 = 100", shortUnit: "index", digits: 1, description: "Department-level food price index, normalised to 100 for Haute-Garonne in 2016." },
      { key: "low_income_share", label: "Households in the lowest bracket", unit: "% of tax households", shortUnit: "%", digits: 1, description: "Share of tax households in the lowest taxable-income bracket." },
      { key: "firm_stock", label: "Stock of firms", unit: "firms / 1,000 households", shortUnit: "/ 1,000 households", digits: 1, description: "Total number of firms per 1,000 households." },
      { key: "firm_creations", label: "New firms", unit: "new firms / 1,000 households", shortUnit: "/ 1,000 households", digits: 1, description: "Annual new-firm registrations per 1,000 households." },
      { key: "sole_trader_creations", label: "New sole proprietorships", unit: "new firms / 1,000 households", shortUnit: "/ 1,000 households", digits: 1, description: "Annual new sole-proprietorship registrations per 1,000 households." }
    ]
  },
  {
    id: "network",
    label: "RDC network",
    metrics: [
      { key: "rdc_centers", label: "RDC centres", unit: "centres / 1,000 households", shortUnit: "/ 1,000 households", digits: 3, description: "Number of Restos du Cœur distribution centres per 1,000 households." },
      { key: "households_served", label: "Households assisted by RDC", unit: "households assisted / 1,000 households", shortUnit: "/ 1,000 households", digits: 1, description: "Households assisted across more than 1,900 Restos du Cœur distribution centres, relative to the local number of households." }
    ]
  },
  {
    id: "territory",
    label: "Area profile",
    metrics: [
      { key: "urban_share", label: "Urban population", unit: "%", shortUnit: "%", digits: 1, description: "Share of the population living in a municipality classified as urban." },
      { key: "priority_area_share", label: "Municipalities with priority neighbourhoods", unit: "% of the population", shortUnit: "%", digits: 1, description: "Share of the population living in a municipality that contains at least one priority urban-policy neighbourhood." },
      { key: "tourist_share", label: "Tourist municipalities", unit: "% of the population", shortUnit: "%", digits: 1, description: "Share of the population living in a municipality classified as a tourist area." },
      { key: "mountain_share", label: "Mountain municipalities", unit: "% of the population", shortUnit: "%", digits: 1, description: "Share of the population living in a municipality classified as a mountain area." },
      { key: "active_household_share", label: "Economically active tax households", unit: "% of households", shortUnit: "%", digits: 1, description: "Share of tax households reporting earnings from work." },
      { key: "retired_household_share", label: "Retired tax households", unit: "% of households", shortUnit: "%", digits: 1, description: "Share of tax households reporting retirement pensions." },
      { key: "average_temperature", label: "Average temperature", unit: "°C", shortUnit: "°C", digits: 1, description: "Average department-level temperature during the campaign." },
      { key: "rainfall", label: "Rainfall", unit: "average monthly mm", shortUnit: "mm", digits: 1, description: "Average monthly department-level rainfall during the campaign." },
      { key: "population_thousands", label: "Population", unit: "thousands of residents", shortUnit: "thousands", digits: 1, description: "Population of the area, expressed in thousands of residents." },
      { key: "commune_count", label: "Number of municipalities", unit: "municipalities", shortUnit: "municipalities", digits: 0, description: "Number of municipalities in the augmented living area." }
    ]
  }
];

const mapMetrics = new Map(mapMetricGroups.flatMap((group) => group.metrics.map((metric) => [metric.key, metric])));
const mapPalette = ["#f7e6d7", "#f3b58d", "#ed756f", "#b63a70", "#3a1748"];

const effectLabels = [
  "Private rents", "Social rents", "Rental listings", "Social housing",
  "Emergency accommodation", "Food prices", "Unemployment rate", "Local income",
  "Number of firms", "New sole proprietorships", "New firms"
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
let bvaMeta = { metrics: {} };
let bvaScale;
let bvaBounds;
let selectedBasinLayer = null;

function fr(value, digits = 1) {
  return value.toLocaleString("en-GB", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  });
}

function formatCountry(value) {
  if (value === 0) return "0";
  return value.toLocaleString("en-GB", {
    minimumFractionDigits: value < .1 ? 2 : 1,
    maximumFractionDigits: 2
  });
}

function showTooltip(target, html) {
  const box = target.getBoundingClientRect();
  tooltip.innerHTML = html;
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
    row.setAttribute("aria-label", `${label}: ${formatCountry(item.value)} per 100 residents`);
    row.innerHTML = `
      <span class="country-code">${label}</span>
      <span class="bar-track" aria-hidden="true"><span class="bar"></span></span>
      <span class="country-value">${formatCountry(item.value)}</span>
    `;
    const noun = item.value === 1 ? "person" : "people";
    bindTooltip(row, `<strong>${label}</strong><br>${formatCountry(item.value)} ${noun} per 100 residents`);
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
  const pieces = [`<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="International comparison: change in the homelessness rate in France and England">`];

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
      pieces.push(`<circle class="trend-point ${series}" cx="${x(year)}" cy="${y(value)}" r="4.5" tabindex="0" data-series-name="${series}" data-year="${year}" data-value="${value}" aria-label="${series === "france" ? "France, Restos du Cœur data" : "England"}, ${year}, approximately ${fr(value, 2)} people experiencing homelessness per 100 residents"></circle>`);
    });
  });
  pieces.push("</svg>");
  host.innerHTML = pieces.join("");
  host.querySelectorAll(".trend-point").forEach((point) => {
    const label = point.dataset.seriesName === "france" ? "France · RDC" : "England";
    bindTooltip(point, `<strong>${label} · ${point.dataset.year}</strong><br>≈ ${fr(Number(point.dataset.value), 2)} people experiencing homelessness per 100 residents`);
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
    row.setAttribute("aria-label", `Ages ${label}: France ${fr(france * 100, 1)}%, people assisted by RDC ${fr(rdc * 100, 1)}%, strict housing insecurity ${fr(housing * 100, 1)}%`);
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
    bindTooltip(row, `<strong>Ages ${label}</strong><br>France: ${fr(france * 100, 1)}%<br>People assisted by RDC: ${fr(rdc * 100, 1)}%<br>Strict housing insecurity: ${fr(housing * 100, 1)}%`);
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
    const readable = series.map((item, seriesIndex) => `${item.label} ${fr(values[seriesIndex] * 100, 1)}%`).join(", ");
    group.setAttribute("aria-label", `${label} campaign${label === "1" ? "" : "s"}: ${readable}`);
    group.innerHTML = `
      <span class="duration-bars" aria-hidden="true">
        ${series.map((item, seriesIndex) => `<i class="duration-column" style="--p:${(values[seriesIndex] / maximum) * 100}%;--c:${item.color}"></i>`).join("")}
      </span>
      <span class="duration-x-label">${label}</span>
    `;
    bindTooltip(group, `<strong>${label} campaign${label === "1" ? "" : "s"}</strong><br>${series.map((item, seriesIndex) => `${item.label}: ${fr(values[seriesIndex] * 100, 1)}%`).join("<br>")}`);
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
  if (!Number.isFinite(value)) return "Not available";
  return value.toLocaleString("en-GB", {
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
  if (!Number.isInteger(index) || index < 0) return "Not available";
  const { thresholds, classCount } = getMapScale(key);
  let label;
  if (!thresholds.length) {
    label = `Class ${index + 1}`;
  } else if (index === 0) {
    label = thresholds[0] === 0 ? "None" : `≤ ${formatMetricBoundary(metric, thresholds[0])}`;
  } else if (index >= classCount - 1) {
    label = `> ${formatMetricBoundary(metric, thresholds.at(-1))}`;
  } else {
    label = `${formatMetricBoundary(metric, thresholds[index - 1])} – ${formatMetricBoundary(metric, thresholds[index])}`;
  }
  return includeUnit && label !== "None" ? `${label} ${metric.shortUnit}` : label;
}

function mapClassColor(index) {
  if (index < 0) return "#cbd1dc";
  const classCount = bvaScale.classCount;
  const paletteIndex = classCount === 1 ? 2 : Math.round(index * (mapPalette.length - 1) / (classCount - 1));
  return mapPalette[paletteIndex];
}

function basinStyle(feature) {
  return {
    pane: "basins",
    color: "rgba(255,255,255,.72)",
    weight: .34,
    fillColor: mapClassColor(metricClass(feature) ?? -1),
    fillOpacity: .94
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
      : "Select an area";
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
  missing.innerHTML = "<i aria-hidden=\"true\"></i><span>Not available</span>";
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
}

async function initializeBvaMap() {
  prepareMapControls();
  const loading = document.querySelector(".map-loading");
  try {
    const [basins, metadata, departments] = await Promise.all([
      fetch("assets/bva-atlas-classes.geojson").then((response) => {
        if (!response.ok) throw new Error("Areas unavailable");
        return response.json();
      }),
      fetch("assets/bva-atlas-meta.json").then((response) => {
        if (!response.ok) throw new Error("Map metadata unavailable");
        return response.json();
      }),
      fetch("assets/departements.geojson").then((response) => {
        if (!response.ok) throw new Error("Departments unavailable");
        return response.json();
      })
    ]);
    bvaMeta = metadata;
    bvaFeatures = basins.features;
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
      .addAttribution("IGN ADMIN EXPRESS 2024 · GHWW data")
      .addTo(bvaMap);
    bvaBounds = bvaLayer.getBounds();
    bvaMap.fitBounds(bvaBounds, { padding: [10, 10] });
    bvaMap.setMaxBounds(bvaBounds.pad(.2));
    bvaMap.on("click", () => clearBasinSelection(false));

    const options = document.querySelector("#bva-options");
    bvaFeatures
      .slice()
      .sort((a, b) => a.properties.bva_name.localeCompare(b.properties.bva_name, "en"))
      .forEach((feature) => {
        const option = document.createElement("option");
        option.value = feature.properties.bva_name;
        options.appendChild(option);
      });
    renderMapLegend();
    renderBasinDetail();
    loading.remove();
  } catch (error) {
    loading.textContent = "The map could not be loaded. The other findings remain available.";
  }
}

function signed(value) {
  if (Math.abs(value) < .05) return "0";
  return `${value > 0 ? "+" : "−"}${fr(Math.abs(value), 1).replace(".0", "")}`;
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
  unemployment: "unemployment",
  rent: "private rents",
  housing: "the stock of social housing",
  firms: "the number of firms"
};

const shockEffectIndexes = {
  rent: 0,
  housing: 3,
  unemployment: 6,
  firms: 8
};

function confidenceIntervalText(kind, mode, input) {
  const [, low, high] = effectData[kind][shockEffectIndexes[mode]];
  return `Confidence interval: [${signed(input * low)}%, ${signed(input * high)}%].`;
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
      inputValue.textContent = `+${input}%`;
      const outcome = kind === "exit"
        ? "exits from housing insecurity"
        : "entries into housing insecurity";
      prefix.textContent = `A ${input}% increase in ${shockVariableLabels[mode]} leads, all else equal, to a change in ${outcome} of`;

      if (kind === "exit") {
        output.textContent = `≈ ${signed(input * exitShockCoefficients[mode])}%`;
      } else {
        output.textContent = `≈ ${signed(input * entryShockCoefficients[mode])}%`;
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
    row.setAttribute("aria-label", `${effectLabels[index]}: coefficient ${fr(estimate, 2)}, displayed interval from ${fr(low, 2)} to ${fr(high, 2)}`);
    row.innerHTML = `
      <span class="effect-label" title="${effectLabels[index]}">${effectLabels[index]}</span>
      <span class="effect-plot" aria-hidden="true"><i class="effect-interval"></i><i class="effect-dot"></i></span>
    `;
    bindTooltip(row, `<strong>${effectLabels[index]}</strong><br>Coefficient: ${fr(estimate, 2)}<br>Displayed interval: ${fr(low, 2)} to ${fr(high, 2)}`);
    host.appendChild(row);
  });
  document.querySelector(noteSelector).textContent = mode === "entry"
    ? "When an interval does not cross zero, the effect is statistically significant at a confidence level above 90%."
    : "The same reading rule applies: an interval that does not cross zero indicates significance above 90%. Overall, macroeconomic effects on exits are markedly less robust.";
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
