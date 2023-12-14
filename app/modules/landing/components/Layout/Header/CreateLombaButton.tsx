import { Button } from "@mantine/core";
import { Link } from "@remix-run/react";
import useOrganizer from "app/lib/store/hooks/use-organizer";
import styles from "./Header.module.css";

interface Props {
	isScrolledOver: boolean;
	isLoggedIn: boolean;
}

export default function CreateLombaButton({ isLoggedIn, isScrolledOver }: Props) {
	const currentOrgs = useOrganizer((s) => s.organizerData);

	const getDestinationURL = (): string => {
		if (isLoggedIn) {
			if (currentOrgs !== null) {
				return `/dashboard/${currentOrgs.id}`;
			}
			return "dashboard/choose";
		} else {
			return "/auth/login";
		}
	};

	return (
		<Button
			classNames={{ root: isScrolledOver ? undefined : styles.create_lomba_btn }}
			variant={isScrolledOver ? "gradient" : "default"}
			component={Link}
			to={getDestinationURL()}
			prefetch="intent"
		>
			Buat Lomba
		</Button>
	);
}
