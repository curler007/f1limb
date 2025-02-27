export interface User {
	id: number
	nombre?: string
	email?: string
	admin?: boolean
	team?: Team
	apuestas?: Apuesta[]
	ganancia?: number
	puntos?: number
}
export interface Team {
	id: number
	nombre: string
	users?: User[]
	puntos?: number
}

export interface Estado {
	id: number
	nombre: string
}

export interface Apuesta {
	id: number
	user: User
	descripcion: string
	importe: number
	cuota: number
	estado: number
	ganancia: number
	gp: Info
}

export interface Info {
	id: number
	nombre?: string
	flag?: string
	circuit?: string
	libres1?: Date
	libres2?: Date
	libres3?: Date
	clasificacion?: Date
	clasificacionSprint?: Date
	sprint?: Date
	carrera?: Date
}

export interface Clasificacion {
	id: number
	user?: User
	team?: Team
	gp?: Info
	ganancia: number
	puntos: number
}
