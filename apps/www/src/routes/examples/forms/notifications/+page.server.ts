import { superValidate } from "sveltekit-superforms/server";
import type { PageServerLoad } from "../$types";
import { notificationsFormSchema } from "./notifications-form.svelte";
import { fail, type Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(notificationsFormSchema),
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, notificationsFormSchema);
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}
		return {
			form,
		};
	},
};
