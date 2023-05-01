export default function downloadFile(filename, dataURL) {
  const anchor = document.createElement("a");
  anchor.href = dataURL;
  anchor.target = "_blank";
  anchor.download = filename;
  anchor.click();
}
