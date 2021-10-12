import { addAbsLegendValues } from "./LMDPlotHelper";

describe("addAbsLegendvalues", () => {
  it("should add two more colors, the abs values + and -", () => {
    const plotData = {
      marker: {
        color: [
          2.00637099557495, -1.18855883651112, -1.38664895674424,
          -3.51990396414352, -0.876626733677144, -1.00193986050412,
          4.25919035259155, -11.1594253550782, 0, 0, -2.99562864993775, 0,
          3.26117942430028, -2.0265655211554, -1.04840370242389,
          -0.992251042402025, -1.6487841281909, -1.07536038233495,
          2.55447485316858, -2.07069389457375, -1.25328686366141,
          -1.53323681845855, -1.62412329267874, -1.40389334014968,
        ],
      },
    };

    const expectedPlotData = {
      marker: {
       color: [
          2.00637099557495, -1.18855883651112, -1.38664895674424,
          -3.51990396414352, -0.876626733677144, -1.00193986050412,
          4.25919035259155, -11.1594253550782, 0, 0, -2.99562864993775, 0,
          3.26117942430028, -2.0265655211554, -1.04840370242389,
          -0.992251042402025, -1.6487841281909, -1.07536038233495,
          2.55447485316858, -2.07069389457375, -1.25328686366141,
          -1.53323681845855, -1.62412329267874, -1.40389334014968,
          -11.1594253550782, 11.1594253550782,
        ],
      },
    };

    expect(addAbsLegendValues(plotData).marker.color.length).toBe(
      expectedPlotData.marker.color.length
    );
  }),

  it("should return the variable if undefined", () => {
    const plotData = undefined;

    const expectedPlotData = undefined;
    expect(addAbsLegendValues(plotData)).toBe(expectedPlotData);
  }),
  it("should return the object if marker is undefined", () => {
    const plotData = {};

    const expectedPlotData = {};
    expect(addAbsLegendValues(plotData).toString()).toBe(expectedPlotData.toString());

  });
});
