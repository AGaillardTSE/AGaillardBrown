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

const urssafSectors = [
  ["c1", "Food industries"], ["c2", "Coking and refining"],
  ["c3", "Electrical, electronic and computer equipment"], ["c4", "Transport equipment"],
  ["c5", "Other manufactured products"], ["de", "Extractive industries, energy and water"],
  ["fz", "Construction"], ["gz", "Trade"], ["hz", "Transport"],
  ["iz", "Accommodation and food services"], ["jz", "Information and communication"],
  ["kz", "Finance and insurance"], ["lz", "Real estate"],
  ["mn", "Professional, technical and administrative services"],
  ["oq", "Government, education, health and social work"], ["ru", "Other services"]
];
const urssafSource = "Urssaf open data (ODbL) · IGN ADMIN EXPRESS 2024";
const urssafDensitySource = "Urssaf open data (ODbL) · annual population from the study database · IGN ADMIN EXPRESS 2024";
const rentControlSource = "ANIL · Service-Public · prefectural orders and perimeter decrees · IGN ADMIN EXPRESS 2024";
const urssafPeriods = {
  level: "Year 2025",
  change_2018_2023: "2018 → 2023",
  change_2021_2023: "2021 → 2023"
};
const urssafDensityPeriods = {
  level: "Year 2024 · 2024 population",
  change_2018_2023: "2018 → 2023 · each year’s population",
  change_2021_2023: "2021 → 2023 · each year’s population"
};

function urssafSectorMetrics(kind) {
  const isEmployment = kind === "employees";
  return urssafSectors.map(([code, label]) => ({
    key: `urssaf_${kind}_${code}`,
    label,
    unit: isEmployment ? "private-sector employees" : "employer establishments",
    shortUnit: isEmployment ? "employees" : "establishments",
    digits: 0,
    modes: ["level"],
    periods: urssafPeriods,
    source: urssafSource,
    description: isEmployment
      ? `Employees in “${label}” covered by the general social-security scheme at year-end 2025. Cells subject to statistical confidentiality remain unavailable.`
      : `Employer establishments (Urssaf contributor accounts) in “${label}” in 2025. This is not a count of legally distinct firms.`
  }));
}

