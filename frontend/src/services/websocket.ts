export interface WebSocketMessage {
  type: string
  data: unknown
}

class WebSocketService {
  private ws: WebSocket | null = null
  private url: string
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 3000
  private listeners: Map<string, ((data: unknown) => void)[]> = new Map()

  constructor() {
    this.url = import.meta.env.VITE_WS_URL || 'ws://localhost:3001'
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.url)

        this.ws.onopen = () => {
          console.log('WebSocket connected')
          this.reconnectAttempts = 0
          resolve()
        }

        this.ws.onmessage = (event) => {
          try {
            const message: WebSocketMessage = JSON.parse(event.data)
            this.handleMessage(message)
          } catch (error) {
            console.error('Failed to parse WebSocket message:', error)
          }
        }

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error)
          reject(error)
        }

        this.ws.onclose = () => {
          console.log('WebSocket disconnected')
          this.attemptReconnect()
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`)
      setTimeout(() => this.connect(), this.reconnectDelay)
    }
  }

  subscribe(channel: string): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: 'subscribe', channel }))
    }
  }

  unsubscribe(channel: string): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: 'unsubscribe', channel }))
    }
  }

  on(type: string, callback: (data: unknown) => void): void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, [])
    }
    this.listeners.get(type)?.push(callback)
  }

  off(type: string, callback: (data: unknown) => void): void {
    const callbacks = this.listeners.get(type)
    if (callbacks) {
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  private handleMessage(message: WebSocketMessage): void {
    const callbacks = this.listeners.get(message.type)
    if (callbacks) {
      callbacks.forEach((callback) => callback(message.data))
    }
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN
  }
}

export const webSocketService = new WebSocketService()
export default webSocketService
