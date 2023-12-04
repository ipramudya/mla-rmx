import { useAtom } from "jotai";
import { atomWithReset, useResetAtom } from "jotai/utils";
import { useMemo } from "react";

export const SortOrgsAtom = atomWithReset<Record<string, "asc" | "desc"> | undefined>(undefined);

export default function useSortOrgs() {
	const [value, setValue] = useAtom(SortOrgsAtom);
	const reset = useResetAtom(SortOrgsAtom);

	return useMemo(
		() => ({
			sort: value,
			setSort: setValue,
			resetSort: reset,
		}),
		[reset, setValue, value],
	);
}
