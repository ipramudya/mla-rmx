import { Links, Meta, Scripts, useNavigate, useRouteError } from "@remix-run/react";
import { ErrorDoodle } from "app/assets/images";
import { useEffect } from "react";
import { Icon } from "../Icon";
import styles from "./404.module.css";

export default function ErrorNotFoundPage() {
	const navigate = useNavigate();
	const error = useRouteError();

	useEffect(() => {
		throw new Error("Error", {
			cause: {
				error,
			},
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<html>
			<head>
				<title>Oops!</title>
				<Meta />
				<Links />
			</head>
			<body>
				<div className={styles.root}>
					<div className={styles.frame}>
						<button className={styles.close_btn} onClick={() => navigate("/")}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="lucide lucide-x"
							>
								<path d="M18 6 6 18" />
								<path d="m6 6 12 12" />
							</svg>
						</button>

						<div className={styles.stack}>
							<div className={styles.img_wrapper}>
								<img className={styles.img} src={ErrorDoodle} alt="error-doodle" />
							</div>
							<div className={styles.typography}>
								<h1 className={styles.title} style={{ margin: 0 }}>
									Halaman tidak tersedia
								</h1>
								<p className={styles.subtitle}>
									Mohon maaf, halaman yang anda kunjungi belum tersedia :)
								</p>
							</div>
							<button onClick={() => navigate(-1)} className={styles.btn}>
								<Icon.ArrowLeft size={16} />
								Kembali
							</button>
						</div>
					</div>
				</div>
				<Scripts />
			</body>
		</html>
	);
}
