import type { ParticipantUser } from "app/types";
import { create } from "zustand";

type State = {
	userData: ParticipantUser | null;
};

type Actions = {
	setUserData: (payload: ParticipantUser) => void;
	clearUserData: VoidFunction;
};

const useUser = create<State & Actions>()((set) => ({
	/* initial state */
	userData: null,

	/* dispatcher actions */
	setUserData: (payload) => set({ userData: payload }),
	clearUserData: () => set({ userData: null }),
}));

export default useUser;
