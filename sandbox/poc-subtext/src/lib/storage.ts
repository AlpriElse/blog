import type { VideoManifest } from '../types'

const DB_NAME = 'video-analyzer-db'
const DB_VERSION = 1
const STORE_NAME = 'videos'

export interface StoredVideo {
  id: string
  name: string
  manifest: VideoManifest
  videoBlob: Blob
  createdAt: number
}

let dbPromise: Promise<IDBDatabase> | null = null

function openDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' })
        store.createIndex('createdAt', 'createdAt', { unique: false })
      }
    }
  })

  return dbPromise
}

export async function saveVideo(
  name: string,
  manifest: VideoManifest,
  videoBlob: Blob
): Promise<string> {
  const db = await openDB()
  const id = `video-${Date.now()}`

  const video: StoredVideo = {
    id,
    name,
    manifest,
    videoBlob,
    createdAt: Date.now(),
  }

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.add(video)

    request.onsuccess = () => resolve(id)
    request.onerror = () => reject(request.error)
  })
}

export async function getVideo(id: string): Promise<StoredVideo | null> {
  const db = await openDB()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.get(id)

    request.onsuccess = () => resolve(request.result || null)
    request.onerror = () => reject(request.error)
  })
}

export async function getAllVideos(): Promise<StoredVideo[]> {
  const db = await openDB()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.getAll()

    request.onsuccess = () => resolve(request.result || [])
    request.onerror = () => reject(request.error)
  })
}

export async function deleteVideo(id: string): Promise<void> {
  const db = await openDB()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.delete(id)

    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}

export async function clearAllVideos(): Promise<void> {
  const db = await openDB()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.clear()

    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}

// Convert a blob URL to Blob for storage
export async function blobUrlToBlob(blobUrl: string): Promise<Blob> {
  const response = await fetch(blobUrl)
  return response.blob()
}

// Convert a File to Blob (File is already a Blob subclass, but this ensures compatibility)
export function fileToBlob(file: File): Blob {
  return file
}