const mapMetricGroups = [
  {
    id: "poverty",
    label: "Insecurity",
    metrics: [
      { key: "housing_strict", label: "Homelessness in the strict sense", unit: "people / 1,000 households", shortUnit: "/ 1,000 households", digits: 2, description: "People living on the street or without their own housing, including those temporarily accommodated in emergency shelters (CHU), social reintegration accommodation centers (CHRS), or hotels, relative to the local number of households." },
      { key: "housing_insecurity", label: "Housing insecurity", unit: "RDC household records / 1,000 households", shortUnit: "/ 1,000 households", digits: 2, description: "Records of households assisted by RDC that are homeless, do not have their own housing, are temporarily accommodated, or live in precarious or inadequate housing, relative to the local number of households. This category includes homelessness." },
      { key: "rdc_total", label: "Food insecurity", unit: "people / 1,000 households", shortUnit: "/ 1,000 households", digits: 1, description: "People supported by RDC and belonging to households that identify themselves as needing food assistance, relative to the local number of households." }
    ]
  },
  {
    id: "housing",
    label: "Housing and accommodation",
    metrics: [
      { key: "private_rent", label: "Private rent", unit: "€ / m²", shortUnit: "€/m²", digits: 1, description: "These rents are averages calculated across all private-sector tenants who receive housing assistance (APL)." },
      { key: "rent_control_population_share_current", label: "Population in a municipality with rent caps", unit: "% of basin population", shortUnit: "%", digits: 1, modes: ["level"], periods: { level: "Position at 12 October 2026" }, source: rentControlSource, description: "Share of the basin population living in a municipality wholly or partly subject to rent-level caps. For the eight Grenoble municipalities covered only in part, this is an upper bound because the whole municipal population is counted. Hover over a treated basin to see municipalities and effective dates." },
      { key: "social_rent", label: "Public housing rent", unit: "€ / m²", shortUnit: "€/m²", digits: 1, description: "Weighted average rent in the public-housing sector." },
      { key: "social_stock", label: "Public-housing stock", unit: "homes / 1,000 households", shortUnit: "/ 1,000 households", digits: 1, description: "Number of public-housing units per 1,000 households." },
      { key: "social_new", label: "New public housing", unit: "new homes / 1,000 households", shortUnit: "/ 1,000 households", digits: 2, description: "New public-housing units entering service per 1,000 households." },
      { key: "social_vacancy", label: "Public-housing vacancy", unit: "%", shortUnit: "%", digits: 1, description: "Share of public-housing units that are vacant." },
      { key: "social_mobility", label: "Public-housing turnover", unit: "%", shortUnit: "%", digits: 1, description: "Annual turnover rate in the public-housing sector." },
      { key: "shelter_capacity", label: "Accommodation capacity", unit: "beds / 1,000 households", shortUnit: "/ 1,000 households", digits: 2, description: "Capacity of accommodation facilities per 1,000 households." },
      { key: "shelters", label: "Accommodation facilities", unit: "facilities / 1,000 households", shortUnit: "/ 1,000 households", digits: 3, description: "Number of accommodation facilities per 1,000 households." }
    ]
  },
  {
    id: "economy",
    label: "Local economy",
    metrics: [
      { key: "unemployment", label: "Broad unemployment", unit: "% of the labor force", shortUnit: "%", digits: 1, description: "Unemployment rates for categories A, B, and C: the number of people who are unemployed or working reduced hours relative to the size of the labor force." },
      { key: "local_income", label: "Average taxable income", unit: "€000 / resident", shortUnit: "€000 / resident", digits: 1, description: "Average annual taxable income per resident, in thousands of euros." },
      { key: "food_price", label: "Food price index", unit: "index · Haute-Garonne 2016 = 100", shortUnit: "index", digits: 1, description: "Department-level food price index, normalized to 100 for Haute-Garonne in 2016." },
      { key: "low_income_share", label: "Households in the lowest bracket", unit: "% of tax households", shortUnit: "%", digits: 1, description: "Share of tax households in the lowest taxable-income bracket." },
      { key: "firm_stock", label: "Stock of firms", unit: "firms / 1,000 households", shortUnit: "/ 1,000 households", digits: 1, description: "Total number of firms per 1,000 households." },
      { key: "firm_creations", label: "New firms", unit: "new firms / 1,000 households", shortUnit: "/ 1,000 households", digits: 1, description: "Annual new-firm registrations per 1,000 households." },
      { key: "sole_trader_creations", label: "New sole proprietorships", unit: "new firms / 1,000 households", shortUnit: "/ 1,000 households", digits: 1, description: "Annual new sole-proprietorship registrations per 1,000 households." }
    ]
  },
  {
    id: "urssaf-totals",
    label: "Urssaf · all sectors",
    metrics: [
      { key: "urssaf_establishments_total", label: "Employer establishments", unit: "employer establishments", shortUnit: "establishments", digits: 0, periods: urssafPeriods, source: urssafSource, description: "Number of employer establishments, or Urssaf contributor accounts. The scope mainly covers private-sector employers under the general social-security scheme; it is not a count of legally distinct firms." },
      { key: "urssaf_employees_total", label: "Private-sector employees", unit: "employees", shortUnit: "employees", digits: 0, periods: urssafPeriods, source: urssafSource, description: "Year-end employees in employer establishments covered by the general social-security scheme. Cells subject to statistical confidentiality are not imputed and appear as unavailable." },
      { key: "urssaf_establishments_per_1000_residents", label: "Employer establishments / 1,000 residents", unit: "employer establishments / 1,000 residents", shortUnit: "estab. / 1,000 residents", digits: 1, periods: urssafDensityPeriods, source: urssafDensitySource, description: "Employer establishments located in the area, divided by the population from the same year. The level uses 2024, the latest almost-complete population year; one area remains unavailable." },
      { key: "urssaf_employees_per_1000_residents", label: "Private-sector employees / 1,000 residents", unit: "employees / 1,000 residents", shortUnit: "employees / 1,000 residents", digits: 1, periods: urssafDensityPeriods, source: urssafDensitySource, description: "Employees located at employer establishments in the area, divided by the population from the same year. This is a workplace employment-density measure, not the employment rate of local residents. An area is not displayed when its exact total is unknown because of statistical confidentiality or when its population is missing." }
    ]
  },
  {
    id: "urssaf-employees",
    label: "Urssaf · employees by sector",
    metrics: urssafSectorMetrics("employees")
  },
  {
    id: "urssaf-establishments",
    label: "Urssaf · establishments by sector",
    metrics: urssafSectorMetrics("establishments")
  },
  {
    id: "network",
    label: "RDC network",
    metrics: [
      { key: "rdc_centers", label: "RDC centers", unit: "centers / 1,000 households", shortUnit: "/ 1,000 households", digits: 3, description: "Number of RDC distribution centers per 1,000 households." },
      { key: "households_served", label: "Households assisted by RDC", unit: "households assisted / 1,000 households", shortUnit: "/ 1,000 households", digits: 1, description: "Households assisted across more than 1,900 RDC distribution centers, relative to the local number of households." }
    ]
  },
  {
    id: "territory",
    label: "Area profile",
    metrics: [
      { key: "urban_share", label: "Urban population", unit: "%", shortUnit: "%", digits: 1, description: "Share of the population living in a municipality classified as urban." },
      { key: "priority_area_share", label: "Municipalities with priority neighborhoods", unit: "% of the population", shortUnit: "%", digits: 1, description: "Share of the population living in a municipality that contains at least one priority urban-policy neighborhood." },
      { key: "tourist_share", label: "Tourist municipalities", unit: "% of the population", shortUnit: "%", digits: 1, description: "Share of the population living in a municipality classified as a tourist area." },
      { key: "mountain_share", label: "Mountain municipalities", unit: "% of the population", shortUnit: "%", digits: 1, description: "Share of the population living in a municipality classified as a mountain area." },
      { key: "active_household_share", label: "Economically active tax households", unit: "% of households", shortUnit: "%", digits: 1, description: "Share of tax households reporting earnings from work." },
      { key: "retired_household_share", label: "Retired tax households", unit: "% of households", shortUnit: "%", digits: 1, description: "Share of tax households reporting retirement pensions." },
      { key: "average_temperature", label: "Average temperature", unit: "°C", shortUnit: "°C", digits: 1, description: "Average department-level temperature during the campaign." },
      { key: "rainfall", label: "Rainfall", unit: "average monthly mm", shortUnit: "mm", digits: 1, description: "Average monthly department-level rainfall during the campaign." },
      { key: "population_thousands", label: "Population", unit: "thousands of residents", shortUnit: "thousands", digits: 1, description: "Population of the area, expressed in thousands of residents." },
      { key: "commune_count", label: "Number of municipalities", unit: "municipalities", shortUnit: "municipalities", digits: 0, description: "Number of municipalities in the augmented living basin." }
    ]
  }
];

