import type { AlumnoDTO } from '@/types/alumnoDTO'
import axios from 'axios'

const url = 'https://localhost:7117/api/alumnos'

export const getAlumnos = async () => {
  const response = await axios.get(url)
  return response.data
}

export const getAlumnoByDni = async (dni: number) => {
  try{
    const response = await axios.get(`${url}/${dni}`)
    return response.data
  }catch(error:unknown){
    if (axios.isAxiosError(error)) {
          throw new Error( 'Error al obtener el alumno')
        }
  }
}

export const crearAlumno = async (alumno: AlumnoDTO) => {
  try{
    const response = await axios.post(url, alumno)
    return response.data
  }catch(error:unknown){
    if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data || error.message || 'Error al crear el alumno')
        }
  }


}

export const modificarAlumno = async (dni: number, alumno: AlumnoDTO) => {
  try{
    const response = await axios.put(`${url}/${dni}`, alumno)
    return response.data
  }catch(error:unknown){
    if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data || error.message || 'Error al modificar el alumno')
        }
  }

}

export const eliminarAlumno = async (dni: number) => {
  try{
    const response = await axios.delete(`${url}/${dni}`)
    return response.data
  }
  catch(error:unknown){
      if(axios.isAxiosError(error)){
          throw new Error(error.response?.data || error.message || 'Error al eliminar el alumno')
      }
  }

}
