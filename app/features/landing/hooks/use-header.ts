import { useWindowScroll } from "@mantine/hooks";

export default function useHeader() {
	const [scroll] = useWindowScroll();

	return { isScrolledOver: scroll.y >= 40 };
}