const mapMetrics = new Map(mapMetricGroups.flatMap((group) => group.metrics.map((metric) => [metric.key, metric])));
const mapPalette = ["#f7e6d7", "#f3b58d", "#ed756f", "#b63a70", "#3a1748"];
const mapChangePalette = ["#285a9f", "#8ab3dc", "#f1eee7", "#f2a37f", "#bd2357"];
const mapNegativePalette = ["#285a9f", "#4f7fba", "#8ab3dc", "#c6d9ed", "#e8f0f7"];
const mapPositivePalette = ["#fde8e0", "#f7c2ad", "#ef8b7b", "#d95270", "#bd2357"];
const mapModes = {
  level: { suffix: "", period: "Winter 2022–2023", exportSlug: "level-2022-2023" },
  change_2018_2023: {
    suffix: "__change_2018_2023",
    period: "Winter 2018–2019 → winter 2022–2023",
    rangePhrase: "from winter 2018–2019 to winter 2022–2023",
    exportSlug: "change-2018-2023"
  },
  change_2021_2023: {
    suffix: "__change_2021_2023",
    period: "Winter 2021–2022 → winter 2022–2023",
    rangePhrase: "from winter 2021–2022 to winter 2022–2023",
    exportSlug: "change-2021-2023"
  }
};
const mapChangeConfig = {
  housing_strict: { unit: "change per 1,000 households", shortUnit: "pt / 1,000 households", digits: 2, method: "points" },
  housing_insecurity: { unit: "change per 1,000 households", shortUnit: "pt / 1,000 households", digits: 2, method: "points" },
  rdc_total: { unit: "change per 1,000 households", shortUnit: "pt / 1,000 households", digits: 1, method: "points" },
  private_rent: { unit: "% change", shortUnit: "%", digits: 1, method: "percent" },
  social_rent: { unit: "% change", shortUnit: "%", digits: 1, method: "percent" },
  social_stock: { unit: "change per 1,000 households", shortUnit: "pt / 1,000 households", digits: 1, method: "points" },
  social_new: { unit: "change per 1,000 households", shortUnit: "pt / 1,000 households", digits: 2, method: "points" },
  social_vacancy: { unit: "percentage-point change", shortUnit: "pp", digits: 1, method: "percentage-points" },
  social_mobility: { unit: "percentage-point change", shortUnit: "pp", digits: 1, method: "percentage-points" },
  shelter_capacity: { unit: "change per 1,000 households", shortUnit: "pt / 1,000 households", digits: 2, method: "points" },
  shelters: { unit: "change per 1,000 households", shortUnit: "pt / 1,000 households", digits: 3, method: "points" },
  unemployment: { unit: "percentage-point change", shortUnit: "pp", digits: 1, method: "percentage-points" },
  local_income: { unit: "% change", shortUnit: "%", digits: 1, method: "percent" },
  food_price: { unit: "% change", shortUnit: "%", digits: 1, method: "percent" },
  low_income_share: { unit: "percentage-point change", shortUnit: "pp", digits: 1, method: "percentage-points" },
  firm_stock: { unit: "% change", shortUnit: "%", digits: 1, method: "percent" },
  firm_creations: { unit: "% change", shortUnit: "%", digits: 1, method: "percent" },
  sole_trader_creations: { unit: "% change", shortUnit: "%", digits: 1, method: "percent" },
  urssaf_establishments_total: { unit: "% change", shortUnit: "%", digits: 1, method: "percent" },
  urssaf_employees_total: { unit: "% change", shortUnit: "%", digits: 1, method: "percent" },
  urssaf_establishments_per_1000_residents: { unit: "% change", shortUnit: "%", digits: 1, method: "percent" },
  urssaf_employees_per_1000_residents: { unit: "% change", shortUnit: "%", digits: 1, method: "percent" },
  rdc_centers: { unit: "change per 1,000 households", shortUnit: "pt / 1,000 households", digits: 3, method: "points" },
  households_served: { unit: "change per 1,000 households", shortUnit: "pt / 1,000 households", digits: 1, method: "points" },
  urban_share: { unit: "percentage-point change", shortUnit: "pp", digits: 1, method: "percentage-points" },
  priority_area_share: { unit: "percentage-point change", shortUnit: "pp", digits: 1, method: "percentage-points" },
  tourist_share: { unit: "percentage-point change", shortUnit: "pp", digits: 1, method: "percentage-points" },
  mountain_share: { unit: "percentage-point change", shortUnit: "pp", digits: 1, method: "percentage-points" },
  active_household_share: { unit: "percentage-point change", shortUnit: "pp", digits: 1, method: "percentage-points" },
  retired_household_share: { unit: "percentage-point change", shortUnit: "pp", digits: 1, method: "percentage-points" },
  average_temperature: { unit: "change in °C", shortUnit: "°C", digits: 1, method: "temperature" },
  rainfall: { unit: "% change", shortUnit: "%", digits: 1, method: "percent" },
  population_thousands: { unit: "% change", shortUnit: "%", digits: 1, method: "percent" }
};

