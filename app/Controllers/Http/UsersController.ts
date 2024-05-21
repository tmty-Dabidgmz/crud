import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Ws from 'App/Services/Ws'
export default class UsersController {
  public async index({response}:HttpContextContract){
        try {
            const users = await User.all()
            Ws.io.emit('update:users', users)
            return response.status(200).json({
            message:"Usuarios encontrados :",
            data:users
            })
        }
        catch (error) {
            return response.status(500).json({
            message:"Error al buscar usuarios",
            data:error
            })
        }
    }


    public async store({request, response}:HttpContextContract){
    
        try {
            const user = new User()
            user.name = request.input('name')
            user.email = request.input('email')
            user.password = request.input('password')
            await user.save()
            Ws.io.emit('new:user', user)
            return response.status(201).json({
            message:"Usuario creado",
            data:user
            })
        }
        catch (error) {
            return response.status(500).json({
            message:"Error al crear usuario",
            data:error
            })
        }
    }

    public async show({ params, response }: HttpContextContract) {
        try {
          const user = await User.findOrFail(params.id)
          return response.status(200).json({
            message: 'Usuario encontrado exitosamente',
            data: user
          })
        } catch (error) {
          return response.status(404).json({
            message: 'Usuario no encontrado',
            error: error.message
          })
        }
    }

    public async update({ params, request, response }: HttpContextContract) {
        try {
          const user = await User.findOrFail(params.id)
          user.name = request.input('name')
          user.email = request.input('email')
          user.password = request.input('password')
          await user.save()
    
          return response.status(200).json({
            message: 'Usuario actualizado exitosamente',
            data: user
          })
        } catch (error) {
          return response.status(400).json({
            message: 'Error al actualizar usuario',
            error: error.message
          })
        }
    }

    public async destroy({ params, response }: HttpContextContract) {
        try {
          const user = await User.findOrFail(params.id)
          await user.delete()
    
          return response.status(204).json({
            message: 'Usuario eliminado exitosamente'
          })
        } catch (error) {
          return response.status(400).json({
            message: 'Error al eliminar usuario',
            error: error.message
          })
        }
    }

}