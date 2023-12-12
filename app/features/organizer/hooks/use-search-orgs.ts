import { useDebouncedState } from "@mantine/hooks";
import { useAtom } from "jotai";
import { atomWithReset, useResetAtom } from "jotai/utils";
import { useCallback, useEffect, useMemo } from "react";

export const SearchOrgsAtom = atomWithReset<string>("");

export default function useSearchOrgs() {
	const [value, setValue] = useAtom(SearchOrgsAtom);
	const resetAtom = useResetAtom(SearchOrgsAtom);
	const [debouncedValue, setDebouncedValue] = useDebouncedState(value, 400);

	useEffect(() => {
		if (debouncedValue || debouncedValue === "") {
			setValue(debouncedValue);
		}
	}, [debouncedValue, setValue]);

	const reset = useCallback(() => {
		resetAtom();
		setDebouncedValue("");
	}, [resetAtom, setDebouncedValue]);

	return useMemo(
		() => ({
			resetSearch: reset,
			search: value,
			setSearch: setDebouncedValue,
		}),
		[reset, setDebouncedValue, value],
	);
}