const effectLabels = [
  "Private Rent Levels", "Public Housing Rent Levels", "Number of Rental Listings", "Number of Public Housing Units",
  "Emergency Housing", "Food Prices", "Unemployment Rate", "Average Local Incomes",
  "Number of Businesses", "New sole proprietorships", "New Business Start-ups"
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
let mapModeKey = "level";
let bvaMap;
let bvaLayer;
let bvaFeatures = [];
let departmentFeatures = [];
let rentControlFeatures = [];
let rentControlLayer;
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
    row.setAttribute("aria-label", `Ages ${label}: France ${fr(france * 100, 1)}%, people assisted by RDC ${fr(rdc * 100, 1)}%, housing insecurity ${fr(housing * 100, 1)}%`);
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
    bindTooltip(row, `<strong>Ages ${label}</strong><br>France: ${fr(france * 100, 1)}%<br>People assisted by RDC: ${fr(rdc * 100, 1)}%<br>Housing insecurity: ${fr(housing * 100, 1)}%`);
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

function mapDataKey(key = mapMetricKey) {
  return `${key}${mapModes[mapModeKey]?.suffix || ""}`;
}

function activeMapMetric(key = mapMetricKey) {
  const base = mapMetrics.get(key);
  if (mapModeKey === "level") return base;
  const change = mapChangeConfig[key];
  if (!change) return base;
  const rangePhrase = key.startsWith("urssaf_")
    ? (mapModeKey === "change_2018_2023" ? "from 2018 to 2023" : "from 2021 to 2023")
    : mapModes[mapModeKey].rangePhrase;
  const methodDescriptions = {
    percent: `Relative change ${rangePhrase}, expressed as a percentage.`,
    "percentage-points": `Change ${rangePhrase}, expressed in percentage points.`,
    points: `Change ${rangePhrase}, expressed in ${change.shortUnit}.`,
    temperature: `Change ${rangePhrase}, expressed in degrees Celsius.`
  };
  return {
    ...base,
    ...change,
    label: `Change · ${base.label}`,
    description: `${base.description} ${methodDescriptions[change.method]}`,
    signed: true
  };
}

function activeMapPeriod(metric = activeMapMetric()) {
  return metric?.periods?.[mapModeKey] || mapModes[mapModeKey].period;
}

function metricClass(feature, key = mapDataKey()) {
  const value = feature?.properties?.[key];
  return Number.isInteger(value) && value >= 0 ? value : null;
}

function formatMetricBoundary(metric, value) {
  if (!Number.isFinite(value)) return "Not available";
  const formatted = Math.abs(value).toLocaleString("en-GB", {
    minimumFractionDigits: metric.digits,
    maximumFractionDigits: metric.digits
  });
  if (!metric.signed || value === 0) return value < 0 ? `−${formatted}` : formatted;
  return `${value > 0 ? "+" : "−"}${formatted}`;
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
  return {
    thresholds,
    classCount,
    palette: source.palette || null,
    negativeClassCount: Number.isInteger(source.negativeClassCount) ? source.negativeClassCount : null
  };
}

function classRangeLabel(metric, key, index, includeUnit = true) {
  if (!Number.isInteger(index) || index < 0) return "Not available";
  const { thresholds, classCount } = getMapScale(key);
  let label;
  if (!thresholds.length) {
    label = `Class ${index + 1}`;
  } else if (index === 0) {
    label = mapModeKey === "level" && !metric.signed && thresholds[0] === 0 ? "None" : `≤ ${formatMetricBoundary(metric, thresholds[0])}`;
  } else if (index >= classCount - 1) {
    label = `> ${formatMetricBoundary(metric, thresholds.at(-1))}`;
  } else {
    label = `${formatMetricBoundary(metric, thresholds[index - 1])} – ${formatMetricBoundary(metric, thresholds[index])}`;
  }
  return includeUnit && label !== "None" ? `${label} ${metric.shortUnit}` : label;
}

function numericClassRangeLabel(metric, key, index) {
  if (!Number.isInteger(index) || index < 0) return "";
  const { thresholds } = getMapScale(key);
  if (!thresholds.length) return String(index + 1);
  if (mapModeKey === "level" && !metric.signed && index === 0 && thresholds[0] === 0) return formatMetricBoundary(metric, 0);
  return classRangeLabel(metric, key, index, false);
}

function resamplePalette(palette, count) {
  if (count <= 0) return [];
  if (count === 1) return [palette[Math.floor((palette.length - 1) / 2)]];
  return Array.from({ length: count }, (_, index) => (
    palette[Math.round(index * (palette.length - 1) / (count - 1))]
  ));
}

function activeMapPalette() {
  const scale = bvaScale || getMapScale(mapDataKey());
  const paletteType = scale.palette || (mapModeKey === "level" ? "sequential" : "diverging");
  if (paletteType === "negative") return resamplePalette(mapNegativePalette, scale.classCount);
  if (paletteType === "positive") return resamplePalette(mapPositivePalette, scale.classCount);
  if (paletteType === "diverging" && scale.negativeClassCount) {
    return [
      ...resamplePalette(mapNegativePalette, scale.negativeClassCount),
      ...resamplePalette(mapPositivePalette, scale.classCount - scale.negativeClassCount)
    ];
  }
  return resamplePalette(paletteType === "diverging" ? mapChangePalette : mapPalette, scale.classCount);
}

function mapClassColor(index) {
  if (index < 0) return "#cbd1dc";
  return activeMapPalette()[index] || "#cbd1dc";
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
    const contextMetric = activeMapMetric(key);
    const dataKey = mapDataKey(key);
    document.querySelector(selector).textContent = feature
      ? classRangeLabel(contextMetric, dataKey, metricClass(feature, dataKey), true)
      : "Select an area";
  });
}

