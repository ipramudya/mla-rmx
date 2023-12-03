import { useAtom } from "jotai";
import { atomWithReset, useResetAtom } from "jotai/utils";
import { useMemo } from "react";

type State = {
	id: string;
	show: boolean;
	name: string;
};

export const OrganizerItemPopupAtom = atomWithReset<State>({
	id: "",
	show: false,
	name: "",
});

export default function usePopupLogin() {
	const [value, setValue] = useAtom(OrganizerItemPopupAtom);
	const reset = useResetAtom(OrganizerItemPopupAtom);

	return useMemo(
		() => ({
			popup: value,
			setPopup: setValue,
			resetPopup: reset,
		}),
		[reset, setValue, value],
	);
}
