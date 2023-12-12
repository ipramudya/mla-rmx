import { format, formatDistance, fromUnixTime, parseISO } from "date-fns";
import idLocale from "date-fns/locale/id/index.js";

export function dateToWords(dateAsNumber: number): string {
	const d = fromUnixTime(dateAsNumber);

	return formatDistance(d, Date.now(), { locale: idLocale });
}

export function formatDate(date: string | Date, formatter: string): string {
	if (!date) return "";

	let d;
	if (typeof date === "string") {
		d = new Date(date);
	} else {
		d = date;
	}

	return format(d, formatter, { locale: idLocale });
}

export function formatRangeDate(startDate: string, endDate: string) {
	const start = parseISO(startDate);
	const end = parseISO(endDate);

	const isSameYear = start.getFullYear() === end.getFullYear();
	const isSameMonth = start.getMonth() === end.getMonth();
	const isSameDate = start.getDate() === end.getDate();

	if (isSameYear) {
		if (isSameMonth) {
			if (isSameDate) {
				// Same day
				return `${formatDate(endDate, "d MMM yyyy")}, ${formatDate(
					startDate,
					"HH:mm",
				)} - ${formatDate(endDate, "HH:mm")}`;
			}
			// Same month and year
			return `${formatDate(startDate, "d")} - ${formatDate(endDate, "d MMMM yyyy")}`;
		} else {
			// Same year, different months
			return `${formatDate(startDate, "d MMM")} - ${formatDate(endDate, "d MMM yyyy")}`;
		}
	} else {
		// Different years
		return `${formatDate(startDate, "d MMM yyyy")} - ${formatDate(endDate, "d MMM yyyy")}`;
	}
}
