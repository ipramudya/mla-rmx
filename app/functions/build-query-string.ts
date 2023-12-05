type Search = Record<string, string>;
type Sort = {
	[x: string]: "asc" | "desc";
};

export type QueryStringBuilderParams = {
	search?: Search;
	sort?: Sort;
};

export default function buildQueryString(params?: QueryStringBuilderParams) {
	if (!params) return "";

	let search, sort;

	if (params.search) {
		search = Object.entries(params.search).map(([key, value]) =>
			value ? `search=${key}:contains(${value})` : "",
		);
	} else {
		search = "";
	}

	if (params.sort) {
		sort = Object.entries(params.sort).map(([key, value]) =>
			value ? `sort=${key}|${value}|1` : "",
		);
	} else {
		sort = "";
	}

	return [search, sort].join(!search || !sort ? "" : "&");
}
