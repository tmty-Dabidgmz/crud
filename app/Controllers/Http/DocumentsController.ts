import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Document from 'App/Models/Document'
import Application from '@ioc:Adonis/Core/Application'
export default class DocumentsController {

    public async index({response}:HttpContextContract){
        try{
            console.log(response);
            const documents = await Document.all()
            return response.status(200).json({
                message:"Documentos encontrados :",
                data:documents
            })
        }
        catch(error){
            console.log("Nose encontro nada",error)
            return response.status(500).json({
                
                message:"Error al buscar Documentos",
                data:error
            })

        }
        finally{
            console.log('Finally')
        }
    }

    public async store({ request, response }: HttpContextContract) {
        try {
          const file = request.file('file', {
            size: '2mb',
            extnames: ['pdf', 'xls', 'xlsx'] 
          })
    
          if (!file) {
            return response.status(400).json({ error: 'No se ha proporcionado ningún archivo' })
          }
          await file.move(Application.publicPath('Documents'), {
            overwrite: true
          })
          if (!file.isValid) {
            return response.status(500).json({ error: 'Error al guardar el archivo en el servidor' })
          }
          const document = await Document.create({
            Nombre: file.clientName, 
            Descripcion: request.input('Descripcion'),
            Mercado_Financiero: request.input('Mercado_Financiero'),
            Tipo: file.extname, 
            Status: request.input('Status', 'Active'), 
            Ruta: `Documents/${file.clientName}`
          })
          return response.status(201).json({
            message: 'Documento creado',
            data: document
          })
        } catch (error) {
          return response.status(500).json({
            message: 'Error al agregar documentos:',
            data: error.message
          })
        }
      }

    public async show({params,response}:HttpContextContract){
   
        try{
            const documents = await Document.findOrFail(params.id)
            return response.status(200).json({
                message:"Documento encontrado",
                data:documents
            })
        }
        catch(error){
            return response.status(404).json({
                message:"Documento no encontrado",
                data:error
            })
        }
        finally{
            console.log('Finally')
        }
    }

    public async update({params,request,response}:HttpContextContract){
        try{
            const documents = await Document.findOrFail(params.id)
            documents.Nombre = request.input('Nombre')
            documents.Descripcion = request.input('Descripcion')
            documents.Mercado_Financiero = request.input('Mercado_Financiero')
            documents.Tipo = request.input('Tipo')
            documents.Ruta = request.input('Ruta')
            documents.Status = request.input('Status')
            await documents.save()
            return response.status(200).json({
                message:"Documento actualizado",
                data:documents
            })
        }
        catch(error){
            return response.status(404).json({
                message:"Documento no encontrado",
                data:error
            })
        }
        finally{
            console.log('Finally')
        }
    }

    public async destroy({ params, response }: HttpContextContract) {
        try {
          const documents = await Document.findOrFail(params.id)
          documents.Status = 'Delete'
          await documents.save()
          return response.status(200).json({
            message: "Documento marcado como eliminado",
            data: documents
          })
        } catch (error) {
          return response.status(404).json({
            message: "Documento no encontrado",
            data: error
          })
        } finally {
          console.log('Finally')
        }
      }
}
