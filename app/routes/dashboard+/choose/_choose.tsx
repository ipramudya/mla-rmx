/* NB: deskripsi halaman -> buat organizer, pilih, lalu selenggarakan lomba terbaikmu */

import { Stack } from "@mantine/core";
import EmptyOrgs from "./components/EmptyOrgs";
import Header from "./components/Header";
import Heading from "./components/Heading";
import Search from "./components/Search";

export default function ChoosePage() {
	return (
		<Stack gap="xl">
			<Header />

			<Heading />

			<Search />

			<EmptyOrgs />
		</Stack>
	);
}
