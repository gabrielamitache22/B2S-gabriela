console.log("Hello Back 2 school!");
let viz;
//1. Create a variable to store the vizContainer
//2. Create a variable to store the dashboard options
//3. Create a variable to store the Url - if it doesnt load, might need to specify height and width

const containerDiv = document.getElementById("vizContainer");

const options = {
  device: "desktop",
  height: "900px",
  width: "1400px",
};
const url =
  "https://public.tableau.com/views/Book1_16813785203990/Dashboard1?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link";

const exportpdfbutton = document.getElementById("exportPDF");

const exportppbutton = document.getElementById("exportPP");

function initViz() {
  viz = new tableau.Viz(containerDiv, url, options);
}

initViz();

document.addEventListener("DOMContentLoaded", initViz);

exportpdfbutton.addEventListener("click", exportPDFfunction);

exportppbutton.addEventListener("click", exportPPfunction);
document
  .getElementById("FilterButton")
  .addEventListener("click", getRangeValues);

function exportPDFfunction() {
  viz.showExportPDFDialog();
}

function exportPPfunction() {
  viz.showExportPowerPointDialog();
}

function getRangeValues() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  console.log(sheets);
  const sheetToFilter = sheets[0];
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", { min: minValue, max: maxValue })
    .then(alert("viz filtered 🤩"));
}