function tooltipFor(feature) {
  const metric = activeMapMetric();
  const dataKey = mapDataKey();
  const rentControlDetails = metric.key.startsWith("rent_control_") && feature.properties.rent_control_public_summary
    ? `<br><span>${escapeHtml(feature.properties.rent_control_public_summary)}</span><br><span>Municipalities: ${escapeHtml(feature.properties.rent_control_public_communes)}</span>`
    : "";
  return `<strong>${escapeHtml(feature.properties.bva_name)}</strong><br>${escapeHtml(metric.label)} : ${escapeHtml(classRangeLabel(metric, dataKey, metricClass(feature), true))}${rentControlDetails}`;
}

function onEachRentControlCommune(feature, layer) {
  const p = feature.properties || {};
  layer.bindTooltip(
    `<strong>${escapeHtml(p.commune || "Municipality")}</strong><br>${escapeHtml(p.territoire || "")}`
      + `<br>In force since ${escapeHtml(p.date_debut || "")}`
      + `<br>${escapeHtml(p.couverture === "couverture partielle" ? "partial coverage" : "whole municipality")}`,
    { sticky: true, direction: "top", opacity: 1 }
  );
}

function updateRentControlOverlay() {
  if (!bvaMap || !rentControlLayer) return;
  const shouldShow = activeMapMetric().key.startsWith("rent_control_");
  if (shouldShow && !bvaMap.hasLayer(rentControlLayer)) rentControlLayer.addTo(bvaMap);
  if (!shouldShow && bvaMap.hasLayer(rentControlLayer)) bvaMap.removeLayer(rentControlLayer);
}

function renderMapLegend() {
  const host = document.querySelector("#map-legend");
  const metric = activeMapMetric();
  const dataKey = mapDataKey();
  const { thresholds, classCount } = bvaScale;
  host.replaceChildren();
  const palette = activeMapPalette();
  for (let index = 0; index < classCount; index += 1) {
    const row = document.createElement("div");
    row.className = "legend-segment";
    row.style.setProperty("--c", palette[index]);
    const label = classRangeLabel(metric, dataKey, index, true);
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
  const metric = activeMapMetric(key);
  const dataKey = mapDataKey(key);
  document.querySelector("#map-title").textContent = metric.label;
  document.querySelector("#map-description").textContent = metric.description;
  document.querySelector("#map-period").textContent = activeMapPeriod(metric);
  const sourcePill = document.querySelector("#map-source-pill");
  if (sourcePill) sourcePill.textContent = metric.source || "Leaflet · IGN municipal geometry · augmented living-basin classes";
  if (!bvaFeatures.length) return;
  bvaScale = getMapScale(dataKey);
  bvaLayer.eachLayer((layer) => {
    layer.setStyle(basinStyle(layer.feature));
    layer.setTooltipContent(tooltipFor(layer.feature));
  });
  if (selectedBasinLayer) highlightBasin(selectedBasinLayer, true);
  updateRentControlOverlay();
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
    context.setLineDash(style.dash || []);
    context.stroke();
    context.setLineDash([]);
  }
}

