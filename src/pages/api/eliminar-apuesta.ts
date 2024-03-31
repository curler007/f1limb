import type { APIRoute } from "astro"
import { turso } from "@/turso"
import { getSession } from "auth-astro/server"

export const POST: APIRoute = async ({ request, redirect }) => {
	//check user
	let userId!: number
	let session = await getSession(request)
	if (session && session.user && session.user.email) {
		const { rows } = await turso.execute({
			sql: "SELECT * FROM user WHERE email = ?",
			args: [session.user.email],
		})
		if (rows.length == 0) {
			return new Response(
				JSON.stringify({
					message: "Usuario no autorizado",
				}),
				{ status: 401 }
			)
		}
		userId = rows[0].id as number
	}

	const data = await request.formData()
	const id = data.get("id")
	const gpId = data.get("gpId")

	if (!id || !userId) {
		return new Response(
			JSON.stringify({
				message: "Missing required fields",
			}),
			{ status: 400 }
		)
	}

	await turso.execute({
		sql: "DELETE FROM apuesta WHERE id = ? and userId = ? and cuota is null",
		args: [id.toString(), userId],
	})

	return redirect("/gp/" + gpId + "/misapuestas", 302)
}
