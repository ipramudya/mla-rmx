import { TextInput } from "@mantine/core";
import { Icon } from "app/components/Icon";
import useSearchOrgs from "app/features/organizer/hooks/use-search-orgs";
import { forwardRef } from "react";
import styles from "./Search.module.css";

const Search = forwardRef<HTMLInputElement>((_, ref) => {
	const { setSearch } = useSearchOrgs();

	return (
		<TextInput
			ref={ref}
			variant="unstyled"
			size="lg"
			placeholder="Cari organizer"
			leftSection={<Icon.Search size={20} />}
			classNames={{
				root: styles.input_root,
				section: styles.input_section,
				input: styles.input,
			}}
			onChange={(e) => setSearch(e.currentTarget.value)}
		/>
	);
});
Search.displayName = "search-organizer";

export default Search;
