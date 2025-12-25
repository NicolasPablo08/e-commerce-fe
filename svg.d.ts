declare module "*.svg" {
	import React = require("react");
	export const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
	export default SVG;
}
