import type { AlumnoDTO } from '@/types/alumnoDTO'
import axios from 'axios'

const url = 'https://localhost:7117/api/alumnos'

export const getAlumnos = async () => {
  const response = await axios.get(url)
  return response.data
}

export const getAlumnoByDni = async (dni: number) => {
  const response = await axios.get(`${url}/${dni}`)
  return response.data
}

export const crearAlumno = async (alumno: AlumnoDTO) => {
  const response = await axios.post(url, alumno)
  return response.data
}

export const modificarAlumno = async (dni: number, alumno: AlumnoDTO) => {
  const response = await axios.put(`${url}/${dni}`, alumno)
  return response.data
}

export const eliminarAlumno = async (dni: number) => {
  const response = await axios.delete(`${url}/${dni}`)
  return response.data
}
