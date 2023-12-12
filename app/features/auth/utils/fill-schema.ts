import { z } from "zod";

export const fillFormSchema = z.object({
	firstName: z.string().min(3, { message: "Masih kosong atau terlalu pendek" }),
	lastName: z.string().min(3, { message: "Masih kosong atau terlalu pendek" }),
	password: z.string().min(8, { message: "Masih kosong atau terlalu pendek" }),
	phone: z
		.string()
		.min(10, { message: "Masih kosong atau terlalu pendek" })
		.startsWith("+62", { message: "Gunakan format +62" })
		.regex(/^[\d+]+$/, { message: "Gunakan format +62" }),
	accepted: z.boolean().transform((val, ctx) => {
		if (!val) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Anda belum menyetujui" });
		return val;
	}),
});

export type FillPayload = z.infer<typeof fillFormSchema>;
