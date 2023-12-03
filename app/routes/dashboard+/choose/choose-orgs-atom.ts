import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

export const OrganizerItemPopupAtom = atomWithReset<{ id: string; val: boolean }>({
	id: "",
	val: false,
});

export const DashboardLoadingAtom = atom<boolean>(false);
