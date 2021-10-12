export const addAbsLegendValues = (plotData) => {
  if (typeof plotData == "object" && plotData.marker) {
    const markers = plotData.marker.color.map((num) => Math.abs(num));
    const largestMarker = Math.max(...markers);
    plotData.marker.color.push(largestMarker);
    plotData.marker.color.push(largestMarker * -1);
  }
  return plotData;
};
