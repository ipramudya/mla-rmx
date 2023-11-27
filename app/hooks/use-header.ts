import { useWindowScroll } from "@mantine/hooks";

export default function useHeader() {
	const [scroll] = useWindowScroll();

	return { isOver: scroll.y >= 40 };
}
