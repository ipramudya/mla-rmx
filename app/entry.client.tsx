/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */
import { RemixBrowser, useLocation, useMatches } from "@remix-run/react";
import * as Sentry from "@sentry/remix";
import { StrictMode, startTransition, useEffect } from "react";
import { hydrateRoot } from "react-dom/client";

Sentry.init({
	dsn: "https://edd3ef145669d9722ce16ecc0cfc7c7a@o4506414335066112.ingest.sentry.io/4506414340767744",
	tracesSampleRate: 1,
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1,

	integrations: [
		new Sentry.BrowserTracing({
			routingInstrumentation: Sentry.remixRouterInstrumentation(
				useEffect,
				useLocation,
				useMatches,
			),
		}),
		new Sentry.Replay(),
	],
});

startTransition(() => {
	hydrateRoot(
		document,
		<StrictMode>
			<RemixBrowser />
		</StrictMode>,
	);
});
