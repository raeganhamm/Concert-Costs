declare module "@svg-maps/usa" {
  type SvgMapLocation = {
    id: string;
    name: string;
    path: string;
  };

  type SvgMap = {
    label?: string;
    viewBox: string;
    locations: SvgMapLocation[];
  };

  const map: SvgMap;
  export default map;
}
