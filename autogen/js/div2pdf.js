/**
 * 将div保存为pdf
 */
function div2pdf(rootDivId, savename) {
  window.scrollTo(0, 0)
  let target = document.getElementById(rootDivId)
  target.style.background = "#FFFFFF"
  html2canvas(
    target, {
    dpi: 172,
    onrendered: function (canvas) {
      var contentWidth = canvas.width;
      var contentHeight = canvas.height;
      var pageHeight = contentWidth / 592.28 * 841.89;
      var leftHeight = contentHeight;
      var position = 0;
      var imgWidth = 595.28;
      var imgHeight = 592.28 / contentWidth * contentHeight;
      var pageData = canvas.toDataURL('image/jpeg', 1.0);
      var pdf = new jsPDF('', 'pt', 'a4');
      if (leftHeight < pageHeight) {
        pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
      } else {
        while (leftHeight > 0) {
          pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
          leftHeight -= pageHeight;
          position -= 841.89;
          if (leftHeight > 0) {
            pdf.addPage();
          }
        }
      }
      pdf.save(`${savename}.pdf`);
    },
    background: "#fff"
  })
}