function drawRentControlForExport(context, offsetY, scale, project) {
  if (!activeMapMetric().key.startsWith("rent_control_")) return;
  rentControlFeatures.forEach((feature) => {
    const partial = feature.properties?.couverture === "couverture partielle";
    drawFeatureForExport(context, feature, 0, offsetY, scale, {
      fill: "rgba(255,79,139,.10)",
      stroke: "#ff2f78",
      lineWidth: Math.max(partial ? 1.6 : 2.1, (partial ? 1.15 : 1.5) * scale),
      dash: partial ? [7, 5] : []
    }, project);
  });
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

function setMapDownloadButtonsDisabled(disabled) {
  document.querySelectorAll(".map-download").forEach((button) => {
    button.disabled = disabled;
  });
}

async function downloadSimpleMapAsPng(event) {
  const button = event?.currentTarget || document.querySelector("#map-download-simple");
  const status = document.querySelector("#map-download-status");
  if (!bvaMap || !bvaLayer || !bvaFeatures.length || button.disabled) return;
  const defaultLabel = "Map-only PNG";
  const exportMetric = activeMapMetric();
  const exportDataKey = mapDataKey();
  const exportModeSlug = mapExportSlug(activeMapPeriod(exportMetric));
  setMapDownloadButtonsDisabled(true);
  button.textContent = "Preparing…";
  status.textContent = "Preparing the map-only PNG.";
  try {
    if (document.fonts?.ready) await document.fonts.ready;
    bvaMap.stop();
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

    const mapHost = document.querySelector("#bva-map");
    const mapRect = mapHost.getBoundingClientRect();
    if (!mapRect.width || !mapRect.height) throw new Error("Map is not visible");

    const width = 1440;
    const mapWidth = width;
    const mapScale = mapWidth / mapRect.width;
    const mapZoom = bvaMap.getZoom();
    const pixelOrigin = bvaMap.getPixelOrigin();
    const paneOffset = bvaMap.layerPointToContainerPoint(L.point(0, 0));
    const project = ([longitude, latitude]) => bvaMap.project(L.latLng(latitude, longitude), mapZoom)
      .subtract(pixelOrigin)
      .add(paneOffset);
    const { classCount } = bvaScale;
    const legendPadding = 12;
    const legendRowHeight = 36;
    const legendHeight = legendPadding * 2 + (classCount + 1) * legendRowHeight;
    const height = Math.max(Math.round(mapRect.height * mapScale), legendHeight + 64);
    const pixelRatio = 2;
    const canvas = document.createElement("canvas");
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    const context = canvas.getContext("2d");
    context.scale(pixelRatio, pixelRatio);
    context.textBaseline = "top";

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);

    context.save();
    context.beginPath();
    context.rect(0, 0, mapWidth, height);
    context.clip();
    bvaFeatures.forEach((feature) => {
      const fill = mapClassColor(metricClass(feature) ?? -1);
      drawFeatureForExport(context, feature, 0, 0, mapScale, {
        fill,
        stroke: fill,
        lineWidth: Math.max(1.25, 1.05 * mapScale)
      }, project);
    });
    departmentFeatures.forEach((feature) => drawFeatureForExport(context, feature, 0, 0, mapScale, {
      stroke: "rgba(11,16,32,.62)",
      lineWidth: Math.max(1.15, .85 * mapScale)
    }, project));
    drawRentControlForExport(context, 0, mapScale, project);
    if (selectedBasinLayer?.feature) drawFeatureForExport(context, selectedBasinLayer.feature, 0, 0, mapScale, {
      stroke: "#0b1020",
      lineWidth: Math.max(3, 2.1 * mapScale)
    }, project);
    context.restore();

    const legendX = 32;
    const legendY = 32;

    let cursorY = legendY + legendPadding;
    for (let index = 0; index < classCount; index += 1) {
      const color = mapClassColor(index);
      context.fillStyle = color;
      context.fillRect(legendX + legendPadding, cursorY + 2, 46, 26);
      context.strokeStyle = "#bdc5d3";
      context.lineWidth = 1;
      context.strokeRect(legendX + legendPadding, cursorY + 2, 46, 26);
      const legendLabel = numericClassRangeLabel(exportMetric, exportDataKey, index);
      const legendTextX = legendX + legendPadding + 56;
      const legendTextY = cursorY + 3;
      context.font = "700 21px Inter, Arial, sans-serif";
      context.strokeStyle = "rgba(255,255,255,.94)";
      context.lineWidth = 5;
      context.lineJoin = "round";
      context.strokeText(legendLabel, legendTextX, legendTextY);
      context.fillStyle = "#1c2436";
      context.fillText(legendLabel, legendTextX, legendTextY);
      cursorY += legendRowHeight;
    }
    context.fillStyle = "#cbd1dc";
    context.fillRect(legendX + legendPadding, cursorY + 2, 46, 26);
    context.strokeStyle = "#bdc5d3";
    context.lineWidth = 1;
    context.strokeRect(legendX + legendPadding, cursorY + 2, 46, 26);
    const missingTextX = legendX + legendPadding + 56;
    const missingTextY = cursorY + 3;
    context.font = "700 21px Inter, Arial, sans-serif";
    context.strokeStyle = "rgba(255,255,255,.94)";
    context.lineWidth = 5;
    context.lineJoin = "round";
    context.strokeText("Not available", missingTextX, missingTextY);
    context.fillStyle = "#1c2436";
    context.fillText("Not available", missingTextX, missingTextY);

    const areaSlug = mapExportSlug(selectedBasinLayer?.feature?.properties?.bva_name || "france");
    const filename = `map-${mapMetricKey.replaceAll("_", "-")}-${exportModeSlug}-${areaSlug}-map-only.png`;
    const exportInfo = await downloadCanvas(canvas, filename);
    const sizeLabel = exportInfo.bytes ? `, ${Math.round(exportInfo.bytes / 1024)} KB` : "";
    status.textContent = `Map-only PNG generated: ${filename}, ${canvas.width} × ${canvas.height} pixels${sizeLabel}.`;
  } catch (error) {
    console.error("Map download failed", error);
    status.textContent = "The map download failed. Please try again.";
    button.textContent = "Try again";
    window.setTimeout(() => { button.textContent = defaultLabel; }, 1800);
    return;
  } finally {
    setMapDownloadButtonsDisabled(false);
  }
  button.textContent = "PNG downloaded";
  window.setTimeout(() => { button.textContent = defaultLabel; }, 1400);
}

