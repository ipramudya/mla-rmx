import type { OrganizerUser } from "app/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
	organizerData: OrganizerUser | null;
};

type Actions = {
	setCurrentOrgs: (organizer: OrganizerUser) => void;
	clearOrganizerData: VoidFunction;
};

const useOrganizer = create<State & Actions>()(
	persist(
		(set) => ({
			/* initial state */
			organizerData: null,

			/* dispatcher actions */
			setCurrentOrgs: (payload) => set({ organizerData: payload }),
			clearOrganizerData: () => set({ organizerData: null }),
		}),
		{
			name: "co", // current organizer
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);

export default useOrganizer;
