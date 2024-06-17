import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import File from 'App/Models/File'
import fs from 'fs/promises'
import path from 'path'
import Application from '@ioc:Adonis/Core/Application'

export default class FilesController {
  public async store({ request, response }: HttpContextContract) {
    const file = request.file('file', {
      size: '2mb',
      extnames: ['txt']
    })

    if (!file) {
      return response.status(400).send('File is required')
    }

    const fileName = `${new Date().getTime()}.${file.extname}`
    await file.move(Application.publicPath('Documents'), {
      name: fileName,
    })

    const filePath = path.join(Application.publicPath('Documents'), fileName)
    const content = await fs.readFile(filePath)

    const document = new File()
    document.name = file.clientName || 'unknown'
    document.file_type = file.extname || 'txt'
    document.content = content

    await document.save()
    await fs.unlink(filePath)

    return response.status(201).json(document)
  }

  public async show({ params, response }: HttpContextContract) {
    const document = await File.find(params.id)

    if (!document) {
      return response.status(404).send('Document not found')
    }
    return response.status(200).send(document.content)
  }

  public async download({ params, response }: HttpContextContract) {
    const document = await File.find(params.id)

    if (!document) {
      return response.status(404).send('Files no econtrado')
    }

    response.header('Content-Type', `text/${document.file_type}`)
    response.header('Content-Disposition', `attachment; filename="${document.name}"`)
    return response.status(200).send(document.content)
  }
}