async function downloadContextMapAsPng(event) {
  const button = event?.currentTarget || document.querySelector("#map-download-context");
  const status = document.querySelector("#map-download-status");
  if (!bvaMap || !bvaLayer || !bvaFeatures.length || button.disabled) return;
  const defaultLabel = "Full PNG";
  const exportMetric = activeMapMetric();
  const exportDataKey = mapDataKey();
  const exportPeriod = mapModeKey === "level"
    ? `Level · ${activeMapPeriod(exportMetric)}`
    : `Change · ${activeMapPeriod(exportMetric)}`;
  setMapDownloadButtonsDisabled(true);
  button.textContent = "Preparing…";
  status.textContent = "Preparing the full PNG.";
  try {
    if (document.fonts?.ready) await document.fonts.ready;
    bvaMap.stop();
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

    const mapHost = document.querySelector("#bva-map");
    const mapRect = mapHost.getBoundingClientRect();
    if (!mapRect.width || !mapRect.height) throw new Error("Map is not visible");

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
    context.fillText("INTERACTIVE RESEARCH NOTE · MAP", 46, 30);
    context.fillStyle = "#ffffff";
    context.font = "600 42px Georgia, serif";
    context.fillText(exportMetric.label, 46, 58);
    context.fillStyle = "#b7c0d4";
    context.font = "500 18px Inter, Arial, sans-serif";
    context.fillText(`Augmented living basins · ${exportPeriod}`, 48, 116);

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
    drawRentControlForExport(context, mapY, mapScale, project);
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
    context.fillText("LEGEND", sideX + sidePadding, mapY + 34);
    context.fillStyle = "#ffffff";
    context.font = "600 29px Georgia, serif";
    let cursorY = drawWrappedCanvasText(context, exportMetric.label, sideX + sidePadding, mapY + 59, textWidth, 35, 2) + 10;
    context.fillStyle = "#c0c9dc";
    context.font = "400 17px Inter, Arial, sans-serif";
    cursorY = drawWrappedCanvasText(context, exportMetric.description, sideX + sidePadding, cursorY, textWidth, 25, 6) + 24;

    const { classCount } = bvaScale;
    for (let index = 0; index < classCount; index += 1) {
      const color = mapClassColor(index);
      context.fillStyle = color;
      context.fillRect(sideX + sidePadding, cursorY + 2, 38, 22);
      context.strokeStyle = "rgba(255,255,255,.35)";
      context.lineWidth = 1;
      context.strokeRect(sideX + sidePadding, cursorY + 2, 38, 22);
      context.fillStyle = "#e5e9f3";
      context.font = "500 18px Inter, Arial, sans-serif";
      context.fillText(classRangeLabel(exportMetric, exportDataKey, index, true), sideX + sidePadding + 54, cursorY + 2);
      cursorY += 42;
    }
    context.fillStyle = "#cbd1dc";
    context.fillRect(sideX + sidePadding, cursorY + 2, 38, 22);
    context.strokeStyle = "rgba(255,255,255,.35)";
    context.strokeRect(sideX + sidePadding, cursorY + 2, 38, 22);
    context.fillStyle = "#e5e9f3";
    context.font = "500 18px Inter, Arial, sans-serif";
    context.fillText("Not available", sideX + sidePadding + 54, cursorY + 2);
    cursorY += 58;

    if (selectedBasinLayer?.feature?.properties?.bva_name) {
      context.fillStyle = "#ef2d68";
      context.font = "800 13px Inter, Arial, sans-serif";
      context.fillText("SELECTED AREA", sideX + sidePadding, cursorY);
      context.fillStyle = "#ffffff";
      context.font = "600 21px Georgia, serif";
      drawWrappedCanvasText(context, selectedBasinLayer.feature.properties.bva_name, sideX + sidePadding, cursorY + 25, textWidth, 27, 3);
    }

    const footerY = headerHeight + bodyHeight;
    context.fillStyle = "#10162b";
    context.fillRect(0, footerY, width, footerHeight);
    context.fillStyle = "#b7c0d4";
    context.font = "500 14px Inter, Arial, sans-serif";
    context.fillText(`Source: ${exportMetric.source || "Restos du Cœur · IGN ADMIN EXPRESS 2024 · GHWW"}`, 46, footerY + 23);
    context.textAlign = "right";
    context.fillText("Extreme Poverty in Wealthy Nations", width - 40, footerY + 23);
    context.textAlign = "left";

    const areaSlug = mapExportSlug(selectedBasinLayer?.feature?.properties?.bva_name || "france");
    const filename = `map-${mapMetricKey.replaceAll("_", "-")}-${mapExportSlug(activeMapPeriod(exportMetric))}-${areaSlug}-full.png`;
    const exportInfo = await downloadCanvas(canvas, filename);
    const sizeLabel = exportInfo.bytes ? `, ${Math.round(exportInfo.bytes / 1024)} KB` : "";
    status.textContent = `Full PNG generated: ${filename}, ${canvas.width} × ${canvas.height} pixels${sizeLabel}.`;
  } catch (error) {
    console.error("Full map download failed", error);
    status.textContent = "The full map download failed. Please try again.";
    button.textContent = "Try again";
    window.setTimeout(() => { button.textContent = defaultLabel; }, 1800);
    return;
  } finally {
    setMapDownloadButtonsDisabled(false);
  }
  button.textContent = "PNG downloaded";
  window.setTimeout(() => { button.textContent = defaultLabel; }, 1400);
}

