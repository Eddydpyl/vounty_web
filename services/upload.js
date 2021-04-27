import imageCompression from 'browser-image-compression'

const UploadService = {
  async uploadImage (file, links, maxSizeMB) {
    const options = { maxSizeMB, useWebWorker: true }
    const image = await imageCompression(file, options)
    return this.upload(image, links)
  },
  async upload (file, links) {
    const xhr = new XMLHttpRequest()
    xhr.open('PUT', links.setter, false)
    xhr.setRequestHeader('Content-Type', file.type)
    await xhr.send(file)
    return links.getter
  }
}

export default UploadService