function prepareMapControls() {
  const modeSelect = document.querySelector("#map-mode");
  const themeSelect = document.querySelector("#map-theme");
  const variableSelect = document.querySelector("#map-variable");

  const groupsForMode = () => mapMetricGroups
    .map((group) => ({
      ...group,
      metrics: group.metrics.filter((metric) => {
        if (metric.modes && !metric.modes.includes(mapModeKey)) return false;
        return mapModeKey === "level" || mapChangeConfig[metric.key];
      })
    }))
    .filter((group) => group.metrics.length);

  const populateVariables = (groupId, preferredKey = null) => {
    const groups = groupsForMode();
    const group = groups.find((item) => item.id === groupId) || groups[0];
    variableSelect.replaceChildren();
    group.metrics.forEach((metric) => variableSelect.add(new Option(metric.label, metric.key)));
    const nextKey = group.metrics.some((metric) => metric.key === preferredKey) ? preferredKey : group.metrics[0].key;
    variableSelect.value = nextKey;
    setMapMetric(nextKey);
  };

  const populateThemes = (preferredGroupId = "poverty") => {
    const groups = groupsForMode();
    themeSelect.replaceChildren();
    groups.forEach((group) => themeSelect.add(new Option(group.label, group.id)));
    const containingGroup = groups.find((group) => group.metrics.some((metric) => metric.key === mapMetricKey));
    const nextGroup = containingGroup || groups.find((group) => group.id === preferredGroupId) || groups[0];
    themeSelect.value = nextGroup.id;
    populateVariables(nextGroup.id, mapMetricKey);
  };

  modeSelect.value = mapModeKey;
  populateThemes("poverty");
  modeSelect.addEventListener("change", () => {
    mapModeKey = mapModes[modeSelect.value] ? modeSelect.value : "level";
    populateThemes(themeSelect.value);
  });
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
  document.querySelector("#map-download-simple").addEventListener("click", downloadSimpleMapAsPng);
  document.querySelector("#map-download-context").addEventListener("click", downloadContextMapAsPng);
}

async function initializeBvaMap() {
  prepareMapControls();
  const loading = document.querySelector(".map-loading");
  try {
    const [basins, metadata, departments, rentControls] = await Promise.all([
      fetch("assets/bva-atlas-classes.geojson?v=100").then((response) => {
        if (!response.ok) throw new Error("Areas unavailable");
        return response.json();
      }),
      fetch("assets/bva-atlas-meta.json?v=100").then((response) => {
        if (!response.ok) throw new Error("Map metadata unavailable");
        return response.json();
      }),
      fetch("assets/departements.geojson").then((response) => {
        if (!response.ok) throw new Error("Departments unavailable");
        return response.json();
      }),
      fetch("assets/rent-control-communes.geojson?v=96").then((response) => {
        if (!response.ok) throw new Error("Rent-control boundaries unavailable");
        return response.json();
      })
    ]);
    bvaMeta = metadata;
    bvaFeatures = basins.features;
    departmentFeatures = departments.features;
    rentControlFeatures = rentControls.features;
    bvaScale = getMapScale(mapDataKey());
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
    const rentControlPane = bvaMap.createPane("rentControl");
    rentControlPane.style.zIndex = 430;
    const renderer = L.canvas({ padding: .35 });
    const rentControlRenderer = L.canvas({ padding: .35, pane: "rentControl" });
    bvaLayer = L.geoJSON(basins, { renderer, pane: "basins", style: basinStyle, onEachFeature: onEachBasin }).addTo(bvaMap);
    L.geoJSON(departments, {
      renderer,
      pane: "departments",
      interactive: false,
      style: { color: "rgba(11,16,32,.58)", weight: .85, fillOpacity: 0 }
    }).addTo(bvaMap);
    rentControlLayer = L.geoJSON(rentControls, {
      renderer: rentControlRenderer,
      pane: "rentControl",
      style: (feature) => ({
        color: "#ff4f8b",
        weight: feature.properties?.couverture === "couverture partielle" ? 1.35 : 1.8,
        dashArray: feature.properties?.couverture === "couverture partielle" ? "5 4" : null,
        fillColor: "#ff4f8b",
        fillOpacity: .08
      }),
      onEachFeature: onEachRentControlCommune
    });
    L.control.zoom({ position: "bottomright" }).addTo(bvaMap);
    L.control.attribution({ position: "bottomleft", prefix: false })
      .addAttribution('IGN ADMIN EXPRESS 2024 · <a href="https://open.urssaf.fr/explore/dataset/etablissements-et-effectifs-salaries-au-niveau-commune-x-ape-last/" target="_blank" rel="noopener">Urssaf open data (ODbL)</a> · GHWW')
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
    updateRentControlOverlay();
    loading.remove();
    setMapDownloadButtonsDisabled(false);
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
  housing: "the stock of public housing",
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
    ? "If this interval does not contain the value 0, we say that the estimated impact is statistically significant; this means there is a greater than 90% chance that the coefficient is different from 0."
    : "The panel on the right shows the impact of the same variables on exit rates. We can see that they are much smaller than those of the entry flows and, in general, statistically insignificant.";
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
